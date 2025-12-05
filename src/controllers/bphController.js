import Bph from "../models/Bph.js";
import mongoose from "mongoose";

export const createBph = async (req, res) => {
  try {
    const bph = await Bph.create(req.body);
    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBph = async (req, res) => {
  try {
    const bph = await Bph.find().sort({ createdAt: -1 });
    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBphById = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.replace(/"/g, "").trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID tidak valid" });
    }

    const bph = await Bph.findById(id);
    if (!bph) return res.status(404).json({ error: "Data BPH tidak ditemukan" });

    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBph = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.replace(/"/g, "").trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID tidak valid" });
    }

    const bph = await Bph.findByIdAndUpdate(id, req.body, { new: true });
    if (!bph) return res.status(404).json({ error: "Data BPH tidak ditemukan" });

    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBph = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.replace(/"/g, "").trim();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID tidak valid" });
    }

    const bph = await Bph.findByIdAndDelete(id);
    if (!bph) return res.status(404).json({ error: "Data BPH tidak ditemukan" });

    res.json({ message: "Data BPH berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
