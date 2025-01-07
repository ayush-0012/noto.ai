import mongoose from "mongoose";
import { stringify } from "querystring";

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

  generateHistory: [
    {
      fileUrl: {
        type: String,
        required: true,
      },
      fileId: {
        type: String,
        required: true,
      },
      fileName: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
