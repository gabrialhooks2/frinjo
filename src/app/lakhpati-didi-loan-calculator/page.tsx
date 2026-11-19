import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import LakhpatiDidiLoanCalculator from "./LakhpatiDidiLoanCalculator";

export const metadata = {
  title: "Lakhpati Didi Loan Calculator — Interest-Free SHG Loan Repayment",
  description:
    "Free Lakhpati Didi interest-free loan calculator for SHG women: borrow up to ₹5,00,000 at zero interest and see the exact monthly repayment — principal only, nothing extra.",
  keywords: [
    "lakhpati didi loan calculator",
    "lakhpati didi loan",
    "shg loan calculator",
    "interest free loan for women",
    "self help group loan calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/lakhpati-didi-loan-calculator",
    languages: {
      en: "https://frinjo.me/lakhpati-didi-loan-calculator",
      "x-default": "https://frinjo.me/lakhpati-didi-loan-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Lakhpati Didi Loan Calculator — ₹0 Interest, Principal Only | Frinjo",
    description:
      "₹2,00,000 over 36 months is ₹5,556 a month — and the total repaid is exactly ₹2,00,000. Plan an interest-free SHG enterprise loan repayment.",
    url: "https://frinjo.me/lakhpati-didi-loan-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lakhpati Didi Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/lakhpati-didi-loan-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Repayment calculator for the interest-free enterprise loans available to women of self-help groups (SHGs) under the Lakhpati Didi initiative, up to ₹5,00,000. Monthly repayment = loan amount ÷ months, with any rounding remainder placed in the final payment; total repaid equals the principal exactly, with zero interest. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Lakhpati Didi Loan Calculator", item: "https://frinjo.me/lakhpati-didi-loan-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much do I repay each month? A worked example",
    "Divide the loan by the months — that is the whole calculation, because the interest is zero. ₹2,00,000 over 36 months is ₹5,556 a month for 35 months and a final payment of ₹5,540; over 24 months it is ₹8,334 a month. The total repaid is exactly ₹2,00,000 — compare a moneylender at even 2% per month, where the same loan over 3 years would add about ₹1,44,000 of interest on top.",
  ],
  [
    "What is the Lakhpati Didi initiative?",
    "A national programme to make at least three crore women of self-help groups 'Lakhpati Didis' — women earning a sustainable household income of ₹1,00,000 or more a year. It works through skill training, enterprise support and access to bank credit for SHG members, including interest-free or interest-subsidised enterprise loans routed through the SHG network in many states.",
  ],
  [
    "Who can get the interest-free loan, and how much?",
    "Women who are members of a self-help group, typically with a record of regular savings and internal lending in the group, applying for an income-generating activity — a shop, tailoring unit, dairy animals, food processing and similar enterprises. Amounts go up to ₹5,00,000 depending on the state scheme and the group's grading. Your SHG, cluster federation or block mission office confirms the exact scheme live in your district.",
  ],
  [
    "Interest-free — is there any catch to plan for?",
    "The interest is borne by the scheme or state subvention, not by you — but the principal discipline is real: repayments are tracked by the group, and a default affects the whole SHG's future credit. Some schemes also expect the enterprise to be insured or the member to complete a short training first. Plan the monthly amount against your enterprise's lean-season income, not its best month.",
  ],
  [
    "How is this different from a normal SHG bank loan?",
    "A standard SHG bank linkage loan carries interest (often 7–12%, sometimes with subvention for prompt repayment). The interest-free window under Lakhpati Didi-linked state schemes removes that cost entirely for eligible enterprise loans. If your group is offered both, the calculator shows why the interest-free route wins: at 12% over 3 years, a bank loan of ₹2,00,000 would cost about ₹39,000 in interest.",
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

export default function LakhpatiDidiLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · 0% interest · For SHG women
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Lakhpati Didi Loan <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            An enterprise loan where the total repaid equals the loan
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Under the <strong>Lakhpati Didi</strong> initiative, women of self-help groups can raise
            enterprise loans of up to <strong>₹5,00,000 at zero interest</strong>. Enter the amount
            and period to get the <strong>exact monthly repayment</strong> — principal only.
          </p>
        </div>
      </section>

      <LakhpatiDidiLoanCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="The simplest loan maths in India"
            sub="No rate, no compounding, no processing games — one division decides the repayment."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The maths</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Amount ÷ months, nothing added</h3>
              <p className="text-stone-600 leading-relaxed">
                ₹2,00,000 over 36 months is ₹5,556 a month, and the total repaid is ₹2,00,000 to the
                rupee. Every instalment cuts the loan by its full amount — there is no interest
                portion quietly eating the first year of payments.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The route</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Through your self-help group</h3>
              <p className="text-stone-600 leading-relaxed">
                These loans flow through the SHG network — group savings record, grading and the
                enterprise plan matter more than any document a bank would ask an individual for.
                Your group and the block-level mission staff are the first point of application.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The purpose</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Income first, loan second</h3>
              <p className="text-stone-600 leading-relaxed">
                The initiative&apos;s target is a household income of ₹1 lakh a year or more. The
                loan is sized to an enterprise — stock, equipment, livestock — that can plausibly
                produce that income, which is why a simple business plan usually accompanies the
                application.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The discipline</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Pick the period by the lean month</h3>
              <p className="text-stone-600 leading-relaxed">
                Zero interest makes a longer period cost nothing extra — so choose the period whose
                monthly amount your weakest season can still pay. A 48-month schedule you never miss
                beats a 24-month one that strains the group.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/kcc-calculator" className="font-semibold text-orange-700 hover:text-orange-800">KCC calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Lakhpati Didi loan questions, answered" />
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
              Plan my repayment <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Scheme availability and terms vary by state; confirm the live scheme for your district
            with your SHG or the state rural livelihoods mission.
          </p>
        </div>
      </section>
    </>
  );
}
