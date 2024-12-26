"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { BrainCog, Github, Sparkles, ArrowRight } from "lucide-react";

const features = [
  {
    logo: <BrainCog className="w-7 h-7 text-purple-400" />,
    title: "AI-Powered Notes",
    description: "Generates well-structured noted from any url",
  },
  {
    logo: <Sparkles className="w-7 h-7 text-purple-400" />,
    title: "Smart Formatting",
    description: "Automatically formats and organize your content",
  },

  {
    logo: <ArrowRight className="w-7 h-7 text-purple-400" />,
    title: "Quick Generation",
    description: "Transform your important stuff into notes in seconds",
  },
];

const Home = () => {
  const [loading, setloading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      window.locate.href = "/generate";
    }
  }, [session]);

  function handleSignIn() {
    signIn("google", { callbackUrl: "/generate" });
    setloading(true);
  }

  return (
    <>
      <div className="w-[440px] h-full mx-auto flex flex-col justify-center items-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center mt-3">
          <BrainCog className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400 text-center mt-2">
            AI Notes Assistant
          </h1>
          <p className="text-md bg-clip-text text-transparent text-zinc-400 max-w-xs mx-auto text-center mt-2">
            Transform your note-taking experience with AI-powered organization,
            summarization and insights
          </p>
        </div>

        <div className="bg-[#0f0e13] w-full h-full p-3 rounded-md border-[#1d0f29] mt-4">
          <button
            className="flex bg-[#27272a] hover:bg-[#353538] w-full h-9 items-center justify-center rounded-lg"
            onClick={() => handleSignIn()}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p className="font-sans ml-3 text-white">Continue with Google</p>
            )}
          </button>

          {/* <button className=" bg-[#27272a] flex w-full h-9 items-center justify-center mt-3 rounded-lg border border-[#321c43] hover:bg-[#353538]">
            <Github className="text-white w-5 h-5" />
            <p className="font-sans text-white ml-4">Continue with GitHub</p>
          </button> */}
          <p className="text-[#66666e] text-center text-sm mt-2">
            By continuing, you agree to our{" "}
            <span className="text-[#6770c7] hover:underline">Terms</span> and{" "}
            <span className="text-[#6770c7] hover:underline">Privacy</span>
          </p>
        </div>

        <div className="grid w-full mt-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full h-28 border rounded-lg flex items-center justify-center mb-3 border-[#321c43] bg-[#0f0e13]"
            >
              <div className="w-16">{feature.logo}</div>
              <div>
                <div className="text-white font-bold text-center">
                  {feature.title}
                </div>
                <div className="text-zinc-500 w-60 text-center text-sm">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
