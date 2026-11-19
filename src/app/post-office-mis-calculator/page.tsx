import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import PostOfficeMisCalculator from "./PostOfficeMisCalculator";

export const metadata = {
  title: "Post Office MIS Calculator — Monthly Income Scheme Payout",
  description:
    "Free Post Office Monthly Income Scheme (POMIS) calculator: deposit up to ₹9 lakh single or ₹15 lakh joint at 7.4% and see the exact monthly payout and 5-year total income.",
  keywords: [
    "post office mis calculator",
    "pomis calculator",
    "monthly income scheme calculator",
    "post office monthly income scheme",
    "mis interest calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/post-office-mis-calculator",
    languages: {
      en: "https://frinjo.me/post-office-mis-calculator",
      "x-default": "https://frinjo.me/post-office-mis-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Post Office MIS Calculator — Monthly Payout at 7.4% | Frinjo",
    description:
      "₹9,00,000 in POMIS pays ₹5,550 every month for 5 years. Enter your deposit to get the exact monthly income, yearly total and 5-year sum.",
    url: "https://frinjo.me/post-office-mis-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Post Office MIS Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/post-office-mis-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Post Office Monthly Income Scheme calculator: monthly payout = deposit × annual rate ÷ 100 ÷ 12. Enforces the scheme rules — deposits in multiples of ₹1,000, maximum ₹9,00,000 in a single account and ₹15,00,000 in a joint account — and totals the income over the 5-year term. The rate is editable; 7.4% is the recent notified rate. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Post Office MIS Calculator", item: "https://frinjo.me/post-office-mis-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much monthly income does POMIS give? A worked example",
    "Monthly payout = deposit × rate ÷ 12. At the current 7.4%: the maximum single-account deposit of ₹9,00,000 pays ₹5,550 a month — ₹66,600 a year and ₹3,33,000 over the 5-year term, with the ₹9,00,000 itself returned at maturity. A ₹4,50,000 deposit pays ₹2,775 a month. The rate is fixed at opening for the whole term, even if the government later revises POMIS rates for new accounts.",
  ],
  [
    "What are the deposit limits and rules?",
    "Deposits must be in multiples of ₹1,000, starting at ₹1,000. One person can hold at most ₹9,00,000 across all single accounts; a joint account (up to three adults) can hold ₹15,00,000. The term is 5 years. Interest is paid monthly into your post office savings account — it does not compound inside the scheme, and unwithdrawn interest earns nothing extra.",
  ],
  [
    "Can I close the account before 5 years?",
    "Yes, after 1 year. Closing between 1 and 3 years costs a penalty of 2% of the deposit; between 3 and 5 years, 1%. Before 1 year the account cannot be closed at all. On ₹9,00,000, closing in year two would cost ₹18,000 — a steep price, so only deposit money you can leave for the full term.",
  ],
  [
    "Is POMIS interest taxable?",
    "Yes — the monthly interest is taxable at your income slab in the year received. The post office does not deduct TDS on MIS interest, which makes it easy to forget; it still belongs in your return under 'income from other sources'. The deposit itself is not eligible for the Section 80C deduction.",
  ],
  [
    "POMIS vs a bank FD with monthly payout — which is better?",
    "They are close cousins: both pay monthly interest on a lump sum with the principal returned at the end. POMIS carries a sovereign guarantee and a rate fixed for 5 years; a bank FD may pay slightly more or less depending on the bank, and is insured up to ₹5 lakh per bank by DICGC. Compare the FD's monthly-payout figure on the FD calculator with the same deposit and pick the higher after-tax income.",
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

export default function PostOfficeMisCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · POMIS · 7.4% default rate
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Post Office MIS <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            A government-backed monthly salary for your savings
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            One deposit in the <strong>Monthly Income Scheme</strong> pays interest into your account
            every month for 5 years. Enter the deposit to see the <strong>exact monthly payout</strong>,
            the yearly income and the <strong>5-year total</strong>.
          </p>
        </div>
      </section>

      <PostOfficeMisCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Simple interest, paid monthly, guaranteed by the government"
            sub="No compounding, no market risk, no surprises — the scheme's virtue is its plainness."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The maths</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Deposit × rate ÷ 12, every month</h3>
              <p className="text-stone-600 leading-relaxed">
                ₹9,00,000 × 7.4% = ₹66,600 a year, split into twelve payments of ₹5,550. Because the
                interest is paid out rather than reinvested, the payout never grows — and never falls.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The limits</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">₹9 lakh single, ₹15 lakh joint</h3>
              <p className="text-stone-600 leading-relaxed">
                Deposits go in multiples of ₹1,000. A couple using a joint account can place ₹15 lakh
                and draw ₹9,250 a month at 7.4% — the calculator enforces both caps so the estimate is
                always a legal one.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The rate</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Fixed at opening for 5 years</h3>
              <p className="text-stone-600 leading-relaxed">
                Small-savings rates are reviewed quarterly, but your account keeps the rate from the
                day it opened. If rates rise later, only new accounts get them — a reason to think of
                POMIS as a 5-year commitment, not a parking spot.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The exit</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Penalties for leaving early</h3>
              <p className="text-stone-600 leading-relaxed">
                No closure in the first year; 2% of the deposit if you close in years 1–3; 1% in
                years 3–5. At maturity the account can be closed or the deposit reinvested in a fresh
                account at the then-current rate.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/scss-calculator" className="font-semibold text-orange-700 hover:text-orange-800">SCSS calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Post Office MIS questions, answered" />
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
              Calculate my monthly income <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Rates are notified quarterly by the Ministry of Finance; confirm the current rate at your
            post office before depositing.
          </p>
        </div>
      </section>
    </>
  );
}
