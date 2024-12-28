"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { instructions } from "@/utils/content";
import { BrainCog, Sparkles } from "lucide-react";
import { useGenerateNotesUrl } from "@/hooks/useGenerateNotesUrl";

const Genearate = () => {
  const [loading, setloading] = useState(false);

  const { data: session } = useSession();

  console.log("/generate", session);

  const url =
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain";
  const fileName = "prototype chain";
  const userId = "676fb5c319ce629dcd174766";

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  async function handleGenerateNotes() {
    setloading(true);
    try {
      await useGenerateNotesUrl(url, fileName, userId);
    } catch (error) {
      console.log("error occured", error);
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between space-x-1 mt-4 mx-4">
          <div className="flex gap-2">
            <BrainCog className="w-6 h-6 text-purple-400" />
            <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
              How It Works
            </span>
          </div>

          <div>
            <button onClick={() => handleSignOut()} className="text-white">
              logout
            </button>
          </div>
        </div>

        <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400 flex items-center justify-center mt-12">
          Generate Notes in Seconds
        </p>

        <div className="flex justify-center mt-4 w-full">
          <button
            className="flex gap-2 items-center justify-center bg-gradient-to-r from-purple-500 to-violet-800 font-bold w-3/4 rounded-lg h-12"
            onClick={() => handleGenerateNotes()}
          >
            <Sparkles />
            {loading ? <span>Generating...</span> : <span>Generate Notes</span>}
          </button>
        </div>

        <p className="text-center mt-4 px-4 text-zinc-300 text-sm">
          Follow these simple steps to transform any webpage into
          well-structured notes
        </p>
        {/* INSTRUCTIONS DIV */}
        <div className="p-1 mt-4">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="border-[#321c43] border rounded-lg mb-2 mx-4 flex h-24"
            >
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center ml-5 mt-3">
                {instruction.icon}
              </div>
              <div className="mt-3 flex flex-col ml-10 items-start">
                <div className="font-semibold text-base text-gray-300">
                  {instruction.title}
                </div>
                <div className="text-sm text-zinc-400">
                  {instruction.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Genearate;
