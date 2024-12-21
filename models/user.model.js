import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Emai is required"],
  },

  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"],
  },
  profilePic: {
    type: String,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
  generateHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notes",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
