import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import RdCalculator from "./RdCalculator";

export const metadata = {
  title: "RD Calculator — Recurring Deposit Maturity & Interest",
  description:
    "Free RD calculator for India: monthly deposit, rate and tenure with quarterly compounding — maturity value, total deposited and interest earned, the way Indian banks compute it.",
  keywords: [
    "rd calculator",
    "recurring deposit calculator",
    "rd maturity calculator",
    "rd interest calculator",
    "recurring deposit interest calculator india",
  ],
  alternates: {
    canonical: "https://frinjo.me/rd-calculator",
    languages: {
      en: "https://frinjo.me/rd-calculator",
      "x-default": "https://frinjo.me/rd-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "RD Calculator — Recurring Deposit Maturity Value | Frinjo",
    description:
      "Monthly deposit in, maturity value out — with the quarterly-compounding formula Indian banks and post offices actually use for RDs.",
    url: "https://frinjo.me/rd-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "RD Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/rd-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Recurring deposit calculator using the standard Indian formula with quarterly compounding: M = R × [((1 + i)^n − 1) ÷ (1 − (1 + i)^(−1/3))], where R is the monthly deposit, i = annual rate ÷ 400 and n is the number of quarters. Shows maturity value, total deposited and interest earned. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "RD Calculator", item: "https://frinjo.me/rd-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is RD interest calculated? A worked example",
    "RDs compound quarterly, and each monthly instalment earns interest only for the time it stays in the account. The standard formula is M = R × [((1 + i)^n − 1) ÷ (1 − (1 + i)^(−1/3))], with i = yearly rate ÷ 400 and n = quarters. Example: ₹5,000 a month at 7% for 1 year matures at about ₹62,311 — you deposited ₹60,000 and earned roughly ₹2,311. That is less than a ₹60,000 FD would earn, because the FD's full amount works from day one.",
  ],
  [
    "Why does an RD earn less than an FD at the same rate?",
    "Timing, not the rate. In an FD the entire sum is invested for the full tenure. In an RD the average balance over the tenure is only about half the final amount — your last instalment is invested for barely a month. Same rate, less money at work for less time, less interest. The RD's real product is the habit: it builds the lump sum an FD then grows.",
  ],
  [
    "What happens if I miss an RD instalment?",
    "Banks charge a penalty — commonly ₹1–2 per ₹100 of instalment per month of delay — and the instalment can be paid late within the same month at most banks. Several missed instalments can get the account closed or marked irregular. A standing instruction from your savings account on salary day is the standard fix.",
  ],
  [
    "Can I close an RD early?",
    "Yes, but the interest is recalculated at the rate for the period actually completed, minus a premature-withdrawal penalty of usually 1% — the same treatment as breaking an FD. Post office RDs have their own rules, including a loan facility against the balance after one year.",
  ],
  [
    "Is RD interest taxable?",
    "Yes, at your income-tax slab, and banks deduct TDS at 10% once interest across your FDs and RDs with the bank crosses ₹50,000 in a year (₹1,00,000 for senior citizens). Interest accrues every year even though you receive it only at maturity — declare it annually rather than all in the maturity year.",
  ],
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const card =
  "rounded-3xl border border-stone-200 bg-white p-8 hover:shadow-xl hover:border-orange-200 transition";

export default function RdCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Quarterly compounding
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            RD <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            A monthly habit, priced honestly
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Enter your <strong>monthly deposit</strong>, the <strong>rate</strong> and the{" "}
            <strong>tenure</strong> to see the maturity value of a recurring deposit — with the{" "}
            <strong>quarterly compounding</strong> Indian banks and post offices actually apply.
          </p>
        </div>
      </section>

      <RdCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Every instalment has its own clock"
            sub="An RD is not one deposit — it is dozens of small deposits, each earning for a different length of time."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The formula</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Built for quarterly compounding</h3>
              <p className="text-stone-600 leading-relaxed">
                M = R × [((1 + i)ⁿ − 1) ÷ (1 − (1 + i)^(−1/3))] with i = rate ÷ 400 and n = quarters.
                The awkward-looking second term is the price of monthly deposits meeting quarterly
                interest — it credits each instalment for its exact time in the account.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">First vs last</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The first instalment does the heavy lifting</h3>
              <p className="text-stone-600 leading-relaxed">
                In a 5-year RD, the first ₹5,000 compounds for 20 quarters; the last earns for a few
                weeks. Starting a year earlier adds a full year of work for every instalment — more
                than raising the deposit does.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">RD vs FD</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">A builder, not a grower</h3>
              <p className="text-stone-600 leading-relaxed">
                The RD&apos;s job is turning salary into a lump sum without willpower. When it
                matures, the lump sum can move into an FD where the full amount compounds from day
                one — the two products are a relay team, not rivals.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Post office RD</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Same maths, government rate</h3>
              <p className="text-stone-600 leading-relaxed">
                The 5-year post office RD uses the same quarterly formula with the government-notified
                rate (7.5% in recent quarters — change the rate above to match). Deposits can be as
                small as ₹100 a month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-orange-50 dot-grid">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHead
            eyebrow="Built for you"
            title="Want a calculator like this on your site?"
            sub="WebStore Pro builds fast Full Stack Web Development projects and custom calculators that rank: designed, developed and SEO-ready from day one."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={btnPrimary}>
              Get a free quote <Icon name="arrow" className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/923258774221" target="_blank" rel="noopener noreferrer" className={btnOutline}>
              WhatsApp +92 325 8774221
            </a>
          </div>
          <p className="mt-5 text-sm text-stone-500">
            Prefer email? <a href="mailto:neilsonsmarry@gmail.com" className="font-semibold text-orange-700 hover:text-orange-800">neilsonsmarry@gmail.com</a>
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/fd-calculator" className="font-semibold text-orange-700 hover:text-orange-800">FD calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Recurring deposit questions, answered" />
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
            <a href="#top" className={btnPrimary}>
              Calculate my RD <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimates using the standard quarterly-compounding RD formula; missed-instalment penalties
            and TDS are not deducted.
          </p>
        </div>
      </section>
    </>
  );
}
