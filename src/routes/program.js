import express from "express";
import Program from "../models/Program.js";

const router = express.Router();

// =========================
// GET ALL
// =========================
router.get("/", async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data" });
  }
});

// =========================
// GET DETAIL
// =========================
router.get("/:id", async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: "Program tidak ditemukan" });

    res.json(program);
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil detail program" });
  }
});

// =========================
// CREATE
// =========================
router.post("/", async (req, res) => {
  try {
    const { nama, deskripsi, gambar } = req.body;

    if (!nama || !deskripsi)
      return res.status(400).json({ error: "Nama & deskripsi wajib diisi" });

    const created = await Program.create({
      nama,
      deskripsi,
      gambar: gambar || ""
    });

    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Gagal membuat program" });
  }
});

// =========================
// UPDATE
// =========================
router.put("/:id", async (req, res) => {
  try {
    const { nama, deskripsi, gambar } = req.body;

    const updated = await Program.findByIdAndUpdate(
      req.params.id,
      {
        ...(nama && { nama }),
        ...(deskripsi && { deskripsi }),
        ...(gambar && { gambar })
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Program tidak ditemukan" });
    }

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Gagal mengupdate program" });
  }
});

// =========================
// DELETE
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ error: "Program tidak ditemukan" });

    res.json({ message: "Program berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: "Gagal menghapus program" });
  }
});

export default router;
