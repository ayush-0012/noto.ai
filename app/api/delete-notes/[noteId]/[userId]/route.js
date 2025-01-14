import { cors } from "@/middleware/cors";
import Notes from "@/models/notes.model";
import User from "@/models/user.model";
import connectDB from "@/utils/db";

export const DELETE = cors(async (req, { params }) => {
  try {
    const { noteId, userId } = await params;
    await connectDB();

    const note = await Notes.findById(noteId);
    const user = await User.findById(userId);

    if (!note) {
      return new Response(
        JSON.stringify({ error: "no note found" }, { status: 404 })
      );
    }

    if (!user) {
      return new Response(
        JSON.stringify({ error: "no user found" }, { status: 404 })
      );
    }

    //deletes note using the instance, preventing addtional db call
    await note.deleteOne();

    //using user instance to delete the note
    user.generateHistory = user.generateHistory.filter(
      (history) => history.fileId !== noteId
    );
    await user.save(); //saving changes

    return new Response(
      JSON.stringify({ message: "Note deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Note deleted successfully" }),
      { status: 200 }
    );
  }
});
