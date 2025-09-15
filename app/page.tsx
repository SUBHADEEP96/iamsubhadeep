// import { Experience } from "@/components/experience";
// import { Hero } from "@/components/hero";
// import { NavbarDemo as Navbar } from "@/components/navbar";
// import Skills from "@/components/skills";
// import BrandSlider, { BrandLogo } from "@/components/slider";
// import Terminal from "@/components/Terminal";
// import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
// // import { delay } from "@/lib/utils";
// import { Suspense } from "react";
// import dynamic from "next/dynamic";
// const GitHubProjectsSlider = dynamic(
//   () => import("@/components/GitHubProjectsSlider"),
//   { ssr: false }
// );
// const logos: BrandLogo[] = [
//   {
//     src: "/assets/brand/openai.png",
//     alt: "OpenAI",
//     href: "https://openai.com",
//   },
//   {
//     src: "/assets/brand/langchain-color.png",
//     alt: "LangChain",
//     href: "https://langchain.com",
//   },
//   {
//     src: "/assets/brand/langgraph-color.png",
//     alt: "LangGraph",
//     href: "https://www.langchain.com/langgraph",
//   },

//   {
//     src: "/assets/brand/langsmith-color.png",
//     alt: "LangSmith",
//     href: "https://smith.langchain.com",
//   },
//   {
//     src: "/assets/brand/bedrock-color.png",
//     alt: "Bedrock",
//     href: "https://aws.amazon.com/bedrock",
//   },
//   {
//     src: "/assets/brand/llamaindex-color.png",
//     alt: "LlamaIndex",
//     href: "https://www.llamaindex.ai",
//   },
//   {
//     src: "/assets/brand/huggingface-color.png",
//     alt: "Hugging Face",
//     href: "https://huggingface.co",
//   },
//   { src: "/assets/brand/ollama.png", alt: "Ollama", href: "https://ollama.ai" },
//   {
//     src: "/assets/brand/crewai-color.png",
//     alt: "CrewAI",
//     href: "https://www.crewai.com",
//   },
//   {
//     src: "/assets/brand/tavily-color.png",
//     alt: "Tavily",
//     href: "https://tavily.com",
//   },
//   {
//     src: "/assets/brand/vercel.png",
//     alt: "Vercel",
//     href: "https://vercel.com",
//   },
//   { src: "/assets/brand/agui.png", alt: "Agui", href: "https://agui.io" },
//   {
//     src: "/assets/brand/anthropic.png",
//     alt: "Anthropic",
//     href: "https://www.anthropic.com",
//   },
// ];
// export default function Home() {
//   // await delay(10000);
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       {/* <Terminal /> */}
//       {/* <div className=" p-8 pt-24">
//         <h1 className="mb-4 text-center text-3xl font-bold">
//           Check the navbar at the top of the container
//         </h1>
//         <p className="mb-10 text-center text-sm text-zinc-500">
//           For demo purpose we have kept the position as{" "}
//           <span className="font-medium">Sticky</span>. Keep in mind that this
//           component is <span className="font-medium">fixed</span> and will not
//           move when scrolling.
//         </p>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//           {[
//             {
//               id: 1,
//               title: "The",
//               width: "md:col-span-1",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 2,
//               title: "First",
//               width: "md:col-span-2",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 3,
//               title: "Rule",
//               width: "md:col-span-1",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 4,
//               title: "Of",
//               width: "md:col-span-3",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 5,
//               title: "F",
//               width: "md:col-span-1",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 6,
//               title: "Club",
//               width: "md:col-span-2",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 7,
//               title: "Is",
//               width: "md:col-span-2",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 8,
//               title: "You",
//               width: "md:col-span-1",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 9,
//               title: "Do NOT TALK about",
//               width: "md:col-span-2",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//             {
//               id: 10,
//               title: "F Club",
//               width: "md:col-span-1",
//               height: "h-60",
//               bg: "bg-neutral-100 dark:bg-neutral-800",
//             },
//           ].map((box) => (
//             <div
//               key={box.id}
//               className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm`}
//             >
//               <h2 className="text-xl font-medium">{box.title}</h2>
//             </div>
//           ))}
//         </div>
//       </div> */}
//       <div className="flex flex-col items-center justify-center  px-4 py-10">
//         <h2 className="text-xl font-semibold mb-6">Trusted by teams</h2>
//         <BrandSlider
//           logos={logos}
//           speedSec={28}
//           heightClass="h-14"
//           gapClass="gap-12"
//         />
//       </div>
//       <Skills />
//       <div>
//         <Suspense fallback={<div>Loading Projects...</div>}>
//           <GitHubProjectsSlider
//             username="SUBHADEEP96"
//             topic="portfolio"
//             limit={6}
//             useApiRoute={true}
//           />
//         </Suspense>
//       </div>
//       <Experience />
//     </div>
//   );
// }

import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { NavbarDemo as Navbar } from "@/components/navbar";
import Skills from "@/components/skills";
import BrandSlider, { BrandLogo } from "@/components/slider";
// import Terminal from "@/components/Terminal";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Suspense } from "react";

// ✅ import the client wrapper instead of using dynamic() here
import GitHubProjectsSliderClient from "@/components/GitHubProjectsSlider";

// const logos: BrandLogo[] = [
//   {
//     src: "/assets/brand/openai.png",
//     alt: "OpenAI",
//     href: "https://openai.com",
//   },
//   {
//     src: "/assets/brand/langchain-color.png",
//     alt: "LangChain",
//     href: "https://langchain.com",
//   },
//   {
//     src: "/assets/brand/langgraph-color.png",
//     alt: "LangGraph",
//     href: "https://www.langchain.com/langgraph",
//   },
//   {
//     src: "/assets/brand/langsmith-color.png",
//     alt: "LangSmith",
//     href: "https://smith.langchain.com",
//   },
//   {
//     src: "/assets/brand/bedrock-color.png",
//     alt: "Bedrock",
//     href: "https://aws.amazon.com/bedrock",
//   },
//   {
//     src: "/assets/brand/llamaindex-color.png",
//     alt: "LlamaIndex",
//     href: "https://www.llamaindex.ai",
//   },
//   {
//     src: "/assets/brand/huggingface-color.png",
//     alt: "Hugging Face",
//     href: "https://huggingface.co",
//   },
//   { src: "/assets/brand/ollama.png", alt: "Ollama", href: "https://ollama.ai" },
//   {
//     src: "/assets/brand/crewai-color.png",
//     alt: "CrewAI",
//     href: "https://www.crewai.com",
//   },
//   {
//     src: "/assets/brand/tavily-color.png",
//     alt: "Tavily",
//     href: "https://tavily.com",
//   },
//   {
//     src: "/assets/brand/vercel.png",
//     alt: "Vercel",
//     href: "https://vercel.com",
//   },
//   { src: "/assets/brand/agui.png", alt: "Agui", href: "https://agui.io" },
//   {
//     src: "/assets/brand/anthropic.png",
//     alt: "Anthropic",
//     href: "https://www.anthropic.com",
//   },
// ];

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />

      {/* <div className="flex flex-col items-center justify-center px-4 py-10">
        <h2 className="mb-6 text-xl font-semibold">Trusted by teams</h2>
        <BrandSlider
          logos={logos}
          speedSec={28}
          heightClass="h-14"
          gapClass="gap-12"
        />
      </div> */}

      <Skills />

      <div>
        <Suspense fallback={<div>Loading Projects...</div>}>
          <GitHubProjectsSliderClient
            username="SUBHADEEP96"
            topic="ai"
            limit={6}
            useApiRoute={true}
          />
        </Suspense>
      </div>

      <Experience />
    </div>
  );
}
