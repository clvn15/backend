import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", getAllGallery);
router.get("/:id", getGalleryById);
router.post("/", upload.single("file"), createGallery);
router.put("/:id", upload.single("file"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;
