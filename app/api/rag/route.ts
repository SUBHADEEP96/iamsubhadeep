import { NextRequest } from "next/server";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { CloudClient } from "chromadb";
export const runtime = "nodejs";

const prompt =
  PromptTemplate.fromTemplate(`You are a helpful assistant for Subhadeep Paul.
Use only the CONTEXT (resume + site). If unknown, say so.

QUESTION:
{question}

CONTEXT:
{context}

Answer:`);

async function getRetriever() {
  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
  const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY!,
  });
  const store = new Chroma(embeddings, {
    collectionName: "subhadeep_rag",
    index: client,
  });
  return store.asRetriever({ k: 6 });
}

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  const retriever = await getRetriever();
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.2,
    streaming: true,
  });

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe((docs) =>
        docs.map((d) => `• ${d.pageContent}`).join("\n\n")
      ),
      question: new RunnablePassthrough(),
    },
    prompt,
    llm,
  ]);

  const stream = await chain.stream({ question });
  const enc = new TextEncoder();
  return new Response(
    new ReadableStream({
      async pull(controller) {
        for await (const chunk of stream)
          controller.enqueue(enc.encode(String(chunk)));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
