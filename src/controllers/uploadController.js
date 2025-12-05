import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File tidak ditemukan" });
  }

  const url = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ url });
};
