import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import NoTaxOvertimeCalculator from "./NoTaxOvertimeCalculator";

export const metadata = {
  title: "No Tax on Overtime Calculator — 2025–2028 Deduction",
  description:
    "Free no tax on overtime calculator: your qualified FLSA premium, the $12,500/$25,000 Schedule 1-A deduction after cap and phase-out, and the federal tax it saves.",
  keywords: [
    "no tax on overtime calculator",
    "overtime deduction calculator",
    "schedule 1-a overtime",
    "qualified overtime premium",
    "obbba overtime deduction",
    "how much overtime can i deduct",
  ],
  alternates: {
    canonical: "https://frinjo.me/no-tax-on-overtime-calculator",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "No Tax on Overtime Calculator — 2025–2028 Deduction | WebStore Pro",
    description:
      "Only the overtime premium is deductible — up to $12,500 ($25,000 joint). Find your qualified premium, your deduction after the phase-out, and the federal tax it saves.",
    url: "https://frinjo.me/no-tax-on-overtime-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "No Tax on Overtime Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/no-tax-on-overtime-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free calculator for the US 'no tax on overtime' deduction (tax years 2025–2028, Schedule 1-A Part III). It works out the qualified overtime premium — only the FLSA half-time premium, 0.5 × regular rate × overtime hours, or total overtime pay divided by 3 at time-and-a-half (4 at double time) — applies the $12,500 cap ($25,000 married filing jointly), subtracts the phase-out of $100 per full $1,000 of MAGI over $150,000 ($300,000 joint), and estimates the federal income tax saved using the real 2026 federal brackets and standard deduction. Married filing separately cannot claim. All calculations run locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "No Tax on Overtime Calculator", item: "https://frinjo.me/no-tax-on-overtime-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What does \"no tax on overtime\" actually mean?",
    "It is a deduction, not tax-free overtime. For tax years 2025 through 2028 you may deduct the premium part of your overtime pay — the extra \"half\" in time-and-a-half — from your federal taxable income, up to $12,500 a year ($25,000 if married filing jointly). You claim it on Schedule 1-A of Form 1040, whether or not you itemize. Your full overtime pay is still wages, and Social Security and Medicare tax still apply to all of it.",
  ],
  [
    "How is the qualified overtime amount calculated?",
    "Qualified overtime is 0.5 × your regular hourly rate × your FLSA overtime hours (hours over 40 in a workweek). At $30 an hour with 520 overtime hours in the year, that is 0.5 × $30 × 520 = $7,800. If you only know your total overtime pay, divide it by 3 when you were paid time-and-a-half, or by 4 at double time — only the premium slice ever counts, even when your employer pays more than the FLSA requires.",
  ],
  [
    "What are the cap and the income phase-out?",
    "The deduction is capped at $12,500, or $25,000 on a joint return. It then shrinks by $100 for every full $1,000 of modified AGI (MAGI) above $150,000 — $300,000 for joint filers. At $275,000 of MAGI (single) or $550,000 (joint) the deduction is fully phased out.",
  ],
  [
    "Do I still pay Social Security and Medicare on my overtime?",
    "Yes. The deduction reduces federal income tax only. Social Security (6.2%) and Medicare (1.45%) are still withheld on every dollar of overtime pay exactly as before, which is why this calculator shows the payroll tax you still owe next to the income tax you save.",
  ],
  [
    "Can I claim it with the standard deduction? What about filing separately?",
    "You can claim it on top of the standard deduction — it is a below-the-line deduction on Schedule 1-A, so there is no need to itemize. But married filing separately cannot claim it at all, and you must have a valid Social Security number. Only overtime the FLSA requires (over 40 hours a week for non-exempt employees) qualifies; extra overtime paid only under state law, a union contract or company policy does not.",
  ],
  [
    "Which tax years does it cover, and where do I claim it?",
    "Tax years 2025, 2026, 2027 and 2028. You claim the deduction on Schedule 1-A, Part III, of your federal return. For 2025, employers were not required to report the premium separately, so the divide-by-3 estimate is accepted; from tax year 2026 your employer reports your qualified premium in Box 12 of your W-2 with code TT, and that reported figure is the amount you can deduct.",
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

export default function NoTaxOvertimeCalculatorPage() {
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
            No Tax on Overtime <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Your Schedule 1-A Overtime Deduction, Worked Out Properly
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The headline is misleading: your overtime is not tax-free. Only the{" "}
            <strong>premium half</strong> of FLSA overtime is deductible — capped at $12,500 ($25,000
            joint) and phased out at higher incomes. The direct answer: at $30 an hour with 10 overtime
            hours a week, your qualified premium is <strong>$7,800</strong> and the deduction saves
            about <strong>$1,716</strong> of federal income tax. Enter your own numbers below.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <NoTaxOvertimeCalculator />

      {/* WHAT COUNTS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The rule"
            title="What counts as qualified overtime?"
            sub="Three filters decide how much of your overtime pay becomes a deduction. Miss one and the amount drops — or disappears."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Filter 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Only the premium half</h3>
              <p className="text-stone-600 leading-relaxed">
                Time-and-a-half pays 1.5× your rate; only the extra 0.5× is the &ldquo;premium&rdquo;
                the law lets you deduct. Paid double time? Still only the same half counts — the
                premium is measured against your regular rate, not against what you were actually paid.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Filter 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Only FLSA overtime</h3>
              <p className="text-stone-600 leading-relaxed">
                The hours must be overtime the Fair Labor Standards Act requires — over 40 hours in a
                workweek, for a non-exempt employee. Daily overtime under state law, weekend premiums
                in a contract, or overtime for exempt salaried staff does not qualify.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Filter 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Cap, then phase-out</h3>
              <p className="text-stone-600 leading-relaxed">
                The premium is capped at $12,500 ($25,000 joint), then reduced by $100 for each full
                $1,000 of MAGI over $150,000 ($300,000 joint). Married filing separately gets nothing,
                whatever the numbers.
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
            title="How the overtime deduction is worked out"
            sub="The same four steps as Schedule 1-A, Part III — premium, cap, phase-out, then the tax it saves at your real bracket."
          />
          <div className="grid gap-5 sm:grid-cols-2 text-left">
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Steps 1–2 — premium and cap</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Premium = 0.5 × rate × OT hours, capped at $12,500 / $25,000
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Only got a total? Total overtime pay ÷ 3 at time-and-a-half, ÷ 4 at double time —
                both isolate the same premium slice.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Steps 3–4 — phase-out and saving</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Deduction = capped premium − $100 × full $1,000s of MAGI over the threshold
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                The tax saved is that deduction run through your actual federal brackets — worth 12¢
                per dollar in the 12% bracket, 22¢ in the 22% bracket, and so on.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-8 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-3">Worked example</p>
            <p className="text-stone-700 leading-relaxed">
              A warehouse worker on <strong>$30 an hour</strong> works <strong>10 overtime hours a
              week for 52 weeks</strong> — 520 overtime hours, $23,400 of overtime pay at
              time-and-a-half. The qualified premium is 0.5 × $30 × 520 = <strong>$7,800</strong>,
              under the $12,500 cap. With total income of $85,800 there is no phase-out, so the full
              $7,800 is deducted — and at the 22% marginal bracket it saves{" "}
              <strong>$1,716</strong> of federal income tax. The 7.65% payroll tax on the overtime
              pay (about $1,790) is still owed in full.
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
            The tax saved is computed with the <strong className="text-white">2026 federal brackets
            and standard deduction only</strong> — no credits, no other deductions, no state income
            tax, and it treats the income you enter as your MAGI. For tax year 2025 the IRS accepts
            reasonable estimates of the premium because employers did not have to report it; from
            2026 the figure in <strong className="text-white">W-2 Box 12, code TT</strong> is the
            one that counts. This is an estimate for planning, not tax advice.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            The other new Schedule 1-A deductions:{" "}
            <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Tips Calculator
            </Link>{" "}
            ·{" "}
            <Link href="/car-loan-interest-deduction-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Car Loan Interest Deduction Calculator
            </Link>{" "}
            · check the premium figure on your 2026 W-2 with the{" "}
            <Link href="/w2-box-12-code-tt-checker" className="font-semibold text-orange-400 hover:text-orange-300">
              W-2 Box 12 Code TT Checker
            </Link>{" "}
            · and for the pay itself, the{" "}
            <Link href="/hourly-to-salary-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Hourly to Salary Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on tips calculator</Link>, <Link href="/car-loan-interest-deduction-calculator" className="font-semibold text-orange-700 hover:text-orange-800">car loan interest deduction calculator</Link>, <Link href="/hourly-to-salary-calculator" className="font-semibold text-orange-700 hover:text-orange-800">hourly to salary calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="No tax on overtime questions, answered" />
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
