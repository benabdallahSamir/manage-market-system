import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connect successfuly");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
