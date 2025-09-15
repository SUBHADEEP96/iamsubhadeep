// "use client";
// import { cn } from "@/lib/utils";
// import { AnimatePresence, motion } from "motion/react";
// import { useState, useEffect } from "react";

// const CheckIcon = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className={cn("w-6 h-6 ", className)}
//     >
//       <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//     </svg>
//   );
// };

// const CheckFilled = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className={cn("w-6 h-6 ", className)}
//     >
//       <path
//         fillRule="evenodd"
//         d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// };

// type LoadingState = {
//   text: string;
// };

// const LoaderCore = ({
//   loadingStates,
//   value = 0,
// }: {
//   loadingStates: LoadingState[];
//   value?: number;
// }) => {
//   return (
//     <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
//       {loadingStates.map((loadingState, index) => {
//         const distance = Math.abs(index - value);
//         const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.

//         return (
//           <motion.div
//             key={index}
//             className={cn("text-left flex gap-2 mb-4")}
//             initial={{ opacity: 0, y: -(value * 40) }}
//             animate={{ opacity: opacity, y: -(value * 40) }}
//             transition={{ duration: 0.5 }}
//           >
//             <div>
//               {index > value && (
//                 <CheckIcon className="text-black dark:text-white" />
//               )}
//               {index <= value && (
//                 <CheckFilled
//                   className={cn(
//                     "text-black dark:text-white",
//                     value === index &&
//                       "text-black dark:text-lime-500 opacity-100"
//                   )}
//                 />
//               )}
//             </div>
//             <span
//               className={cn(
//                 "text-black dark:text-white",
//                 value === index && "text-black dark:text-lime-500 opacity-100"
//               )}
//             >
//               {loadingState.text}
//             </span>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export const MultiStepLoader = ({
//   loadingStates,
//   loading,
//   duration = 2000,
//   loop = true,
// }: {
//   loadingStates: LoadingState[];
//   loading?: boolean;
//   duration?: number;
//   loop?: boolean;
// }) => {
//   const [currentState, setCurrentState] = useState(0);

//   useEffect(() => {
//     if (!loading) {
//       setCurrentState(0);
//       return;
//     }
//     const timeout = setTimeout(() => {
//       setCurrentState((prevState) =>
//         loop
//           ? prevState === loadingStates.length - 1
//             ? 0
//             : prevState + 1
//           : Math.min(prevState + 1, loadingStates.length - 1)
//       );
//     }, duration);

//     return () => clearTimeout(timeout);
//   }, [currentState, loading, loop, loadingStates.length, duration]);
//   return (
//     <AnimatePresence mode="wait">
//       {loading && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//           }}
//           className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl"
//         >
//           <div className="h-96  relative">
//             <LoaderCore value={currentState} loadingStates={loadingStates} />
//           </div>

//           <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
// MultiStepLoader.tsx
import React from "react";

type Step = { text: string };

type MultiStepLoaderProps = {
  steps: Step[];
  /** how long each step is shown (ms) */
  intervalMs?: number;
  /** loop back to start when finished */
  loop?: boolean;
  /** optional className for outer wrapper */
  className?: string;
};

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  steps,
  intervalMs = 1200,
  loop = true,
  className = "",
}) => {
  const [idx, setIdx] = React.useState(0);

  // advance steps
  React.useEffect(() => {
    if (!steps?.length) return;

    const atEnd = idx === steps.length - 1;
    if (atEnd && !loop) return;

    const t = setTimeout(() => {
      setIdx((i) => (i + 1) % steps.length);
    }, intervalMs);

    return () => clearTimeout(t);
  }, [idx, steps, intervalMs, loop]);

  if (!steps?.length) return null;

  const progress = ((idx + 1) / steps.length) * 100;

  return (
    <div
      className={`w-full max-w-xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Dots / pills for steps */}
      <div className="mb-4 flex items-center gap-2">
        {steps.map((_, i) => {
          const isDone = i < idx;
          const isActive = i === idx;
          return (
            <span
              key={i}
              className={[
                "h-2 rounded-full transition-all duration-300",
                isActive ? "w-8 bg-indigo-500" : "w-2",
                isDone
                  ? "bg-indigo-400"
                  : !isActive
                  ? "bg-gray-300 dark:bg-gray-700"
                  : "",
              ].join(" ")}
            />
          );
        })}
      </div>

      {/* Current step text */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {steps[idx].text}
        </p>
        <p className="text-xs tabular-nums text-gray-500 dark:text-gray-400">
          {idx + 1} / {steps.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-indigo-500 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
