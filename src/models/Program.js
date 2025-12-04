import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    nama: String,
    deskripsi: String,
    gambar: String,
  },
  { timestamps: true }
);

export default mongoose.models.Program || mongoose.model("Program", ProgramSchema);
