import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import SeoToolRunner, { type SeoToolMode } from "@/components/SeoToolRunner";
import type { SeoToolId } from "@/lib/seo-tools";

export interface SeoToolPageConfig {
  slug: string;
  name: string;
  tool: SeoToolId;
  mode?: SeoToolMode;
  tagline: string;
  intro: string;
  checksTitle: string;
  checksSub: string;
  cards: { title: string; desc: string }[];
  faqs: [string, string][];
}

const card =
  "rounded-3xl border border-stone-200 bg-white p-8 hover:shadow-xl hover:border-orange-200 transition";

export default function SeoToolPage({ cfg, initialUrl = "" }: { cfg: SeoToolPageConfig; initialUrl?: string }) {
  const url = `https://frinjo.me/${cfg.slug}`;
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: cfg.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
    description: cfg.intro,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
      { "@type": "ListItem", position: 3, name: cfg.name, item: url },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cfg.faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Instant report
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-stone-900 leading-tight">{cfg.name}</h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">{cfg.tagline}</p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">{cfg.intro}</p>
        </div>
      </section>

      {/* RUNNER */}
      <SeoToolRunner tool={cfg.tool} toolName={cfg.name} mode={cfg.mode ?? "single"} initialUrl={initialUrl} />

      {/* WHAT IT CHECKS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead eyebrow="The checks" title={cfg.checksTitle} sub={cfg.checksSub} />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            {cfg.cards.map((c) => (
              <div key={c.title} className={card}>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{c.title}</h3>
                <p className="text-stone-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-stone-600">
            Part of the free <Link href="/seo" className="font-semibold text-orange-700 hover:text-orange-800">SEO checker suite</Link>{" "}
            — also try <Link href="/botview" className="font-semibold text-orange-700 hover:text-orange-800">BotView</Link> for the
            full SEO + AEO + AI-visibility audit, and the{" "}
            <Link href="/keyword-traffic-checker" className="font-semibold text-orange-700 hover:text-orange-800">Keyword Traffic Checker</Link>{" "}
            before you build a page for a keyword.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-orange-50 dot-grid">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHead
            eyebrow="Done-for-you"
            title="Want the fixes done for you?"
            sub="This checker shows exactly what is holding a page back. WebStore Pro can run the full 14-agent audit on your whole site and implement the fixes."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={btnPrimary}>
              Get a Free SEO Audit <Icon name="arrow" className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/923258774221" target="_blank" rel="noopener noreferrer" className={btnOutline}>
              WhatsApp +92 325 8774221
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title={`${cfg.name} questions, answered`} />
          <div className="space-y-3">
            {cfg.faqs.map(([q, a]) => (
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
            <a href="#top" className={btnPrimary}>
              Run a free check <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
