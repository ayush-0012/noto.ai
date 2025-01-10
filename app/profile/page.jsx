"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Loader from "@/components/Loader";

const Profile = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  const router = useRouter();
  const { data: session } = useSession();

  console.log(session?.user?.id);

  const userId = "6780232158c5fc910bdda18b"; //get it from session later

  useEffect(() => {
    const fetchAllNotes = async () => {
      setNotesLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );

        console.log(response.data.user);
        setAllNotes(response.data.user);
      } catch (error) {
        console.log("error fetching all notes", error);
      } finally {
        setNotesLoading(false);
      }
    };

    fetchAllNotes();
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleDeleteNotes = async (noteId) => {
    setDeleteLoading((prevValue) => ({ ...prevValue, [noteId]: true }));
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/delete-notes/${noteId}/${userId}`
      );
      console.log(response);
      if (response.status === 200) {
        // removing the deleted note from the state
        setAllNotes((prevNotes) =>
          prevNotes.filter((note) => note.fileId !== noteId)
        );
      }
    } catch (error) {
      console.log("error occured while deleting the note", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <header className=" flex items-center justify-between space-x-1 mt-4  border-b border-[#321c43]  pb-3 px-4">
        <div className="flex gap-2 items-center">
          <ArrowLeft
            className="w-6 h-6 text-purple-400 cursor-pointer"
            onClick={() => router.push("/generate")}
          />
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
            Your profile
          </span>
        </div>

        <div>
          <button
            className="text-white flex items-center justify-center hover:bg-[#321c43]/20 w-32 h-12 rounded-lg "
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 text-gray-300" />
            <span className=" ml-4 font-semibold text-md text-gray-300">
              Logout
            </span>
          </button>
        </div>
      </header>
      <div className="flex justify-between px-4 mt-4">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
          Your Notes
        </h2>
      </div>

      {/* added a loader before rendering the notes */}
      {notesLoading && <Loader />}

      {/* rendering all the notes */}
      {!allNotes || allNotes.length === 0 ? (
        <p className="text-gray-400 text-2xl text-center mt-24 font-bold">
          Not notes yet
        </p>
      ) : (
        allNotes
          .slice()
          .reverse()
          .map((note, index) => (
            <div
              key={index}
              className="hover:border hover:border-[#321c43] p-3 mx-5 mt-4 rounded-lg bg-[#1a1a1a] cursor-pointer"
            >
              <div className=" p-3">
                <p className="text-xl text-gray-200 font-semibold mb-3">
                  {note.fileName}
                </p>
                <div className="flex justify-between">
                  <div className=" text-purple-300  hover:underline hover:underline-offset-1">
                    <Link href={note.fileUrl} target="_blank">
                      view notes
                    </Link>
                  </div>
                  {deleteLoading[note.fileId] ? (
                    <span className="text-red-500">deleting...</span>
                  ) : (
                    <button
                      className="text-red-500 hover:border rounded-full border-red-500 hover:bg-red-300"
                      onClick={() => handleDeleteNotes(note.fileId)}
                    >
                      <Trash2 className="w-5 h-5 m-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
      )}
    </>
  );
};

export default Profile;
