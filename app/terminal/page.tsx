import Terminal from "@/components/Terminal";
import React from "react";

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
