import Gallery from "../models/Gallery.js";
import fs from "fs";
import path from "path";

export const getAllGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data gallery" });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const data = await Gallery.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
};

export const createGallery = async (req, res) => {
  try {
    const { title, url } = req.body;
    let imageUrl = url;

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

export const updateGallery = async (req, res) => {
  try {
    const { title, url } = req.body;
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) return res.status(404).json({ error: "Data tidak ditemukan" });

    if (title) gallery.title = title;

    if (req.file) {
      const oldPath = path.join("uploads", path.basename(gallery.url));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      gallery.url = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    if (url && !req.file) {
      gallery.url = url;
    }

    await gallery.save();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: "Gagal update gallery" });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) return res.status(404).json({ error: "Data tidak ditemukan" });

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
