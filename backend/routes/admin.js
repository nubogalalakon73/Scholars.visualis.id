import express from "express";
import Document from "../models/Document.js";
import University from "../models/University.js";
import Discipline from "../models/Discipline.js";
import { documents, universities, disciplines } from "../seed/seedData.js";

const router = express.Router();

router.post("/seed", async (req, res) => {
  const secret = req.header("x-seed-secret");
  if (!process.env.SEED_SECRET || secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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
});

export default router;
