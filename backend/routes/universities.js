import { Router } from "express";
import University from "../models/University.js";
import Document from "../models/Document.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await University.find().sort({ indexedDocs: -1 }).lean();
    res.json({ count: results.length, results });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const uni = await University.findOne({ id: req.params.id }).lean();
    if (!uni) return res.status(404).json({ error: "University not found" });
    const documents = await Document.find({ universityId: uni.id }).sort({ year: -1 }).lean();
    res.json({ ...uni, documents });
  } catch (err) {
    next(err);
  }
});

export default router;
