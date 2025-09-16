"use client";
import { useState } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setHistory((h) => [...h, `You: ${q}`, "Bot: ..."]);

    const res = await fetch("/api/rag", {
      method: "POST",
      body: JSON.stringify({ question: q }),
      headers: { "Content-Type": "application/json" },
    });

    const ct = res.headers.get("content-type") || "";
    if (!res.ok || ct.includes("text/html")) {
      const errText = await res.text();
      console.error("RAG API error:", errText);
      setHistory((h) => [
        ...h.slice(0, -1),
        "Bot: Sorry — the server had an error. Check console/logs for details.",
      ]);
      return;
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let bot = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bot += decoder.decode(value);
      setHistory((h) => [...h.slice(0, -1), `Bot: ${bot}`]);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Ask about Subhadeep</h1>
      <div className="space-y-3 bg-neutral-950/5 dark:bg-white/5 rounded-xl p-4">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap text-sm">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={ask} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-lg border px-3 py-2"
          placeholder="e.g., What did he build at Syneos?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="rounded-lg bg-black text-white px-4 py-2">
          Send
        </button>
      </form>
    </div>
  );
}
