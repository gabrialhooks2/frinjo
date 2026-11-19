import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import NoCostEmiCalculator from "./NoCostEmiCalculator";

export const metadata = {
  title: "No Cost EMI Calculator — Find the Hidden Cost",
  description:
    "Free no-cost EMI calculator for India: product price, tenure and the bank's real rate reveal the GST on interest and fees that 'no-cost' quietly charges you. Effective total included.",
  keywords: [
    "no cost emi calculator",
    "no cost emi hidden charges",
    "no cost emi gst on interest",
    "zero cost emi calculator",
    "no cost emi vs cash discount",
  ],
  alternates: {
    canonical: "https://frinjo.me/no-cost-emi-calculator",
    languages: {
      en: "https://frinjo.me/no-cost-emi-calculator",
      "x-default": "https://frinjo.me/no-cost-emi-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "No Cost EMI Calculator — The Cost Behind 'No-Cost' | Frinjo",
    description:
      "The interest is discounted; the 18% GST on it is not. Price any no-cost EMI offer and see the real extra you pay over the sticker price.",
    url: "https://frinjo.me/no-cost-emi-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "No Cost EMI Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/no-cost-emi-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Unpacks a no-cost EMI offer: computes the interest the bank charges on the product price at the disclosed rate (standard EMI formula), which the merchant offsets with an equal upfront discount; then adds what is never discounted — 18% GST on the interest and the processing fee — to give the hidden cost and the effective total paid. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "No Cost EMI Calculator", item: "https://frinjo.me/no-cost-emi-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How does no-cost EMI actually work? A worked example",
    "Take a ₹60,000 phone on 12-month no-cost EMI with the bank charging 15%. The bank's interest on the loan is ₹4,986, and the merchant gives you an upfront discount of exactly ₹4,986 — so the interest cancels out and your EMIs total ₹60,000. But the 18% GST on the interest — ₹897 — is charged to you and is never discounted, and the ₹199 processing fee is yours too. Your real extra cost is ₹1,096, and the phone effectively costs ₹61,096, not ₹60,000.",
  ],
  [
    "Why is GST charged if the EMI is 'no-cost'?",
    "Because in the eyes of the tax law there is a real loan with real interest — the merchant's discount is a separate commercial arrangement between the merchant and the bank. Interest on credit is a taxable service, so 18% GST applies to the interest amount, and it is billed to the cardholder. The RBI has said since 2013 that 'zero percent' schemes must not hide costs; the GST line on your statement is the part that cannot legally be hidden.",
  ],
  [
    "Is no-cost EMI ever genuinely free?",
    "Nearly — when the processing fee is zero and the tenure is short, the leftover cost is only the GST on a small interest amount: on a 3-month plan it can be under ₹200 on a ₹60,000 purchase. It is also genuinely the cheapest option when the alternative is a regular EMI at full interest. The comparison that matters is against the cash price: if paying upfront earns a discount larger than the hidden cost shown here, cash wins.",
  ],
  [
    "What rate should I enter if the offer does not show one?",
    "Card issuers in India typically price no-cost EMI conversions at 14–18% in the offer terms — check the 'most important terms' document or the bank's offer page for the exact figure; 15% is a fair default estimate. The hidden cost scales with the rate and the tenure, so a wrong rate by a point or two moves the answer by only a few dozen rupees.",
  ],
  [
    "Does no-cost EMI affect my credit card limit?",
    "Yes — the full purchase amount is blocked against your limit at purchase and released as you pay each EMI. On a low-limit card a big no-cost EMI can push utilisation high enough to dent your credit score temporarily, even though you never miss a payment. Keep total utilisation under about 30% of the limit where you can.",
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

export default function NoCostEmiCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · GST counted · Effective total
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            No Cost EMI <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            “No-cost” has a cost. Here it is, in rupees
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The merchant discounts the interest away — but not the <strong>18% GST on that
            interest</strong>, and not the <strong>processing fee</strong>. Enter the price, tenure
            and the rate in the fine print to see the <strong>real extra</strong> over the sticker price.
          </p>
        </div>
      </section>

      <NoCostEmiCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Three parties, one discount, two leftovers"
            sub="You, the merchant and the bank each play a part — and the tax department takes a fourth share."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The mechanism</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The discount equals the interest</h3>
              <p className="text-stone-600 leading-relaxed">
                The bank converts your purchase into a normal interest-bearing EMI loan. The merchant
                then discounts the product by exactly the interest amount, so the two cancel and your
                EMIs add up to the sticker price. That part of the promise is genuine.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Leftover 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">GST on interest is never discounted</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest is a taxable service at 18% GST. The discount covers the interest, not the
                tax on it — ₹897 on the ₹60,000 example — and it appears on your card statement as a
                separate line most buyers never connect to the offer.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Leftover 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The processing fee</h3>
              <p className="text-stone-600 leading-relaxed">
                Most issuers charge ₹99–₹299 per no-cost EMI transaction, plus GST on the fee itself.
                Small — but it is the second reason “no-cost” is a marketing term, not an accounting one.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The decision</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Compare against the cash discount</h3>
              <p className="text-stone-600 leading-relaxed">
                If the shop offers, say, ₹2,000 off for paying in full, and the hidden cost here is
                ₹1,096, cash is cheaper by about ₹900. If there is no cash discount, no-cost EMI is
                close to free money — the hidden cost is all you pay for spreading the price.
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
          <SectionHead eyebrow="FAQ" title="No-cost EMI questions, answered" />
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
              Expose my offer&apos;s cost <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimates; your issuer&apos;s statement — interest, GST and fee lines — is the final record.
          </p>
        </div>
      </section>
    </>
  );
}
