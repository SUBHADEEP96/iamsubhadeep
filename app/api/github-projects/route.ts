// app/api/github-projects/route.ts
import { NextResponse } from "next/server";

const GITHUB_USERNAME = "SUBHADEEP96";
export const revalidate = 0;
export const dynamic = "force-dynamic";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  owner?: {
    login?: string | null;
  } | null;
  topics?: string[];
  pushed_at: string;
};

type GitHubSearchResponse = {
  items?: GitHubRepo[];
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const topic = (searchParams.get("topic") || "").trim();
    const perPage = Number(searchParams.get("per_page") || 100);
    const fresh = searchParams.get("fresh") === "1";

    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    let repos: GitHubRepo[] = [];

    if (topic) {
      // Use Search API to get repos with a specific topic for your user
      const searchUrl =
        `https://api.github.com/search/repositories` +
        `?q=user:${encodeURIComponent(
          GITHUB_USERNAME
        )}+topic:${encodeURIComponent(topic)}` +
        `&sort=updated&order=desc&per_page=${perPage}`;
      const res = await fetch(searchUrl, {
        headers,
        cache: fresh ? "no-store" : "no-cache",
      });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { error: `GitHub Search API error: ${res.status} ${text}` },
          { status: res.status }
        );
      }
      const json = (await res.json()) as GitHubSearchResponse;
      repos = json.items ?? [];
    } else {
      // Fallback: list all repos if no topic provided
      const url = `https://api.github.com/users/${encodeURIComponent(
        GITHUB_USERNAME
      )}/repos?per_page=${perPage}&sort=updated`;
      const res = await fetch(url, {
        headers,
        cache: fresh ? "no-store" : "no-cache",
      });
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { error: `GitHub API error: ${res.status} ${text}` },
          { status: res.status }
        );
      }
      repos = (await res.json()) as GitHubRepo[];
    }

    // Normalize fields for your slider
    const slim = repos.map((r) => ({
      id: r.id,
      name: r.name,
      html_url: r.html_url,
      description: r.description,
      stargazers_count: r.stargazers_count,
      language: r.language,
      owner: { login: r.owner?.login },
      topics: r.topics ?? [], // Search API returns topics in items
      pushed_at: r.pushed_at,
    }));

    return NextResponse.json(slim, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
