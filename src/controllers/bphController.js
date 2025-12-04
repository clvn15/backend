import Bph from "../models/Bph.js";

export const createBph = async (req, res) => {
  try {
    const bph = await Bph.create(req.body);
    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBph = async (req, res) => {   // ← FIX DI SINI
  try {
    const bph = await Bph.find().sort({ createdAt: -1 });
    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBphById = async (req, res) => {
  try {
    const bph = await Bph.findById(req.params.id);
    if (!bph) return res.status(404).json({ error: "Data BPH tidak ditemukan" });
    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBph = async (req, res) => {
  try {
    const bph = await Bph.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBph = async (req, res) => {
  try {
    await Bph.findByIdAndDelete(req.params.id);
    res.json({ message: "Data BPH berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
