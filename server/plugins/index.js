import mongoose from "mongoose";

export default async () => {
  const URI = useRuntimeConfig().mongoUrl;
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 10000,
      minPoolSize: 14,
      maxPoolSize: 50,
    });
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};