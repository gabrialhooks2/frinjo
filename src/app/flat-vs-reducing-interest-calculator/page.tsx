import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import FlatVsReducingCalculator from "./FlatVsReducingCalculator";

export const metadata = {
  title: "Flat vs Reducing Interest Calculator — True Cost Compared",
  description:
    "Compare a flat-rate loan with a reducing-balance loan side by side: total interest, monthly payment and what the flat rate really equals as a reducing rate. Free, no sign-up.",
  keywords: [
    "flat vs reducing interest calculator",
    "flat rate vs reducing balance",
    "flat interest calculator",
    "reducing balance calculator",
    "flat rate loan true cost",
  ],
  alternates: {
    canonical: "https://frinjo.me/flat-vs-reducing-interest-calculator",
    languages: {
      en: "https://frinjo.me/flat-vs-reducing-interest-calculator",
      "x-default": "https://frinjo.me/flat-vs-reducing-interest-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Flat vs Reducing Interest Calculator | Frinjo",
    description:
      "A 10% flat rate costs like an 18% reducing rate. Price both methods on your loan and see the difference in rupees, not adjectives.",
    url: "https://frinjo.me/flat-vs-reducing-interest-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Flat vs Reducing Interest Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/flat-vs-reducing-interest-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Compares two interest methods on the same loan. Flat: total interest = principal × flat rate × years, charged on the full original amount throughout; payment = (principal + interest) ÷ months. Reducing balance: standard EMI formula with interest only on the outstanding balance. Also solves the reducing rate equivalent to the flat quote by bisection. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Flat vs Reducing Interest Calculator", item: "https://frinjo.me/flat-vs-reducing-interest-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is the difference between flat and reducing interest? A worked example",
    "Flat interest is charged on the original loan amount for the entire tenure, even as you repay. Reducing interest is charged only on the balance still owed. Example: ₹1,00,000 for 1 year at 10%. Flat: interest is a straight ₹10,000 and the payment is ₹9,166.67 a month. Reducing: the EMI is ₹8,791.59 and the total interest is ₹5,499.06. Same loan, same headline rate — the flat method charges about 1.8 times the interest, and the gap widens on longer tenures.",
  ],
  [
    "What reducing rate equals a 10% flat rate?",
    "About 17.97% on a 1-year loan — the calculator above solves it exactly for your tenure. The conversion depends on tenure because the balance falls at different speeds: over 3 years a 10% flat rate is roughly a 19% reducing rate. The working rule is “flat × 1.8” for typical consumer tenures, but the exact figure is one bisection away, and this tool does it.",
  ],
  [
    "Why do dealers and some NBFCs quote flat rates?",
    "Because the number looks smaller. A two-wheeler or consumer-durable loan at “9%” flat outsells the identical loan at “16% reducing”, even though the EMI and total cost are the same. RBI rules require banks to disclose the annualised rate on a reducing basis, but dealer-led finance often leads with the flat figure. Ask one question — “is this rate flat or reducing?” — and the cheaper-sounding offer usually reprices itself.",
  ],
  [
    "Which method do banks use?",
    "Banks use reducing balance for EMI loans — home, car, personal — with interest on the daily or monthly outstanding. Flat rates survive in dealer finance, some microfinance and informal lending. Microfinance has its own regulated pricing disclosures, but informal flat quotes carry no such protection, which is why the conversion matters most exactly there.",
  ],
  [
    "Is a flat-rate loan ever the right choice?",
    "Occasionally: very short tenures shrink the gap, and a flat-rate offer with zero fees can beat a reducing offer carrying heavy processing charges. Compare total cost — everything you pay minus what you received — not the rate label. This calculator gives the interest side; add each offer's fees before deciding.",
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

export default function FlatVsReducingCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Both methods, one table
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Flat vs Reducing <span className="text-gold-gradient">Interest Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Same rate, two prices — the method is the markup
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            A flat rate charges interest on money you have already repaid. Price your loan{" "}
            <strong>both ways</strong> and see the <strong>extra interest</strong> the flat method
            takes — and the <strong>reducing rate it secretly equals</strong>.
          </p>
        </div>
      </section>

      <FlatVsReducingCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Interest on the full amount vs interest on what's left"
            sub="That single difference is worth thousands of rupees on an ordinary loan."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Flat method</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The balance never shrinks — on paper</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest = principal × rate × years, fixed on day one. Repay half the loan and the
                interest charge does not fall by a rupee. Simple to quote, expensive to hold.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Reducing method</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest follows the balance down</h3>
              <p className="text-stone-600 leading-relaxed">
                Every EMI cuts the principal, so every month&apos;s interest is smaller than the last.
                The standard EMI formula prices exactly this — the method banks must use.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The conversion</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Flat × ~1.8 ≈ reducing</h3>
              <p className="text-stone-600 leading-relaxed">
                A 10% flat rate over one year produces the same payment as a 17.97% reducing rate.
                The calculator solves the exact equivalent for your amount and tenure instead of the
                rule of thumb.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Where flat survives</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Dealer finance and informal loans</h3>
              <p className="text-stone-600 leading-relaxed">
                Two-wheelers, consumer durables, some microfinance and most informal lending still
                quote flat. Those are exactly the loans where a converted rate changes the decision.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/emi-calculator" className="font-semibold text-orange-700 hover:text-orange-800">EMI calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Flat vs reducing questions, answered" />
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
              Compare my loan both ways <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Fees are not included; add each offer&apos;s processing and other charges for a full
            total-cost comparison.
          </p>
        </div>
      </section>
    </>
  );
}
