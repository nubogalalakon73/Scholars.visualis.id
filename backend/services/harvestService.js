import Document from "../models/Document.js";
import HarvestLog from "../models/HarvestLog.js";
import Repository from "../models/Repository.js";
import University from "../models/University.js";
import { listRecords } from "./oaiPmhClient.js";
import { mapOaiDcToDocument } from "./mapOaiDcToDocument.js";

/**
 * Runs a harvest for a single repository, updating a HarvestLog as it goes.
 * Designed to be called fire-and-forget from an HTTP handler: it never throws,
 * it just records failures into the HarvestLog / Repository status.
 */
export async function runHarvest(repository, { mode = "manual", existingLog } = {}) {
  const startedAt = existingLog?.startedAt || new Date();
  const log =
    existingLog ||
    (await HarvestLog.create({
      repositoryId: String(repository._id),
      repositoryName: repository.name,
      startedAt,
      mode,
      status: "running",
    }));

  let imported = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;
  const errors = [];
  let totalRecords = 0;

  try {
    let universityName = repository.name;
    if (repository.universityId) {
      const uni = await University.findOne({ id: repository.universityId }).lean();
      if (uni) universityName = uni.name;
    }

    const { records, warnings } = await listRecords(repository.oaiEndpoint, {
      metadataPrefix: repository.metadataPrefix || "oai_dc",
      set: repository.setSpec || undefined,
    });

    for (const warning of warnings) {
      errors.push({ message: warning, identifier: undefined });
    }

    totalRecords = records.length;

    const repoContext = {
      _id: repository._id,
      name: repository.name,
      baseUrl: repository.baseUrl,
      universityId: repository.universityId,
      universityName,
    };

    for (const record of records) {
      try {
        if (record.deleted) {
          skipped += 1;
          continue;
        }
        const mapped = mapOaiDcToDocument(record, repoContext);
        if (!mapped) {
          skipped += 1;
          continue;
        }

        const existing = await Document.findOne({
          sourceIdentifier: mapped.sourceIdentifier,
        })
          .select("_id")
          .lean();

        await Document.findOneAndUpdate(
          { sourceIdentifier: mapped.sourceIdentifier },
          { $set: mapped },
          { upsert: true, setDefaultsOnInsert: true }
        );

        if (existing) {
          updated += 1;
        } else {
          imported += 1;
        }
      } catch (err) {
        failed += 1;
        errors.push({
          message: err.message,
          identifier: record?.identifier,
        });
      }
    }

    const finishedAt = new Date();
    const status =
      failed === 0
        ? "success"
        : failed < totalRecords
        ? "partial"
        : totalRecords === 0
        ? "success"
        : "failed";

    log.finishedAt = finishedAt;
    log.durationMs = finishedAt.getTime() - startedAt.getTime();
    log.totalRecords = totalRecords;
    log.imported = imported;
    log.updated = updated;
    log.skipped = skipped;
    log.failed = failed;
    log.errors = errors.slice(0, 200);
    log.status = status;
    await log.save();

    repository.lastHarvestAt = finishedAt;
    if (status !== "failed") {
      repository.lastSuccessAt = finishedAt;
      repository.status = "active";
    } else {
      repository.status = "error";
    }
    await repository.save();

    return log;
  } catch (err) {
    const finishedAt = new Date();
    log.finishedAt = finishedAt;
    log.durationMs = finishedAt.getTime() - startedAt.getTime();
    log.totalRecords = totalRecords;
    log.imported = imported;
    log.updated = updated;
    log.skipped = skipped;
    log.failed = failed;
    log.errors = [...errors, { message: err.message, identifier: undefined }].slice(0, 200);
    log.status = "failed";
    try {
      await log.save();
    } catch {
      // best effort
    }

    try {
      repository.lastHarvestAt = finishedAt;
      repository.status = "error";
      await repository.save();
    } catch {
      // best effort
    }

    console.error(`Harvest failed for repository ${repository.name}:`, err.message);
    return log;
  }
}

/**
 * Fire-and-forget wrapper: kicks off runHarvest in the background and never
 * lets an error escape to crash the process.
 */
export function runHarvestInBackground(repository, options) {
  runHarvest(repository, options).catch((err) => {
    console.error(`Unhandled harvest error for repository ${repository?.name}:`, err);
  });
}

/**
 * Creates a "running" HarvestLog synchronously (so the caller can respond to
 * the HTTP request immediately with its id), then continues the actual
 * harvest work in the background.
 */
export async function startHarvestAsync(repository, { mode = "manual" } = {}) {
  const log = await HarvestLog.create({
    repositoryId: String(repository._id),
    repositoryName: repository.name,
    startedAt: new Date(),
    mode,
    status: "running",
  });

  runHarvest(repository, { mode, existingLog: log }).catch((err) => {
    console.error(`Unhandled harvest error for repository ${repository?.name}:`, err);
  });

  return log;
}

/**
 * Harvests all enabled repositories sequentially, with a short delay between
 * each to be a good network citizen.
 */
export async function runHarvestAllInBackground(repositories, { delayMs = 2000 } = {}) {
  for (const repository of repositories) {
    try {
      await runHarvest(repository, { mode: "manual" });
    } catch (err) {
      console.error(`Harvest-all: error harvesting ${repository.name}:`, err.message);
    }
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

export default {
  runHarvest,
  runHarvestInBackground,
  runHarvestAllInBackground,
  startHarvestAsync,
};
