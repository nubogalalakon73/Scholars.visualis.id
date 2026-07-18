import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    abbr: { type: String, required: true },
    province: { type: String },
    indexedDocs: { type: Number, default: 0 },
    status: { type: String, default: "Dalam Proses" },
    topFaculties: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
