import React, { useContext, useState } from "react";
import { notesLinkContext } from "../Context/NotesLinkProvider";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import { generateNotesUrl } from "@/utils/generateNotesUrl";

const TopicNameModal = ({
  onCancel,
  setLoading,
  setGeneratingError,
  setTopicModal,
}) => {
  const { notesLink, setNotesLink } = useContext(notesLinkContext);
  const [notesTopic, setNotesTopic] = useState("");

  const { data: session } = useSession();
  const url =
    "https://medium.com/@techsuneel99/node-js-caching-and-database-optimization-for-high-performance-apis-219f5280923b";
  const userId = session?.user?.id;
  console.log(userId);

  const handleGenerate = async () => {
    setLoading(true);
    setTopicModal(false);
    try {
      const response = await generateNotesUrl(url, notesTopic, userId, false);
      const generatedUrl = response.data.note.fileUrl;
      setNotesLink(generatedUrl);
    } catch (error) {
      setGeneratingError(true);
      console.log("error generating notes", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col fixed inset-0 bg-black bg-opacity-90 z-40 items-center justify-center w-full min-h-screen">
      <div className="border-[#321c43] bg-[#0f0e13] border-2 rounded-lg p-6 w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Enter Topic Name</h3>
          <X
            className="w-5 h-5 text-gray-400 cursor-pointer"
            onClick={onCancel}
          />
        </div>

        <div className="space-y-4">
          <p className="text-sm text-zinc-400">
            Please enter topic name for your notes
          </p>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Topic Name
            </label>
            <input
              type="text"
              value={notesTopic}
              onChange={(e) => setNotesTopic(e.target.value)}
              placeholder="Enter your topic name"
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
              onClick={handleGenerate}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicNameModal;
