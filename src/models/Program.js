import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true },
    deskripsi: { type: String, required: true },
    gambar: { type: String, default: "" },
    tanggal: { type: Date, default: null }
  },
  { timestamps: true }
);

export default mongoose.models.Program ||
  mongoose.model("Program", ProgramSchema);
