import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import TippedOccupationLookup from "./TippedOccupationLookup";

export const metadata = {
  title: "Tipped Occupation Code Lookup — W-2 Box 14b",
  description:
    "Free lookup of all 71 Treasury Tipped Occupation Codes (TTOC) for W-2 Box 14b, plus a checker: is the code on your W-2 the right one for your job — or a deduction-killing 000?",
  keywords: [
    "tipped occupation code lookup",
    "ttoc codes list",
    "w2 box 14b code",
    "treasury tipped occupation codes",
    "box 14b 000",
    "no tax on tips occupation list",
  ],
  alternates: {
    canonical: "https://frinjo.me/tipped-occupation-code-lookup",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Tipped Occupation Code Lookup — Check Your W-2 Box 14b | WebStore Pro",
    description:
      "All 71 official TTOC codes in one searchable list, plus a Box 14b checker — a wrong code, or the placeholder 000, can kill your $25,000 tips deduction.",
    url: "https://frinjo.me/tipped-occupation-code-lookup",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tipped Occupation Code Lookup",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/tipped-occupation-code-lookup",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free searchable lookup of the 71 Treasury Tipped Occupation Codes (TTOC) — the official IRS list of occupations that customarily and regularly received tips on or before December 31, 2024, under the final regulations for the section 224 'no tax on tips' deduction (TD 10044). From tax year 2026 the code is reported in Box 14b of Form W-2 alongside Box 12 code TP. The built-in checker compares the code printed in a worker's Box 14b with the correct code for their occupation and flags a wrong code, an invalid code, or the placeholder 000 (used for occupations not on the list, whose tips do not qualify). All lookups run locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Tipped Occupation Code Lookup", item: "https://frinjo.me/tipped-occupation-code-lookup" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is the code in Box 14b of my W-2?",
    "It is your Treasury Tipped Occupation Code (TTOC) — a three-digit code identifying the occupation in which you received the tips reported on that W-2. It is new for tax year 2026 and appears whenever Box 12 carries code TP (your total reported cash tips). Box 14b can hold up to two codes if your tips came from two listed occupations. The IRS matches this code against its list of 71 tipped occupations when you claim the no-tax-on-tips deduction.",
  ],
  [
    "My Box 14b says 000. What does that mean?",
    "000 is not an occupation. Employers enter it when some or all of the tips were received in an occupation that is NOT on the Treasury list — and tips reported under 000 do not qualify for the deduction. If your job is on the list (search it above) and your W-2 still shows 000, your employer used the wrong entry: ask payroll to correct it on Form W-2c, showing the proper code for your occupation.",
  ],
  [
    "The occupation code on my W-2 is wrong. How do I fix it?",
    "Find the correct code for your occupation in the lookup above, then ask your employer or payroll provider to issue a corrected W-2 — Form W-2c — with the right code in Box 14b. Do it before you file if you can: the IRS receives the same figures, and a code that points to a different occupation (or to 000) can see your tips deduction reduced or denied even though the job itself qualifies.",
  ],
  [
    "What is Box 12 code TP, and should I check it too?",
    "Code TP in Box 12 is the total cash tips you reported to your employer during the year — the amount that feeds the tips deduction, up to the $25,000 cap. It is worth a quick sanity check against your own records (your tip diary, pay stubs, or the Form 4070 totals you handed in): if code TP understates your reported tips, that is a second figure to raise with payroll alongside any Box 14b problem.",
  ],
  [
    "My job is not on the list. Can I still deduct my tips?",
    "No. The list is exhaustive: it covers the occupations Treasury and the IRS determined customarily and regularly received tips on or before December 31, 2024, and the final regulations kept it closed. If your occupation is not among the 71, your tips are still taxable income — you just cannot claim the section 224 deduction for them, and your employer reports them with code 000.",
  ],
  [
    "I worked two tipped jobs. Which code goes where?",
    "Each employer's W-2 carries the code for the job you did for them — your restaurant W-2 shows your restaurant code, your salon W-2 shows your salon code. Within a single job, Box 14b can hold up to two codes if you genuinely worked two listed occupations for that employer. Your deduction is then worked out on your combined reported tips, up to the single $25,000 cap per return.",
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

export default function TippedOccupationLookupPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Official IRS list
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Tipped Occupation <span className="text-gold-gradient">Code Lookup</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            All 71 TTOC Codes — and a Checker for Your W-2 Box 14b
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The no-tax-on-tips deduction only covers tips earned in one of the{" "}
            <strong>71 occupations on the IRS list</strong> — and from tax year 2026 your employer
            proves yours by printing its three-digit code in <strong>Box 14b</strong> of your W-2.
            A wrong code, or the placeholder <strong>000</strong>, can quietly kill a deduction
            worth up to $25,000. Find your code below and check what your W-2 actually says.
          </p>
        </div>
      </section>

      {/* LOOKUP + CHECKER */}
      <TippedOccupationLookup />

      {/* WHY THE CODE MATTERS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="Why it matters"
            title="One three-digit code guards a $25,000 deduction"
            sub="The deduction has three gates — a listed occupation, a matching Box 14b code, and reported tips. The code is the gate most workers have never heard of."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Gate 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">A listed occupation</h3>
              <p className="text-stone-600 leading-relaxed">
                Only occupations that customarily and regularly received tips on or before
                December 31, 2024 qualify. Treasury and the IRS fixed the list at 71 occupations in
                eight categories in the final regulations — if your job is not on it, its tips are
                simply outside the deduction.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">Gate 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">The right code in Box 14b</h3>
              <p className="text-stone-600 leading-relaxed">
                From tax year 2026 the W-2 itself carries the proof: Box 12 code TP shows your
                reported tips, and Box 14b shows the occupation code. A code belonging to a
                different occupation — or 000, the marker for unlisted work — tells the IRS the
                tips do not qualify, whatever your actual job was.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">Gate 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Reported, voluntary tips</h3>
              <p className="text-stone-600 leading-relaxed">
                The tips must be voluntary cash or card tips you reported to your employer —
                automatic service charges do not count. The deduction is then up to $25,000 of those
                tips, phased out by $100 per full $1,000 of income over $150,000 ($300,000 joint).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS + WORKED EXAMPLE */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead
            eyebrow="The check"
            title="How to check your Box 14b in two minutes"
            sub="Find your occupation's code, compare it with the W-2, and fix any mismatch before you file — corrections are free while payroll can still issue a W-2c."
          />
          <div className="grid gap-5 sm:grid-cols-2 text-left">
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Steps 1–2 — find and compare</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Your job → its TTOC → your Box 14b
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Search the list by your everyday job name — a barista is a fast food and counter
                worker (107), a hairstylist is 603, a rideshare driver is 802 — then compare with
                the code printed on your W-2.
              </p>
            </div>
            <div className="rounded-3xl border border-stone-200 bg-white p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 mb-3">Step 3 — fix a mismatch</p>
              <p className="font-display text-xl font-bold text-stone-900">
                Ask payroll for a corrected Form W-2c
              </p>
              <p className="mt-3 text-stone-600 leading-relaxed">
                Employers correct W-2 errors on Form W-2c. A wrong occupation code is a small
                payroll fix — but only if you catch it, ideally before you file the return that
                relies on it.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-8 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-3">Worked example</p>
            <p className="text-stone-700 leading-relaxed">
              A hairstylist with <strong>$19,400</strong> of reported tips opens her 2026 W-2: Box 12
              code TP correctly shows $19,400 — but Box 14b reads <strong>000</strong>. Her
              occupation is on the list: barbers, hairdressers, hairstylists and cosmetologists are
              code <strong>603</strong>. As printed, the 000 marks her tips as coming from an
              unlisted occupation and the deduction is at risk — up to $19,400 of deduction, worth
              roughly <strong>$2,329</strong> at the 12% bracket. She asks the salon&rsquo;s payroll
              provider for a W-2c with 603 in Box 14b, and the deduction is back on solid ground.
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
            What this lookup leaves out
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            The codes and titles here reproduce the <strong className="text-white">IRS list of
            occupations that customarily and regularly received tips</strong> under the final
            regulations (TD 10044). Job titles in real workplaces vary — read the examples against
            what you actually do, and if two codes could fit, the one matching your duties is the
            right one. A matching code does not by itself guarantee the deduction: the tips still
            have to be reported, voluntary, and within the income phase-out, and married filing
            separately cannot claim at all. This is general information, not tax advice.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            Next steps: price the deduction with the{" "}
            <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Tips Calculator
            </Link>{" "}
            · checking an overtime worker&rsquo;s W-2 instead? The{" "}
            <Link href="/w2-box-12-code-tt-checker" className="font-semibold text-orange-400 hover:text-orange-300">
              W-2 Box 12 Code TT Checker
            </Link>{" "}
            covers the overtime premium · and its deduction is in the{" "}
            <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              No Tax on Overtime Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/no-tax-on-tips-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on tips calculator</Link>, <Link href="/w2-box-12-code-tt-checker" className="font-semibold text-orange-700 hover:text-orange-800">W-2 code TT checker</Link>, <Link href="/no-tax-on-overtime-calculator" className="font-semibold text-orange-700 hover:text-orange-800">no tax on overtime calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Box 14b and TTOC questions, answered" />
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
              Look up your occupation code <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This lookup is general educational information, not tax advice. Codes and titles follow
            the IRS list of occupations that customarily and regularly received tips on or before
            December 31, 2024 (final regulations, TD 10044); your actual deduction is determined on
            your return. Confirm your numbers against the IRS instructions or a qualified tax
            professional.
          </p>
        </div>
      </section>
    </>
  );
}
