import axios from "axios";

export async function generateNotesUrl(url, fileName, userId, isFile) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/generate-notes",
      {
        url,
        fileName,
        userId,
        isFile,
      }
    );

    return response;
  } catch (error) {
    console.log("error generating notes", error);
  }
}
