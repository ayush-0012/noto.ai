import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: false,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFile: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.models.Notes || mongoose.model("Notes", notesSchema);

export default Notes;
