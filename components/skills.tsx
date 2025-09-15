"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const aiStack = [
  {
    id: 1,
    name: "OpenAI",
    url: "https://openai.com",
    image: "/assets/brand/openai.png",
  },
  {
    id: 2,
    name: "LangChain",
    url: "https://langchain.com",
    image: "/assets/brand/langchain-color.png",
  },
  {
    id: 3,
    name: "LangGraph",
    url: "https://www.langchain.com/langgraph",
    image: "/assets/brand/langgraph-color.png",
  },
  {
    id: 4,
    name: "LangSmith",
    url: "https://smith.langchain.com",
    image: "/assets/brand/langsmith-color.png",
  },
  {
    id: 5,
    name: "Bedrock",
    url: "https://aws.amazon.com/bedrock",
    image: "/assets/brand/bedrock-color.png",
  },
  {
    id: 6,
    name: "LlamaIndex",
    url: "https://www.llamaindex.ai",
    image: "/assets/brand/llamaindex-color.png",
  },
  {
    id: 7,
    name: "Hugging Face",
    url: "https://huggingface.co",
    image: "/assets/brand/huggingface-color.png",
  },
  {
    id: 8,
    name: "Ollama",
    url: "https://ollama.ai",
    image: "/assets/brand/ollama.png",
  },
  {
    id: 9,
    name: "CrewAI",
    url: "https://www.crewai.com",
    image: "/assets/brand/crewai-color.png",
  },
  {
    id: 10,
    name: "Tavily",
    url: "https://tavily.com",
    image: "/assets/brand/tavily-color.png",
  },
  {
    id: 11,
    name: "Vercel",
    url: "https://vercel.com",
    image: "/assets/brand/vercel.png",
  },
  {
    id: 12,
    name: "Agui",
    url: "https://agui.io",
    image: "/assets/brand/agui.png",
  },
  {
    id: 13,
    name: "Anthropic",
    url: "https://www.anthropic.com",
    image: "/assets/brand/anthropic.png",
  },
];

export default function Skills() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={aiStack} />
    </div>
  );
}
