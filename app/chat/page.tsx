import ChatBot from "@/components/ChatBot";
import type { Metadata } from "next";
const meta = {
  title: "Chat with AI - Subhadeep Paul",
  description:
    "Chat with an AI assistant powered by Retrieval-Augmented Generation (RAG) to explore the portfolio of Subhadeep Paul, Senior Software Engineer and AI Expert.",
};
export const metadata: Metadata = meta;
const ChatPage = () => {
  return (
    <>
      <ChatBot />
    </>
  );
};

export default ChatPage;
