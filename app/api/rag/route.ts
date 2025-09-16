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
  const chromaApiKey = process.env.CHROMA_API_KEY;
  if (!chromaApiKey) {
    throw new Error("CHROMA_API_KEY environment variable is not set.");
  }
  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
  const client = new CloudClient({
    apiKey: chromaApiKey,
  });
  const store = new Chroma(embeddings, {
    collectionName: "subhadeep_rag",
    index: client,
  });
  return store.asRetriever({ k: 6 });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return textResponse("Invalid JSON body.", 400);
  }

  const question =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>).question
      : undefined;

  if (typeof question !== "string" || !question.trim()) {
    return textResponse(
      "Request body must include a non-empty `question` string.",
      400
    );
  }

  try {
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

    const stream = await chain.stream({ question: question.trim() });
    const enc = new TextEncoder();
    return new Response(
      new ReadableStream({
        async pull(controller) {
          try {
            for await (const chunk of stream)
              controller.enqueue(enc.encode(String(chunk)));
            controller.close();
          } catch (err) {
            controller.error(err);
          }
        },
      }),
      { headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  } catch (err) {
    console.error("RAG route error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Unknown error while running the RAG pipeline.";
    return textResponse(`RAG pipeline error: ${message}`);
  }
}

function textResponse(message: string, status = 500) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
