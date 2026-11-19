import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import ScssCalculator from "./ScssCalculator";

export const metadata = {
  title: "SCSS Calculator — Senior Citizens Savings Scheme Payout",
  description:
    "Free SCSS calculator: deposit up to ₹30 lakh at 8.2% in the Senior Citizens Savings Scheme and see the quarterly payout, yearly income and 5-year total, plus the extension maths.",
  keywords: [
    "scss calculator",
    "senior citizens savings scheme calculator",
    "scss interest calculator",
    "senior citizen scheme monthly income",
    "post office scss calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/scss-calculator",
    languages: {
      en: "https://frinjo.me/scss-calculator",
      "x-default": "https://frinjo.me/scss-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "SCSS Calculator — Quarterly Payout at 8.2% | Frinjo",
    description:
      "₹10,00,000 in SCSS pays ₹20,500 every quarter. Enter your deposit to get the exact quarterly payout and 5-year income from the senior citizens scheme.",
    url: "https://frinjo.me/scss-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SCSS Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/scss-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Senior Citizens Savings Scheme calculator: quarterly payout = deposit × annual rate ÷ 100 ÷ 4, paid for the 5-year term (20 quarters), with the total also shown for one 3-year extension block (32 quarters). Enforces the ₹30,00,000 maximum deposit and multiples of ₹1,000. The rate is editable; 8.2% is the recent notified rate. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "SCSS Calculator", item: "https://frinjo.me/scss-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much does SCSS pay? A worked example",
    "Quarterly payout = deposit × rate ÷ 4. At the current 8.2%: ₹10,00,000 pays ₹20,500 every quarter — ₹82,000 a year and ₹4,10,000 over the 5-year term, with the ₹10,00,000 returned at maturity. The maximum deposit of ₹30,00,000 pays ₹61,500 a quarter, about ₹20,500 a month in effect — the highest regular income any government small-savings scheme offers a retiree.",
  ],
  [
    "Who can open an SCSS account?",
    "Anyone aged 60 or above. Retirees aged 55–60 can also open one — within one month of receiving retirement benefits if they retired on superannuation, or under the VRS/special VRS conditions. Defence retirees can open at 50. Accounts can be held singly or jointly with a spouse, and the ₹30,00,000 cap applies across all accounts held by one person.",
  ],
  [
    "What happens after the 5-year term?",
    "You can close the account and take the deposit back, or extend it in blocks of 3 years — any number of times, with no fresh deposit needed. Extensions must be requested within one year of maturity. Interest during an extension is paid at the rate in force when the extension begins, not your original rate.",
  ],
  [
    "What are the premature closure charges?",
    "Closure before 1 year returns the deposit with no interest at all (any interest paid is recovered). Between 1 and 2 years, 1.5% of the deposit is deducted; after 2 years, 1%. On ₹10,00,000 that is ₹15,000 or ₹10,000 — the scheme is built for money that will not be needed mid-term.",
  ],
  [
    "Is SCSS interest taxable?",
    "Yes, at your slab rate, and TDS applies when total interest across your SCSS accounts crosses ₹50,000 in a financial year. The deposit qualifies for the Section 80C deduction up to ₹1.5 lakh in the year of deposit. Senior citizens can also claim the Section 80TTB deduction of up to ₹50,000 a year on interest income, which shelters a large part of the payout for many retirees.",
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

export default function ScssCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · SCSS · 8.2% default rate
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            SCSS <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            The retiree scheme that pays every quarter
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The <strong>Senior Citizens Savings Scheme</strong> turns a retirement lump sum into a
            quarterly income for 5 years — extendable in 3-year blocks. Enter your deposit for the{" "}
            <strong>exact quarterly payout</strong> and the <strong>full-term total</strong>.
          </p>
        </div>
      </section>

      <ScssCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="A high rate, a quarterly rhythm, a 5-year promise"
            sub="SCSS usually pays the best rate among small-savings schemes — the trade is the lock-in and the cap."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The maths</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Deposit × rate ÷ 4, four times a year</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest is paid on quarter dates, not monthly — ₹20,500 a quarter on ₹10,00,000 at
                8.2%. Families often pair it with POMIS so one income lands monthly and the other
                quarterly.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The cap</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">₹30 lakh per person, across all accounts</h3>
              <p className="text-stone-600 leading-relaxed">
                The cap was tripled from ₹15 lakh in 2023. A retired couple can place ₹30 lakh each —
                ₹60 lakh in total — drawing ₹1,23,000 a quarter between them at current rates.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The extension</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">3-year blocks, as often as you like</h3>
              <p className="text-stone-600 leading-relaxed">
                At maturity, extend instead of withdrawing if the income is still needed. One 3-year
                extension on ₹10,00,000 adds ₹2,46,000 of payouts — the calculator shows the 8-year
                total alongside the 5-year one.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The guarantee</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Sovereign-backed, rate locked at opening</h3>
              <p className="text-stone-600 leading-relaxed">
                Like all small-savings schemes, SCSS is backed by the Government of India, and the
                rate you open at stays yours for the term even when quarterly revisions move it for
                new accounts.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/post-office-mis-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Post Office MIS calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="SCSS questions, answered" />
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
              Calculate my quarterly payout <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Rates are notified quarterly; confirm the current rate where you open the account.
          </p>
        </div>
      </section>
    </>
  );
}
