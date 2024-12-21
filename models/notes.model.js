import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: false,
    },
    content: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);

export default Notes;
