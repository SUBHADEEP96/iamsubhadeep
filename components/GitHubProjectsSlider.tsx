"use client";
import React from "react";

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
  /** Your GitHub username (e.g., "SUBHADEEP96") */
  username: string;
  /** Filter by a topic label you add to repos (e.g., "portfolio"). Leave empty to show all public repos. */
  topic?: string;
  /** Max cards to show */
  limit?: number;
  /** Use API route (recommended) or direct GitHub? */
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

        // Prefer your own Next.js API route so you don't expose a token client-side.
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
                // Direct GitHub fetch (no token) is fine for public repos but rate-limited.
                Accept: "application/vnd.github+json",
              },
          cache: "force-cache",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to load repos: ${res.status} ${text}`);
        }

        let data: Repo[] = await res.json();

        // If fetching directly from GitHub, data includes all public repos.
        // Filter by topic on the client if requested (topics array might be missing for direct REST without preview headers).
        if (!useApiRoute && topic) {
          data = []; // Direct filtering by topic is unreliable without extra calls.
          // Tip: use the API route below for topic filtering, or pin repos via GraphQL.
        }

        // Sort by pushed_at desc, slice to limit
        data.sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
        setRepos(data.slice(0, limit));
      } catch (e: any) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username, topic, limit, useApiRoute]);

  const scrollBy = (px: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: px, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">
          Projects on GitHub
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scrollBy(-400)}
            className="rounded-2xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Scroll Left"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(400)}
            className="rounded-2xl border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Scroll Right"
          >
            →
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="relative">
        {/* Loading / Error */}
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
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
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
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`}
                      alt={`${repo.name} preview`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
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
