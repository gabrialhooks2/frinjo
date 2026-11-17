import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import W2CodeTtChecker from "./W2CodeTtChecker";

export const metadata = {
  title: "W-2 Box 12 Code TT Checker — Overtime Premium",
  description:
    "Free checker for the new W-2 Box 12 code TT: rebuild your expected overtime premium and compare it with your employer's figure — too low costs you deduction, and a W-2c fixes it.",
  keywords: [
    "w2 box 12 code tt",
    "code tt checker",
    "w-2 code tt overtime",
    "qualified overtime premium w2",
    "code tt too low",
    "w2c overtime premium",
  ],
  alternates: {
    canonical: "https://frinjo.me/w2-box-12-code-tt-checker",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "W-2 Box 12 Code TT Checker — Is Your Overtime Premium Right? | WebStore Pro",
    description:
      "From tax year 2026 your overtime deduction is limited to the Box 12 code TT figure on your W-2. Rebuild your expected premium and check your employer didn't under-report it.",
    url: "https://frinjo.me/w2-box-12-code-tt-checker",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "W-2 Box 12 Code TT Checker",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/w2-box-12-code-tt-checker",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free checker for Box 12 code TT on the 2026 Form W-2 — the employer's reported figure for a worker's qualified overtime premium under the 'no tax on overtime' deduction (Schedule 1-A Part III). The visitor rebuilds their expected premium (0.5 × regular rate × FLSA overtime hours, or total overtime pay divided by 3 at time-and-a-half, 4 at double time) and compares it with the code TT amount. If TT is too low, the tool shows the shortfall, the deduction lost after the $12,500/$25,000 cap and MAGI phase-out, and the estimated federal income tax cost using real 2026 brackets, and advises requesting a corrected Form W-2c. All calculations run locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "W-2 Box 12 Code TT Checker", item: "https://frinjo.me/w2-box-12-code-tt-checker" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is code TT in Box 12 of my W-2?",
    "Code TT is new on the 2026 Form W-2 (the one you receive in January–February 2027). It is your employer's figure for your qualified overtime premium — the deductible \"half\" of your time-and-a-half pay — for the 'no tax on overtime' deduction. From tax year 2026, the amount you may deduct on Schedule 1-A, Part III is limited to the amount reported with code TT, so this one number sets the ceiling on your deduction.",
  ],
  [
    "My code TT amount looks too low. What can I do?",
    "First check it against your own records: your premium should be roughly 0.5 × your hourly rate × your overtime hours for the year (or a third of your total overtime pay at time-and-a-half). If the W-2 figure is genuinely short, ask your employer or payroll provider to correct it — corrections to a W-2 are issued on Form W-2c. Do this before you file if you can: claiming more than the code TT amount invites an IRS adjustment, because the IRS receives the same W-2 figures.",
  ],
  [
    "What if there is no code TT on my W-2 at all?",
    "If you worked FLSA overtime in 2026, your employer must report the premium — employers have to furnish W-2s by January 31, 2027, which falls on a Sunday, so the effective deadline is Monday, February 1, 2027. Ask payroll first; mistakes and late corrections are common in the first year of a new code. If the form never arrives or is never corrected, the IRS can contact the employer on your behalf, and Form 4852 is the last-resort substitute — but get the W-2c route tried first.",
  ],
  [
    "I had two jobs with overtime. How does code TT work then?",
    "Each employer reports code TT only for the overtime you worked for them, on that job's W-2. Add the two code TT amounts together: the combined premium is what feeds Schedule 1-A, and the single $12,500 cap ($25,000 joint) and the MAGI phase-out then apply to the total. This checker accepts the combined figure — just add both amounts before entering.",
  ],
  [
    "Does code TT apply to my 2025 tax return?",
    "No. Code TT starts with tax year 2026. For 2025, employers were not required to report the premium separately, and the IRS accepted reasonable estimates — dividing total overtime pay by 3 at time-and-a-half is the standard shortcut for a 2025 return. From 2026 onward the reported code TT figure is the one that counts, which is why checking it matters.",
  ],
  [
    "My code TT is higher than my own calculation. Is that a problem?",
    "Usually not. Your deduction is based on the reported code TT figure, and your employer calculates it from actual payroll records — blended rates, shift differentials and mid-year rate changes can all make the true premium higher than a simple rate × hours estimate. The deduction is still subject to the $12,500/$25,000 cap and the income phase-out. Keep your pay stubs with your tax records so you can show how the overtime was earned if the IRS ever asks.",
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

export default function W2CodeTtCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · New for 2026 W-2s
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            W-2 Box 12 <span className="text-gold-gradient">Code TT Checker</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Is the Overtime Premium on Your W-2 Right?
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The 2026 W-2 is the first to carry <strong>Box 12 code TT</strong> — your employer&rsquo;s
            figure for your qualified overtime premium. From tax year 2026 your deduction is{" "}
            <strong>limited to that figure</strong>: if payroll under-reported it, your deduction
            shrinks with it. Rebuild your expected premium below and compare the two numbers before
            you file.
          </p>
        </div>
      </section>

      {/* CHECKER */}
      <W2CodeTtChecker />

      {/* WHAT IS CODE TT */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The new code"
            title="What code TT is — and where to find it"
            sub="One new line in Box 12 now controls how much overtime you can deduct. Here is what it is, where it sits, and the date it had to reach you."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The figure</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Your qualified premium, as reported</h3>
              <p className="text-stone-600 leading-relaxed">
                Code TT reports the premium part of your overtime pay — the extra &ldquo;half&rdquo; in
                time-and-a-half for FLSA overtime hours — as calculated by your employer&rsquo;s
                payroll system. It is not your total overtime pay, and it is not your total wages:
                it is the one slice the deduction is built on.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The location</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Box 12, code TT</h3>
              <p className="text-stone-600 leading-relaxed">
                Look at Box 12 of your W-2 — the box that can hold up to four letter codes (a–dd).
                One line will read &ldquo;TT&rdquo; with a dollar amount beside it. That amount is what
                you compare against your own premium calculation, and what flows into Schedule 1-A,
                Part III when you file.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The deadline</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">In your hands by Feb 1, 2027</h3>
              <p className="text-stone-600 leading-relaxed">
                Employers must furnish 2026 W-2s by January 31, 2027 — a Sunday — so the effective
                deadline is Monday, February 1, 2027. First-year codes are exactly where payroll
                errors happen, which is why a two-minute check before filing is worth it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE CHECK WORKS + WORKED EXAMPLE */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead
            eyebrow="The check"
            title="How the comparison works"
            sub="Rebuild the premium from your own pay, then hold it up against the employer's figure — and price any gap through the real deduction rules."
          />
          <div className="grid gap-5 sm:grid-cols-2 text-left">
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Step 1 — your expected premium</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Premium = 0.5 × hourly rate × overtime hours
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Only got a total? Total overtime pay ÷ 3 at time-and-a-half, ÷ 4 at double time. Both
                isolate the same FLSA premium slice your employer is supposed to report.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Step 2 — what a gap costs</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Deduction is capped at the code TT amount
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                A shortfall runs through the $12,500/$25,000 cap and the MAGI phase-out, then through
                your real 2026 tax brackets — that is the tax a corrected W-2c would win back.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-8 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-3">Worked example</p>
            <p className="text-stone-700 leading-relaxed">
              A warehouse worker on <strong>$30 an hour</strong> works <strong>10 overtime hours a
              week for 52 weeks</strong>: the expected premium is 0.5 × $30 × 520 ={" "}
              <strong>$7,800</strong>. Her W-2 arrives with code TT showing <strong>$6,200</strong> —
              payroll missed a mid-year rate rise. The shortfall is <strong>$1,600</strong>: as
              reported she can deduct $6,200 instead of $7,800, and at the 22% bracket that missing
              premium costs her about <strong>$352</strong> of federal income tax. One request to
              payroll for a <strong>Form W-2c</strong> with the corrected code TT amount restores the
              full deduction.
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
            What this check leaves out
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            The expected premium here is an <strong className="text-white">estimate from your own
            inputs</strong> — your employer works from actual payroll records, so small differences
            (a few dollars of rounding, a blended rate, a mid-year raise) are normal and are why the
            verdict allows a small tolerance. The tax figures use the{" "}
            <strong className="text-white">2026 federal brackets and standard deduction only</strong>{" "}
            — no credits, no state tax. If your W-2c request is refused and you believe the W-2 is
            wrong, keep your pay stubs and talk to the IRS or a tax professional before filing a
            figure different from the one reported. This is an estimate for planning, not tax advice.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            Next steps: work out the full deduction with the{" "}
            <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Overtime Calculator
            </Link>{" "}
            · checking a tipped worker&rsquo;s W-2 instead? The{" "}
            <Link href="/tipped-occupation-code-lookup" className="font-semibold text-orange-400 hover:text-orange-300">
              Tipped Occupation Code Lookup
            </Link>{" "}
            covers Box 14b · and the deduction itself is in the{" "}
            <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Tips Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on overtime calculator</Link>, <Link href="/tipped-occupation-code-lookup" className="font-semibold text-orange-700 hover:text-orange-800">tipped occupation code lookup</Link>, <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on tips calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="W-2 code TT questions, answered" />
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
              Check your code TT amount <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This checker is general educational information, not tax advice. Figures are estimates
            based on your inputs and the published Schedule 1-A and Form W-2 rules for tax year
            2026; your actual deduction is determined on your return. Confirm your numbers against
            the IRS instructions or a qualified tax professional.
          </p>
        </div>
      </section>
    </>
  );
}
