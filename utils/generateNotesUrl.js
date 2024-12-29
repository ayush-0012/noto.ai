import axios from "axios";

export async function useGenerateNotesUrl(url, fileName, userId) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/generate-notes",
      {
        url,
        fileName,
        userId,
      }
    );

    console.log(response);
  } catch (error) {
    console.log("error generating notes", error);
  }
}
