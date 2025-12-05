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
    const { title, url } = req.body;
    let imageUrl = url; // kalau kirim URL lewat body

    // kalau upload file, pakai file upload
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    if (!title || !imageUrl) {
      return res.status(400).json({ error: "Title dan file/url wajib diisi" });
    }

    const created = await Gallery.create({ title, url: imageUrl });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Gagal menambah gallery" });
  }
};

// UPDATE gallery
export const updateGallery = async (req, res) => {
  try {
    const { title, url } = req.body;
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Data tidak ditemukan" });

    if (title) gallery.title = title;

    // kalau ada file upload → ganti file lama
    if (req.file) {
      const oldPath = path.join("uploads", path.basename(gallery.url));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      gallery.url = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // kalau update pakai URL manual → ganti URL
    if (url && !req.file) {
      gallery.url = url;
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

    // hapus gambar fisik
    if (gallery.url) {
      const filePath = path.join("uploads", path.basename(gallery.url));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Gallery.deleteOne({ _id: req.params.id });
    res.json({ message: "Gallery berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal hapus gallery" });
  }
};
