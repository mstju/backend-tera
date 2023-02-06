import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.URI;

const connectToDatabase = async () => {
  if (!global.mongoose) {
    mongoose.set("strictQuery", false);
    global.mongoose = await mongoose.connect(URI);
  }
};

export default connectToDatabase;
