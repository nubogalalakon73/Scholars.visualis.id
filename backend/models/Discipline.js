import mongoose from "mongoose";

const disciplineSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    mono: { type: String, required: true },
    docCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Discipline", disciplineSchema);
