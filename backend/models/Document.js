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
    degree: { type: String, enum: ["S1", "S2", "S3"], required: true, index: true },
    year: { type: Number, index: true },
    language: { type: String, index: true },
    repository: { type: String },
    disciplineId: { type: String, required: true, index: true },
    keywords: { type: [String], default: [] },
    abstract: { type: String },
    doi: { type: String },
  },
  { timestamps: true }
);

documentSchema.index({ title: "text", authors: "text", keywords: "text", university: "text" });

export default mongoose.model("Document", documentSchema);
