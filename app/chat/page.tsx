"use client";
import { useEffect, useRef, useState } from "react";

type Line = string;

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([]);
  const [pending, setPending] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inflight = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    const q = input.trim();
    if (!q) return;

    // cancel any inflight request
    inflight.current?.abort();
    inflight.current = new AbortController();

    setInput("");
    setPending(true);
    setHistory((h) => [...h, `You: ${q}`, "Bot: ..."]);

    let res: Response;
    try {
      res = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify({ question: q }),
        signal: inflight.current.signal,
      });
    } catch (err) {
      console.error("RAG API network error:", err);
      setHistory((h) => [
        ...h.slice(0, -1),
        "Bot: Network error. Check console/logs.",
      ]);
      setPending(false);
      return;
    }

    // 1) Treat non-2xx as error
    // if (!res.ok) {
    //   const errText = await res.text().catch(() => "");
    //   console.error("RAG API error:", errText);
    //   setHistory((h) => [
    //     ...h.slice(0, -1),
    //     "Bot: Sorry — the server had an error. Check console/logs.",
    //   ]);
    //   setPending(false);
    //   return;
    // }

    // 2) Prefer streaming when available
    const reader = res.body?.getReader();
    if (reader) {
      const decoder = new TextDecoder(); // UTF-8 by default
      let bot = "";
      try {
        // Read stream incrementally and decode with the streaming flag
        // (prevents breaking multibyte chars). :contentReference[oaicite:2]{index=2}
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          bot += decoder.decode(value, { stream: true });
          setHistory((h) => [...h.slice(0, -1), `Bot: ${bot}`]);
        }
        // flush remaining bytes
        bot += decoder.decode();
        setHistory((h) => [...h.slice(0, -1), `Bot: ${bot}`]);
      } catch (err) {
        console.error("RAG stream error:", err);
        setHistory((h) => [
          ...h.slice(0, -1),
          "Bot: Stream ended unexpectedly. Check server logs.",
        ]);
      }
      setPending(false);
      return;
    }

    // 3) Fallback: non-streaming plain text
    const text = await res.text().catch(() => "");
    setHistory((h) => [
      ...h.slice(0, -1),
      `Bot: ${text || "No response body"}`,
    ]);
    setPending(false);
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Ask about Subhadeep</h1>

      <div className="space-y-3 bg-neutral-950/5 dark:bg-white/5 rounded-xl p-4 max-h-[60vh] overflow-auto">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap text-sm">
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={ask} className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-lg border px-3 py-2"
          placeholder="e.g., What did he build at Syneos?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={pending}
        />
        <button
          className="rounded-lg bg-black text-white px-4 py-2 disabled:opacity-50"
          disabled={pending || !input.trim()}
        >
          {pending ? "Sending…" : "Send"}
        </button>
      </form>
    </div>
  );
}
