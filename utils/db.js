import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbname: "NotoAi",
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("connected to database");
  } catch (error) {
    console.log("db connection failed", error);
  }
};

export default connectDB;
