import express from "express";
import {
  getAllBph,
  getBphById,
  createBph,
  updateBph,
  deleteBph
} from "../controllers/bphController.js";

const router = express.Router();

router.get("/", getAllBph);
router.get("/:id", getBphById);

router.post("/", createBph);
router.put("/:id", updateBph);
router.delete("/:id", deleteBph);

export default router;
