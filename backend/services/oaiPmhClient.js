import { XMLParser } from "fast-xml-parser";

const REQUEST_TIMEOUT_MS = 20000;
const MAX_RETRIES = 2;
const MAX_PAGES = 200; // hard safety cap so a broken resumptionToken loop can't run forever

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
});

const PRIVATE_HOSTNAME_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\.0\.0\.0$/,
  /^\[?::1\]?$/,
];

export function assertSafeUrl(rawUrl) {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error(`Invalid URL: ${rawUrl}`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Unsupported protocol for URL: ${rawUrl}`);
  }
  const hostname = url.hostname;
  if (PRIVATE_HOSTNAME_PATTERNS.some((re) => re.test(hostname))) {
    throw new Error(`Refusing to fetch private/loopback host: ${hostname}`);
  }
  return url;
}

function buildUrl(baseUrl, params) {
  const url = assertSafeUrl(baseUrl);
  const search = new URLSearchParams(params);
  url.search = search.toString();
  return url.toString();
}

async function fetchWithRetry(url, attempt = 0) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ScholarsVisualisIdHarvester/1.0 (+https://scholars.visualis.id; metadata harvesting bot)",
        Accept: "text/xml, application/xml, */*",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}`);
    }
    return await res.text();
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      const backoffMs = 500 * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      return fetchWithRetry(url, attempt + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

function safeParseXml(xmlText) {
  try {
    return parser.parse(xmlText);
  } catch (err) {
    throw new Error(`Malformed XML: ${err.message}`);
  }
}

function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

// Flattens a parsed XML node into plain text. Handles both simple text
// content and "mixed content" (e.g. a dc:title containing inline HTML-ish
// tags like <b>), where fast-xml-parser splits the text across "#text" and
// child element keys — we concatenate everything in document order-ish
// fashion so no text is silently dropped.
function textOf(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "object") {
    const parts = [];
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith("@_")) continue;
      if (Array.isArray(val)) {
        for (const v of val) parts.push(textOf(v));
      } else {
        parts.push(textOf(val));
      }
    }
    return parts.filter(Boolean).join(" ");
  }
  return "";
}

export async function identify(baseUrl) {
  const url = buildUrl(baseUrl, { verb: "Identify" });
  const xmlText = await fetchWithRetry(url);
  const parsed = safeParseXml(xmlText);
  const identifyNode = parsed?.["OAI-PMH"]?.Identify;
  if (!identifyNode) {
    throw new Error("Identify response missing Identify node");
  }
  return {
    repositoryName: textOf(identifyNode.repositoryName),
    baseURL: textOf(identifyNode.baseURL),
    adminEmail: textOf(identifyNode.adminEmail),
    protocolVersion: textOf(identifyNode.protocolVersion),
    granularity: textOf(identifyNode.granularity),
  };
}

function parseDcMetadata(metadataNode) {
  const dc = metadataNode?.dc || metadataNode?.["oai_dc:dc"];
  if (!dc) return null;
  const pick = (key) => toArray(dc[key]).map(textOf).filter(Boolean);
  return {
    title: pick("dc:title")[0] || pick("title")[0] || "",
    creators: pick("dc:creator").length ? pick("dc:creator") : pick("creator"),
    description: pick("dc:description")[0] || pick("description")[0] || "",
    subjects: pick("dc:subject").length ? pick("dc:subject") : pick("subject"),
    dates: pick("dc:date").length ? pick("dc:date") : pick("date"),
    languages: pick("dc:language").length ? pick("dc:language") : pick("language"),
    identifiers: pick("dc:identifier").length ? pick("dc:identifier") : pick("identifier"),
    publishers: pick("dc:publisher").length ? pick("dc:publisher") : pick("publisher"),
    types: pick("dc:type").length ? pick("dc:type") : pick("type"),
    rights: pick("dc:rights").length ? pick("dc:rights") : pick("rights"),
  };
}

function parseRecordNode(recordNode) {
  const header = recordNode?.header || {};
  const isDeleted = header?.["@_status"] === "deleted";
  const identifier = textOf(header.identifier);
  const datestamp = textOf(header.datestamp);
  if (isDeleted) {
    return { identifier, datestamp, deleted: true, metadata: null };
  }
  let metadata = null;
  try {
    metadata = parseDcMetadata(recordNode.metadata);
  } catch {
    metadata = null;
  }
  return { identifier, datestamp, deleted: false, metadata };
}

/**
 * Harvest all records via ListRecords, following resumptionToken pagination.
 * Malformed individual records are skipped (with a warning), not fatal.
 * Returns { records, warnings }.
 */
export async function listRecords(baseUrl, options = {}) {
  const { metadataPrefix = "oai_dc", set, from, until } = options;
  const records = [];
  const warnings = [];

  let resumptionToken;
  let page = 0;

  while (page < MAX_PAGES) {
    page += 1;
    const params = resumptionToken
      ? { verb: "ListRecords", resumptionToken }
      : {
          verb: "ListRecords",
          metadataPrefix,
          ...(set ? { set } : {}),
          ...(from ? { from } : {}),
          ...(until ? { until } : {}),
        };

    const url = buildUrl(baseUrl, params);
    let xmlText;
    try {
      xmlText = await fetchWithRetry(url);
    } catch (err) {
      // A page beyond the first failing (e.g. a server-side bug in the
      // repository's resumptionToken handling) shouldn't discard every
      // record already harvested from earlier pages — keep what we have.
      if (page === 1) throw err;
      warnings.push(`Stopped pagination at page ${page}: ${err.message}`);
      break;
    }

    let parsed;
    try {
      parsed = safeParseXml(xmlText);
    } catch (err) {
      warnings.push(`Failed to parse ListRecords page ${page}: ${err.message}`);
      break;
    }

    const oaiRoot = parsed?.["OAI-PMH"];
    const oaiError = oaiRoot?.error;
    if (oaiError) {
      const code = oaiError?.["@_code"] || "unknown";
      const message = textOf(oaiError);
      if (code === "noRecordsMatch") {
        break;
      }
      if (page === 1) throw new Error(`OAI-PMH error (${code}): ${message}`);
      warnings.push(`Stopped pagination at page ${page}: OAI-PMH error (${code}): ${message}`);
      break;
    }

    const listRecordsNode = oaiRoot?.ListRecords;
    if (!listRecordsNode) {
      break;
    }

    const rawRecords = toArray(listRecordsNode.record);
    for (const raw of rawRecords) {
      try {
        const parsedRecord = parseRecordNode(raw);
        records.push(parsedRecord);
      } catch (err) {
        warnings.push(`Skipped malformed record: ${err.message}`);
      }
    }

    const tokenNode = listRecordsNode.resumptionToken;
    const nextToken = textOf(tokenNode);
    if (tokenNode && nextToken) {
      resumptionToken = nextToken;
    } else {
      break;
    }
  }

  return { records, warnings };
}

export default { identify, listRecords, assertSafeUrl };
