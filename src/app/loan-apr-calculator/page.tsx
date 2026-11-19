import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import LoanAprCalculator from "./LoanAprCalculator";

export const metadata = {
  title: "Loan APR Calculator — True APR With Fees Counted",
  description:
    "Free loan APR calculator for India: quoted rate plus processing fee and other charges give the true APR, net cash received and total cost of the loan. Compare offers honestly.",
  keywords: [
    "loan apr calculator",
    "apr calculator india",
    "true apr calculator",
    "loan processing fee calculator",
    "effective interest rate calculator loan",
  ],
  alternates: {
    canonical: "https://frinjo.me/loan-apr-calculator",
    languages: {
      en: "https://frinjo.me/loan-apr-calculator",
      "x-default": "https://frinjo.me/loan-apr-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Loan APR Calculator — The Rate With Fees Counted | Frinjo",
    description:
      "A 12% loan with a 1% fee is a 12.44% loan. Enter rate, fee and charges to get the true APR and total cost of any Indian loan offer.",
    url: "https://frinjo.me/loan-apr-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Loan APR Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/loan-apr-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Computes a loan's EMI from the quoted rate, deducts the processing fee (flat ₹ and/or % of the loan) and other charges from the amount to get net cash received, then solves the APR — the annual rate that makes the EMI stream's present value equal the net received — by bisection. Shows total interest and total cost (all payments minus cash received). Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Loan APR Calculator", item: "https://frinjo.me/loan-apr-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is APR and how is it calculated? A worked example",
    "The APR is the single rate that prices everything: interest plus fees. Borrow ₹5,00,000 at a quoted 12% for 60 months with a 1% processing fee. The EMI is ₹11,122.22 — but ₹5,000 of fee means only ₹4,95,000 actually reaches you. The rate that makes those 60 payments worth ₹4,95,000 is 12.44% — your true APR. Total cost of the loan is ₹1,72,333: ₹1,67,333 of interest plus the ₹5,000 fee.",
  ],
  [
    "Why do two loans at the same rate have different APRs?",
    "Because their fees differ. A 12% loan with no fee has an APR of 12.00%. Add a 1% fee and it becomes 12.44%; a 2% fee makes it about 12.88% on a 5-year tenure. Shorter tenures suffer more from the same fee — spread over fewer months, the fee bites harder per year. This is why a slightly higher rate with zero fees often beats a 'cheaper' loan with a fat processing fee.",
  ],
  [
    "Does the RBI require APR disclosure?",
    "Yes. Since 2022 the RBI requires lenders to give every retail borrower a Key Facts Statement (KFS) that includes the APR — the annualised rate counting interest and all charges — for the exact loan being offered. If an offer comes without a KFS, ask for it; and if the APR there differs from this calculator, the difference is a charge you have not been told about yet.",
  ],
  [
    "Which charges count toward the APR?",
    "Everything the lender takes as a condition of the loan: processing fee, documentation and file charges, stamp duty collected by the lender, and bundled insurance premiums if buying the policy is mandatory. Charges you would pay anyway — your own legal or valuation costs paid to third parties — sit outside. When in doubt, put it in the 'other charges' box: an APR that slightly overstates is safer than one that hides a cost.",
  ],
  [
    "Is APR the same as the effective interest rate?",
    "For a fee-bearing loan, effectively yes: both express the true yearly cost of the credit. Strictly, the APR annualises the solved monthly rate (monthly rate × 12), while an effective annual rate compounds it. Indian KFS disclosures use the APR convention used here. Either way, it — not the headline rate — is the number to compare across lenders.",
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

export default function LoanAprCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Fees counted · KFS-style APR
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Loan APR <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            The quoted rate is not the rate you pay
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Processing fees and charges quietly add points to your real rate. Enter the{" "}
            <strong>quoted rate</strong> and <strong>every fee</strong> to get the <strong>true
            APR</strong>, the cash you actually receive, and the loan&apos;s total cost.
          </p>
        </div>
      </section>

      <LoanAprCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Price the cash you receive, not the number on the brochure"
            sub="You repay the full sanctioned amount. You only ever hold the amount minus fees. The APR prices that gap."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The EMI comes from the quoted rate</h3>
              <p className="text-stone-600 leading-relaxed">
                Payments are computed on the full loan amount at the headline rate — ₹11,122.22 a
                month on ₹5,00,000 at 12% for 5 years. Nothing about the payment knows a fee exists.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The fee shrinks what you receive</h3>
              <p className="text-stone-600 leading-relaxed">
                A 1% fee takes ₹5,000 off the top: ₹4,95,000 reaches your account while the EMIs keep
                pricing ₹5,00,000. That mismatch is the entire hidden cost — and it is pure rate.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Step 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Solve the rate that reconciles them</h3>
              <p className="text-stone-600 leading-relaxed">
                The APR is the rate at which your EMI stream is worth exactly ₹4,95,000 today —
                12.44% here. It is found by bisection, the same present-value maths behind the RBI&apos;s
                Key Facts Statement.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The verdict</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Total cost settles every argument</h3>
              <p className="text-stone-600 leading-relaxed">
                All payments minus cash received: ₹1,72,333 on the example. Rates can be spun and
                fees renamed, but total cost is one rupee figure that absorbs both.
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
          <SectionHead eyebrow="FAQ" title="APR questions, answered" />
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
              Get my true APR <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimates only; the APR in your lender&apos;s Key Facts Statement governs.
          </p>
        </div>
      </section>
    </>
  );
}
