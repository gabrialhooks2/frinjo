import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import CarLoanInterestCalculator from "./CarLoanInterestCalculator";

export const metadata = {
  title: "Car Loan Interest Deduction Calculator — Up to $10,000",
  description:
    "Free car loan interest deduction calculator: check eligibility and the $10,000 Schedule 1-A deduction for new US-assembled cars, after the MAGI phase-out.",
  keywords: [
    "car loan interest deduction calculator",
    "no tax on car loan interest",
    "schedule 1-a car loan",
    "vehicle loan interest deduction",
    "obbba car loan deduction",
    "does my car qualify car loan deduction",
  ],
  alternates: {
    canonical: "https://frinjo.me/car-loan-interest-deduction-calculator",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Car Loan Interest Deduction Calculator — Up to $10,000 | WebStore Pro",
    description:
      "Up to $10,000 of interest on a new, US-assembled car bought after 2024 is deductible. Check the six eligibility rules and your deduction after the phase-out.",
    url: "https://frinjo.me/car-loan-interest-deduction-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Car Loan Interest Deduction Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/car-loan-interest-deduction-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free calculator for the US car loan interest deduction (tax years 2025–2028, Schedule 1-A Part IV). It checks the six eligibility rules — new vehicle (not used, not a lease), final assembly in the United States, loan originated after December 31, 2024, loan secured by the vehicle, personal use, and under 14,000 lbs GVWR — then caps the interest at $10,000 per return, subtracts the phase-out of $200 per $1,000 or part of $1,000 of MAGI over $100,000 ($200,000 married filing jointly), and estimates the federal income tax saved using the real 2026 federal brackets and standard deduction. All calculations run locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Car Loan Interest Deduction Calculator", item: "https://frinjo.me/car-loan-interest-deduction-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is the car loan interest deduction?",
    "For tax years 2025 through 2028 you may deduct up to $10,000 a year of interest paid on a loan for a new, US-assembled car bought for personal use — on Schedule 1-A of Form 1040, whether or not you itemize. It is the return of car-loan deductibility for ordinary buyers, with strict conditions: the car, the loan and the dates all have to qualify.",
  ],
  [
    "Which cars and loans qualify?",
    "All of these must hold: the vehicle was bought new (used cars and leases never qualify); its final assembly was in the United States; the loan originated after December 31, 2024; the loan is secured by the vehicle; the vehicle is mainly for personal use; and its GVWR is under 14,000 lbs. Miss any one and the deduction is zero.",
  ],
  [
    "How does the income phase-out work?",
    "The $10,000 cap is reduced by $200 for every $1,000 — or part of $1,000 — of modified AGI (MAGI) above $100,000, or $200,000 on a joint return. Note the difference from the overtime and tips deductions: this phase-out rounds up, so even $1 of MAGI into the next $1,000 band costs another $200. At $150,000 of MAGI (single) the deduction is gone entirely.",
  ],
  [
    "How do I know where my car was assembled?",
    "Check the VIN and the window sticker (Monroney label), which states the final assembly point. The first character of the VIN is a quick screen — 1, 4 or 5 means US assembly — but the sticker and the IRS/DOE lists of qualifying vehicles are the authority. A US brand assembled in Mexico or Canada does not qualify; a foreign brand assembled in the US does.",
  ],
  [
    "What paperwork do I need to claim it?",
    "Your lender reports the interest: for 2025 on a year-end statement, and for 2026 onwards on Form 1098-VLI if the lender received at least $600 — Box 1 is your interest figure. You must also put the vehicle's VIN on your return (Schedule 1-A, Part IV); without the VIN the deduction is disallowed outright, however much interest you paid.",
  ],
  [
    "Can I claim it with the standard deduction? What about refinancing?",
    "Yes — like the other Schedule 1-A deductions it sits below the line, so it stacks with the standard deduction. A refinance keeps the deduction only up to the remaining balance of the original qualifying loan; cash-out amounts above that balance do not qualify, and interest paid after tax year 2028 never counts.",
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

export default function CarLoanInterestCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Tax years 2025–2028
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Car Loan Interest <span className="text-gold-gradient">Deduction Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Up to $10,000 of Interest — If the Car and Loan Qualify
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Bought a <strong>new, US-assembled</strong> car with a loan after 2024? Up to $10,000 of
            the interest is deductible on Schedule 1-A. The direct answer: $4,200 of interest on a
            qualifying car at $85,000 of income deducts in full and saves about{" "}
            <strong>$924</strong> of federal income tax. Run the six eligibility checks with your own
            numbers below.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <CarLoanInterestCalculator />

      {/* ELIGIBILITY */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The rules"
            title="Six conditions — all six, or nothing"
            sub="This deduction is all-or-nothing. The car, the loan and the dates each carry a condition, and failing one sets the deduction to zero."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The car</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">New, US-assembled, under 14,000 lbs</h3>
              <p className="text-stone-600 leading-relaxed">
                Bought new — used cars and leases are out. Final assembly in the United States, which
                is about the factory, not the badge: a US brand built in Mexico fails, a Japanese
                brand built in Tennessee passes. Cars, SUVs, pickups, vans and motorcycles under
                14,000 lbs GVWR qualify.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The loan</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">After 2024, and secured by the car</h3>
              <p className="text-stone-600 leading-relaxed">
                The loan must have originated after December 31, 2024 and be secured by the vehicle
                itself. An unsecured personal loan spent on a car does not count, and a refinance
                only carries the deduction up to the original loan&apos;s remaining balance.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The use</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Personal use, VIN on the return</h3>
              <p className="text-stone-600 leading-relaxed">
                The vehicle must be mainly for personal use. And the detail that trips people up: the
                car&apos;s VIN must be entered on Schedule 1-A — no VIN, no deduction, however much
                interest you paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULA + WORKED EXAMPLE */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead
            eyebrow="The formula"
            title="How the car loan deduction is worked out"
            sub="Schedule 1-A, Part IV, lines 23–30: total the interest, cap it, then apply the steepest phase-out of the three new deductions."
          />
          <div className="grid gap-5 sm:grid-cols-2 text-left">
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Steps 1–2 — total and cap</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Capped interest = min(interest on up to two vehicles, $10,000)
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Two qualifying cars in the household share the same single $10,000 cap — it is per
                return, not per vehicle and not per loan.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Steps 3–4 — phase-out and saving</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Deduction = capped interest − $200 × ⌈MAGI over $100,000 ÷ $1,000⌉
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                The ceiling brackets matter: this phase-out rounds <em>up</em>, unlike overtime and
                tips, so it bites $200 at a time and is twice as steep per $1,000 of income.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-8 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-3">Worked example</p>
            <p className="text-stone-700 leading-relaxed">
              A buyer finances a new Ohio-built SUV in March 2025 and pays <strong>$4,200 of
              interest</strong> in the year. All six checks pass, the interest is under the $10,000
              cap, and with total income of $85,000 there is no phase-out — the full{" "}
              <strong>$4,200</strong> is deducted on Schedule 1-A, saving <strong>$924</strong> of
              federal income tax at the 22% bracket. Had the same car been assembled in Mexico, the
              deduction would be $0.
            </p>
          </div>
        </div>
      </section>

      {/* LIMITS + SIBLING TOOLS */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Know the limits
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            What this estimate leaves out
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            The tax saved uses the <strong className="text-white">2026 federal brackets and standard
            deduction only</strong> — no credits, no other deductions, no state tax. The calculator
            takes your word on final assembly; the window sticker and the official qualifying-vehicle
            lists decide borderline cases, and only the interest{" "}
            <strong className="text-white">actually paid in the tax year</strong> counts, not the
            interest scheduled over the loan. This is an estimate for planning, not tax advice.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            The other new Schedule 1-A deductions:{" "}
            <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Overtime Calculator
            </Link>{" "}
            ·{" "}
            <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Tips Calculator
            </Link>{" "}
            · and for the loan itself, the{" "}
            <Link href="/amortization-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Amortization Calculator
            </Link>
            .
          </p>
        </div>
      </section>

      {/* SERVICES CTA */}
      <section className="py-16 sm:py-20 bg-orange-50 dot-grid">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHead
            eyebrow="Done-for-you"
            title="Want a tool like this on your own website?"
            sub="WebStore Pro builds fast Full Stack websites and custom calculators that rank — designed, built and SEO-ready from day one."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className={btnPrimary}>
              Get a Free Quote <Icon name="arrow" className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/923258774221" target="_blank" rel="noopener noreferrer" className={btnOutline}>
              WhatsApp +92 325 8774221
            </a>
          </div>
          <p className="mt-5 text-sm text-stone-500">
            Prefer email? <a href="mailto:neilsonsmarry@gmail.com" className="font-semibold text-orange-700 hover:text-orange-800">neilsonsmarry@gmail.com</a>
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on overtime calculator</Link>, <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on tips calculator</Link>, <Link href="/personal-loan-calculator" className="font-semibold text-orange-700 hover:text-orange-800">personal loan calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Car loan interest deduction questions, answered" />
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
              Check your deduction <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This calculator is general educational information, not tax advice. Figures are estimates
            based on your inputs and the published Schedule 1-A rules for tax years 2025–2028; your
            actual deduction is determined on your return. Confirm your numbers against the IRS
            instructions or a qualified tax professional.
          </p>
        </div>
      </section>
    </>
  );
}
