import { MotionGlobalConfig } from "framer-motion";
import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);
