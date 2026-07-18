import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: { type: [String], default: [] },
    universityId: { type: String, required: true, index: true },
    university: { type: String, required: true },
    faculty: { type: String },
    program: { type: String },
    degree: { type: String, enum: ["S1", "S2", "S3"] },
    year: { type: Number, index: true },
    language: { type: String, index: true },
    repository: { type: String },
    disciplineId: { type: String, index: true },
    keywords: { type: [String], default: [] },
    abstract: { type: String },
    doi: { type: String },
    sourceRepositoryId: { type: String, index: true },
    sourceIdentifier: { type: String },
    harvestedAt: { type: Date },
    pdfUrl: { type: String },
    repositoryUrl: { type: String },
  },
  { timestamps: true }
);

documentSchema.index(
  { title: "text", authors: "text", keywords: "text", university: "text" },
  { language_override: "textIndexLanguage" }
);

documentSchema.index(
  { sourceIdentifier: 1 },
  { unique: true, sparse: true }
);

export default mongoose.model("Document", documentSchema);
