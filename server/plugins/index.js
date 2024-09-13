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
    serverSelectionTimeoutMS: 30000, // 30 секунд
    socketTimeoutMS: 30000, // 45 секунд
    connectTimeoutMS: 30000, // Тайм-аут для підключення
    minPoolSize: 10,
    maxPoolSize: 30,
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
  }, 1000 * 60 * 2);

}


async function connectToDatabase() {
  try {
    await mongoose.connect(URI, options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB, retrying in 5 seconds', error);
    setTimeout(connectToDatabase, 5000);
  }
}

  export default defineNitroPlugin(async (nitroApp) => {

    try {
      await mongoose_runner();
      console.log("DB connection established.");
      ping()
      console.log("Ping is on.");
  
   
    } catch (err) {
      console.log(err)
      console.error("DB connection failed.", err);
      try {
        await mongoose_runner();
        console.log("DB connection established.");
  
      } catch (e) {
        console.log(e)
        console.error('Not stable', e)
      }
    }
  })
 