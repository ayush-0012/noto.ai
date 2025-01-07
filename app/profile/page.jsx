"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";

const Profile = () => {
  const [allNotes, setAllNotes] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  const userId = "677d5437c809a71dd0857a86"; //get it from session later

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`
        );

        console.log(response.data.user);
        setAllNotes(response.data.user);
      } catch (error) {
        console.log("error fetching all notes", error);
      }
    };

    fetchAllNotes();
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
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

      {allNotes.map((note, index) => (
        <div
          key={index}
          className="hover:border hover:border-[#321c43] p-3 mx-5 mt-4 rounded-lg bg-[#1a1a1a] cursor-pointer"
        >
          <div className=" p-3">
            <p className="text-xl font-semibold mb-3">{note.fileName}</p>
            <div className="flex justify-between">
              <div className=" text-purple-400  hover:underline hover:underline-offset-1">
                view notes
              </div>
              <button className="text-red-400 hover:border rounded-full border-red-400">
                <Trash2 className="w-5 h-5 " />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Profile;
