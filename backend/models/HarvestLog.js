import mongoose from "mongoose";

const harvestLogSchema = new mongoose.Schema(
  {
    repositoryId: { type: String, required: true, index: true },
    repositoryName: { type: String },
    startedAt: { type: Date, default: Date.now },
    finishedAt: { type: Date },
    durationMs: { type: Number },
    mode: {
      type: String,
      enum: ["manual", "full", "incremental"],
      default: "manual",
    },
    totalRecords: { type: Number, default: 0 },
    imported: { type: Number, default: 0 },
    updated: { type: Number, default: 0 },
    skipped: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    errors: [
      {
        message: { type: String },
        identifier: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["running", "success", "partial", "failed"],
      default: "running",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HarvestLog", harvestLogSchema);
