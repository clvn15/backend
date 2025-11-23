import mongoose from "mongoose";

const BphSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    jabatan: { type: String, required: true },
    gambar: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("BPH", BphSchema);
