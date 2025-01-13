import axiosInstance from "./axiosInstance";

export async function generateNotesUrl(url, fileName, userId, isFile) {
  try {
    const response = await axiosInstance.post("api/generate-notes", {
      url,
      fileName,
      userId,
      isFile,
    });

    return response;
  } catch (error) {
    console.log("error generating notes", error);
  }
}
