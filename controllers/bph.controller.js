import BPH from "../models/Bph.js";

// ========================
// CREATE
// ========================
export const createBph = async (req, res) => {
  try {
    const bph = await BPH.create(req.body);
    res.status(201).json(bph);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// READ ALL
// ========================
export const getAllBph = async (req, res) => {
  try {
    const data = await BPH.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// READ ONE
// ========================
export const getBphById = async (req, res) => {
  try {
    const data = await BPH.findById(req.params.id);
    if (!data) return res.status(404).json({ msg: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// UPDATE
// ========================
export const updateBph = async (req, res) => {
  try {
    const data = await BPH.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) return res.status(404).json({ msg: "Not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// DELETE
// ========================
export const deleteBph = async (req, res) => {
  try {
    const data = await BPH.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
