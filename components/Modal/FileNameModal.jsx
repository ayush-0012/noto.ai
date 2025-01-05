"use client";

import { generateNotesUrl } from "@/utils/generateNotesUrl";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { fileLinkContext } from "../Context/FileLinkProvider";
import { useSession } from "next-auth/react";

const FileNameModal = ({
  onCancel,
  setLoading,
  setFileNameModal,
  setConfirmationModal,
}) => {
  const [fileName, setFileName] = useState("");
  const { fileLink, setFileLink } = useContext(fileLinkContext);
  const { data: session } = useSession();

  const url =
    "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting";

  const userId = session?.user?.id;

  async function handleFileName() {
    setFileNameModal(false);
    setLoading(true);
    setConfirmationModal(false);

    try {
      const response = await generateNotesUrl(url, fileName, userId, true);
      const generatedUrl = response.data.note.fileUrl;
      setFileLink(generatedUrl);
    } catch (error) {
      console.log("error generating notes", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col fixed inset-0 bg-black bg-opacity-90 z-40 items-center justify-center w-full min-h-screen">
      <div className="border-[#321c43] bg-[#0f0e13] border-2 rounded-lg p-6 w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Enter File Name</h3>
          <X
            className="w-5 h-5 text-gray-400 cursor-pointer"
            onClick={onCancel}
          />
        </div>

        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Please enter a name for your notes file
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name"
              className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#321c43] rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm border border-[#321c43] rounded-lg hover:bg-[#321c43]/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-gradient-to-r from-purple-700 to-violet-800 rounded-lg"
              onClick={handleFileName}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileNameModal;
