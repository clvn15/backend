import Gallery from "../models/Gallery.js";
import fs from "fs";
import path from "path";

// GET all gallery
export const getAllGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data gallery" });
  }
};

// GET single gallery by ID
export const getGalleryById = async (req, res) => {
  try {
    const data = await Gallery.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

// CREATE gallery
export const createGallery = async (req, res) => {
  try {
    const { title } = req.body;
    const url = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    if (!title || !url) return res.status(400).json({ error: "Title dan file wajib diisi" });

    const created = await Gallery.create({ title, url });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Gagal menambah gallery" });
  }
};

// UPDATE gallery
export const updateGallery = async (req, res) => {
  try {
    const { title } = req.body;
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Data tidak ditemukan" });

    if (title) gallery.title = title;
    if (req.file) {
      // Hapus file lama
      if (gallery.url) {
        const oldPath = path.join("uploads", path.basename(gallery.url));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      gallery.url = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await gallery.save();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: "Gagal update gallery" });
  }
};

// DELETE gallery
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Data tidak ditemukan" });

    // Hapus file fisik
    if (gallery.url) {
      const filePath = path.join("uploads", path.basename(gallery.url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    // Hapus record MongoDB
    await Gallery.deleteOne({ _id: req.params.id });

    res.json({ message: "Gallery berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal hapus gallery" });
  }
};
