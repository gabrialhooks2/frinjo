import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import MsscCalculator from "./MsscCalculator";

export const metadata = {
  title: "MSSC Calculator — Mahila Samman Savings Certificate Maturity",
  description:
    "Free Mahila Samman Savings Certificate calculator: deposit up to ₹2 lakh at 7.5% with quarterly compounding for 2 years and see the exact maturity value and interest earned.",
  keywords: [
    "mssc calculator",
    "mahila samman savings certificate calculator",
    "mahila samman calculator",
    "mssc maturity calculator",
    "mahila samman interest rate",
  ],
  alternates: {
    canonical: "https://frinjo.me/mssc-calculator",
    languages: {
      en: "https://frinjo.me/mssc-calculator",
      "x-default": "https://frinjo.me/mssc-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "MSSC Calculator — Mahila Samman Maturity at 7.5% | Frinjo",
    description:
      "₹2,00,000 in the Mahila Samman Savings Certificate becomes ₹2,32,044 in 2 years. Enter your deposit for the exact maturity value.",
    url: "https://frinjo.me/mssc-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "MSSC Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/mssc-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Mahila Samman Savings Certificate maturity calculator: maturity = deposit × (1 + rate/400)^8 — quarterly compounding over the fixed 2-year term. Enforces the ₹2,00,000 maximum and multiples of ₹1,000. The rate is editable; 7.5% is the notified MSSC rate. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "MSSC Calculator", item: "https://frinjo.me/mssc-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much does MSSC give at maturity? A worked example",
    "Maturity = deposit × (1 + rate/400)^8, because 7.5% is compounded quarterly over 2 years. The maximum deposit of ₹2,00,000 matures at ₹2,32,044 — interest of ₹32,044. A ₹1,00,000 deposit matures at ₹1,16,022. The rate is locked at 7.5% when the certificate is issued, so the maturity printed here is the amount you will actually receive.",
  ],
  [
    "Who can open a Mahila Samman account?",
    "Any woman can open one for herself, and a guardian can open one for a minor girl. Accounts are available at post offices and authorised banks. A woman can hold more than one account, but the combined deposits across all her MSSC accounts cannot exceed ₹2,00,000, and a second account must wait 3 months after the first.",
  ],
  [
    "Can I withdraw before the 2 years end?",
    "After 1 year, you may withdraw up to 40% of the eligible balance once before maturity. Full premature closure is allowed without penalty only on specified grounds — the account holder's death, or extreme compassionate cases such as life-threatening illness of the holder or death of the guardian. Other premature closures earn interest at 2 percentage points below the scheme rate.",
  ],
  [
    "Is MSSC interest taxable, and does it get 80C?",
    "The interest is taxable at your slab rate, though at these deposit sizes the annual interest usually stays below the ₹40,000 TDS threshold for a single certificate. The deposit does not qualify for the Section 80C deduction — the scheme's attractions are the rate, the government guarantee and the short 2-year term, not a tax break.",
  ],
  [
    "MSSC vs a 2-year bank FD — which is better?",
    "At 7.5% compounded quarterly, MSSC's effective annual yield is about 7.71%. Most large banks pay 6.5–7.25% on 2-year FDs for general customers, so MSSC usually wins on rate, and it carries a sovereign guarantee rather than DICGC insurance capped at ₹5 lakh. Run the same amount through the FD calculator with a 2-year quarterly-compounded term to compare exactly.",
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

export default function MsscCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · MSSC · 7.5% for 2 years
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            MSSC <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            The 2-year certificate for women, at 7.5%
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The <strong>Mahila Samman Savings Certificate</strong> packs a government-guaranteed
            7.5%, compounded quarterly, into a short 2-year term. Enter your deposit — up to{" "}
            <strong>₹2,00,000</strong> — for the <strong>exact maturity value</strong>.
          </p>
        </div>
      </section>

      <MsscCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Short term, quarterly compounding, locked rate"
            sub="Launched in 2023 for women savers, MSSC trades a low cap for a high, certain return."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The maths</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">(1 + rate/400)⁸ — eight quarters</h3>
              <p className="text-stone-600 leading-relaxed">
                Quarterly compounding lifts the effective yield to about 7.71% a year — ₹2,00,000
                becomes ₹2,32,044. The interest is credited to the certificate, never paid out
                mid-term, so the compounding is automatic.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The cap</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">₹2 lakh across all accounts</h3>
              <p className="text-stone-600 leading-relaxed">
                The cap is per woman, not per account: a second certificate needs a 3-month gap and
                the combined total must stay within ₹2,00,000. The calculator enforces the cap so the
                projection is always a permitted one.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The flexibility</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">40% withdrawal after year one</h3>
              <p className="text-stone-600 leading-relaxed">
                Unlike most small-savings schemes, MSSC allows one partial withdrawal of up to 40% of
                the balance after the first year — a safety valve that makes the 2-year lock-in much
                easier to accept.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The fit</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Built for a 2-year goal</h3>
              <p className="text-stone-600 leading-relaxed">
                A deposit for a known expense two years out — fees, a festival, a down payment top-up —
                earns more here than in a savings account or most 2-year FDs, with zero market risk.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/sukanya-samriddhi-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Sukanya Samriddhi calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Mahila Samman questions, answered" />
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
              Calculate my MSSC maturity <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Scheme terms per the MSSC notification; confirm availability and current terms where you open the account.
          </p>
        </div>
      </section>
    </>
  );
}
