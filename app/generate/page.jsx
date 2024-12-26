"use client";

import { BrainCog, Chrome, MousePointer2, Sparkles } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const instructions = [
  {
    icon: <Chrome className="w-4 h-4 text-purple-400" />,
    title: "Navigate to Any Webpage",
    description: "Go to the website or article you want to take notes from",
  },
  {
    icon: <MousePointer2 className="w-4 h-4 text-purple-400" />,
    title: "Click the Extension Icon",
    description:
      "Find and click the AI Notes Assistant icon in your browser toolbar",
  },
  {
    icon: <Sparkles className="w-4 h-4 text-purple-400" />,
    title: "Generate Notes",
    description:
      "Click 'Generate' and watch as AI transforms the content into well-structured notes",
  },
];

const Genearate = () => {
  const [loading, setloading] = useState(false);

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
    localStorage.removeItem("userId");
  }

  return (
    <>
      <div>
        <div className="flex items-center space-x-1 mt-4 ml-4">
          <BrainCog className="w-6 h-6 text-purple-400" />
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
            How It Works
          </span>
        </div>

        <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400 flex items-center justify-center mt-12">
          Generate Notes in Seconds
        </p>

        <div className="flex justify-center mt-4 w-full">
          <button className="flex gap-2 items-center justify-center bg-gradient-to-r from-purple-500 to-violet-800 font-bold w-3/4 rounded-lg h-12">
            <Sparkles />
            {loading ? <span>Generating...</span> : <span>Generate Notes</span>}
          </button>
        </div>

        <p className="text-center mt-4 px-4 text-zinc-300 text-sm">
          Follow these simple steps to transform any webpage into
          well-structured notes
        </p>

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
                <div className="font-semibold text-base">
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
