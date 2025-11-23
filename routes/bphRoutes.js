import { Router } from "express";
import {
  createBph,
  getAllBph,
  getBphById,
  updateBph,
  deleteBph,
} from "../controllers/bph.controller.js";

const router = Router();

// CREATE
router.post("/", createBph);

// READ ALL
router.get("/", getAllBph);

// READ ONE (for edit)
router.get("/:id", getBphById);

// UPDATE
router.put("/:id", updateBph);

// DELETE
router.delete("/:id", deleteBph);

export default router;
