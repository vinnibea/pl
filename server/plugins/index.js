import mongoose from "mongoose";

export default async () => {
  const URI = useRuntimeConfig().mongoUrl; 
  try {
    await mongoose.connect(URI);
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};