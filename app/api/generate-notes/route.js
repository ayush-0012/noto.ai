import Notes from "@/models/notes.model";
import connectDB from "@/utils/db";
import cloudinary from "@/utils/cloudinary";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  await connectDB();
  try {
    const { url, fileName, userId } = await req.json();

    let notesContent;
    try {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
      if (!process.env.GOOGLE_API_KEY) {
        throw new Error("Google API key is not configured");
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate detailed and clean notes and make the headings bold for the following URL: ${url}`;
      const aiResponse = await model.generateContent(prompt);
      notesContent = aiResponse.response.text();

      if (!notesContent) {
        throw new Error("Failed to generate notes content");
      }

      notesContent = notesContent.replace(/[\*\#\-\_\=\+\~\!]/g, "");
    } catch (error) {
      console.error("AI content generation failed:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to generate notes content",
        }),
        { status: 500 }
      );
    }

    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9]/g, "_");
    let cloudinaryResponse;
    try {
      cloudinaryResponse = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${Buffer.from(notesContent).toString("base64")}`,
        {
          resource_type: "raw",
          format: "docx",
          folder: "notes",
          public_id: `${sanitizedFileName}_${Date.now()}`,
        }
      );
    } catch (uploadError) {
      console.error("Cloudinary upload failed:", uploadError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to upload the file to Cloudinary",
        }),
        { status: 500 }
      );
    }
    // 5. Save to Database
    try {
      const newNote = await Notes.create({
        title: fileName,
        fileUrl: cloudinaryResponse.secure_url,
        user: userId,
      });

      return new Response(
        JSON.stringify({
          success: true,
          note: newNote,
        }),
        { status: 200 }
      );
    } catch (dbSaveError) {
      // If database save fails, attempt to delete the uploaded file from Cloudinary
      try {
        await cloudinary.uploader.destroy(cloudinaryResponse.public_id);
      } catch (cleanupError) {
        console.error("Failed to cleanup Cloudinary file:", cleanupError);
      }

      throw dbSaveError;
    }
  } catch (error) {
    console.error("Error in notes generation process:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Internal server error",
      }),
      { status: 500 }
    );
  }
}
