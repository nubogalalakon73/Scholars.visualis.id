import { Router } from "express";
import { getCTA } from "../data/researchCTAs.js";

const router = Router();

// GET /api/cta/:variant  (s1 | s2 | s3 | aff)
router.get("/:variant", (req, res) => {
  const cta = getCTA(req.params.variant);
  if (!cta) return res.status(404).json({ error: "Unknown CTA variant" });
  res.json(cta);
});

export default router;
