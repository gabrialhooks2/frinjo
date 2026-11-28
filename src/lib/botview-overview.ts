/**
 * BotView Site Overview — an Ahrefs-style site-wide health report.
 *
 * Fetches the site's sitemap.xml (following sitemap indexes), takes a
 * stride sample of up to 150 URLs so every section of the site is
 * represented, and crawls each sampled URL once: status, TTFB, title,
 * meta description, canonical, H1 count, word count, noindex and
 * robots.txt blocking (for a standard Googlebot crawler).
 *
 * Aggregates into a Health Score (share of crawled URLs with no
 * errors), error/warning/notice URL counts, a top-issues table, a
 * TTFB distribution and an HTTP status distribution.
 *
 * SSRF protection reuses the shared helpers from lib/seo-tools
 * (assertSafeUrl is checked on the entry URL and every redirect hop).
 */

import {
  assertSafeUrl,
  normalizeUrl,
  parseRobotsFull,
  robotsBlocks,
  type RobotsParsed,
} from "@/lib/seo-tools";

const UA = "Mozilla/5.0 (compatible; BotView/1.0; +https://frinjo.me/botview)";
const CRAWLER_AGENT = "Googlebot";
const FETCH_TIMEOUT_MS = 8_000;
const SITEMAP_TIMEOUT_MS = 10_000;
const MAX_BODY = 1024 * 1024; // 1 MB per page — plenty for head checks + word count
const MAX_SITEMAP_BODY = 5 * 1024 * 1024;
const MAX_SITEMAP_CHILDREN = 10;
const MAX_SITEMAP_URLS = 5_000;
export const SAMPLE_SIZE = 150;
const CONCURRENCY = 10;
/** Stop launching new fetches after this long so the route stays in budget. */
const CRAWL_DEADLINE_MS = 40_000;

export type IssueSeverity = "error" | "warning" | "notice";

export interface PageIssue {
  name: string;
  severity: IssueSeverity;
}

export interface PageRecord {
  url: string;
  status: number; // final HTTP status, 0 = fetch failed
  ttfbMs: number | null;
  totalMs: number;
  title: string;
  titleLength: number;
  metaDescriptionLength: number; // 0 = missing
  hasCanonical: boolean;
  h1Count: number;
  wordCount: number;
  noindex: boolean;
  redirected: boolean;
  blockedByRobots: boolean;
  skipped: boolean; // not fetched (robots-blocked or past the crawl deadline)
  issues: PageIssue[];
}

export interface IssueSummary {
  name: string;
  severity: IssueSeverity;
  urls: number;
}

export interface OverviewResult {
  url: string;
  domain: string;
  fetchedAt: string;
  sitemapUrlCount: number;
  sampledCount: number;
  crawledCount: number;
  blockedCount: number;
  skippedCount: number;
  healthScore: number;
  counts: { errors: number; warnings: number; notices: number };
  statusDistribution: { "2xx": number; "3xx": number; "4xx": number; "5xx": number; failed: number };
  ttfbDistribution: { fast: number; medium: number; slow: number; tooSlow: number };
  topIssues: IssueSummary[];
  errorPages: { url: string; status: number; issues: string[] }[];
  error?: string;
}

/* ---------------- timed SSRF-safe fetch ---------------- */

interface TimedFetch {
  status: number;
  finalUrl: string;
  headers: Headers | null;
  body: string;
  ttfbMs: number | null;
  totalMs: number;
  redirects: number;
  failed: boolean;
}

async function fetchTimed(
  input: string,
  maxBody: number,
  timeoutMs: number,
): Promise<TimedFetch> {
  const start = Date.now();
  let current = input;
  let redirects = 0;
  let ttfbMs: number | null = null;
  const fail = (): TimedFetch => ({
    status: 0,
    finalUrl: current,
    headers: null,
    body: "",
    ttfbMs,
    totalMs: Date.now() - start,
    redirects,
    failed: true,
  });
  for (;;) {
    let u: URL;
    try {
      u = new URL(current);
    } catch {
      return fail();
    }
    if (await assertSafeUrl(u)) return fail();
    let res: Response;
    try {
      res = await fetch(current, {
        headers: {
          "User-Agent": UA,
          Accept: "text/html,application/xhtml+xml,application/xml,text/plain,*/*",
        },
        redirect: "manual",
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      return fail();
    }
    if (ttfbMs === null) ttfbMs = Date.now() - start;
    if ([301, 302, 303, 307, 308].includes(res.status)) {
      const loc = res.headers.get("location");
      if (loc && redirects < 5) {
        current = new URL(loc, current).toString();
        redirects++;
        try {
          await res.body?.cancel();
        } catch {
          /* ignore */
        }
        continue;
      }
    }
    let body = "";
    try {
      if (res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          body += decoder.decode(value, { stream: true });
          if (body.length > maxBody) {
            body = body.slice(0, maxBody);
            await reader.cancel().catch(() => undefined);
            break;
          }
        }
        body += decoder.decode();
      }
    } catch {
      // keep whatever partial body arrived
    }
    return {
      status: res.status,
      finalUrl: current,
      headers: res.headers,
      body,
      ttfbMs,
      totalMs: Date.now() - start,
      redirects,
      failed: false,
    };
  }
}

/* ---------------- tiny HTML extraction (no dependencies) ---------------- */

function stripTags(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"),
  );
  return m ? (m[1] ?? m[2] ?? m[3] ?? "") : null;
}

function visibleWordCount(html: string): number {
  const noScripts = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const text = stripTags(noScripts);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/* ---------------- sitemap discovery ---------------- */

function extractLocs(xml: string): string[] {
  const out: string[] = [];
  for (const m of xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)) {
    const v = m[1]
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .trim();
    if (v) out.push(v);
  }
  return out;
}

async function collectSitemapUrls(
  origin: string,
  robotsParsed: RobotsParsed | null,
): Promise<string[]> {
  const candidates: string[] = [];
  if (robotsParsed) {
    for (const s of robotsParsed.sitemaps) {
      if (!candidates.includes(s)) candidates.push(s);
    }
  }
  const fallback = origin + "/sitemap.xml";
  if (!candidates.includes(fallback)) candidates.push(fallback);

  const seen = new Set<string>();
  const urls: string[] = [];
  const push = (u: string) => {
    if (!seen.has(u) && urls.length < MAX_SITEMAP_URLS) {
      seen.add(u);
      urls.push(u);
    }
  };

  for (const candidate of candidates) {
    const res = await fetchTimed(candidate, MAX_SITEMAP_BODY, SITEMAP_TIMEOUT_MS);
    if (res.failed || res.status !== 200 || !res.body) continue;
    if (/<sitemapindex[\s>]/i.test(res.body)) {
      const children = extractLocs(res.body).slice(0, MAX_SITEMAP_CHILDREN);
      for (const child of children) {
        const childRes = await fetchTimed(child, MAX_SITEMAP_BODY, SITEMAP_TIMEOUT_MS);
        if (childRes.failed || childRes.status !== 200) continue;
        for (const loc of extractLocs(childRes.body)) push(loc);
      }
    } else {
      for (const loc of extractLocs(res.body)) push(loc);
    }
    if (urls.length) break; // first sitemap source that yields URLs wins
  }
  return urls;
}

/** Evenly spaced sample so every section of the sitemap is represented. */
function strideSample(urls: string[], n: number): string[] {
  if (urls.length <= n) return [...urls];
  const out: string[] = [];
  const step = urls.length / n;
  for (let i = 0; i < n; i++) out.push(urls[Math.floor(i * step)]);
  return out;
}

/* ---------------- per-URL crawl ---------------- */

function blankRecord(url: string): PageRecord {
  return {
    url,
    status: 0,
    ttfbMs: null,
    totalMs: 0,
    title: "",
    titleLength: 0,
    metaDescriptionLength: 0,
    hasCanonical: false,
    h1Count: 0,
    wordCount: 0,
    noindex: false,
    redirected: false,
    blockedByRobots: false,
    skipped: false,
    issues: [],
  };
}

async function crawlOne(
  url: string,
  robotsParsed: RobotsParsed | null,
): Promise<PageRecord> {
  const rec = blankRecord(url);
  if (robotsParsed) {
    let path = "/";
    try {
      path = new URL(url).pathname || "/";
    } catch {
      /* keep "/" */
    }
    if (robotsBlocks(robotsParsed, CRAWLER_AGENT, path)) {
      rec.blockedByRobots = true;
      rec.skipped = true;
      return rec;
    }
  }

  const res = await fetchTimed(url, MAX_BODY, FETCH_TIMEOUT_MS);
  rec.status = res.status;
  rec.ttfbMs = res.ttfbMs;
  rec.totalMs = res.totalMs;
  rec.redirected = res.redirects > 0;

  if (res.failed) {
    rec.issues.push({ name: "Page unreachable (fetch failed)", severity: "error" });
    return rec;
  }
  if (res.status >= 400) {
    rec.issues.push({
      name: res.status >= 500 ? "5xx server error" : "4xx client error",
      severity: "error",
    });
  }
  if (rec.redirected) {
    rec.issues.push({ name: "Redirect (3xx)", severity: "notice" });
  }
  if (rec.ttfbMs !== null && rec.ttfbMs > 500) {
    rec.issues.push({ name: "Slow TTFB (> 500 ms)", severity: "warning" });
  }

  const xRobots = res.headers?.get("x-robots-tag") ?? "";
  const contentType = res.headers?.get("content-type") ?? "";
  const looksHtml =
    /text\/html|application\/xhtml/i.test(contentType) || /<(html|title|head)[\s>]/i.test(res.body);
  if (!looksHtml || res.status < 200 || res.status >= 300) return rec;

  const html = res.body;
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const robotsMeta = metaTags.find(
    (t) => (attr(t, "name") ?? "").toLowerCase() === "robots",
  );
  const robotsContent = (robotsMeta ? (attr(robotsMeta, "content") ?? "") : "").toLowerCase();
  rec.noindex = /\bnoindex\b/.test(robotsContent) || /\bnoindex\b/i.test(xRobots);
  if (rec.noindex) {
    rec.issues.push({ name: "Noindex page listed in sitemap", severity: "error" });
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  rec.title = titleMatch ? stripTags(titleMatch[1]) : "";
  rec.titleLength = rec.title.length;
  if (!rec.title) {
    rec.issues.push({ name: "Missing title tag", severity: "error" });
  } else if (rec.titleLength > 60) {
    rec.issues.push({ name: "Title too long (> 60 chars)", severity: "notice" });
  } else if (rec.titleLength < 10) {
    rec.issues.push({ name: "Title too short (< 10 chars)", severity: "notice" });
  }

  const descTag = metaTags.find(
    (t) => (attr(t, "name") ?? "").toLowerCase() === "description",
  );
  const desc = descTag ? (attr(descTag, "content") ?? "").trim() : "";
  rec.metaDescriptionLength = desc.length;
  if (!desc) {
    rec.issues.push({ name: "Missing meta description", severity: "warning" });
  } else if (desc.length > 160) {
    rec.issues.push({ name: "Meta description too long (> 160 chars)", severity: "notice" });
  }

  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  rec.hasCanonical = linkTags.some(
    (t) => (attr(t, "rel") ?? "").toLowerCase() === "canonical",
  );
  if (!rec.hasCanonical) {
    rec.issues.push({ name: "Missing canonical", severity: "warning" });
  }

  rec.h1Count = (html.match(/<h1\b[^>]*>/gi) ?? []).length;
  if (rec.h1Count === 0) {
    rec.issues.push({ name: "Missing H1", severity: "warning" });
  } else if (rec.h1Count > 1) {
    rec.issues.push({ name: "Multiple H1 tags", severity: "warning" });
  }

  rec.wordCount = visibleWordCount(html);
  if (rec.wordCount < 200) {
    rec.issues.push({ name: "Thin content (< 200 words)", severity: "warning" });
  }
  return rec;
}

async function crawlAll(
  urls: string[],
  robotsParsed: RobotsParsed | null,
): Promise<PageRecord[]> {
  const records: PageRecord[] = new Array(urls.length);
  let next = 0;
  const startedAt = Date.now();
  async function worker() {
    for (;;) {
      const i = next++;
      if (i >= urls.length) return;
      if (Date.now() - startedAt > CRAWL_DEADLINE_MS) {
        const rec = blankRecord(urls[i]);
        rec.skipped = true;
        records[i] = rec;
        continue;
      }
      records[i] = await crawlOne(urls[i], robotsParsed);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  return records;
}

/* ---------------- main overview ---------------- */

export async function runOverview(input: string): Promise<OverviewResult> {
  const target = normalizeUrl(input);
  const base: OverviewResult = {
    url: input,
    domain: "",
    fetchedAt: new Date().toISOString(),
    sitemapUrlCount: 0,
    sampledCount: 0,
    crawledCount: 0,
    blockedCount: 0,
    skippedCount: 0,
    healthScore: 0,
    counts: { errors: 0, warnings: 0, notices: 0 },
    statusDistribution: { "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0, failed: 0 },
    ttfbDistribution: { fast: 0, medium: 0, slow: 0, tooSlow: 0 },
    topIssues: [],
    errorPages: [],
  };
  if (!target) {
    return {
      ...base,
      error: "That doesn't look like a valid URL. Try something like https://example.com",
    };
  }
  const origin = new URL(target).origin;
  base.domain = new URL(target).hostname;

  const robotsRes = await fetchTimed(origin + "/robots.txt", MAX_BODY, SITEMAP_TIMEOUT_MS);
  const robotsParsed =
    !robotsRes.failed && robotsRes.status === 200 && robotsRes.body
      ? parseRobotsFull(robotsRes.body)
      : null;

  const sitemapUrls = await collectSitemapUrls(origin, robotsParsed);
  const crawlList = sitemapUrls.length ? strideSample(sitemapUrls, SAMPLE_SIZE) : [target];
  base.sitemapUrlCount = sitemapUrls.length;
  base.sampledCount = crawlList.length;

  const records = await crawlAll(crawlList, robotsParsed);

  const fetched = records.filter((r) => !r.skipped);
  base.crawledCount = fetched.length;
  base.blockedCount = records.filter((r) => r.blockedByRobots).length;
  base.skippedCount = records.filter((r) => r.skipped && !r.blockedByRobots).length;

  const withSeverity = (sev: IssueSeverity) =>
    fetched.filter((r) => r.issues.some((i) => i.severity === sev)).length;
  base.counts = {
    errors: withSeverity("error"),
    warnings: withSeverity("warning"),
    notices: withSeverity("notice"),
  };
  base.healthScore = fetched.length
    ? Math.round(((fetched.length - base.counts.errors) / fetched.length) * 100)
    : 0;

  for (const r of fetched) {
    if (r.status === 0) base.statusDistribution.failed++;
    else if (r.status < 300) base.statusDistribution["2xx"]++;
    else if (r.status < 400) base.statusDistribution["3xx"]++;
    else if (r.status < 500) base.statusDistribution["4xx"]++;
    else base.statusDistribution["5xx"]++;
    if (r.ttfbMs !== null && r.status > 0) {
      if (r.ttfbMs < 200) base.ttfbDistribution.fast++;
      else if (r.ttfbMs < 300) base.ttfbDistribution.medium++;
      else if (r.ttfbMs <= 500) base.ttfbDistribution.slow++;
      else base.ttfbDistribution.tooSlow++;
    }
  }

  const issueMap = new Map<string, IssueSummary>();
  for (const r of fetched) {
    const seenOnPage = new Set<string>();
    for (const issue of r.issues) {
      if (seenOnPage.has(issue.name)) continue;
      seenOnPage.add(issue.name);
      const cur = issueMap.get(issue.name) ?? { name: issue.name, severity: issue.severity, urls: 0 };
      cur.urls++;
      issueMap.set(issue.name, cur);
    }
  }
  base.topIssues = [...issueMap.values()].sort((a, b) => b.urls - a.urls);

  base.errorPages = fetched
    .filter((r) => r.issues.some((i) => i.severity === "error"))
    .slice(0, 50)
    .map((r) => ({
      url: r.url,
      status: r.status,
      issues: r.issues.filter((i) => i.severity === "error").map((i) => i.name),
    }));

  return base;
}
