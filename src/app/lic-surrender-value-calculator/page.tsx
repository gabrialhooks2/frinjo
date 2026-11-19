import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import LicSurrenderValueCalculator from "./LicSurrenderValueCalculator";

export const metadata = {
  title: "LIC Surrender Value Calculator — GSV Estimate for Your Policy",
  description:
    "Free LIC surrender value calculator: estimate the Guaranteed Surrender Value from your annual premium, years paid and vested bonus — 30% of premiums excluding the first year, plus bonus value.",
  keywords: [
    "lic surrender value calculator",
    "lic policy surrender value",
    "lic gsv calculator",
    "surrender value of lic policy",
    "lic surrender charges",
  ],
  alternates: {
    canonical: "https://frinjo.me/lic-surrender-value-calculator",
    languages: {
      en: "https://frinjo.me/lic-surrender-value-calculator",
      "x-default": "https://frinjo.me/lic-surrender-value-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "LIC Surrender Value Calculator — What Your Policy Pays Today | Frinjo",
    description:
      "Paid ₹4,00,000 in premiums over 8 years? The guaranteed surrender value is roughly ₹1,41,000. Estimate yours before you visit the branch.",
    url: "https://frinjo.me/lic-surrender-value-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LIC Surrender Value Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/lic-surrender-value-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "LIC Guaranteed Surrender Value (GSV) estimator: GSV = 30% of total premiums paid excluding the first year's premium, plus vested bonus multiplied by a bonus surrender factor (editable, default 30%). Shows total premiums paid and the recovery percentage. Clearly labelled an estimate: LIC's official figure uses plan-specific factor tables, and the Special Surrender Value may be higher. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "LIC Surrender Value Calculator", item: "https://frinjo.me/lic-surrender-value-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is the guaranteed surrender value calculated? A worked example",
    "GSV = 30% of all premiums paid, excluding the first year's premium, plus the surrender value of vested bonuses. Example: ₹50,000 a year paid for 8 years is ₹4,00,000 in premiums. Excluding year one leaves ₹3,50,000; 30% of that is ₹1,05,000. Add vested bonuses of ₹1,20,000 at a 30% bonus factor (₹36,000) and the estimated GSV is ₹1,41,000 — about 35% of what you paid in. Early surrender is expensive by design.",
  ],
  [
    "When does a policy acquire a surrender value?",
    "Generally after at least 2 full years of premiums have been paid (policies issued under the newer rules); older policies used a 3-year threshold. Surrender in the first couple of years returns little or nothing, because the first-year premium largely funds commission and issue costs — which is exactly why the GSV formula excludes it.",
  ],
  [
    "GSV vs Special Surrender Value — which will LIC actually pay?",
    "Whichever is higher. The GSV is the contractual floor computed by the formula above. The Special Surrender Value (SSV) is based on the paid-up value of the policy multiplied by surrender factors LIC reviews periodically; for policies that have run many years, SSV is usually the better figure. Always ask LIC for both numbers in writing before surrendering.",
  ],
  [
    "What are the alternatives to surrendering?",
    "Three, usually better: (1) Take a policy loan against the surrender value if the need is temporary — the policy stays alive. (2) Make the policy paid-up: stop paying premiums and let a reduced sum assured run to maturity. (3) If the policy is only 1–2 years old, sometimes lapsing and restarting a cheaper term plan plus investing the difference beats every other option. Run the loan numbers on the LIC policy loan calculator before you sign a surrender form.",
  ],
  [
    "Is the surrender value taxable?",
    "For traditional policies, surrender proceeds are taxable if the premium exceeded 10% of the sum assured in any year (the Section 10(10D) condition), and TDS can apply on taxable payouts. If premiums stayed within 10% of the sum assured and the policy ran at least 5 years, the proceeds are generally exempt. Check your premium-to-sum-assured ratio, or ask a tax advisor for large policies.",
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

export default function LicSurrenderValueCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · GSV formula · Estimate only
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            LIC Surrender Value <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            What your policy pays if you walk away today
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Thinking of surrendering an LIC policy? First see the number: the{" "}
            <strong>Guaranteed Surrender Value</strong> is 30% of premiums (excluding year one) plus
            the surrender value of your <strong>vested bonuses</strong>. Estimate it here before the
            branch visit.
          </p>
        </div>
      </section>

      <LicSurrenderValueCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Why the surrender value feels so low"
            sub="The formula is not a penalty invented at the branch — it is written into the policy's terms."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The 30% rule</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Only 30% of premiums count</h3>
              <p className="text-stone-600 leading-relaxed">
                The GSV takes 30% of premiums paid, and the first year&apos;s premium is excluded
                entirely. On 8 years of ₹50,000 premiums, that turns ₹4,00,000 paid into a ₹1,05,000
                premium component — the single biggest reason early surrender hurts.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The bonus part</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Vested bonuses are discounted too</h3>
              <p className="text-stone-600 leading-relaxed">
                Bonuses already declared stay yours, but at a surrender factor — a percentage of the
                vested bonus based on the remaining term, not the full amount. The calculator lets
                you vary the factor to see the range LIC might apply.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The better figure</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Special Surrender Value often wins</h3>
              <p className="text-stone-600 leading-relaxed">
                SSV is computed from the paid-up value with periodically revised factors, and LIC pays
                the higher of GSV and SSV. Long-running policies usually do meaningfully better on
                SSV — ask for both figures in writing.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The pause button</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Paid-up beats surrender for many</h3>
              <p className="text-stone-600 leading-relaxed">
                If the problem is the premium, not the policy, converting to paid-up stops future
                premiums while keeping a reduced cover and the bonuses already earned — usually worth
                far more than the surrender cheque.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/lic-policy-loan-calculator" className="font-semibold text-orange-700 hover:text-orange-800">LIC policy loan calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="LIC surrender questions, answered" />
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
              Estimate my surrender value <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Estimate only — LIC&apos;s written surrender quotation for your policy is the binding figure.
          </p>
        </div>
      </section>
    </>
  );
}
