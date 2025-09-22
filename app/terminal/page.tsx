import Terminal from "@/components/Terminal";
import type { Metadata } from "next";
import React from "react";
const meta = {
  title: "Terminal - Subhadeep Paul",
  description:
    "Interactive terminal interface to explore the portfolio of Subhadeep Paul, Senior Software Engineer and AI Expert.",
};
export const metadata: Metadata = meta;
const TerminalPage = () => {
  return (
    <div className="min-h-screen grid place-items-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl">
        <Terminal />
      </div>
    </div>
  );
};

export default TerminalPage;
