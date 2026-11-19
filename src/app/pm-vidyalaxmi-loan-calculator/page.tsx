import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import PmVidyalaxmiLoanCalculator from "./PmVidyalaxmiLoanCalculator";

export const metadata = {
  title: "PM Vidyalaxmi Loan Calculator — EMI & 3% Interest Subvention",
  description:
    "Free PM Vidyalaxmi education loan calculator: EMI after the moratorium, total interest, and the 3% interest-subvention benefit for family income up to ₹8 lakh, estimated year by year.",
  keywords: [
    "pm vidyalaxmi calculator",
    "vidyalaxmi loan calculator",
    "education loan emi calculator",
    "pm vidyalaxmi interest subvention",
    "education loan calculator india",
  ],
  alternates: {
    canonical: "https://frinjo.me/pm-vidyalaxmi-loan-calculator",
    languages: {
      en: "https://frinjo.me/pm-vidyalaxmi-loan-calculator",
      "x-default": "https://frinjo.me/pm-vidyalaxmi-loan-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "PM Vidyalaxmi Loan Calculator — EMI + Subvention Benefit | Frinjo",
    description:
      "A ₹7,50,000 education loan at 10.5% means an EMI of ₹12,646 — and up to ₹90,000 of interest subvention if your family income is within ₹8 lakh. See both numbers.",
    url: "https://frinjo.me/pm-vidyalaxmi-loan-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PM Vidyalaxmi Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/pm-vidyalaxmi-loan-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "PM-Vidyalaxmi education loan calculator: reducing-balance EMI over the chosen repayment period after the moratorium, total interest, and an estimate of the scheme's 3% interest subvention during the moratorium (course period plus one year) for students with annual family income up to ₹8,00,000, applied to the sanctioned amount capped at ₹10,00,000. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "PM Vidyalaxmi Loan Calculator", item: "https://frinjo.me/pm-vidyalaxmi-loan-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much EMI and subvention on a ₹7.5 lakh loan? A worked example",
    "Borrow ₹7,50,000 at 10.5% and repay over 7 years after the course: the EMI is ₹12,646 and total interest is about ₹3,12,222. If your family income is up to ₹8,00,000, PM-Vidyalaxmi credits a 3% interest subvention during the moratorium — on a 4-year moratorium that is an estimated ₹90,000 (3% × ₹7,50,000 × 4 years) against the interest accruing while you study. The loan is also collateral-free and guarantor-free at this size, backed by a 75% government credit guarantee to the bank.",
  ],
  [
    "What exactly does PM-Vidyalaxmi offer?",
    "A single-window scheme for meritorious students admitted to quality higher-education institutions in India: collateral-free, guarantor-free loans up to ₹7,50,000; a 75% credit guarantee on those loans so banks lend without fear; and a 3% interest subvention during the moratorium for students with family income up to ₹8,00,000, on loans up to ₹10,00,000. Applications go through the PM-Vidyalaxmi portal to the bank you choose.",
  ],
  [
    "What is the moratorium, and does interest run during it?",
    "The moratorium is the course period plus up to one year, during which no EMI is due. Interest does accrue — banks either collect it monthly (some offer a small rate concession for this) or add it to the loan, which raises the EMI later. The 3% subvention exists precisely to soften this phase for lower-income families; it is credited to the loan account as the interest accrues.",
  ],
  [
    "Who counts as eligible for the subvention?",
    "Students whose annual family income is up to ₹8,00,000, with loans up to ₹10,00,000, studying at institutions covered by the scheme (the NIRF-ranked and centrally governed institutions on the portal list). You will need income proof for the subvention claim; the loan itself does not depend on it. Above ₹8 lakh income, the loan and guarantee features still apply — only the subvention drops away.",
  ],
  [
    "Should I service interest during the course if I can?",
    "If the family can manage it, yes. Interest serviced during the moratorium never joins the principal, so every later EMI shrinks; some banks also price the loan slightly lower for students who do this. If cash is tight, the subvention plus a longer repayment period keeps the EMI manageable — extend the repayment years in the calculator and watch the EMI fall.",
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

export default function PmVidyalaxmiLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Collateral-free to ₹7.5L · 3% subvention
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            PM Vidyalaxmi Loan <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            The education loan where merit, not collateral, is the security
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            <strong>PM-Vidyalaxmi</strong> gives collateral-free education loans and, for family
            income up to <strong>₹8 lakh</strong>, a <strong>3% interest subvention</strong> while
            you study. See your EMI after the course — and the subvention you stand to gain.
          </p>
        </div>
      </section>

      <PmVidyalaxmiLoanCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Three supports stacked into one loan"
            sub="No collateral, a government guarantee behind the bank, and interest help while you study."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Support 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Collateral-free up to ₹7,50,000</h3>
              <p className="text-stone-600 leading-relaxed">
                No property papers, no guarantor. Admission to a covered institution and the
                student&apos;s own merit carry the application — the barrier that stopped most
                first-generation students is designed out.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Support 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">75% credit guarantee to the bank</h3>
              <p className="text-stone-600 leading-relaxed">
                The government guarantees 75% of the loan amount, which is why banks can approve
                these loans without collateral and still price them like ordinary education loans
                rather than risky unsecured credit.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Support 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">3% subvention through the moratorium</h3>
              <p className="text-stone-600 leading-relaxed">
                For family income up to ₹8 lakh, 3 percentage points of the interest during the
                course-plus-one-year window are borne by the scheme — worth an estimated ₹90,000 on a
                ₹7.5 lakh, 4-year-moratorium loan.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The process</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">One portal, your choice of bank</h3>
              <p className="text-stone-600 leading-relaxed">
                Apply once on the PM-Vidyalaxmi portal and route the application to the bank you
                prefer. Compare the EMI at two or three banks&apos; rates here first — a single
                percentage point over 7 years is worth tens of thousands.
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
          <SectionHead eyebrow="FAQ" title="PM Vidyalaxmi questions, answered" />
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
              Plan my education loan <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Scheme features per the PM-Vidyalaxmi guidelines; the institution list, rates and final
            terms are confirmed on the portal and by your bank.
          </p>
        </div>
      </section>
    </>
  );
}
