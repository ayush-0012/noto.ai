import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbname: "noto.ai",
    });
    console.log("connected to database");
  } catch (error) {
    console.log("db connection failed", error);
  }
};

connectDB();
