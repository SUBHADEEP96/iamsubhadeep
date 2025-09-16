import { config } from "dotenv";
config({ path: ".env.local", override: true });

import path from "path";
import { CloudClient } from "chromadb";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { SitemapLoader } from "@langchain/community/document_loaders/web/sitemap";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

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

  const chroma = new CloudClient({ apiKey: process.env.CHROMA_API_KEY! });
  await chroma.heartbeat();

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

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 150,
  });
  const docs = await splitter.splitDocuments([...pdfDocs, ...siteDocs]);

  const col = await chroma.getOrCreateCollection({ name: "subhadeep_rag" });
  const BATCH = 200;
  for (let i = 0; i < docs.length; i += BATCH) {
    const batch = docs.slice(i, i + BATCH);
    await col.add({
      ids: batch.map((_, j) => `doc_${i + j}`),
      documents: batch.map((d) => d.pageContent),
      metadatas: batch.map((d) => toMetadata(d.metadata)),
    });
  }
  console.log("✅ Ingest complete (Chroma Cloud).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
