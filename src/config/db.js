import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      dbName: process.env.DB_NAME,
    });

    console.log("MongoDB Connected to Atlas 🚀");
  } catch (err) {
    console.error("MongoDB Connection Error ❌", err);
    process.exit(1);
  }
}

export default connectDB;
