import Gallery from "../models/Gallery.js";

// GET all gallery
export const getAllGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET gallery by ID
export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Gallery tidak ditemukan" });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new gallery
export const createGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create(req.body);
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE gallery
export const updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE gallery
export const deleteGallery = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
    