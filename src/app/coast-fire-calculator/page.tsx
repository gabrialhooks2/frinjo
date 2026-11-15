import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import CoastFireCalculator from "./CoastFireCalculator";

export const metadata = {
  title: "Coast FIRE Calculator — Know Your Coast Number",
  description:
    "Free Coast FIRE calculator: find the amount you need invested today so compound growth alone carries you to full retirement — your Coast number, progress and projected coast age, in today's dollars.",
  keywords: [
    "coast fire calculator",
    "coast fi calculator",
    "coast fire number",
    "what is coast fire",
    "fire calculator",
    "how much do i need to retire",
  ],
  alternates: {
    canonical: "https://frinjo.me/coast-fire-calculator",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Coast FIRE Calculator — Know Your Coast Number | WebStore Pro",
    description:
      "The amount you need invested today so growth alone gets you to retirement: your Coast number, how close you are, and the age you can stop saving.",
    url: "https://frinjo.me/coast-fire-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Coast FIRE Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/coast-fire-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free Coast FIRE calculator that works in real (inflation-adjusted) dollars. It computes your full FIRE number (annual retirement spending divided by your safe withdrawal rate), your Coast FIRE number — the amount you need invested today so compound growth alone, with no further contributions, grows it to the full FIRE number by your target retirement age — plus your progress toward that number, your projected coast age, and a year-by-year projection. All calculations run locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Coast FIRE Calculator", item: "https://frinjo.me/coast-fire-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is Coast FIRE?",
    "Coast FIRE is the point where your invested savings are large enough that, even if you never contribute another dollar, compound growth alone is projected to grow them into your full retirement number by your target retirement age. From that point your job only needs to cover your day-to-day living costs — retirement saving itself is done.",
  ],
  [
    "How is the Coast FIRE number calculated?",
    "In two steps. First, your full FIRE number is your expected yearly spending in retirement divided by your safe withdrawal rate — for example $40,000 ÷ 4% = $1,000,000. Second, that target is discounted back to today at your expected real return: Coast number = FIRE number ÷ (1 + real return) raised to the years until retirement. At a 5% real return with 30 years to go, $1,000,000 ÷ 1.05^30 ≈ $231,000.",
  ],
  [
    "What return should I assume?",
    "Use a real return — your investment return after inflation — because this calculator works in today's dollars. US stocks have historically returned roughly 7% a year after inflation over very long periods, but most planners use a more cautious 4–5% real return for projections. A lower assumption gives a higher, safer Coast number.",
  ],
  [
    "What is the difference between Coast FIRE and full FIRE?",
    "Full FIRE means your portfolio is big enough to live on now — you could stop working entirely. Coast FIRE comes much earlier: your portfolio is not big enough to live on yet, but it is big enough to grow into a full retirement fund on its own. You still work to pay today's bills, but you no longer need to save for retirement.",
  ],
  [
    "Does reaching Coast FIRE mean I can retire?",
    "No. Coast FIRE means you can stop saving for retirement, not stop working. Your investments still need the years until your retirement age to grow, and in the meantime your income has to cover your living expenses. Think of it as your retirement fund going on autopilot while you work for today's costs only.",
  ],
  [
    "Is the Coast FIRE Calculator free? Is my data stored?",
    "Yes, completely free with no sign-up. Your ages, savings and spending figures are processed in your browser only — nothing is sent to or stored on our servers.",
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

export default function CoastFireCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · In today&apos;s dollars
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Coast FIRE <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Your Coast Number &amp; the Age You Can Stop Saving
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Coast FIRE is the moment your investments are big enough that growth alone — with{" "}
            <strong>no further contributions</strong> — carries them to your full retirement number.
            Here is the direct answer: if you are 30, plan to spend $40,000 a year in retirement and
            retire at 60, your full FIRE number is $1,000,000 — and at a 5% real return your Coast
            number today is about <strong>$231,000</strong>. Enter your own numbers below and get
            yours, plus the age you are projected to reach it. Updates as you type.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <CoastFireCalculator />

      {/* WHAT IS COAST FIRE */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The idea"
            title="What is Coast FIRE, exactly?"
            sub="Three numbers tell the whole story. Your full FIRE number is the finish line; your Coast number is the much closer milestone where saving can stop; your coast age is when you get there."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The finish line</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Full FIRE number</h3>
              <p className="text-stone-600 leading-relaxed">
                The portfolio size that can fund your retirement spending indefinitely: your yearly
                spending divided by a safe withdrawal rate. Spend $40,000 a year at a 4% withdrawal
                rate and the number is $1,000,000 — 25 years of spending, invested.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The milestone</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Coast FIRE number</h3>
              <p className="text-stone-600 leading-relaxed">
                The amount you need invested <em>today</em> so that growth alone, over the years left
                until retirement, turns it into your full FIRE number. Because time does the heavy
                lifting, it is a fraction of the full number — and it shrinks as you get older.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The date</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Your coast age</h3>
              <p className="text-stone-600 leading-relaxed">
                Keep contributing and your portfolio eventually crosses the (falling) coast target.
                That crossing age is your coast age: from then on you could stop saving entirely —
                take a lower-paying job, go part-time, start something — and retirement stays on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULA */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead
            eyebrow="The formula"
            title="How the Coast number is worked out"
            sub="Two formulas, both in real (inflation-adjusted) terms, so every figure is in today's purchasing power."
          />
          <div className="grid gap-5 sm:grid-cols-2 text-left">
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Step 1 — the target</p>
              <p className="font-display text-xl font-bold text-stone-900">
                FIRE number = yearly spending ÷ withdrawal rate
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                $40,000 ÷ 4% = $1,000,000. The 4% withdrawal rate is the classic starting point from
                US retirement research; cautious planners use 3.25–3.5%, which raises the target.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Step 2 — discount it back</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Coast number = FIRE number ÷ (1 + real return)<sup>years</sup>
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                $1,000,000 ÷ 1.05<sup>30</sup> ≈ $231,000. Thirty years of 5% real growth multiplies
                money about 4.3 times — so you only need about a quarter of the target today.
              </p>
            </div>
          </div>
          <p className="mt-6 text-stone-600 leading-relaxed text-center max-w-2xl mx-auto">
            Why real return? If you project with a 7% nominal return but forget that retirement
            spending also inflates, you understate what you need. Working after-inflation keeps the
            spending figure and the growth figure in the same dollars — today&apos;s.
          </p>
        </div>
      </section>

      {/* LIMITS */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Know the limits
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            What this calculator assumes — honestly
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            The projection uses <strong className="text-white">one steady return every year</strong>.
            Real markets do not work like that: a bad decade early on (sequence-of-returns risk) can
            leave a portfolio well below the smooth line, which is why sensible plans keep a cushion
            above the Coast number rather than treating it as a finish line. The calculator also{" "}
            <strong className="text-white">ignores taxes, fees and any state pension or Social
            Security</strong> — fold expected taxes into your spending figure, and treat pension
            income as a bonus on top. Finally, it assumes your retirement spending stays flat in
            today&apos;s dollars; big one-off costs are not modelled. Use the result as a planning
            landmark, not a promise.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            More free tools in the{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              tools hub
            </Link>{" "}
            — including the{" "}
            <Link href="/compound-interest-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Compound Interest Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/compound-interest-calculator" className="font-semibold text-orange-700 hover:text-orange-800">compound interest calculator</Link>, <Link href="/percentage-calculator" className="font-semibold text-orange-700 hover:text-orange-800">percentage calculator</Link>, <Link href="/hourly-to-salary-calculator" className="font-semibold text-orange-700 hover:text-orange-800">hourly to salary calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Coast FIRE questions, answered" />
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
              Find your Coast number <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This calculator is general educational information, not financial advice. Projections are
            estimates based on your inputs and an assumed constant return; actual outcomes will vary.
            Talk to a qualified financial professional about your own plan.
          </p>
        </div>
      </section>
    </>
  );
}
