import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import documentsRouter from "./routes/documents.js";
import universitiesRouter from "./routes/universities.js";
import disciplinesRouter from "./routes/disciplines.js";
import ctaRouter from "./routes/cta.js";
import adminRouter from "./routes/admin.js";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/documents", documentsRouter);
app.use("/api/universities", universitiesRouter);
app.use("/api/disciplines", disciplinesRouter);
app.use("/api/cta", ctaRouter);
app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    console.error("Server will continue running; requests requiring DB will fail until MONGODB_URI is reachable.");
  }
  app.listen(PORT, () => {
    console.log(`Scholars.visualis.id API listening on port ${PORT}`);
  });
}

start();

export default app;
