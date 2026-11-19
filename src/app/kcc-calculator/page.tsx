import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import KccCalculator from "./KccCalculator";

export const metadata = {
  title: "KCC Calculator — Kisan Credit Card Interest at 7% vs 4%",
  description:
    "Free Kisan Credit Card interest calculator: see crop-loan interest at the bank's 7% and at the effective 4% you pay with prompt-repayment subvention, side by side, and the saving.",
  keywords: [
    "kcc calculator",
    "kisan credit card interest calculator",
    "kcc interest calculator",
    "crop loan interest calculator",
    "kisan credit card 4 percent",
  ],
  alternates: {
    canonical: "https://frinjo.me/kcc-calculator",
    languages: {
      en: "https://frinjo.me/kcc-calculator",
      "x-default": "https://frinjo.me/kcc-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "KCC Calculator — 7% vs Effective 4% Interest | Frinjo",
    description:
      "On a ₹3,00,000 crop loan, repaying on time cuts interest from ₹21,000 to ₹12,000. Compare both rates side by side for your Kisan Credit Card loan.",
    url: "https://frinjo.me/kcc-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "KCC Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/kcc-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Kisan Credit Card (KCC) interest calculator using simple interest, P × rate × time ÷ 100. Shows interest at the bank's lending rate (default 7%) and at the effective 4% rate a farmer pays on short-term crop loans up to ₹3,00,000 when the loan is repaid on time — a 2% interest subvention to the bank plus a 3% prompt-repayment subvention — and the saving between the two. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "KCC Calculator", item: "https://frinjo.me/kcc-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How does the 4% effective rate work? A worked example",
    "On a ₹3,00,000 crop loan for one year at 7%, the interest is ₹21,000. The government pays the bank a 2% interest subvention, and when you repay on or before the due date a further 3% prompt-repayment subvention is credited to your account — ₹9,000 back on this loan. Your net interest is ₹12,000, which is exactly 4% of the loan. Repay late and the 3% benefit is lost for that cycle: the same loan costs the full ₹21,000.",
  ],
  [
    "Which loans qualify for the subvention?",
    "Short-term crop loans up to ₹3,00,000 taken through the Kisan Credit Card. The 7% lending rate and both subventions are tied to that limit; amounts above it, and loans for allied activities beyond their own sub-limits, are priced under the bank's normal terms. The benefit is assessed crop season by crop season, against each due date.",
  ],
  [
    "How is KCC interest actually charged?",
    "Interest is charged on the amount you actually draw and the days you use it — draw ₹1,00,000 for four months of the season and you pay interest on ₹1,00,000 for four months, not on your full limit for a year. This calculator uses a full-period drawdown for a clean comparison; your statement interest will be lower if you draw late or repay in parts.",
  ],
  [
    "What happens if I miss the repayment date?",
    "The prompt-repayment subvention (3%) is lost, so that cycle effectively costs 7%. Continued delay can attract penal interest and card renewal problems, and the overdue amount may be converted to a term loan at higher rates. The single most valuable habit with a KCC is protecting the due date — it is worth 3% of the loan every single season.",
  ],
  [
    "What can a Kisan Credit Card be used for?",
    "Crop production expenses — seed, fertiliser, pesticides, labour, irrigation — plus maintenance of farm assets and, within prescribed sub-limits, allied activities such as dairy, poultry and fisheries, and consumption needs. The card typically stays valid for 5 years with annual reviews, and the limit is set from the scale of finance for your crop and landholding.",
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

export default function KccCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Kisan Credit Card · Subvention shown
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            KCC <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            The same crop loan at 7% — and at the 4% you actually pay
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Repay a <strong>Kisan Credit Card</strong> crop loan on time and government subvention
            cuts the effective rate to <strong>4%</strong>. See both interest figures{" "}
            <strong>side by side</strong> — and what the due date is worth to you.
          </p>
        </div>
      </section>

      <KccCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Two subventions turn 7% into 4%"
            sub="The discount is real money, paid by the government — but only to farmers who repay on time."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Subvention 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">2% paid to the bank</h3>
              <p className="text-stone-600 leading-relaxed">
                Under the interest subvention scheme, banks lend for crops at 7% because the
                government reimburses them 2% — without it, farm lending would be priced like any
                other unsecured credit.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Subvention 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">3% for repaying promptly</h3>
              <p className="text-stone-600 leading-relaxed">
                Repay by the due date and a further 3% is credited back. 7 − 2 − 3 leaves the
                effective 4% this calculator shows — on ₹3,00,000, a saving of ₹9,000 every season.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The drawdown</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest follows what you actually use</h3>
              <p className="text-stone-600 leading-relaxed">
                KCC works like a credit line for the season: interest accrues on drawn amounts for
                the days outstanding. Drawing in stages as expenses arise keeps the interest well
                below the full-period figure.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The discipline</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">One date protects 3%</h3>
              <p className="text-stone-600 leading-relaxed">
                The prompt-repayment benefit is all-or-nothing per cycle. Selling the harvest and
                clearing the card before the due date — even before taking a fresh drawal for the
                next season — is the highest-return routine on the farm.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/byaj-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Byaj calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Kisan Credit Card questions, answered" />
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
              Compare my crop-loan interest <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Subvention terms per the Government of India interest subvention scheme; confirm current
            limits and rates with your bank.
          </p>
        </div>
      </section>
    </>
  );
}
