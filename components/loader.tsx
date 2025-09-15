// Loader.tsx
"use client";
import React, { useEffect, useState } from "react";

const loadingStates = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He makes soap" },
  { text: "We goto a bar" },
  { text: "Start a fight" },
  { text: "We like it" },
  { text: "Welcome to F**** C***" },
];

export default function Loader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingStates.length);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <p className="text-lg font-medium text-gray-800 animate-pulse">
        {loadingStates[index].text}
      </p>
    </div>
  );
}
