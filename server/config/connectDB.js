import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const uri = process.env.URI;
export async function connect() {
  try {
    await mongoose.connect(uri);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
