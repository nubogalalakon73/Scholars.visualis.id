const LANGUAGE_MAP = {
  id: "Indonesia",
  ind: "Indonesia",
  in: "Indonesia",
  en: "Inggris",
  eng: "Inggris",
};

const DOI_REGEX = /10\.\d{4,9}\/[^\s"'<>]+/i;

function stripHtml(text) {
  if (!text) return "";
  return String(text).replace(/<[^>]*>/g, " ");
}

function collapseWhitespace(text) {
  if (!text) return "";
  return String(text).replace(/\s+/g, " ").trim();
}

function cleanText(text) {
  return collapseWhitespace(stripHtml(text));
}

function normalizeLanguage(rawLangs) {
  if (!rawLangs || rawLangs.length === 0) return undefined;
  const raw = String(rawLangs[0]).trim().toLowerCase();
  return LANGUAGE_MAP[raw] || rawLangs[0];
}

function parseYear(rawDates) {
  if (!rawDates || rawDates.length === 0) return undefined;
  for (const d of rawDates) {
    const match = String(d).match(/\d{4}/);
    if (match) {
      const year = parseInt(match[0], 10);
      if (year > 1900 && year < 2100) return year;
    }
  }
  return undefined;
}

function extractDoi(identifiers) {
  if (!identifiers) return undefined;
  for (const id of identifiers) {
    const match = String(id).match(DOI_REGEX);
    if (match) return match[0];
  }
  return undefined;
}

function extractPdfUrl(identifiers) {
  if (!identifiers) return undefined;
  for (const id of identifiers) {
    const str = String(id);
    if (/^https?:\/\//i.test(str) && /\.(pdf|docx?|pptx?)(\?.*)?$/i.test(str)) {
      return str;
    }
  }
  return undefined;
}

function extractRepositoryUrl(identifiers, baseUrl) {
  if (identifiers) {
    for (const id of identifiers) {
      const str = String(id);
      if (/^https?:\/\//i.test(str)) return str;
    }
  }
  return baseUrl;
}

function dedupeNonEmpty(values) {
  const seen = new Set();
  const out = [];
  for (const v of values || []) {
    const trimmed = collapseWhitespace(v);
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

/**
 * Maps a parsed OAI record (from oaiPmhClient.listRecords) plus its source
 * Repository config into the shape expected by the Document model.
 *
 * Returns null if the record has no usable title (caller should treat as "skipped").
 */
export function mapOaiDcToDocument(record, repository) {
  if (!record || record.deleted || !record.metadata) return null;

  const { metadata, identifier } = record;
  const title = cleanText(metadata.title);
  if (!title) return null;

  const authors = dedupeNonEmpty(metadata.creators);
  const keywords = dedupeNonEmpty(metadata.subjects);
  const abstract = cleanText(metadata.description) || undefined;
  const language = normalizeLanguage(metadata.languages);
  const year = parseYear(metadata.dates);
  const doi = extractDoi(metadata.identifiers);
  const pdfUrl = extractPdfUrl(metadata.identifiers);
  const repositoryUrl = extractRepositoryUrl(metadata.identifiers, repository.baseUrl);

  const universityId = repository.universityId || undefined;
  const university = repository.universityName || repository.name;

  const sourceIdentifier = identifier;
  const docId = `harvest-${slugify(repository.name)}-${slugify(identifier)}`;

  return {
    id: docId,
    title,
    authors,
    universityId: universityId || slugify(repository.name),
    university,
    repository: repository.name,
    disciplineId: undefined,
    keywords,
    abstract,
    language,
    year,
    doi,
    sourceRepositoryId: String(repository._id || repository.id || ""),
    sourceIdentifier,
    harvestedAt: new Date(),
    pdfUrl,
    repositoryUrl,
  };
}

export default mapOaiDcToDocument;
