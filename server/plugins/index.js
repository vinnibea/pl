import mongoose from "mongoose";

export default async () => {
  const URI = useRuntimeConfig().mongoUrl;
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 10000, // Таймаут вибору сервера 5 секунд
      minPoolSize: 5,
      maxPoolSize: 10,
    });
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};