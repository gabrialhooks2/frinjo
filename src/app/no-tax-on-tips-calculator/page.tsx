import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import NoTaxTipsCalculator from "./NoTaxTipsCalculator";

export const metadata = {
  title: "No Tax on Tips Calculator — $25,000 Deduction 2025–2028",
  description:
    "Free no tax on tips calculator: the $25,000 Schedule 1-A deduction for reported tips after the MAGI phase-out, and the federal income tax it saves you in 2025–2028.",
  keywords: [
    "no tax on tips calculator",
    "tips deduction calculator",
    "schedule 1-a tips",
    "tip income deduction",
    "obbba tips deduction",
    "how much of my tips can i deduct",
  ],
  alternates: {
    canonical: "https://frinjo.me/no-tax-on-tips-calculator",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "No Tax on Tips Calculator — $25,000 Deduction 2025–2028 | WebStore Pro",
    description:
      "Deduct up to $25,000 of reported tips on Schedule 1-A. Find your deduction after the cap and phase-out, and the federal income tax it saves.",
    url: "https://frinjo.me/no-tax-on-tips-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "No Tax on Tips Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/no-tax-on-tips-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free calculator for the US 'no tax on tips' deduction (tax years 2025–2028, Schedule 1-A Part II). It caps reported tips at $25,000 per return, subtracts the phase-out of $100 per full $1,000 of MAGI over $150,000 ($300,000 married filing jointly), and estimates the federal income tax saved using the real 2026 federal brackets and standard deduction. Married filing separately cannot claim; a Social Security number is required and tips must be reported in a traditionally tipped occupation. All calculations run locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "No Tax on Tips Calculator", item: "https://frinjo.me/no-tax-on-tips-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What does \"no tax on tips\" actually mean?",
    "It is a deduction of up to $25,000 of your tip income on your federal return — not tax-free tips at the till. For tax years 2025 through 2028, reported tips in a traditionally tipped occupation can be deducted from your taxable income on Schedule 1-A, whether or not you itemize. Your employer still withholds tax during the year, and Social Security and Medicare tax still apply to every dollar of tips.",
  ],
  [
    "Which tips qualify for the deduction?",
    "Tips you reported — the amounts on your W-2 or 1099 — earned in an occupation the IRS lists as traditionally tipped (servers, bartenders, baristas, delivery drivers, hairdressers and similar). Cash tips count only if you reported them to your employer. Unreported tips cannot be deducted, and you need a valid Social Security number to claim.",
  ],
  [
    "What are the cap and the income phase-out?",
    "The deduction is capped at $25,000 per return — not per job, so tips from two tipped jobs share one cap. It then shrinks by $100 for every full $1,000 of modified AGI (MAGI) above $150,000, or $300,000 on a joint return. At $400,000 of MAGI (single) or $550,000 (joint) it is fully phased out.",
  ],
  [
    "Can I claim it if I file married filing separately, or take the standard deduction?",
    "Married filing separately cannot claim this deduction at all — the statute sets it to zero for that status. Everyone else can claim it on top of the standard deduction: it is a below-the-line deduction on Schedule 1-A, so there is no need to itemize.",
  ],
  [
    "Do I still pay Social Security and Medicare on my tips?",
    "Yes. The deduction is federal income tax only. Social Security (6.2%) and Medicare (1.45%) are still due on tip income exactly as before, and your state may or may not follow the federal rule — most states decide separately.",
  ],
  [
    "Which tax years does it cover, and where do I claim it?",
    "Tax years 2025, 2026, 2027 and 2028. You claim the deduction on Schedule 1-A, Part II, of your federal return, using the tips total from your W-2 (Box 7 shows Social Security tips) or your 1099 forms if you are an independent contractor in a tipped occupation.",
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

export default function NoTaxTipsCalculatorPage() {
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
            No Tax on Tips <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Your Schedule 1-A Tips Deduction, Worked Out Properly
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            For 2025–2028, up to <strong>$25,000 of reported tips</strong> comes off your federal
            taxable income — if the tips were reported, the job is a traditionally tipped occupation,
            and your income is under the phase-out. The direct answer: a server with $18,000 of
            reported tips and $42,000 of total income deducts the full $18,000 and saves about{" "}
            <strong>$2,070</strong> of federal income tax. Enter your own numbers below.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <NoTaxTipsCalculator />

      {/* WHAT COUNTS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The rule"
            title="Which tips qualify?"
            sub="Three conditions decide whether your tips become a deduction — and the first one is the one people miss."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Condition 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The tips must be reported</h3>
              <p className="text-stone-600 leading-relaxed">
                Only tips on your W-2 or 1099 count. Cash tips you reported to your employer are in;
                cash tips you kept quiet are not — there is no way to deduct income the IRS never saw,
                and claiming it would mean reporting it first.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Condition 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">A traditionally tipped job</h3>
              <p className="text-stone-600 leading-relaxed">
                The occupation must be on the IRS list of jobs that traditionally and customarily
                received tips — food and beverage service, hospitality, delivery, personal care and
                similar. Tips in a specified service trade or business (law, accounting, consulting
                and the like) do not qualify.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Condition 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Cap, phase-out, and an SSN</h3>
              <p className="text-stone-600 leading-relaxed">
                One $25,000 cap per return, reduced by $100 per full $1,000 of MAGI over $150,000
                ($300,000 joint). You need a valid Social Security number, and married filing
                separately is excluded entirely.
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
            title="How the tips deduction is worked out"
            sub="The same three steps as Schedule 1-A, Part II — cap, phase-out, then the tax it saves at your real bracket."
          />
          <div className="grid gap-5 sm:grid-cols-2 text-left">
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Steps 1–2 — cap and phase-out</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Deduction = min(reported tips, $25,000) − $100 × full $1,000s of MAGI over $150,000
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                The threshold doubles to $300,000 on a joint return. Below it, most tipped workers
                deduct every reported dollar up to the cap.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Step 3 — the saving</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Tax saved = your tax without the deduction − your tax with it
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Run through your real federal brackets: each deducted dollar saves 10¢ in the 10%
                bracket, 12¢ in the 12% bracket, 22¢ in the 22% bracket. That is the number this
                calculator shows — not a flat guess.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-8 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-3">Worked example</p>
            <p className="text-stone-700 leading-relaxed">
              A server earns $24,000 of wages and <strong>$18,000 of reported tips</strong> — $42,000
              of total income. The tips are under the $25,000 cap and the income is far below the
              phase-out, so the full <strong>$18,000</strong> is deducted on Schedule 1-A. Most of
              that deduction lands in the 12% bracket, and the federal income tax saved is{" "}
              <strong>$2,070</strong>. Payroll tax on the tips is still owed in full — the saving is
              income tax only.
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
            deduction only</strong> — no credits, no other deductions, no state tax, and it assumes
            every tip you enter was reported in a qualifying occupation. Whether a specific job is on
            the IRS traditionally-tipped list is a facts-and-circumstances call this calculator cannot
            make for you. This is an estimate for planning, not tax advice.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            The other new Schedule 1-A deductions:{" "}
            <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Overtime Calculator
            </Link>{" "}
            ·{" "}
            <Link href="/car-loan-interest-deduction-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Car Loan Interest Deduction Calculator
            </Link>{" "}
            · and for working out the tip itself, the{" "}
            <Link href="/tip-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Tip Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on overtime calculator</Link>, <Link href="/car-loan-interest-deduction-calculator" className="font-semibold text-orange-700 hover:text-orange-800">car loan interest deduction calculator</Link>, <Link href="/tip-calculator" className="font-semibold text-orange-700 hover:text-orange-800">tip calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="No tax on tips questions, answered" />
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
              Work out your deduction <Icon name="arrow" className="w-5 h-5" />
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
