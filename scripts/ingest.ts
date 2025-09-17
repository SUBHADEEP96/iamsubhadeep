// scripts/ingest-openai.ts
import { config } from "dotenv";
config({ path: ".env.local", override: true });

import path from "path";
import { CloudClient } from "chromadb";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { SitemapLoader } from "@langchain/community/document_loaders/web/sitemap";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";

function toMetadata(meta: Record<string, any> = {}) {
  const out: Record<string, string | number | boolean> = {};
  if (typeof meta.source === "string") out.source = meta.source;
  if (typeof meta.url === "string") out.url = meta.url;
  if (typeof meta.title === "string") out.title = meta.title;
  const page = Number.isFinite(meta?.pdf?.pageNumber)
    ? meta.pdf.pageNumber
    : Number.isFinite(meta?.pdf?.page)
    ? meta.pdf.page
    : Number.isFinite(meta?.pageNumber)
    ? meta.pageNumber
    : undefined;
  if (typeof page === "number") out.pageNumber = page;
  return out;
}

async function main() {
  if (!process.env.CHROMA_API_KEY) throw new Error("Missing CHROMA_API_KEY");
  if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");

  const chroma = new CloudClient({ apiKey: process.env.CHROMA_API_KEY! });
  await chroma.heartbeat();

  // 🔁 Use a fresh collection to avoid the old 384-dim state
  const collectionName = "subhadeep_rag_1536";
  try {
    await chroma.deleteCollection({ name: collectionName });
  } catch {}
  const col = await chroma.getOrCreateCollection({ name: collectionName });

  // 1) Load sources
  const pdfPath = path.resolve(
    process.cwd(),
    "resume/Subhadeep_Paul_profile.pdf"
  );
  const pdfDocs = await new PDFLoader(pdfPath, { splitPages: false }).load();

  const site = process.env.SITE_ORIGIN ?? "http://localhost:3000";
  let siteDocs: any[] = [];
  try {
    siteDocs = await new SitemapLoader(site).load();
  } catch {}

  // 2) Chunk
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });
  const docs = await splitter.splitDocuments([...pdfDocs, ...siteDocs]);
  const texts = docs.map((d) => d.pageContent);

  // 3) Embed with OpenAI (client-managed) — 1536-dim for text-embedding-3-small
  const embedder = new OpenAIEmbeddings({ model: "text-embedding-3-small" }); // 1536 dims. :contentReference[oaicite:2]{index=2}

  // Batch embedding to stay polite on rate limits
  const EMBED_BATCH = 100;
  const vectors: number[][] = [];
  for (let i = 0; i < texts.length; i += EMBED_BATCH) {
    const chunk = texts.slice(i, i + EMBED_BATCH);
    const vecs = await embedder.embedDocuments(chunk);
    vectors.push(...vecs);
    console.log(
      `Embedded ${Math.min(i + EMBED_BATCH, texts.length)} / ${texts.length}`
    );
  }

  // Sanity: ensure expected dimension
  if (vectors[0]?.length !== 1536) {
    throw new Error(
      `Unexpected embedding dim: ${vectors[0]?.length} (expected 1536)`
    );
  }

  // 4) Upload vectors to Chroma Cloud (pass embeddings explicitly)
  //    Chroma supports adding with { embeddings, documents, metadatas }. :contentReference[oaicite:3]{index=3}
  const ADD_BATCH = 200;
  for (let i = 0; i < texts.length; i += ADD_BATCH) {
    const docsSlice = docs.slice(i, i + ADD_BATCH);
    await col.add({
      ids: docsSlice.map((_, j) => `doc_${i + j}`),
      embeddings: vectors.slice(i, i + ADD_BATCH),
      documents: texts.slice(i, i + ADD_BATCH), // optional but useful for display
      metadatas: docsSlice.map((d) => toMetadata(d.metadata)),
    });
    console.log(
      `Added ${Math.min(i + ADD_BATCH, texts.length)} / ${texts.length}`
    );
  }

  console.log("✅ Re-ingest complete with OpenAI embeddings (1536-dim).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
