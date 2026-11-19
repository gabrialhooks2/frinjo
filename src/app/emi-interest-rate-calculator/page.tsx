import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import EmiInterestRateCalculator from "./EmiInterestRateCalculator";

export const metadata = {
  title: "EMI Interest Rate Calculator — Find the Rate in Your EMI",
  description:
    "Know your loan amount, EMI and tenure but not the rate? This reverse EMI calculator solves the exact annual interest rate your EMI implies — free, no sign-up.",
  keywords: [
    "emi interest rate calculator",
    "find interest rate from emi",
    "reverse emi calculator",
    "loan interest rate calculator",
    "how to find interest rate of loan",
  ],
  alternates: {
    canonical: "https://frinjo.me/emi-interest-rate-calculator",
    languages: {
      en: "https://frinjo.me/emi-interest-rate-calculator",
      "x-default": "https://frinjo.me/emi-interest-rate-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "EMI Interest Rate Calculator — Reverse-Solve Your Loan Rate | Frinjo",
    description:
      "Loan amount + EMI + tenure in, the true annual rate out. Catch flat-rate quotes and verify what the bank actually charged you.",
    url: "https://frinjo.me/emi-interest-rate-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EMI Interest Rate Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/emi-interest-rate-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Reverse EMI calculator: given the loan amount, the monthly EMI and the tenure, it solves the EMI equation EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1) for the monthly rate r by bisection, and reports the annual rate (r × 1200), total interest and total payment. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "EMI Interest Rate Calculator", item: "https://frinjo.me/emi-interest-rate-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How can a rate be found from just the EMI?",
    "The EMI formula links four numbers: amount, rate, tenure and EMI. Know any three and the fourth is determined. There is no neat algebraic shortcut for the rate, so the calculator solves it numerically — it tries rates, computes the EMI each would produce, and narrows in (bisection) until the EMI matches yours to the paisa. Check: ₹1,00,000 with an EMI of ₹8,884.88 over 12 months solves to exactly 12.00% per year.",
  ],
  [
    "My dealer quoted 9% but this calculator says 16%. Who is right?",
    "Probably the calculator — because the dealer almost certainly quoted a flat rate. A flat 9% charges interest on the full amount for the whole tenure; converted to the reducing-balance rate banks use, it lands near 16–17%. Run both numbers through the flat vs reducing calculator to see the two methods priced side by side, then ask the dealer to confirm the rate basis in writing.",
  ],
  [
    "Why does my solved rate differ slightly from the bank's stated rate?",
    "Small differences come from rounding and timing: banks round the EMI to the nearest rupee, some charge the first EMI after a part-month, and processing fees are sometimes folded into the amount. A gap of a few hundredths of a percent is normal. A gap of whole percentage points is not — that usually means a flat rate, a fee inside the EMI, or insurance premiums bundled into the loan.",
  ],
  [
    "Can this check an existing loan?",
    "Yes — take the original loan amount, the EMI from your statement and the original tenure. If the solved rate is higher than the rate in your sanction letter, something extra is inside the EMI: bundled insurance, a financed fee, or a flat-rate basis. It is the fastest audit of a loan you already hold.",
  ],
  [
    "What if my EMIs do not even add up to the loan amount?",
    "Then no interest rate exists for those numbers — the payments never repay the principal. The calculator says so plainly instead of inventing a rate. Recheck the three inputs: the most common mistake is entering the remaining tenure instead of the original tenure, or the amount you received after fees instead of the sanctioned amount.",
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

export default function EmiInterestRateCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Reverse EMI solver
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            EMI Interest Rate <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            You know the EMI. Now find the rate they didn&apos;t tell you
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Dealers quote EMIs, not rates — because a low EMI can hide an expensive loan. Enter the{" "}
            <strong>loan amount</strong>, your <strong>EMI</strong> and the <strong>tenure</strong>,
            and this tool solves the <strong>exact annual rate</strong> your payment implies.
          </p>
        </div>
      </section>

      <EmiInterestRateCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="The EMI equation, run backwards"
            sub="Four numbers, one equation — fix three and the fourth has nowhere to hide."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Guess, compute, compare</h3>
              <p className="text-stone-600 leading-relaxed">
                The solver picks a trial rate, computes the EMI it would produce on your amount and
                tenure, and compares it with your real EMI — too low, raise the rate; too high, lower it.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Bisect until it matches to the paisa</h3>
              <p className="text-stone-600 leading-relaxed">
                Each step halves the gap between the too-low and too-high rates. After about fifty
                halvings the trial EMI equals yours exactly — that trial rate is your loan&apos;s rate.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The catch it exposes</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Flat rates cannot hide here</h3>
              <p className="text-stone-600 leading-relaxed">
                A flat-rate quote produces an EMI that only a much higher reducing rate can explain.
                If the solved rate is near double the quoted one, you were quoted flat — the oldest
                trick in consumer lending.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The audit</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Verify loans you already hold</h3>
              <p className="text-stone-600 leading-relaxed">
                Sanctioned amount, statement EMI, original tenure — if the solved rate beats the
                letter&apos;s rate by more than a few hundredths, something extra is riding inside
                your EMI.
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
          <SectionHead eyebrow="FAQ" title="Finding your rate, answered" />
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
              Find my rate <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Assumes a standard reducing-balance EMI loan with monthly rests and no fees inside the EMI.
          </p>
        </div>
      </section>
    </>
  );
}
