import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
const URI = useRuntimeConfig().mongoUrl;
const mongoose_runner = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const options = {
    serverSelectionTimeoutMS: 5000, // 30 секунд
    socketTimeoutMS: 5000, // 45 секунд
    minPoolSize: 5,
    maxPoolSize: 10,
  }

  cached.promise = mongoose.connect(URI, options).then(connection => connection);
  cached.connection = await cached.promise;
}

const ping = () => {
  setInterval(async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.db.admin().ping();
        console.log('db pinged successfully')
      } else {
        console.warn('DB connection was lost');
        console.log('DB connection trying to establish new connection');
        await mongoose_runner();
      }
    } catch (e) {
      console.warn(e);
      try {
        console.log('Retrying to establish connection')
        await mongoose_runner();
      } catch (e) {
        console.warn('Failed')
      }
    } 
  }, 1000 * 60 * 5);

}
export default async () => {

  try {
    await mongoose_runner();
    console.log("DB connection established.");
    ping()
    console.log("Ping is on.");


  } catch (err) {
    console.error("DB connection failed.", err);
    try {
      await mongoose_runner();
      console.log("DB connection established.");

    } catch (e) {
      console.error('Not stable')
    }
  }
};