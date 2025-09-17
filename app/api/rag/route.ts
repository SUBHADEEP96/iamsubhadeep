// app/api/rag/route.ts
import { NextRequest } from "next/server";
import { CloudClient, type EmbeddingFunction } from "chromadb";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

// 1) Tiny NOOP EF to stop Chroma from loading its default EF
const NOOP_EF: EmbeddingFunction = {
  // This will never be called since we only use queryEmbeddings/add with embeddings.
  generate: async () => {
    throw new Error("NOOP_EF should not be called");
  },
};

export const runtime = "nodejs";

const prompt =
  PromptTemplate.fromTemplate(`You are a helpful assistant for Subhadeep Paul.
Use only the CONTEXT (resume + site). If unknown, say so.

QUESTION:
{question}

CONTEXT:
{context}

Answer:`);

function textResponse(message: string, status = 500) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function coerceToText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.map(coerceToText).filter(Boolean).join("");
  if (value && typeof value === "object") {
    const v = value as any;
    if (typeof v.text === "string") return v.text;
    if (v.content !== undefined) return coerceToText(v.content);
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const question = body?.question;
    if (typeof question !== "string" || !question.trim()) {
      return textResponse(
        "Request body must include a non-empty `question` string.",
        400
      );
    }
    const queryText = question.trim();

    // 2) Connect to Chroma Cloud (NO default EF!)
    if (!process.env.CHROMA_API_KEY) {
      return textResponse("CHROMA_API_KEY is not set.", 500);
    }
    const chroma = new CloudClient({
      apiKey: process.env.CHROMA_API_KEY,
      // optional: database: process.env.CHROMA_DATABASE
    });

    // IMPORTANT: Use getCollection (not getOrCreate) for an already-ingested collection,
    // and pass NOOP_EF to prevent loading default-embed/onnx.
    const collection = await chroma.getCollection({
      name: "subhadeep_rag_1536", // your 1536-d re-ingested collection
      embeddingFunction: NOOP_EF,
    });

    // 3) Embed the user query with the SAME model as ingestion (1536-dim)
    const embedder = new OpenAIEmbeddings({ model: "text-embedding-3-small" }); // 1536-d
    const qvec = await embedder.embedQuery(queryText);

    // 4) Query by embeddings (avoid queryTexts so NO EF is needed)
    const results = await collection.query({
      queryEmbeddings: [qvec],
      nResults: 6,
      include: ["documents", "metadatas"],
    });

    const docs =
      results.documents?.[0]?.map((t, i) => {
        const m = results.metadatas?.[0]?.[i] ?? {};
        const src = [m?.title, m?.url, m?.source].filter(Boolean).join(" • ");
        return `• ${t}${src ? `\n  (${src})` : ""}`;
      }) ?? [];

    // 5) Build a tiny chain with the retrieved context
    const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0.2 });
    const chain = RunnableSequence.from([
      (input: { question: string; context: string }) => prompt.format(input),
      llm,
    ]);

    const answer = await chain.invoke({
      question: queryText,
      context: docs.join("\n\n"),
    });

    const text = coerceToText(answer).trim();
    return textResponse(
      text || "I couldn't find that in Subhadeep's materials."
    );
  } catch (err: any) {
    console.error("RAG route error:", err);
    // Typical cause: default EF got pulled in -> onnx binding error,
    // or collection name/dimension mismatch.
    return textResponse(
      `RAG pipeline error: ${err?.message || "Unknown error"}`,
      500
    );
  }
}
