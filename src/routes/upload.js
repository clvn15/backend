import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// simpan file ke folder /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// route upload
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    url: `http://localhost:5000/uploads/${req.file.filename}`,
  });
});

export default router;
