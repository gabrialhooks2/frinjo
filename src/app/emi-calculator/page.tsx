import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import EmiCalculator from "./EmiCalculator";

export const metadata = {
  title: "EMI Calculator — Monthly EMI, Total Interest & Cost",
  description:
    "Free EMI calculator for India: loan amount, interest rate and tenure give your monthly EMI, total interest, total payment and the interest share of every rupee you pay.",
  keywords: [
    "emi calculator",
    "loan emi calculator",
    "emi calculator india",
    "monthly emi calculator",
    "home loan emi calculator",
    "personal loan emi calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/emi-calculator",
    languages: {
      en: "https://frinjo.me/emi-calculator",
      "x-default": "https://frinjo.me/emi-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "EMI Calculator — Monthly EMI & Total Interest | Frinjo",
    description:
      "EMI, total interest and total payment for any loan in India — with the interest share of your payments shown, not hidden.",
    url: "https://frinjo.me/emi-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EMI Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/emi-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Computes the equated monthly instalment for a reducing-balance loan: EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where r is the monthly rate (annual rate ÷ 1200) and n the number of months. Shows total interest, total payment and the percentage of all payments that is interest. Tenure can be entered in months or years. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "EMI Calculator", item: "https://frinjo.me/emi-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is EMI calculated? A worked example",
    "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (yearly rate ÷ 12 ÷ 100) and n is the tenure in months. Example: ₹1,00,000 at 12% for 12 months gives r = 0.01 and an EMI of ₹8,884.88. You pay ₹1,06,618.55 in total, so the interest is ₹6,618.55 — about 6.2% of everything you hand over.",
  ],
  [
    "Why does a longer tenure cost so much more?",
    "Because interest is charged every month on whatever balance remains, and a longer tenure keeps the balance high for longer. The same ₹5,00,000 at 12% costs ₹97,858 in interest over 3 years but ₹1,67,333 over 5 years and ₹2,80,136 over 8 years — while the EMI falls from ₹16,607 to ₹8,126. A smaller EMI is not a cheaper loan; it is a slower, more expensive one. Pick the shortest tenure whose EMI your budget can carry comfortably.",
  ],
  [
    "What is the interest share shown in the result?",
    "Total interest divided by total payment — the fraction of all the money you pay that never reduces your loan. On a 5-year ₹5,00,000 loan at 12% it is about 25%. On a 20-year home loan it can pass 45%. It is the quickest single number for comparing two loan offers with different rates and tenures.",
  ],
  [
    "Does the EMI change if I prepay part of the loan?",
    "Usually not — most banks keep the EMI the same and shorten the tenure instead, which is the better outcome for you: the loan ends earlier and total interest falls sharply. Some lenders let you choose a lower EMI with the same end date instead. Run the numbers on the loan prepayment calculator to see exactly how much a lump sum saves in each case.",
  ],
  [
    "Is a flat-rate EMI the same as a reducing-balance EMI?",
    "No — and the difference is expensive. A flat rate charges interest on the full original amount for the whole tenure; a reducing (floating) rate charges only on the balance still owed. A 10% flat rate over one year costs roughly the same as a 17–18% reducing rate. If a lender quotes a suspiciously low rate, check whether it is flat — the flat vs reducing calculator shows both side by side.",
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

export default function EmiCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Any loan · No sign-up
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            EMI <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            The monthly payment — and what the loan really costs
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Loan amount, interest rate and tenure give you the <strong>monthly EMI</strong>, the{" "}
            <strong>total interest</strong> and the <strong>share of your payments</strong> that is
            pure interest — the number lenders prefer to leave in the small print.
          </p>
        </div>
      </section>

      <EmiCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="One formula runs every EMI loan in India"
            sub="Home, car, personal, education — the lender changes, the arithmetic does not."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The formula</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</h3>
              <p className="text-stone-600 leading-relaxed">
                P is the loan amount, r the monthly rate and n the months. It is built so that every
                payment is identical while the balance falls to exactly zero on the last one.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Inside each EMI</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest first, principal later</h3>
              <p className="text-stone-600 leading-relaxed">
                Early EMIs are mostly interest; late EMIs are mostly principal. Halfway through a
                5-year loan you have repaid well under half the amount — which is why prepaying early
                saves so much more than prepaying late.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The tenure trap</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">A lower EMI is a longer debt</h3>
              <p className="text-stone-600 leading-relaxed">
                Stretching ₹5,00,000 at 12% from 3 years to 8 years cuts the EMI by about ₹8,481 a
                month but adds roughly ₹1,82,000 of interest. Salespeople quote the EMI; this
                calculator quotes the cost.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Reducing balance</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest only on what you still owe</h3>
              <p className="text-stone-600 leading-relaxed">
                Bank EMIs use the reducing-balance method: each month&apos;s interest is charged on the
                balance left after the last payment. If an offer sounds too cheap for its rate, it is
                probably a flat rate in disguise — check it before you sign.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/byaj-calculator" className="font-semibold text-orange-700 hover:text-orange-800">byaj calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="EMI questions, answered" />
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
              Calculate my EMI <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimates for reducing-balance loans with monthly rests. Your sanction letter&apos;s
            amortisation schedule is the final word.
          </p>
        </div>
      </section>
    </>
  );
}
