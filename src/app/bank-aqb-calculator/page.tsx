import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import BankAqbCalculator from "./BankAqbCalculator";

export const metadata = {
  title: "Bank AQB Calculator — Average Quarterly Balance Shortfall & Penalty",
  description:
    "Free AQB calculator: enter your bank's required average quarterly balance and your actual average to see the shortfall and the estimated non-maintenance charge, GST included.",
  keywords: [
    "aqb calculator",
    "average quarterly balance calculator",
    "mab penalty calculator",
    "minimum balance charge calculator",
    "aqb shortfall calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/bank-aqb-calculator",
    languages: {
      en: "https://frinjo.me/bank-aqb-calculator",
      "x-default": "https://frinjo.me/bank-aqb-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Bank AQB Calculator — Shortfall & Penalty Estimate | Frinjo",
    description:
      "Required ₹10,000 but averaged ₹6,000? The shortfall is ₹4,000 and the charge follows. Estimate your AQB non-maintenance penalty before the bank debits it.",
    url: "https://frinjo.me/bank-aqb-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Bank AQB Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/bank-aqb-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Average Quarterly Balance (AQB) shortfall and penalty estimator: shortfall = required AQB − actual average balance (the sum of daily closing balances divided by the days in the quarter). The estimated charge is either the bank's flat quarterly charge or a percentage of the shortfall, with 18% GST added, as banks levy GST on service charges. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Bank AQB Calculator", item: "https://frinjo.me/bank-aqb-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is AQB calculated? A worked example",
    "AQB = (sum of the closing balance on every day of the quarter) ÷ (number of days in the quarter). Hold ₹10,000 for 45 days and ₹2,000 for the other 45 days of a 90-day quarter and your AQB is (10,000×45 + 2,000×45) ÷ 90 = ₹6,000 — not the ₹10,000 your balance touched, and not the month-end figure. Against a ₹10,000 requirement, the shortfall is ₹4,000 and the bank's charge applies to that gap.",
  ],
  [
    "How much do banks actually charge for non-maintenance?",
    "It varies widely: many banks charge a flat ₹250–₹600 per quarter (or per month on monthly-average accounts), some scale the charge to the size of the shortfall, and public-sector banks are often at the lower end. On top of the charge, 18% GST is added — a ₹500 charge debits ₹590. Your account's schedule of charges is the binding document; this calculator estimates from the figures you enter.",
  ],
  [
    "AQB vs MAB — what is the difference?",
    "Only the averaging window. MAB (Monthly Average Balance) averages the daily balances of one month; AQB averages a full quarter. Quarterly averaging is more forgiving of one bad month, since two strong months can carry a weak one. Some accounts use neither — salary accounts and basic savings (BSBDA) accounts are zero-balance by rule and can never be charged for non-maintenance.",
  ],
  [
    "Can a last-minute deposit save the quarter?",
    "Barely — and the maths shows why. With 10 days left in a 90-day quarter, even depositing ₹36,000 lifts the AQB by only ₹36,000 × 10 ÷ 90 = ₹4,000. The same money parked for the whole quarter would have lifted it by the full ₹36,000. AQB rewards steadiness, not sprints; if a charge is coming, it is usually cheaper to accept it once and fix the balance from the next quarter's first day.",
  ],
  [
    "How do I check my actual AQB?",
    "Most bank apps and internet-banking dashboards show the current month's or quarter's average balance under account details, and it appears on some statements. If yours does not, add the daily closing balances from the statement and divide by the days — or ask the branch; they compute it for the charge anyway and can tell you the figure before debiting it.",
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

export default function BankAqbCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Shortfall + charge · GST included
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Bank AQB <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Know the penalty before the bank debits it
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Your savings account must hold an <strong>Average Quarterly Balance</strong>. Enter the
            requirement and your actual average to see the <strong>shortfall</strong> and the{" "}
            <strong>estimated charge</strong> — GST included, no surprises.
          </p>
        </div>
      </section>

      <BankAqbCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="An average of every single day — that is the whole trick"
            sub="Most people lose this charge by misunderstanding one word: average."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The formula</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Σ daily closing balances ÷ days</h3>
              <p className="text-stone-600 leading-relaxed">
                Not your highest balance, not your month-end balance — the mean of all ~90 closing
                balances in the quarter. A salary that leaves the account in a week counts for only
                those days it stayed.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The charge</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Flat or scaled, plus 18% GST</h3>
              <p className="text-stone-600 leading-relaxed">
                Banks either levy a flat quarterly fee or scale it to the shortfall, then add GST.
                Four missed quarters a year quietly costs ₹1,200–₹2,800 — real money for an account
                that may be earning 2.5–3% interest.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The fix</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Steady beats large</h3>
              <p className="text-stone-600 leading-relaxed">
                ₹10,000 held all quarter satisfies a ₹10,000 AQB; ₹90,000 held for the last 10 days
                does exactly the same — and not a rupee more. If you must top up, do it on day one of
                the quarter, not day eighty.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The escape</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Zero-balance accounts exist</h3>
              <p className="text-stone-600 leading-relaxed">
                Salary accounts, BSBDA accounts and several digital accounts carry no AQB rule at
                all. If your balance pattern will never fit the requirement, moving the account type
                ends the charge permanently.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/fd-calculator" className="font-semibold text-orange-700 hover:text-orange-800">FD calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="AQB questions, answered" />
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
              Estimate my AQB charge <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimate only — your bank&apos;s schedule of charges for your exact account variant is the
            binding document.
          </p>
        </div>
      </section>
    </>
  );
}
