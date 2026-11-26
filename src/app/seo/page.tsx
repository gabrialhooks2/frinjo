import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";

export const metadata = {
  title: "SEO Agents — AI-Powered SEO Audits & Tools",
  description:
    "Meet the SEO Agents: 14 specialist AI agents plus a full-audit orchestrator covering technical SEO, content quality, schema, Core Web Vitals, AI search (GEO), backlinks and more. Get a free SEO audit.",
  keywords: [
    "seo agents",
    "ai seo audit",
    "free seo audit",
    "technical seo checker",
    "seo tools",
    "ai search optimization",
    "geo seo",
    "core web vitals audit",
    "schema markup checker",
    "backlink analysis",
  ],
  alternates: { canonical: "https://frinjo.me/seo" },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "SEO Agents — AI-Powered SEO Audits & Tools | WebStore Pro",
    description:
      "14 specialist SEO agents and a full-audit orchestrator: technical SEO, content, schema, performance, AI search, backlinks and more. Start with a free audit.",
    url: "https://frinjo.me/seo",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "SEO Agents", item: "https://frinjo.me/seo" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is an SEO agent?",
    "An SEO agent is a specialist AI worker with one narrow job — technical crawl checks, content quality, schema validation, backlink analysis and so on. Each agent runs a fixed checklist against your live site and reports evidence-backed findings, instead of the generic advice you get from a single all-in-one scan.",
  ],
  [
    "How does the Full SEO Audit work?",
    "The orchestrator agent crawls your site, then dispatches all 14 specialists in parallel. Their findings merge into one report: an SEO Health Score (0–100), issues grouped by severity — Critical, High, Medium, Low — and a phased action plan that tells you exactly what to fix first.",
  ],
  [
    "Is the SEO audit really free?",
    "Yes. The free audit covers the full checklist and the scored report — no card, no obligation. If you want the fixes implemented for you, that is quoted separately after you have seen the report.",
  ],
  [
    "What does the audit check?",
    "Technical SEO (crawlability, canonicals, redirects, security headers), content quality and E-E-A-T, schema markup, sitemap and indexing status, Core Web Vitals performance, AI search readiness (GEO), local SEO, backlinks, on-page elements, images, internal linking and keyword targeting — over 100 individual checks.",
  ],
  [
    "How is this different from free SEO checker tools?",
    "Single-page checkers scan one URL and spit out generic warnings. The agents crawl the whole site, cross-check each other (the Indexing agent verifies what the Sitemap agent found, the Performance agent re-measures after fixes), and every finding cites real evidence from your pages — a status code, a header, a missing tag — never a guess.",
  ],
  [
    "Can you fix the issues you find?",
    "Yes. Every audit ends with a phased action plan, and I can implement it for you — technical fixes, schema, content briefs and internal linking included. You will always see the report first and approve the work before anything changes on your site.",
  ],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

const AGENTS = [
  {
    icon: "shield",
    name: "Technical SEO Agent",
    mission: "Makes sure search engines can crawl, render and index every page that matters.",
    checks: [
      "robots.txt rules and blocked assets",
      "Canonical tags and redirect chains",
      "HTTPS, HSTS and security headers",
      "Mobile readiness and JS rendering",
      "Real 404s vs soft-404 pages",
      "URL structure and hygiene",
    ],
  },
  {
    icon: "quote",
    name: "Content Quality & E-E-A-T Agent",
    mission: "Judges whether your content actually deserves to rank — depth, expertise and trust.",
    checks: [
      "Thin content detection page by page",
      "Author, About and contact trust signals",
      "First-hand experience and original data",
      "Freshness: honest publish/update dates",
      "Duplicate and near-duplicate content",
      "Disclaimers on legal/finance/health topics",
    ],
  },
  {
    icon: "dashboard",
    name: "Schema Markup Agent",
    mission: "Structured data that is present, valid and matched to each page type.",
    checks: [
      "JSON-LD inventory across page templates",
      "Required properties per schema type",
      "Schema matches visible page content",
      "Organization and WebSite entity markup",
      "LocalBusiness details where they apply",
      "Missing schema opportunities by page type",
    ],
  },
  {
    icon: "search",
    name: "Sitemap & Indexing Agent",
    mission: "Every important URL discoverable, submitted and actually indexed.",
    checks: [
      "Sitemap validity and live URL status",
      "Only canonical, indexable URLs listed",
      "Important pages missing from the sitemap",
      "Honest lastmod dates",
      "Published pages never submitted to Google",
      "Indexed vs submitted gaps in Search Console",
    ],
  },
  {
    icon: "bolt",
    name: "Performance Agent",
    mission: "Core Web Vitals fast enough that speed never costs you rankings or visitors.",
    checks: [
      "TTFB and total load time on key pages",
      "Cache headers for HTML and static assets",
      "Page weight and JavaScript chunk size",
      "LCP image handling and lazy loading",
      "Layout shift (CLS) risk patterns",
      "Real LCP / INP / CLS vs good thresholds",
    ],
  },
  {
    icon: "rocket",
    name: "AI Search Agent (GEO)",
    mission: "Makes your site the one AI answer engines — ChatGPT, Perplexity, AI Overviews — cite.",
    checks: [
      "llms.txt presence and accuracy",
      "AI crawler access in robots.txt",
      "AI visibility score (via BotView)",
      "Quotable, self-contained answers on key pages",
      "Entity clarity and Organization schema",
      "Citation gaps where thin rivals get cited",
    ],
  },
  {
    icon: "globe",
    name: "Local SEO Agent",
    mission: "Wins the map pack and 'near me' searches for local service businesses.",
    checks: [
      "Name/address/phone consistency everywhere",
      "Unique content on every location page",
      "LocalBusiness schema accuracy",
      "Google Business Profile gaps",
      "Review signals and review paths",
      "City and service keyword mapping",
    ],
  },
  {
    icon: "arrow",
    name: "Backlinks Agent",
    mission: "Knows who links to you, what those links are worth, and where the gaps are.",
    checks: [
      "Referring domains from real data sources",
      "Follow vs nofollow link balance",
      "Anchor text distribution and over-optimization",
      "Toxic and spam link patterns",
      "Broken backlinks worth recovering",
      "Link gaps vs your top competitors",
    ],
  },
  {
    icon: "check",
    name: "On-Page SEO Agent",
    mission: "Every title, meta description and heading aligned to one clear search intent.",
    checks: [
      "Missing, duplicate or over-long titles",
      "Meta descriptions that earn the click",
      "One intent-matched H1 per page",
      "Logical H2/H3 heading structure",
      "Direct answer in the first screenful",
      "Keyword cannibalization between pages",
    ],
  },
  {
    icon: "card",
    name: "Image SEO Agent",
    mission: "Images that rank in image search — and never slow the page down.",
    checks: [
      "Missing or empty alt attributes",
      "Descriptive, human alt text (no stuffing)",
      "Oversized image files and compression",
      "Modern formats: WebP and AVIF",
      "Width/height set to prevent layout shift",
      "Descriptive file names on key images",
    ],
  },
  {
    icon: "search",
    name: "Keyword Research Agent",
    mission: "Picks the next keywords worth building for — with live SERP evidence, not guesses.",
    checks: [
      "Bottom-of-funnel queries (cost, best, near me)",
      "Untapped demand: volume with weak ranking pages",
      "AI Overview citation analysis",
      "Live Google position checks for your site",
      "Striking-distance queries (positions 8–20)",
      "One keyword mapped to exactly one page",
    ],
  },
  {
    icon: "star",
    name: "Competitor Analysis Agent",
    mission: "Shows exactly what the pages outranking you do better — so you can beat them on substance.",
    checks: [
      "Real SERP competitors for target queries",
      "Content depth and coverage comparison",
      "Search intent and page-type match",
      "SERP features and schema they win",
      "Authority and referring-domain comparison",
      "Content gaps to cover in your own words",
    ],
  },
  {
    icon: "chat",
    name: "Internal Linking Agent",
    mission: "No orphan pages, no wasted authority — link equity flows to the pages that earn.",
    checks: [
      "Orphan pages with zero internal links",
      "Pages held up by a single internal link",
      "Descriptive anchor text quality",
      "Hub-to-spoke cluster linking both ways",
      "Links from top content to money pages",
      "Broken links and links to redirected URLs",
    ],
  },
  {
    icon: "dashboard",
    name: "Content Brief Agent",
    mission: "Turns a winning keyword into a brief a writer can execute without guessing.",
    checks: [
      "Keyword, intent and live SERP evidence",
      "Title, H1 and meta description drafts",
      "Section-by-section outline with sources",
      "Word-count target from competitor depth",
      "Internal link and schema plan",
      "FAQ questions from real query variants",
    ],
  },
];

const LIVE_TOOLS = [
  {
    icon: "rocket",
    name: "BotView",
    href: "/botview",
    desc: "AI visibility auditor: checks your llms.txt, AI-crawler robots rules and JSON-LD, then scores how ready your site is to be cited by AI search — out of 100.",
  },
  {
    icon: "search",
    name: "Keyword Traffic Checker",
    href: "/keyword-traffic-checker",
    desc: "A hybrid tool-plus-guide that estimates keyword traffic potential and shows you how to judge whether a keyword is worth building a page for.",
  },
  {
    icon: "dashboard",
    name: "SEO Agent Kit",
    href: "/seo-agent-kit",
    desc: "The open-source SEO toolkit behind the agents: crawl checks, schema helpers and audit utilities you can run on any site, free.",
  },
  {
    icon: "shield",
    name: "AdSense Low Value Content Checker",
    href: "/adsense-low-value-content-checker",
    desc: "Diagnoses the thin and low-value content patterns that get AdSense applications rejected — and tells you what to fix before you reapply.",
  },
];

const SCORE_WEIGHTS = [
  ["Technical SEO", "22%"],
  ["Content Quality", "23%"],
  ["On-Page SEO", "20%"],
  ["Schema & Structured Data", "10%"],
  ["Performance (CWV)", "10%"],
  ["AI Search Readiness", "10%"],
  ["Images", "5%"],
];

const COMPARISON: [string, string, string, string][] = [
  ["Coverage", "Whole site — 14 disciplines, 100+ checks", "One URL, one discipline at a time", "Whole site, but sampled by hand"],
  ["Evidence", "Every finding quotes what was actually fetched", "Generic warnings with no page-level proof", "Only as good as the auditor's notes"],
  ["Cross-checking", "Agents verify each other's findings before scoring", "None — a single pass against a fixed rulebook", "Limited by time and attention"],
  ["Action plan", "Phased plan, Critical → Low, quick wins flagged", "A score and a list of generic tips", "Yes, but quality and timelines vary"],
  ["Speed", "Full audit delivered in hours", "Seconds — for one page at a time", "Days to weeks"],
  ["Cost", "Audit free; fixes quoted after you see the report", "Free tier, full report behind a paywall", "Typically hundreds to thousands of dollars"],
];

const STEPS = [
  {
    t: "Share your URL",
    d: "Send your website address through the contact form. No access or logins needed — the agents work from the public site, Search Console data and live SERPs.",
  },
  {
    t: "Agents crawl & check",
    d: "The orchestrator crawls your site and dispatches the 14 specialists. Every finding is backed by something actually fetched: a status code, a header, a tag, a timing.",
  },
  {
    t: "Get the scored report",
    d: "One report: your SEO Health Score, what is already working, and every issue grouped Critical → Low with the evidence and the exact fix for each.",
  },
  {
    t: "Fix it — or I fix it",
    d: "Work the phased action plan yourself, or hand it over: technical fixes, schema, briefs and internal linking implemented and re-measured for you.",
  },
];

export default function SeoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="bg-orange-50 dot-grid py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-4">
            SEO Agents
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-stone-900 leading-tight max-w-3xl">
            A team of SEO agents, <span className="text-gold-gradient">auditing your site like specialists</span>
          </h1>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl leading-relaxed">
            Not one generic scanner — 14 specialist agents, each with its own checklist, coordinated by a
            full-audit orchestrator. Technical SEO, content quality, schema, Core Web Vitals, AI search,
            backlinks and more, merged into one scored report with a fix plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={btnPrimary}>
              Get a Free SEO Audit <Icon name="arrow" className="w-5 h-5" />
            </Link>
            <a href="#agents" className={btnOutline}>
              Meet the agents <Icon name="search" className="w-5 h-5" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-600">
            {["100+ individual checks", "Evidence-backed findings only", "Free audit — no card, no obligation"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-orange-600" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FULL SEO AUDIT — ORCHESTRATOR */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The orchestrator"
            title="Full SEO Audit — one agent in charge, fourteen on the job"
            sub="The SEO Audit Agent scopes your site, crawls it, dispatches every specialist, then verifies, scores and merges their findings into a single prioritized report."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-8">
              <h3 className="font-display text-xl font-bold text-stone-900 mb-4">How your Health Score is built</h3>
              <div className="space-y-3">
                {SCORE_WEIGHTS.map(([label, w]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex-1 text-sm font-semibold text-stone-700">{label}</span>
                    <span className="w-40 h-2.5 rounded-full bg-stone-200 overflow-hidden">
                      <span className="block h-full bg-orange-500 rounded-full" style={{ width: w }} />
                    </span>
                    <span className="w-10 text-right font-display font-bold text-orange-700">{w}</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-stone-600 leading-relaxed">
                Weights reflect what actually moves rankings: content quality and technical health first,
                surface polish last.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <h3 className="font-display text-xl font-bold text-stone-900 mb-4">What you receive</h3>
              <ul className="space-y-3.5">
                {[
                  "SEO Health Score (0–100) with per-category scores",
                  "A 'what is working' list — so you never break what already ranks",
                  "Findings grouped Critical → High → Medium → Low, each with evidence and the exact fix",
                  "A phased action plan: Week 1 critical fixes, Weeks 2–3 high impact, Month 2 content & authority",
                  "Quick wins flagged separately — the five fixes with the best effort-to-impact ratio",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-stone-600 leading-relaxed">
                    <Icon name="check" className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/contact" className={btnPrimary}>
                  Run my free audit <Icon name="arrow" className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-stone-600 leading-relaxed text-[15px]">
            One more step runs before your score is calculated: the verification pass. The orchestrator
            re-fetches the pages behind every Critical and High finding and confirms each problem still
            reproduces. Anything that cannot be reproduced — a one-off server hiccup, a stale crawl
            artifact — is removed from the report. The Health Score you receive is a measurement of your
            site as it stands today, not a snapshot of one crawl&apos;s bad luck.
          </p>
        </div>
      </section>

      {/* AGENTS GRID */}
      <section id="agents" className="py-16 sm:py-20 bg-stone-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The specialists"
            title="Meet the 14 SEO agents"
            sub="Each agent owns one discipline and runs its own checklist against your live site. Run one on its own, or all fourteen in a full audit."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((a, i) => (
              <div
                key={a.name}
                className="rounded-3xl border border-stone-200 bg-white p-8 hover:shadow-xl hover:border-orange-200 transition group"
              >
                <span className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-800 grid place-items-center mb-5 group-hover:bg-orange-600 group-hover:text-white transition">
                  <Icon name={a.icon} className="w-7 h-7" />
                </span>
                <p className="font-display font-bold text-stone-300 text-lg mb-1">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{a.name}</h3>
                <p className="text-stone-600 leading-relaxed text-[15px] mb-5">{a.mission}</p>
                <ul className="space-y-2">
                  {a.checks.map((c) => (
                    <li key={c} className="flex gap-2.5 text-sm text-stone-600 leading-relaxed">
                      <Icon name="check" className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AGENTS BEAT SINGLE TOOLS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="Why agents, not scanners"
            title="Why an agent-based audit finds what single tools miss"
            sub="A single-purpose checker sees one page and one rulebook. Fourteen specialists see the whole site — and they check each other's work."
          />
          <div className="max-w-3xl space-y-5 text-stone-600 leading-relaxed text-[15px]">
            <p>
              Most SEO checkers are built around a single moment: you paste in one URL, the tool runs a
              fixed list of generic rules, and you get a score. That model has a structural blind spot,
              because real SEO problems rarely live on one page. A canonical tag only matters in relation
              to what your sitemap declares. A thin page only hurts when stronger pages link to it with
              the wrong anchor text. A schema error only costs you traffic when a competitor&apos;s valid
              markup wins the rich result your page was eligible for. Every one of those failures lives
              between pages — exactly where a single-page scan cannot look.
            </p>
            <p>
              The agents work the opposite way: no finding reaches your report until it has survived a
              cross-check from another specialist. When the Sitemap &amp; Indexing Agent reports a URL as
              submitted, the Technical SEO Agent independently fetches it and confirms the status code and
              canonical agree. When the Content Quality Agent flags a page as thin, the Internal Linking
              Agent checks how the site itself treats that page — a thin page holding forty internal links
              is a ranking risk to rewrite, while a thin page with none is a merge-or-delete candidate.
              When the Performance Agent finds a slow template, it re-measures after the fix, so any
              improvement in your report is a fresh measurement, not a promise.
            </p>
            <p>
              The third difference is evidence. A warning like &ldquo;improve content quality&rdquo;
              cannot be acted on, disputed or verified. An agent finding names the exact page, quotes
              what was actually fetched — the response header, the status code, the missing schema
              property, the timing — and states the specific fix. If two agents disagree, the orchestrator
              re-fetches the page and lets the evidence decide. That discipline is why the audit ends in a
              plan you can hand to any developer, instead of a score you have to take on faith.
            </p>
          </div>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-stone-200">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="bg-orange-50 text-stone-900">
                  <th className="px-5 py-4 font-display font-bold">What matters</th>
                  <th className="px-5 py-4 font-display font-bold text-orange-800">Frinjo SEO Agents</th>
                  <th className="px-5 py-4 font-display font-bold">Single-purpose tools</th>
                  <th className="px-5 py-4 font-display font-bold">Manual audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                {COMPARISON.map(([label, agents, tools, manual]) => (
                  <tr key={label} className="align-top">
                    <th className="px-5 py-4 font-bold text-stone-900">{label}</th>
                    <td className="px-5 py-4 font-semibold text-stone-700">{agents}</td>
                    <td className="px-5 py-4 text-stone-600">{tools}</td>
                    <td className="px-5 py-4 text-stone-600">{manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LIVE TOOLS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="Run them yourself"
            title="Free SEO tools, live on this site"
            sub="Four of the agents' instruments are public tools — run them on your own site right now, free, no sign-up."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {LIVE_TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="rounded-3xl border border-stone-200 bg-stone-50/60 p-8 hover:shadow-xl hover:border-orange-200 transition group block"
              >
                <span className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-800 grid place-items-center mb-5 group-hover:bg-orange-600 group-hover:text-white transition">
                  <Icon name={t.icon} className="w-7 h-7" />
                </span>
                <h3 className="font-display text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2">
                  {t.name}
                  <Icon name="arrow" className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-stone-600 leading-relaxed">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead eyebrow="How it works" title="From URL to action plan in 4 steps" />
          <div className="grid gap-5 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.t} className="relative rounded-2xl border border-stone-200 p-7 bg-white hover:border-orange-300 transition">
                <span className="w-11 h-11 rounded-full bg-orange-600 text-white font-display font-bold grid place-items-center mb-4 text-lg">
                  {i + 1}
                </span>
                <h3 className="font-bold text-stone-900 mb-2">{s.t}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{s.d}</p>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-orange-300">
                    <Icon name="arrow" className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER + CTA */}
      <section className="py-16 sm:py-20 bg-orange-50 dot-grid">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHead
            eyebrow="Pricing"
            title="The audit is free. Fixes are quoted after you see it."
            sub="No retainer traps and no invented numbers — you get the full scored report first, then decide what is worth fixing."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left mb-10">
            {[
              { n: "Free SEO Audit", p: "$0", d: "All 14 agents, the Health Score and the full findings report. Yours to keep either way." },
              { n: "Single-Agent Deep Dive", p: "from $99", d: "One discipline in depth — technical, content, schema or AI search — with a fix list your developer can run.", popular: true },
              { n: "Audit + Implementation", p: "custom", d: "I implement the action plan for you and re-run the agents to prove the score moved." },
            ].map((t) => (
              <div
                key={t.n}
                className={`rounded-3xl p-8 border-2 bg-white ${t.popular ? "border-orange-500 shadow-xl shadow-orange-200/50" : "border-stone-200"}`}
              >
                {t.popular && (
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-4">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-stone-900">{t.n}</h3>
                <p className="font-display text-3xl font-bold text-orange-700 mt-2 mb-3">{t.p}</p>
                <p className="text-sm text-stone-600 leading-relaxed">{t.d}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className={btnPrimary}>
            Book My Free SEO Audit <Icon name="arrow" className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-sm text-stone-500">You will leave with a clear, prioritized plan either way — implement it yourself or hand it over.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="SEO agent questions, answered" />
          <div className="space-y-3">
            {FAQS.map(([q, a]) => (
              <details key={q} className="rounded-2xl border border-stone-200 bg-stone-50/60 open:bg-white open:shadow-md transition group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-bold text-stone-900 [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 grid place-items-center group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-6 text-stone-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className={btnOutline}>
              Still have questions? Ask me <Icon name="arrow" className="w-5 h-5" />
            </Link>
            <p className="mt-5 text-sm text-stone-500">
              Want the whole toolbox? Browse all <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link> — calculators, generators and checkers included.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
