import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import programRoutes from "./routes/program.js";
import bphRoutes from "./routes/bph.js";
import uploadRoutes from "./routes/upload.js";
import galleryRoutes from "./routes/gallery.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/program", programRoutes);
app.use("/api/bph", bphRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend berjalan di http://localhost:${PORT}`)
);
