"use client";
import React from "react";
import Image from "next/image";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner: { login: string };
  topics?: string[];
  pushed_at: string;
};

type Props = {
  username: string;
  topic?: string;
  limit?: number;
  useApiRoute?: boolean;
};

export default function GitHubProjectsSlider({
  username,
  topic,
  limit = 10,
  useApiRoute = true,
}: Props) {
  const [repos, setRepos] = React.useState<Repo[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const base = useApiRoute
          ? `/api/github-projects?user=${encodeURIComponent(username)}`
          : `https://api.github.com/users/${encodeURIComponent(
              username
            )}/repos?per_page=100&sort=updated`;

        const url = topic ? `${base}&topic=${encodeURIComponent(topic)}` : base;

        const res = await fetch(url, {
          headers: useApiRoute
            ? {}
            : {
                Accept: "application/vnd.github+json",
              },
          cache: "force-cache",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to load repos: ${res.status} ${text}`);
        }

        let data = (await res.json()) as Repo[];

        if (!useApiRoute && topic) {
          data = [];
        }

        data.sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
        setRepos(data.slice(0, limit));
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, topic, limit, useApiRoute]);

  const nudge = (px: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const nextLeft = el.scrollLeft + px;
    if (typeof el.scrollTo === "function") {
      el.scrollTo({ left: nextLeft, behavior: "smooth" });
    } else {
      el.scrollLeft = nextLeft;
    }
  };

  return (
    <div className="w-full isolate">
      <h2 className="text-center text-lg md:text-4xl mb-4 text-black dark:text-white ">
        Projects on GitHub 😸
      </h2>

      <div className="mb-4 flex items-center justify-between relative z-20 pointer-events-auto">
        <div className="flex gap-2">
          <button
            onClick={() => nudge(-400)}
            className="cursor-pointer rounded-2xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 touch-manipulation"
            aria-label="Scroll Left"
          >
            <ArrowBigLeftDash />
          </button>
          <button
            onClick={() => nudge(400)}
            className="cursor-pointer rounded-2xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 touch-manipulation"
            aria-label="Scroll Right"
          >
            <ArrowBigRightDash />
          </button>
        </div>
      </div>

      <div className="relative z-0">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: Math.min(6, limit) }).map((_, i) => (
              <div
                key={i}
                className="h-56 rounded-2xl border bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 animate-pulse"
              />
            ))}
          </div>
        )}
        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        )}

        {/* Slider */}
        {!loading && !error && repos && repos.length > 0 && (
          <div
            ref={scrollerRef}
            className="
              flex flex-nowrap gap-4
              overflow-x-auto overscroll-x-contain scroll-smooth
              snap-x snap-proximity pb-2
              relative z-0
            "
          >
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="min-w-[88%] sm:min-w-[360px] md:min-w-[420px] lg:min-w-[460px] snap-start"
              >
                <article className="group h-full rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  {/* Hero image: GitHub Open Graph preview */}
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`}
                      alt={`${repo.name} preview`}
                      fill
                      sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, (min-width: 640px) 360px, 88vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base md:text-lg font-semibold leading-snug">
                        {repo.name}
                      </h3>
                      <span
                        title="Stars"
                        className="shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                      >
                        ★ {repo.stargazers_count}
                      </span>
                    </div>

                    {repo.description && (
                      <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">
                        {repo.description}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-neutral-600 dark:text-neutral-400">
                        {repo.language ?? "—"}
                      </span>
                      <span className="text-xs text-neutral-500">
                        Updated{" "}
                        {new Date(repo.pushed_at).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}

        {!loading && !error && repos && repos.length === 0 && (
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            No repositories found.
          </p>
        )}
      </div>
    </div>
  );
}
