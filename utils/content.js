import {
  Chrome,
  MousePointer2,
  Sparkles,
  BrainCog,
  ArrowRight,
} from "lucide-react";

export const instructions = [
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

export const features = [
  {
    logo: <BrainCog className="w-5 h-5 text-purple-400" />,
    title: "AI-Powered Notes",
    description: "Generates well-structured noted from any url",
  },
  {
    logo: <Sparkles className="w-5 h-5 text-purple-400" />,
    title: "Smart Formatting",
    description: "Automatically formats and organize your content",
  },

  {
    logo: <ArrowRight className="w-5 h-5 text-purple-400" />,
    title: "Quick Generation",
    description: "Transform your important stuff into notes in seconds",
  },
];
