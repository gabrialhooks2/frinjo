import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import ByajCalculator from "./ByajCalculator";

export const metadata = {
  title: "Byaj Calculator — Village Sekda & Bank Interest",
  description:
    "Free byaj calculator for India: village interest in rupaye sekda (% per month) and bank simple interest (% per year) in one tool, with the yearly-rate conversion shown.",
  keywords: [
    "byaj calculator",
    "byaj kaise nikale",
    "sekda byaj calculator",
    "village interest calculator",
    "simple interest calculator india",
    "rupaye sekda interest",
  ],
  alternates: {
    canonical: "https://frinjo.me/byaj-calculator",
    languages: {
      en: "https://frinjo.me/byaj-calculator",
      "x-default": "https://frinjo.me/byaj-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Byaj Calculator — Sekda (Village) & Bank Interest | Frinjo",
    description:
      "₹2 sekda is 24% a year. Enter principal, rate and time in village style or bank style and see interest, total amount and the honest yearly rate.",
    url: "https://frinjo.me/byaj-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Byaj Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/byaj-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Simple interest calculator with two quoting styles used in India. Village mode takes the rate in rupaye sekda — percent per month — and computes interest as principal × rate × months ÷ 100, also showing the equivalent annual rate (monthly rate × 12). Bank mode takes a yearly rate and computes principal × rate × months ÷ 1200. Shows total interest, interest per month and the total amount. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Byaj Calculator", item: "https://frinjo.me/byaj-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What does “rupaye sekda” mean?",
    "Sekda means “per hundred”. When a village lender says “2 rupaye sekda”, he means ₹2 of interest every month on every ₹100 lent — 2% per month. Because the rate is monthly, it sounds small but adds up fast: 2% a month is 24% a year. On ₹1,00,000 borrowed for one year at 2 sekda, the interest is ₹24,000 and the total repayment is ₹1,24,000.",
  ],
  [
    "How do I convert a sekda rate into a yearly bank rate?",
    "Multiply by 12. 1 sekda (1% per month) = 12% per year, 1.5 sekda = 18% per year, 2 sekda = 24% per year, 3 sekda = 36% per year and 5 sekda = 60% per year. This conversion is the only fair way to compare a moneylender's quote with a bank or NBFC loan — banks always quote yearly rates, so a “2%” village loan is not cheaper than a “12%” bank loan; it is twice as expensive.",
  ],
  [
    "What is the formula for byaj (simple interest)?",
    "Interest = Principal × Rate × Time ÷ 100, with rate and time in matching units. In village style: Interest = P × monthly rate × months ÷ 100. In bank style: Interest = P × yearly rate × years ÷ 100. Example: ₹50,000 at 2 sekda for 8 months gives 50,000 × 2 × 8 ÷ 100 = ₹8,000 of interest. Simple interest never charges interest on interest — that is compound interest, which banks use for deposits and credit cards.",
  ],
  [
    "Is village interest legal in India?",
    "Private lending is regulated state by state under money-lending Acts, which usually require the lender to hold a licence and cap the rate that can be charged; unlicensed lending and rates above the state cap can be challenged. Whatever the paperwork, the arithmetic is the same — run the numbers here first so you know the true yearly cost before you agree to anything.",
  ],
  [
    "Why does the same loan cost more in the village system?",
    "Two reasons. First, the monthly quoting hides the real rate — 3 sekda sounds modest but is 36% a year. Second, some lenders deduct the first month's interest upfront or charge on the original principal even as you repay in instalments, which raises the effective cost further. A bank EMI loan charges interest only on the balance still owed, which is why a 14% bank loan can cost less than a “2%” village loan.",
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

export default function ByajCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Village sekda + bank mode
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Byaj <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            “2 rupaye sekda” is 24% a year — see the real number
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Interest in India is quoted two ways: per month in the village (<strong>sekda</strong>) and
            per year at the bank. Enter your principal, rate and time in either style and get the{" "}
            <strong>interest</strong>, the <strong>total amount</strong> and the{" "}
            <strong>honest yearly rate</strong>.
          </p>
        </div>
      </section>

      <ByajCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="One loan, two languages of interest"
            sub="The maths is identical. Only the quoting changes — and that is exactly where borrowers get caught."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Village style</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Rate per month, per hundred</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest = principal × sekda rate × months ÷ 100. Lend ₹1,00,000 at 2 sekda for a year
                and the byaj is ₹24,000 — because the 2% is charged twelve times, once every month.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Bank style</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Rate per year, on the record</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest = principal × yearly rate × years ÷ 100. The same ₹1,00,000 at a bank&apos;s
                12% simple interest costs ₹12,000 for the year — half the village quote that “sounds”
                six times cheaper.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The conversion</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Multiply sekda by 12, always</h3>
              <p className="text-stone-600 leading-relaxed">
                Monthly rate × 12 = yearly rate. This one multiplication is the difference between
                comparing offers and being misled by them, so the calculator prints the yearly rate
                next to every village result.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Simple, not compound</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Interest on principal only</h3>
              <p className="text-stone-600 leading-relaxed">
                Both styles here are simple interest: the charge is always on the original amount,
                never on unpaid interest. If a lender rolls unpaid byaj into the principal, the cost
                jumps — that is compounding, and it should be agreed in writing, not discovered later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="Side by side" title="Village vs bank on ₹1,00,000 for 1 year" />
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-orange-50 text-stone-900">
                  <th className="px-4 py-3 font-bold">Quote you hear</th>
                  <th className="px-4 py-3 font-bold">Real yearly rate</th>
                  <th className="px-4 py-3 font-bold">Interest in 1 year</th>
                  <th className="px-4 py-3 font-bold">Total to repay</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {[
                  ["Village — 1 sekda", "12%", "₹12,000", "₹1,12,000"],
                  ["Village — 1.5 sekda", "18%", "₹18,000", "₹1,18,000"],
                  ["Village — 2 sekda", "24%", "₹24,000", "₹1,24,000"],
                  ["Village — 3 sekda", "36%", "₹36,000", "₹1,36,000"],
                  ["Bank — 12% per year", "12%", "₹12,000", "₹1,12,000"],
                  ["Bank — 18% per year", "18%", "₹18,000", "₹1,18,000"],
                  ["Bank — 24% per year", "24%", "₹24,000", "₹1,24,000"],
                ].map(([q, r, i, t]) => (
                  <tr key={q} className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">{q}</td>
                    <td className="px-4 py-2.5">{r}</td>
                    <td className="px-4 py-2.5">{i}</td>
                    <td className="px-4 py-2.5">{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-8 text-stone-600 leading-relaxed">
            <strong className="text-stone-900">The sekda table:</strong> 1 sekda = 12% a year ·
            1.5 sekda = 18% · 2 sekda = 24% · 2.5 sekda = 30% · 3 sekda = 36% · 5 sekda = 60%. Any
            village quote above 2 sekda costs more than most bank personal loans — worth knowing
            before you sign anything, or agree to anything on a handshake.
          </p>
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/emi-calculator" className="font-semibold text-orange-700 hover:text-orange-800">EMI calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Byaj questions, answered" />
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
              Calculate my byaj <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Simple-interest estimates. If your agreement compounds unpaid interest or deducts charges
            upfront, the true cost will be higher.
          </p>
        </div>
      </section>
    </>
  );
}
