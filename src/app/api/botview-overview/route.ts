import { NextRequest, NextResponse } from "next/server";
import { runOverview } from "@/lib/botview-overview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// A site overview crawls up to 150 sitemap URLs — allow a full minute.
export const maxDuration = 60;

// Simple in-memory throttle: max 6 overviews per IP per minute (per
// instance) — each one is a small crawl, so keep it tighter than the
// single-page audit.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 6;

function throttled(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_HITS;
}

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { error: "Too many overviews from this network — please wait a minute and try again." },
      { status: 429 },
    );
  }
  const url = req.nextUrl.searchParams.get("url") ?? "";
  if (!url) {
    return NextResponse.json({ error: "Missing ?url= parameter." }, { status: 400 });
  }
  try {
    const result = await runOverview(url);
    return NextResponse.json(result, {
      status: result.error ? 422 : 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "The overview failed unexpectedly. Please try again." },
      { status: 500 },
    );
  }
}
