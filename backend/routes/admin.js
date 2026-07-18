import express from "express";
import Document from "../models/Document.js";
import University from "../models/University.js";
import Discipline from "../models/Discipline.js";
import Repository from "../models/Repository.js";
import HarvestLog from "../models/HarvestLog.js";
import { documents, universities, disciplines } from "../seed/seedData.js";
import { repositories as repositorySeedData } from "../seed/repositorySeed.js";
import {
  startHarvestAsync,
  runHarvestAllInBackground,
} from "../services/harvestService.js";

const router = express.Router();

function requireSeedSecret(req, res) {
  const secret = req.header("x-seed-secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

router.post("/seed", async (req, res) => {
  const secret = req.header("x-seed-secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await Promise.all([
      Document.deleteMany({}),
      University.deleteMany({}),
      Discipline.deleteMany({}),
    ]);

    await Document.insertMany(documents);
    await University.insertMany(universities);
    await Discipline.insertMany(disciplines);

    res.json({
      seeded: {
        documents: documents.length,
        universities: universities.length,
        disciplines: disciplines.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Seed failed", detail: err.message });
  }
});

// Upserts the curated list of Indonesian university repository configs.
// Does NOT trigger a harvest — just creates/updates the Repository records.
router.post("/repositories/seed", async (req, res) => {
  if (!requireSeedSecret(req, res)) return;

  try {
    const results = await Promise.all(
      repositorySeedData.map((repo) =>
        Repository.findOneAndUpdate(
          { name: repo.name },
          { $set: repo },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
      )
    );
    res.json({ seeded: results.length });
  } catch (err) {
    res.status(500).json({ error: "Repository seed failed", detail: err.message });
  }
});

// Lists all repository configs with their status.
router.get("/repositories", async (req, res) => {
  if (!requireSeedSecret(req, res)) return;

  try {
    const repos = await Repository.find({}).sort({ name: 1 });
    res.json(repos);
  } catch (err) {
    res.status(500).json({ error: "Failed to list repositories", detail: err.message });
  }
});

// Triggers a manual harvest for a single repository. Responds immediately;
// the harvest continues in the background.
router.post("/harvest/:repositoryId", async (req, res) => {
  if (!requireSeedSecret(req, res)) return;

  try {
    const repository = await Repository.findById(req.params.repositoryId);
    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }

    const log = await startHarvestAsync(repository, { mode: "manual" });
    res.json({ started: true, harvestLogId: log._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to start harvest", detail: err.message });
  }
});

// Triggers a harvest for all enabled repositories, sequentially, in the
// background. Responds immediately.
router.post("/harvest-all", async (req, res) => {
  if (!requireSeedSecret(req, res)) return;

  try {
    const repos = await Repository.find({ enabled: true });
    res.json({ started: true, repositoryCount: repos.length });

    runHarvestAllInBackground(repos, { delayMs: 2000 }).catch((err) => {
      console.error("Harvest-all background error:", err);
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to start harvest-all", detail: err.message });
    }
  }
});

// Returns the latest 50 harvest logs, most recent first.
router.get("/harvest-logs", async (req, res) => {
  if (!requireSeedSecret(req, res)) return;

  try {
    const logs = await HarvestLog.find({}).sort({ startedAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to list harvest logs", detail: err.message });
  }
});

export default router;
