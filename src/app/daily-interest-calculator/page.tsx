import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import DailyInterestCalculator from "./DailyInterestCalculator";

export const metadata = {
  title: "Daily Interest Calculator — Interest Per Day, Month & Year",
  description:
    "Free daily interest calculator: enter an amount and a yearly rate to see interest per day, per week, per month and per year, with a full period table. Simple interest, exact to the paisa.",
  keywords: [
    "daily interest calculator",
    "interest per day calculator",
    "per day interest calculator",
    "daily interest calculator india",
    "interest per month calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/daily-interest-calculator",
    languages: {
      en: "https://frinjo.me/daily-interest-calculator",
      "x-default": "https://frinjo.me/daily-interest-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Daily Interest Calculator — What Your Money Earns Per Day | Frinjo",
    description:
      "Interest per day, week, month and year for any amount and rate — the table banks use when they credit savings interest on daily balances.",
    url: "https://frinjo.me/daily-interest-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Daily Interest Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/daily-interest-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Simple-interest calculator broken down by day: interest per day = principal × annual rate ÷ 100 ÷ 365. Shows per-day, per-month (year ÷ 12) and per-year interest plus a table for 1, 7, 15, 30, 90, 180, 365 and 730 days with the amount including interest. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Daily Interest Calculator", item: "https://frinjo.me/daily-interest-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is daily interest calculated? A worked example",
    "Daily interest = amount × yearly rate ÷ 100 ÷ 365. Example: ₹1,00,000 at 7% earns ₹7,000 a year, which is ₹19.18 a day, about ₹583 a month and ₹1,750 a quarter. Any period is then one multiplication: 45 days of interest is ₹19.18 × 45 = ₹863. This is exactly how banks price overdue loans, delayed payments and savings-account interest on daily balances.",
  ],
  [
    "Why do banks use 365 days — and sometimes 360?",
    "Indian banks and the RBI convention use actual days in the year: 365, or 366 in a leap year. Some older commercial contracts and a few money-market conventions use a 360-day year, which quietly pays the lender a little more (the same yearly rate spread over fewer days makes each day cost more). If a quote mentions “actual/360”, the daily rate is higher than it looks — divide by 360 instead of 365 to compare.",
  ],
  [
    "How does savings account interest work with daily balances?",
    "Since 2010 the RBI requires savings interest to be calculated on the daily closing balance, though it is credited quarterly. Money that sits in the account for only part of the quarter earns only for those days — which is why moving a large sum in just before the credit date no longer games the system, and why keeping idle money in a sweep-in FD earns more.",
  ],
  [
    "What is the per-day cost of a loan?",
    "The same formula, read as a warning. ₹5,00,000 borrowed at 14% costs ₹191.78 every single day — ₹5,753 a month — whether you use the money or not. It is the clearest way to see why prepaying even a small lump sum early in a loan saves real money: every day of delay is billed.",
  ],
  [
    "Does this calculator compound the interest?",
    "No — it is simple interest, which is the correct basis for daily pricing: banks charge and pay per-day interest on the balance, and compounding enters only when unpaid interest is added to that balance (monthly rests on loans, quarterly credits on deposits). For growth over years with compounding, use the compound interest or FD calculator instead.",
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

export default function DailyInterestCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Per day, month & year
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Daily Interest <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            What one day of money costs — or earns
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Enter an amount and a yearly rate to see the interest <strong>per day</strong>,{" "}
            <strong>per month</strong> and <strong>per year</strong> — plus a full table for the
            periods banks actually use, from a single day to two years.
          </p>
        </div>
      </section>

      <DailyInterestCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="A year of interest, divided by 365"
            sub="Every per-day price in banking — overdue charges, savings interest, break costs — is this one division."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The formula</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Per day = P × rate ÷ 100 ÷ 365</h3>
              <p className="text-stone-600 leading-relaxed">
                First the year&apos;s interest, then its daily slice. Any period — 11 days of delay,
                73 days of deposit — is the daily figure times the days. No other maths hides inside.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Earning side</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Savings interest is a daily product</h3>
              <p className="text-stone-600 leading-relaxed">
                Your savings account earns on every day&apos;s closing balance, credited quarterly.
                ₹1,00,000 at 7% (a sweep or small-finance rate) is ₹19.18 a day — real money that a
                zero-interest current account silently gives up.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Owing side</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Delays are billed by the day</h3>
              <p className="text-stone-600 leading-relaxed">
                Overdue interest, penal charges and late-payment interest all run daily. A credit-card
                balance at 42% costs ₹115 a day per lakh — the per-day view is why minimum payments
                are a trap.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The quick estimate</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Per lakh, per day</h3>
              <p className="text-stone-600 leading-relaxed">
                At 7%, one lakh earns ₹19.18 a day; at 10%, ₹27.40; at 14%, ₹38.36; at 24%, ₹65.75.
                Scale by your amount in lakhs and you can price any delay or deposit in your head.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/byaj-calculator" className="font-semibold text-orange-700 hover:text-orange-800">byaj calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Daily interest questions, answered" />
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
              Price my per-day interest <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Simple interest on a 365-day year. Leap years and actual/360 contracts differ slightly.
          </p>
        </div>
      </section>
    </>
  );
}
