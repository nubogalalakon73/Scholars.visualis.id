import { identify, assertSafeUrl } from "./oaiPmhClient.js";

// Common OAI-PMH interface paths across the platforms Indonesian repositories
// tend to run: EPrints, DSpace (various versions), and a couple of
// custom/homegrown systems seen in the wild (e.g. UI's "harvest" endpoint).
const CANDIDATE_PATHS = [
  "/cgi/oai2", // EPrints
  "/oai/request", // DSpace (classic)
  "/server/oai/request", // DSpace 7+
  "/dspace-oai/request", // DSpace (alternate mount)
  "/oai", // SLiMS and some custom systems
  "/harvest/index.php/oai", // seen on UI's lib.ui.ac.id
  "/index.php/oai", // OJS / custom PHP apps
];

function stripTrailingSlash(url) {
  return url.replace(/\/+$/, "");
}

/**
 * Tries each candidate OAI-PMH path against a base URL (or a list of
 * candidate base URLs) and returns the first one that responds to
 * verb=Identify with a valid OAI-PMH Identify document.
 *
 * Returns { found: true, oaiEndpoint, identifyResult } or
 * { found: false, attempts: [{ url, error }] }.
 */
export async function discoverOaiEndpoint(baseUrls) {
  const bases = (Array.isArray(baseUrls) ? baseUrls : [baseUrls]).map(stripTrailingSlash);
  const attempts = [];

  for (const base of bases) {
    for (const path of CANDIDATE_PATHS) {
      const candidate = `${base}${path}`;
      try {
        assertSafeUrl(candidate);
        const result = await identify(candidate);
        return { found: true, oaiEndpoint: candidate, identifyResult: result };
      } catch (err) {
        attempts.push({ url: candidate, error: err.message });
      }
    }
  }

  return { found: false, attempts };
}

export default discoverOaiEndpoint;
