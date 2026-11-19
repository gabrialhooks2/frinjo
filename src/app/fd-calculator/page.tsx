import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import FdCalculator from "./FdCalculator";

export const metadata = {
  title: "FD Calculator — Fixed Deposit Maturity & Interest",
  description:
    "Free FD calculator for India: deposit, rate and tenure with monthly, quarterly, half-yearly or yearly compounding — plus cumulative vs non-cumulative payout. Maturity value in seconds.",
  keywords: [
    "fd calculator",
    "fixed deposit calculator",
    "fd maturity calculator",
    "fd interest calculator",
    "fixed deposit interest calculator india",
  ],
  alternates: {
    canonical: "https://frinjo.me/fd-calculator",
    languages: {
      en: "https://frinjo.me/fd-calculator",
      "x-default": "https://frinjo.me/fd-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "FD Calculator — Fixed Deposit Maturity Value | Frinjo",
    description:
      "Maturity value and interest for any Indian fixed deposit, with the compounding frequency and payout type your bank actually uses.",
    url: "https://frinjo.me/fd-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FD Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/fd-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Fixed deposit calculator: maturity = P × (1 + r/f)^(f × t) for cumulative deposits, where f is the compounding frequency per year (Indian banks compound quarterly by default). Non-cumulative mode pays simple interest of P × r ÷ f each period and returns the principal at maturity. Tenure can be entered in years, months and days. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "FD Calculator", item: "https://frinjo.me/fd-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is FD interest calculated? A worked example",
    "Indian banks compound FD interest quarterly by default: Maturity = P × (1 + r/4)^(4 × years). Example: ₹1,00,000 at 7% for 1 year becomes 1,00,000 × (1.0175)^4 = ₹1,07,186 — interest of ₹7,186, which is more than the ₹7,000 simple interest would give. That extra ₹186 is compounding: interest earning interest. Over 5 years the same deposit grows to about ₹1,41,478.",
  ],
  [
    "Cumulative vs non-cumulative FD — which should I choose?",
    "Cumulative reinvests the interest, so your money compounds and the maturity value is higher. Non-cumulative pays the interest out monthly or quarterly and returns exactly your principal at the end — on ₹1,00,000 at 7%, that is ₹1,750 a quarter and ₹7,000 over the year, ₹186 less than the cumulative route. Choose cumulative for growth, non-cumulative when the FD is meant to produce income, for example for a retired parent's expenses.",
  ],
  [
    "Why does the bank's maturity value differ slightly from this calculator?",
    "Banks count exact calendar days and credit interest at quarter-ends, so an FD opened mid-quarter earns a few rupees differently from the smooth formula. Senior citizens also get an extra 0.25–0.50% at most banks, which you should add to the rate before calculating. The figure here matches the standard formula banks publish; your FD receipt remains the final word.",
  ],
  [
    "Is FD interest taxable?",
    "Yes — FD interest is taxed at your income-tax slab rate in the year it accrues, and the bank deducts 10% TDS when interest in a financial year crosses ₹50,000 (₹1,00,000 for senior citizens). A 7% FD in the 30% slab really earns about 4.9% after tax — worth remembering when comparing an FD with alternatives.",
  ],
  [
    "What happens if I break the FD early?",
    "Banks pay the rate for the period the deposit actually stayed, minus a penalty of usually 0.5–1%. An FD booked at 7% for 5 years but broken after 1 year might earn the 1-year rate of, say, 6.5% minus 1% penalty — about 5.5%. Laddering deposits across tenures is the standard defence: something is always near maturity.",
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

export default function FdCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Quarterly compounding · Both payout types
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            FD <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            What your fixed deposit will actually be worth
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Deposit, rate and tenure — with the <strong>compounding frequency</strong> and{" "}
            <strong>payout type</strong> your bank actually uses, so the maturity value here matches
            the one on your FD receipt.
          </p>
        </div>
      </section>

      <FdCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Quarterly compounding is the Indian default"
            sub="Most FD calculators abroad assume yearly compounding. Indian banks compound every quarter — and it changes the answer."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The formula</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Maturity = P × (1 + r/f)ᶠᵗ</h3>
              <p className="text-stone-600 leading-relaxed">
                f is how many times a year interest is added — 4 for quarterly. Each addition starts
                earning interest itself, which is why a 7% FD yields about 7.19% effective over a year.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Cumulative</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest stays in and grows</h3>
              <p className="text-stone-600 leading-relaxed">
                Nothing is paid out until maturity. Every quarter&apos;s interest joins the principal,
                so the growth speeds up slightly with every passing quarter.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Non-cumulative</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest arrives as income</h3>
              <p className="text-stone-600 leading-relaxed">
                The bank pays simple interest each period — ₹1,750 a quarter on ₹1,00,000 at 7% — and
                returns the principal untouched. No compounding, but a predictable income stream.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Days count too</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Tenures are rarely round years</h3>
              <p className="text-stone-600 leading-relaxed">
                Real FDs run 15 months, 400 days, 18 months and 10 days. Enter years, months and days
                separately here — the calculator converts them the way a bank&apos;s interest run does.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/rd-calculator" className="font-semibold text-orange-700 hover:text-orange-800">RD calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Fixed deposit questions, answered" />
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
              Calculate my FD <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimates using the standard quarterly-compounding formula; premature-withdrawal penalties
            and TDS are not deducted.
          </p>
        </div>
      </section>
    </>
  );
}
