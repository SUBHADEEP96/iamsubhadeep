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

    const trimmedQuestion = question.trim();
    const contextChain = RunnableSequence.from([
      (input: { question: string }) => input.question,
      retriever,
      (docs) => docs.map((d) => `• ${d.pageContent}`).join("\n\n"),
    ]);
    const chain = RunnableSequence.from([
      (input: string) => ({ question: input }),
      RunnablePassthrough.assign({
        context: contextChain,
      }),
      prompt,
      llm,
    ]);

    const answer = await chain.invoke(trimmedQuestion);
    const answerText = coerceToText(answer).trim();

    if (!answerText) {
      console.error("RAG route error: empty response from language model", {
        answer,
      });
      return textResponse(
        "RAG pipeline error: received an empty response from the language model.",
        502
      );
    }

    return textResponse(answerText, 200);
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

function coerceToText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.map((item) => coerceToText(item)).filter(Boolean).join("");
  if (!value || typeof value !== "object") return "";

  const withText = value as { text?: unknown };
  if (typeof withText.text === "string") return withText.text;

  const withContent = value as { content?: unknown };
  if (withContent.content !== undefined)
    return coerceToText(withContent.content);

  return "";
}
