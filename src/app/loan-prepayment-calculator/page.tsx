import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import LoanPrepaymentCalculator from "./LoanPrepaymentCalculator";

export const metadata = {
  title: "Loan Prepayment Calculator — Interest Saved & New Tenure",
  description:
    "Free loan prepayment calculator for India: enter a lump-sum prepayment and when you make it to see interest saved and how many months earlier the loan ends. EMI stays the same.",
  keywords: [
    "loan prepayment calculator",
    "prepayment calculator",
    "home loan prepayment calculator",
    "part payment calculator",
    "loan foreclosure calculator india",
  ],
  alternates: {
    canonical: "https://frinjo.me/loan-prepayment-calculator",
    languages: {
      en: "https://frinjo.me/loan-prepayment-calculator",
      "x-default": "https://frinjo.me/loan-prepayment-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Loan Prepayment Calculator — What a Lump Sum Really Saves | Frinjo",
    description:
      "₹1,00,000 prepaid after a year on a ₹5,00,000 loan saves ₹51,295 and ends the loan 13 months early. Price your own prepayment before you make it.",
    url: "https://frinjo.me/loan-prepayment-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Loan Prepayment Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/loan-prepayment-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Simulates a reducing-balance loan month by month twice: once on the original schedule and once with a lump-sum prepayment applied after a chosen number of EMIs, the EMI held constant. Reports interest saved, the new (shorter) tenure and both total-interest figures. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Loan Prepayment Calculator", item: "https://frinjo.me/loan-prepayment-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much does prepaying actually save? A worked example",
    "On a ₹5,00,000 loan at 12% for 60 months, the total interest is ₹1,67,333. Prepay ₹1,00,000 after 12 EMIs — keeping the EMI at ₹11,122.22 — and the loan closes in month 47 instead of 60, with total interest of ₹1,16,038. You saved ₹51,295 of interest and 13 months of payments. The prepayment earned its keep because every rupee of it stopped attracting 12% interest for the remaining four years.",
  ],
  [
    "Why does prepaying early save so much more than prepaying late?",
    "Interest is charged on the outstanding balance, and the balance is largest at the start. A rupee prepaid in month 12 avoids interest for 48 months; the same rupee prepaid in month 48 avoids it for 12. Early EMIs are also mostly interest, so early lump sums cut into principal that the schedule itself was barely touching. If a bonus is coming, the month it arrives matters almost as much as its size.",
  ],
  [
    "Should I choose a lower EMI or a shorter tenure after prepaying?",
    "Shorter tenure, almost always. Keeping the EMI unchanged directs the entire benefit into killing the loan sooner, which maximises interest saved. Reducing the EMI keeps the end date — and most of the interest — intact; it only makes sense when cash flow, not cost, is the problem. This calculator models the shorter-tenure route, which is also the default most banks apply.",
  ],
  [
    "Are there prepayment charges?",
    "For floating-rate home loans to individuals, the RBI prohibits prepayment and foreclosure charges entirely. Fixed-rate loans, personal loans and loans to businesses may charge — typically 2–5% of the amount prepaid, sometimes only within a lock-in period. Subtract any charge from the interest saved here before deciding; on the worked example even a 4% charge (₹4,000) leaves the prepayment far ahead.",
  ],
  [
    "Is prepaying always better than investing the money?",
    "Prepaying earns a guaranteed, tax-free return equal to your loan rate — 12% in the example. An investment must beat that after tax and risk to win, which equity sometimes does over long periods and debt funds rarely do at these rates. The exception: keep an emergency fund untouched. A prepaid loan cannot be re-borrowed in a crisis at the same rate, or possibly at all.",
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

export default function LoanPrepaymentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Interest saved · Months cut
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Loan Prepayment <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            One lump sum can delete a year of EMIs
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Enter your loan, a <strong>prepayment amount</strong> and <strong>when you will make
            it</strong> — the EMI stays the same, and this tool shows the <strong>interest
            saved</strong> and the <strong>new, earlier end date</strong>.
          </p>
        </div>
      </section>

      <LoanPrepaymentCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="The loan is simulated twice, month by month"
            sub="Once on the schedule you signed, once with your lump sum dropped in. The difference is your saving."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The mechanism</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Principal dies, interest follows</h3>
              <p className="text-stone-600 leading-relaxed">
                A prepayment cuts the balance instantly. Since every future month&apos;s interest is
                charged on that balance, the cut compounds quietly for the rest of the loan — the
                saving is several times the interest on the lump sum for a single year.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The timing</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Earlier beats bigger</h3>
              <p className="text-stone-600 leading-relaxed">
                ₹1,00,000 prepaid after 12 EMIs on the example loan saves ₹51,295; the same amount
                after 36 EMIs saves well under half that. The balance is highest — and interest
                heaviest — at the start, so that is where lump sums do their work.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The choice</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Same EMI, shorter loan</h3>
              <p className="text-stone-600 leading-relaxed">
                Holding the EMI constant converts the whole prepayment into time: 13 fewer months on
                the example. Asking for a smaller EMI instead spends the benefit on monthly comfort
                and keeps most of the interest alive.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The fine print</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Charges and lock-ins</h3>
              <p className="text-stone-600 leading-relaxed">
                Floating-rate home loans: no prepayment charge, by RBI rule. Other loans: check for
                2–5% charges and lock-in periods, and confirm the prepayment goes to principal from
                the day you pay it — not from the next cycle.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/loan-apr-calculator" className="font-semibold text-orange-700 hover:text-orange-800">loan APR calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Prepayment questions, answered" />
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
              Price my prepayment <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimates with the EMI held constant; prepayment charges, if any, are not deducted.
          </p>
        </div>
      </section>
    </>
  );
}
