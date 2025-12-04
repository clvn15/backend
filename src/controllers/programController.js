import Program from "../models/Program.js";


export const createProgram = async (req, res) => {
  try {
    const program = await Program.create(req.body);
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json(programs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ error: "Program tidak ditemukan" });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(program);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteProgram = async (req, res) => {
  try {
    await Program.findByIdAndDelete(req.params.id);
    res.json({ message: "Program berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
