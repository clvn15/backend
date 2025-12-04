import express from "express";
import {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getAllGallery);
router.get("/:id", getGalleryById);
router.post("/", createGallery);
router.put("/:id", updateGallery);
router.delete("/:id", deleteGallery);

export default router;
