import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import programRoutes from "./routes/program.js";
import bphRoutes from "./routes/bph.js";
import uploadRoutes from "./routes/upload.js";
import galleryRoutes from "./routes/gallery.js"; // ← import route galeri

const app = express();

// Allow frontend (Next.js) access
app.use(cors());

// Allow JSON parsing
app.use(express.json());

// Static folder untuk gambar yang diupload
app.use("/uploads", express.static("uploads"));

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/program", programRoutes);
app.use("/api/bph", bphRoutes);
app.use("/api/upload", uploadRoutes);      // upload file (umum / galeri)
app.use("/api/gallery", galleryRoutes);    // CRUD Galeri

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Backend berjalan di http://localhost:${PORT}`)
);
