import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import LicPolicyLoanCalculator from "./LicPolicyLoanCalculator";

export const metadata = {
  title: "LIC Policy Loan Calculator — Loan Against Surrender Value",
  description:
    "Free LIC policy loan calculator: enter your surrender value to get the maximum loan (up to 90%), the interest at half-yearly rests, and the total due if nothing is paid meanwhile.",
  keywords: [
    "lic policy loan calculator",
    "lic loan interest calculator",
    "loan against lic policy",
    "lic policy loan interest rate",
    "lic surrender value loan",
  ],
  alternates: {
    canonical: "https://frinjo.me/lic-policy-loan-calculator",
    languages: {
      en: "https://frinjo.me/lic-policy-loan-calculator",
      "x-default": "https://frinjo.me/lic-policy-loan-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "LIC Policy Loan Calculator — Max Loan & Interest | Frinjo",
    description:
      "A ₹5,00,000 surrender value supports a ₹4,50,000 LIC loan at about 9.5%. See the maximum loan and exactly how the half-yearly interest builds up.",
    url: "https://frinjo.me/lic-policy-loan-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "LIC Policy Loan Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/lic-policy-loan-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "Loan-against-LIC-policy calculator: maximum loan = surrender value × loan percentage (default 90%). Interest is modelled the way LIC charges it — at half-yearly rests, loan × (1 + rate/200)^(2×years) — showing the total due if no interest is paid in between, plus the interest payable each half-year. Rates are editable; 9.5% is a recent LIC policy-loan rate. Calculated in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "LIC Policy Loan Calculator", item: "https://frinjo.me/lic-policy-loan-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How much loan can I get, and what does it cost? A worked example",
    "On a surrender value of ₹5,00,000 at 90%, the maximum loan is ₹4,50,000. At 9.5%, interest is charged half-yearly — ₹21,375 every six months. Pay that interest as it falls due and the loan stays at ₹4,50,000. Pay nothing for 3 years and the unpaid interest compounds at half-yearly rests: the loan grows to about ₹5,94,479, so the silence costs ₹1,44,479 — which is why LIC nudges borrowers to service the interest.",
  ],
  [
    "Who is eligible for an LIC policy loan?",
    "The policy must have acquired a surrender value — generally after at least 2 full years of premiums — and be in force. Loans are available on most traditional endowment and money-back plans; term plans and most ULIPs do not offer policy loans. The policy is assigned to LIC for the loan's duration, and no credit score, income proof or purpose is asked.",
  ],
  [
    "How do I repay an LIC policy loan?",
    "Three ways: pay only the half-yearly interest and keep the principal outstanding; repay principal in parts or in full at any time (minimum loan tenure is 6 months); or let the loan and interest be adjusted against the maturity or claim amount. The third is effortless but silently shrinks the family's payout — repaying during the term is almost always better.",
  ],
  [
    "What happens if the loan plus interest exceeds the surrender value?",
    "LIC can foreclose the policy: it becomes void once the outstanding loan and interest overtake the surrender value, after notice to the policyholder. Borrowing at the full 90% and never paying interest reaches that line fastest. A safer habit is to borrow up to about 70–80% of the surrender value and service the interest.",
  ],
  [
    "LIC policy loan vs personal loan — which is cheaper?",
    "The policy loan, almost always: about 9–10.5% with no processing fee, no EMI schedule and no credit check, versus 10.5–16% plus fees for a personal loan. The policy loan's flexibility cuts both ways, though — with no EMI forcing repayment, undisciplined borrowers let interest compound for years. If you need a fixed end date to stay honest, compare the EMI calculator figure too.",
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

export default function LicPolicyLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No credit check · Up to 90% of SV
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            LIC Policy Loan <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Borrow against your policy — and watch the interest honestly
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Your LIC policy can lend you up to <strong>90% of its surrender value</strong> at about
            9.5%, with no EMI schedule. Enter the surrender value to see the{" "}
            <strong>maximum loan</strong> and what the interest becomes if it is{" "}
            <strong>left unpaid</strong>.
          </p>
        </div>
      </section>

      <LicPolicyLoanCalculator />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Cheap money with one quiet trap"
            sub="The trap is not the rate — it is the compounding of interest nobody reminds you to pay."
          />
          <div className="grid gap-5 md:grid-cols-2 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The limit</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">90% of surrender value, not sum assured</h3>
              <p className="text-stone-600 leading-relaxed">
                The loan is anchored to what the policy is worth today if surrendered — a much smaller
                number than the sum assured in the early years. Check your surrender value first (the
                surrender calculator below estimates it), then the loan figure follows.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The interest</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Half-yearly rests, payable twice a year</h3>
              <p className="text-stone-600 leading-relaxed">
                Interest falls due every six months. Pay it and the loan never grows; skip it and it
                is added to the loan and itself starts earning interest — the difference on ₹4,50,000
                over 3 years is over ₹11,000 of extra interest.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">The freedom</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">No EMI, no foreclosure charge</h3>
              <p className="text-stone-600 leading-relaxed">
                Repay any amount, any time after 6 months, with no prepayment penalty — or let it run
                to maturity and have it adjusted from the claim. That flexibility is the product;
                use it deliberately, not by default.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">The guardrail</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Keep a margin below the surrender value</h3>
              <p className="text-stone-600 leading-relaxed">
                If the outstanding loan and interest ever cross the surrender value, LIC can terminate
                the policy. Borrowing 70–80% and servicing the interest keeps a safe gap for years.
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link>, <Link href="/lic-surrender-value-calculator" className="font-semibold text-orange-700 hover:text-orange-800">LIC surrender value calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="LIC policy loan questions, answered" />
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
              Calculate my policy loan <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Rates and loan percentages change over time; confirm the current terms at your LIC branch
            or the LIC portal before borrowing.
          </p>
        </div>
      </section>
    </>
  );
}
