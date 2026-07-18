import { Router } from "express";
import Discipline from "../models/Discipline.js";
import Document from "../models/Document.js";
import University from "../models/University.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await Discipline.find().sort({ docCount: -1 }).lean();
    res.json({ count: results.length, results });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const discipline = await Discipline.findOne({ id: req.params.id }).lean();
    if (!discipline) return res.status(404).json({ error: "Discipline not found" });

    const documents = await Document.find({ disciplineId: discipline.id }).sort({ year: -1 }).lean();

    const topKeywords = [...new Set(documents.flatMap((d) => d.keywords || []))].slice(0, 12);

    const universityIds = [...new Set(documents.map((d) => d.universityId))].slice(0, 3);
    const universities = await University.find({ id: { $in: universityIds } }).lean();

    res.json({ ...discipline, documents, topKeywords, universities });
  } catch (err) {
    next(err);
  }
});

export default router;
