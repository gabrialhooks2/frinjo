import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import PmSuryaGharLoanCalculator from "./PmSuryaGharLoanCalculator";

export const metadata = {
  title: "PM Surya Ghar Loan Calculator — Subsidy, EMI & Net Cost",
  description:
    "Free PM Surya Ghar rooftop solar calculator: pick your kW to get the central subsidy (₹30,000 / ₹60,000 / ₹78,000), loan EMI, net cost after subsidy and monthly bill savings.",
  keywords: [
    "pm surya ghar calculator",
    "surya ghar loan calculator",
    "solar subsidy calculator",
    "rooftop solar emi calculator",
    "pm surya ghar subsidy amount",
  ],
  alternates: {
    canonical: "https://frinjo.me/pm-surya-ghar-loan-calculator",
    languages: {
      en: "https://frinjo.me/pm-surya-ghar-loan-calculator",
      "x-default": "https://frinjo.me/pm-surya-ghar-loan-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "PM Surya Ghar Loan Calculator — ₹78,000 Subsidy for 3 kW | Frinjo",
    description:
      "A 3 kW plant at ₹1,80,000 earns a ₹78,000 subsidy — net cost ₹1,02,000. Work out your subsidy, EMI and bill savings before you call a vendor.",
    url: "https://frinjo.me/pm-surya-ghar-loan-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PM Surya Ghar Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/pm-surya-ghar-loan-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "PM Surya Ghar Muft Bijli Yojana calculator: central subsidy of ₹30,000 for 1 kW, ₹60,000 for 2 kW and ₹78,000 for 3 kW and above, net system cost after subsidy, reducing-balance EMI on the solar loan, and estimated generation (~4 units per kW per day) and bill savings. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "PM Surya Ghar Loan Calculator", item: "https://frinjo.me/pm-surya-ghar-loan-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much subsidy do I get? A worked example",
    "The central subsidy is ₹30,000 for 1 kW, ₹60,000 for 2 kW and ₹78,000 for 3 kW or more — it does not grow beyond 3 kW. Example: a 3 kW plant quoted at ₹1,80,000 earns the full ₹78,000, so your net cost is ₹1,02,000. Financed fully at 10% over 5 years, the EMI is ₹3,824 and total interest ₹49,468. The plant generates roughly 360 units a month, worth about ₹2,160 at ₹6 a unit — covering well over half the EMI from day one.",
  ],
  [
    "How and when is the subsidy paid?",
    "Apply on the PM Surya Ghar national portal, install through a DISCOM-registered vendor, and pass the inspection and net-meter installation. The subsidy then comes as a direct benefit transfer to your bank account, typically within about 30 days of the commissioning documents being approved. It is not a discount at the shop — you pay (or finance) the full price first.",
  ],
  [
    "Can I really get a collateral-free loan for solar?",
    "Yes — under the scheme's model loan terms, banks offer collateral-free loans up to ₹2,00,000 for plants up to 3 kW at repo-linked rates, processed through the JanSamarth portal. Larger plants and bigger loans follow normal bank policy. Rates vary by bank, which is why the rate here is editable — get two bank quotes before signing the vendor agreement.",
  ],
  [
    "Is a bigger plant always better, since 3 kW gets the maximum subsidy?",
    "Not necessarily. Subsidy stops growing at 3 kW, so the 4th and 5th kW are entirely your money. Size the plant to your consumption: a home using 300 units a month gains little from 5 kW, because surplus export is paid at low feed-in rates. A common sweet spot is a plant covering 80–100% of your average monthly units.",
  ],
  [
    "What does the plant earn after the loan is paid off?",
    "Panels are warranted for about 25 years. After a 5-year loan, the same 3 kW plant keeps producing roughly 360 units a month — at ₹6 a unit that is about ₹25,900 a year of avoided bills, against modest cleaning and one inverter replacement over the life. That long tail, not the subsidy, is where rooftop solar really pays.",
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

export default function PmSuryaGharLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Subsidy up to ₹78,000 · EMI included
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            PM Surya Ghar Loan <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Rooftop solar: subsidy first, EMI second, free power after
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Under <strong>PM Surya Ghar Muft Bijli Yojana</strong> the government pays up to{" "}
            <strong>₹78,000</strong> of your rooftop plant. Pick a capacity to see the{" "}
            <strong>subsidy</strong>, the <strong>net cost</strong>, the loan EMI and the{" "}
            <strong>monthly bill saving</strong> together.
          </p>
        </div>
      </section>

      <PmSuryaGharLoanCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Three numbers decide every solar quote"
            sub="Vendors lead with the gross price. Decide on the net cost, the EMI and the generation instead."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Number 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Net cost = price − subsidy</h3>
              <p className="text-stone-600 leading-relaxed">
                ₹30,000 per kW for the first 2 kW and ₹78,000 flat from 3 kW up. On a ₹1,80,000 3 kW
                quote the government carries 43% of the bill — compare vendors on the net figure,
                never the headline price.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Number 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">EMI vs the bill it replaces</h3>
              <p className="text-stone-600 leading-relaxed">
                The honest comparison is EMI against avoided electricity bills. At ₹3,824 EMI versus
                roughly ₹2,160 a month of generation value, the gap is a few years of rising tariffs
                away from closing entirely.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Number 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Generation: ~4 units per kW per day</h3>
              <p className="text-stone-600 leading-relaxed">
                Indian rooftops average about 4 units per kW daily across the year — more in summer,
                less in the monsoon. The calculator uses that standard planning figure; your
                DISCOM-approved design will refine it for your roof&apos;s direction and shading.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The process</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Portal application, registered vendor, DBT subsidy</h3>
              <p className="text-stone-600 leading-relaxed">
                Apply on the national portal, use a DISCOM-registered vendor, and the subsidy reaches
                your bank account after inspection and net metering. An unregistered vendor&apos;s
                plant earns no subsidy — the cheapest quote can become the most expensive.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/personal-loan-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Personal loan calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="PM Surya Ghar questions, answered" />
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
              Work out my solar numbers <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Subsidy slabs per the PM Surya Ghar scheme guidelines; state top-ups, where available, are
            extra. Confirm current terms on the national portal.
          </p>
        </div>
      </section>
    </>
  );
}
