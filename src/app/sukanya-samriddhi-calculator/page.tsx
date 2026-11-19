import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import SukanyaSamriddhiCalculator from "./SukanyaSamriddhiCalculator";

export const metadata = {
  title: "Sukanya Samriddhi Calculator — SSY Maturity at 21 Years",
  description:
    "Free Sukanya Samriddhi Yojana calculator: yearly deposits for 15 years at 8.2% grow tax-free to maturity at 21 years. See total deposited, interest earned and the year-by-year table.",
  keywords: [
    "sukanya samriddhi calculator",
    "ssy calculator",
    "sukanya samriddhi yojana calculator",
    "ssy maturity calculator",
    "sukanya samriddhi interest calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/sukanya-samriddhi-calculator",
    languages: {
      en: "https://frinjo.me/sukanya-samriddhi-calculator",
      "x-default": "https://frinjo.me/sukanya-samriddhi-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Sukanya Samriddhi Calculator — SSY Maturity Value | Frinjo",
    description:
      "₹1,50,000 a year for 15 years becomes about ₹71.8 lakh at maturity, fully tax-free. Project your daughter's SSY account year by year.",
    url: "https://frinjo.me/sukanya-samriddhi-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Sukanya Samriddhi Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/sukanya-samriddhi-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Sukanya Samriddhi Yojana (SSY) projection: deposits (₹250 to ₹1,50,000 a year) are made for 15 years and the balance compounds annually at the scheme rate until the account matures 21 years after opening. Shows total deposited, interest earned, maturity value and a year-by-year table. Model assumes each year's deposit is made at the start of the year. The rate is editable; 8.2% is the recent notified rate. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Sukanya Samriddhi Calculator", item: "https://frinjo.me/sukanya-samriddhi-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much does SSY give at maturity? A worked example",
    "Deposit the maximum ₹1,50,000 a year for 15 years at 8.2% and the account matures at about ₹71,82,000 after 21 years: you deposited ₹22,50,000 and interest added roughly ₹49,32,000 — more than double your money, and every rupee of it tax-free. Even ₹50,000 a year builds to about ₹23,94,000. The last 6 years need no deposits at all; the accumulated balance simply keeps compounding.",
  ],
  [
    "What are the SSY rules I should know?",
    "One account per girl child, opened any time before she turns 10, with a maximum of two accounts per family (an exception allows a third for twin girls). Deposits run for 15 years from opening, between ₹250 and ₹1,50,000 per financial year, and the account matures 21 years from opening or at her marriage after age 18, whichever is earlier. The interest rate is set by the government every quarter.",
  ],
  [
    "Is SSY really tax-free?",
    "Yes — SSY is one of India's few EEE (exempt-exempt-exempt) instruments: deposits qualify for the Section 80C deduction (within the ₹1.5 lakh limit, claimed by the parent), the interest is tax-free each year, and the maturity amount is fully tax-free. At the same pre-tax rate, that makes SSY worth noticeably more than a taxable FD for a parent in the 20–30% slab.",
  ],
  [
    "Can money be withdrawn before maturity?",
    "Partly. Up to 50% of the balance can be withdrawn for the girl's higher education after she turns 18 or passes class 10, whichever is earlier. Premature closure is allowed for her marriage after 18, and on compassionate grounds such as medical treatment or the death of the guardian — otherwise the account runs its 21 years, which is precisely why the compounding is so strong.",
  ],
  [
    "Why do different SSY calculators show different maturity values?",
    "Deposit timing. This calculator assumes each year's deposit lands at the start of the year, so every deposit earns a full year of interest in its first year. Parents who deposit monthly or late in the year will land somewhat lower — the official interest is computed on monthly minimum balances. Use the year-by-year table here as the upper, well-organised path: deposit early in April and your result tracks it closely.",
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

export default function SukanyaSamriddhiCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · SSY · Tax-free EEE
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Sukanya Samriddhi <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            15 years of deposits, 21 years of growth
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The <strong>Sukanya Samriddhi Yojana</strong> is India&apos;s strongest small-savings
            promise for a daughter: government rates, annual compounding and a fully{" "}
            <strong>tax-free</strong> maturity. Project the account <strong>year by year</strong>.
          </p>
        </div>
      </section>

      <SukanyaSamriddhiCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Two phases: 15 years in, 6 years of pure compounding"
            sub="The deposit window closes long before the account does — and that gap is where the money doubles."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Phase 1 — years 1–15</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Deposits plus compounding</h3>
              <p className="text-stone-600 leading-relaxed">
                You deposit between ₹250 and ₹1,50,000 every financial year. Each deposit starts
                compounding at the notified rate — 8.2% recently, among the highest of all
                small-savings schemes.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Phase 2 — years 16–21</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">No deposits, all growth</h3>
              <p className="text-stone-600 leading-relaxed">
                The balance built over 15 years compounds untouched for 6 more. On maximum deposits
                that quiet phase alone adds roughly ₹27 lakh — the reward for starting when she is young.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The tax edge</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Exempt at every stage</h3>
              <p className="text-stone-600 leading-relaxed">
                80C deduction on deposits, tax-free interest, tax-free maturity. A taxable instrument
                would need a pre-tax rate near 11% to match an 8.2% SSY for a parent in the 30% slab.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The timing edge</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Deposit in April, not March</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest is computed on the lowest balance between the 5th and the end of each month.
                Depositing early in the financial year — and early in the month — means every rupee
                earns for the maximum time the rules allow.
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
          <SectionHead eyebrow="FAQ" title="Sukanya Samriddhi questions, answered" />
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
              Project her SSY account <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Projections at a constant rate; the government revises SSY rates quarterly, so the actual
            maturity will differ.
          </p>
        </div>
      </section>
    </>
  );
}
