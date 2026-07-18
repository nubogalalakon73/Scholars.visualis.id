import { Router } from "express";
import Document from "../models/Document.js";

const router = Router();

// GET /api/documents?q=&degree=&universityId=&disciplineId=&language=&sort=
router.get("/", async (req, res, next) => {
  try {
    const { q, degree, universityId, disciplineId, language, sort } = req.query;
    const filter = {};

    if (degree) {
      const degrees = String(degree).split(",").filter(Boolean);
      if (degrees.length) filter.degree = { $in: degrees };
    }
    if (universityId) {
      const ids = String(universityId).split(",").filter(Boolean);
      if (ids.length) filter.universityId = { $in: ids };
    }
    if (disciplineId) filter.disciplineId = disciplineId;
    if (language) filter.language = language;

    if (q && String(q).trim()) {
      const words = String(q)
        .trim()
        .split(/\s+/)
        .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .filter(Boolean);
      const pattern = words.join("|");
      const regex = new RegExp(pattern, "i");
      filter.$or = [
        { title: regex },
        { authors: regex },
        { keywords: regex },
        { university: regex },
      ];
    }

    let sortSpec = {};
    switch (sort) {
      case "newest":
        sortSpec = { year: -1 };
        break;
      case "oldest":
        sortSpec = { year: 1 };
        break;
      case "relevance":
      default:
        sortSpec = { year: -1 };
        break;
    }

    const results = await Document.find(filter).sort(sortSpec).lean();
    res.json({ count: results.length, results });
  } catch (err) {
    next(err);
  }
});

// GET /api/documents/:id
router.get("/:id", async (req, res, next) => {
  try {
    const doc = await Document.findOne({ id: req.params.id }).lean();
    if (!doc) return res.status(404).json({ error: "Document not found" });

    const related = await Document.find({
      id: { $ne: doc.id },
      $or: [{ disciplineId: doc.disciplineId }, { universityId: doc.universityId }],
    })
      .limit(3)
      .lean();

    res.json({ ...doc, related });
  } catch (err) {
    next(err);
  }
});

export default router;
