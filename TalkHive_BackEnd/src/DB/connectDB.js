import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB_connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected to ${DB_connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
