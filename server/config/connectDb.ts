import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "server/config/config.env",
});

const URI = process.env.MONGO ?? "";

mongoose.set('strictQuery', false);
 
export const connectDb = () => {
  try {
    mongoose.connect(URI);
    console.log("connection to database is sucessful!");
  } catch (err) {
    console.log("Data base connection failed");
  }
  return {}
};
