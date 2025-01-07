"use client";

import { useRouter } from "next/navigation";
import { BrainCog, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [allNotes, setAllNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/generate-notes"
        );

        console.log(response);
        setAllNotes(response);
      } catch (error) {
        console.log("error fetching all notes", error);
      }
    };
  }, []);

  return (
    <>
      <header className=" flex items-center justify-between space-x-1 mt-4  border-b border-[#321c43]  pb-3 px-4">
        <div className="flex gap-2 ">
          <BrainCog className="w-6 h-6 text-purple-400" />
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
            Your profile
          </span>
        </div>

        <div>
          <button
            className="text-white flex items-center justify-center hover:bg-[#321c43]/20 w-32 h-12 rounded-lg "
            onClick={() => router.push("/")}
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
    </>
  );
};

export default Profile;
