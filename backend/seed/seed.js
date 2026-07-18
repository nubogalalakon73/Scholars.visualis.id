import "dotenv/config";
import { connectDB } from "../config/db.js";
import Document from "../models/Document.js";
import University from "../models/University.js";
import Discipline from "../models/Discipline.js";
import { documents, universities, disciplines } from "./seedData.js";
import mongoose from "mongoose";

async function run() {
  await connectDB(process.env.MONGODB_URI);
  console.log("Connected. Seeding database...");

  await Promise.all([
    Document.deleteMany({}),
    University.deleteMany({}),
    Discipline.deleteMany({}),
  ]);

  await Document.insertMany(documents);
  await University.insertMany(universities);
  await Discipline.insertMany(disciplines);

  console.log(`Seeded ${documents.length} documents, ${universities.length} universities, ${disciplines.length} disciplines.`);

  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
