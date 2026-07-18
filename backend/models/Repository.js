import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    platform: {
      type: String,
      enum: ["oai-pmh", "dspace", "eprints", "ojs"],
      default: "oai-pmh",
    },
    baseUrl: { type: String, required: true },
    oaiEndpoint: { type: String, required: true },
    metadataPrefix: { type: String, default: "oai_dc" },
    setSpec: { type: String },
    status: {
      type: String,
      enum: ["active", "disabled", "error"],
      default: "active",
    },
    enabled: { type: Boolean, default: true },
    lastHarvestAt: { type: Date },
    lastSuccessAt: { type: Date },
    harvestIntervalHours: { type: Number, default: 24 },
    universityId: { type: String, index: true },
  },
  { timestamps: true }
);

export default mongoose.model("Repository", repositorySchema);
