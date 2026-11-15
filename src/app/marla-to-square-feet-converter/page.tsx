import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import MarlaConverter from "./MarlaConverter";

export const metadata = {
  title: "Marla to Square Feet Converter — Kanal, Gaj, Acre",
  description:
    "Free Marla to square feet converter for Pakistan land: convert Marla, Kanal, square feet, square yards (gaj), square metres, acres and sarsai at the 272.25, 250 or 225 sq ft standard.",
  keywords: [
    "marla to square feet converter",
    "marla to sq ft",
    "1 marla in square feet",
    "kanal to square feet",
    "marla kanal converter pakistan",
    "plot size converter",
    "sarsai to square feet",
  ],
  alternates: {
    canonical: "https://frinjo.me/marla-to-square-feet-converter",
    languages: {
      en: "https://frinjo.me/marla-to-square-feet-converter",
      "x-default": "https://frinjo.me/marla-to-square-feet-converter",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Marla to Square Feet Converter — Kanal, Gaj & Acre | WebStore Pro",
    description:
      "1 Marla = 272.25 sq ft in revenue records, 225 sq ft in DHA and Bahria. Convert Marla, Kanal, sq ft, gaj, sq m, acres and sarsai with the standard your plot actually uses — free and instant.",
    url: "https://frinjo.me/marla-to-square-feet-converter",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Marla to Square Feet Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/marla-to-square-feet-converter",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free converter for Pakistani land units: Marla, Kanal, square feet, square yards (gaj), square metres, acres and sarsai. Because a Marla has more than one size in Pakistan, the converter lets the visitor pick the standard their documents use — the revenue standard of 272.25 sq ft per Marla under the Punjab Land Revenue Act, the CDA Islamabad standard of 250 sq ft, or the 225 sq ft standard used by housing societies such as DHA and Bahria — or enter a custom size. 1 Kanal = 20 Marla and 1 Acre = 8 Kanal = 160 Marla at every standard. It also converts plot dimensions (width × length in feet) into area and applies a price per Marla. Everything runs locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Marla to Square Feet Converter",
      item: "https://frinjo.me/marla-to-square-feet-converter",
    },
  ],
};

const FAQS: [string, string][] = [
  [
    "How many square feet are in 1 Marla?",
    "It depends on the standard. Under the revenue standard used in official land records (the Punjab Land Revenue Act), 1 Marla = 272.25 sq ft. In most modern housing societies such as DHA and Bahria Town, 1 Marla = 225 sq ft, and CDA Islamabad uses 250 sq ft per Marla. The difference is about 21%, so always check which standard your plot documents use — this converter lets you switch between all three, or enter a custom size.",
  ],
  [
    "How many Marla are in 1 Kanal?",
    "1 Kanal = 20 Marla at every standard. In square feet that is 5,445 sq ft at the revenue standard (272.25 sq ft per Marla), 5,000 sq ft at the CDA standard (250 sq ft), or 4,500 sq ft at the housing-society standard (225 sq ft).",
  ],
  [
    "How many Kanal are in 1 Acre?",
    "1 Acre = 8 Kanal = 160 Marla. An acre is a fixed unit of 43,560 sq ft, which matches 160 Marla exactly at the revenue standard of 272.25 sq ft per Marla — one reason the revenue standard is still the legal reference in land records.",
  ],
  [
    "What is a Sarsai?",
    "A Sarsai (also spelled Sarsahi) is the smaller traditional unit below the Marla: 1 Marla = 9 Sarsai. At the revenue standard, 1 Sarsai = 30.25 sq ft. Sarsai appear in older revenue records (fard) across Punjab, and this converter scales the Sarsai with whichever Marla standard you select.",
  ],
  [
    "Which Marla standard should I use for my plot?",
    "Use the standard written in your own documents. If your plot is in a housing society like DHA or Bahria Town, the file almost certainly uses 225 sq ft per Marla. If you are reading a revenue record or fard, it uses 272.25 sq ft. CDA plots in Islamabad use 250 sq ft. When a seller quotes a size, ask which Marla they mean before you compare prices — a '10 Marla' plot can be 2,250 or 2,722.5 sq ft depending on the answer.",
  ],
  [
    "Is the Marla to Square Feet Converter free? Is my data stored?",
    "Yes, completely free with no sign-up. Your numbers are processed in your browser only — nothing is sent to or stored on our servers.",
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

const PLOT_ROWS: { size: string; s225: string; s250: string; s272: string }[] = [
  { size: "3 Marla", s225: "675", s250: "750", s272: "816.75" },
  { size: "5 Marla", s225: "1,125", s250: "1,250", s272: "1,361.25" },
  { size: "10 Marla", s225: "2,250", s250: "2,500", s272: "2,722.5" },
  { size: "1 Kanal (20 Marla)", s225: "4,500", s250: "5,000", s272: "5,445" },
];

export default function MarlaConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Pakistan land units
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Marla to <span className="text-gold-gradient">Square Feet</span> Converter
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Marla, Kanal, Gaj, Acres &amp; Sarsai — at the standard your plot uses
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            <strong>1 Marla = 272.25 sq ft</strong> under the revenue standard used in official land
            records — and <strong>225 sq ft</strong> in most housing societies like DHA and Bahria. Pick
            the standard your documents use, then convert between Marla, Kanal, square feet, square yards
            (gaj), square metres, acres and sarsai. Updates as you type.
          </p>
        </div>
      </section>

      {/* CONVERTER */}
      <MarlaConverter />

      {/* STANDARDS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The three Marla sizes"
            title="One Marla, three sizes — honestly explained"
            sub="Unlike a metre or a foot, a Marla was never fixed to one size across Pakistan. Which one applies depends on who measured your plot — and the gap between them is about 21%."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">272.25 sq ft</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Revenue standard</h3>
              <p className="text-stone-600 leading-relaxed">
                The legal standard under the Punjab Land Revenue Act, used in official land records,
                registries and the fard. At this size everything stacks neatly: 9 Sarsai to a Marla, 20
                Marla to a Kanal, 160 Marla to an acre of exactly 43,560 sq ft.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">225 sq ft</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Housing-society standard</h3>
              <p className="text-stone-600 leading-relaxed">
                The size used by DHA, Bahria Town and most modern private housing societies. A round
                25 sq yards per Marla made plot layouts easy to draw — but it means a society &ldquo;5
                Marla&rdquo; plot is 1,125 sq ft, not the 1,361.25 sq ft of a revenue 5 Marla.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">250 sq ft</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">CDA Islamabad standard</h3>
              <p className="text-stone-600 leading-relaxed">
                The Capital Development Authority measures Islamabad plots at 250 sq ft per Marla —
                between the other two. If your plot file or allotment letter comes from CDA, this is the
                standard your documents are using.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMON PLOT SIZES */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead
            eyebrow="Quick reference"
            title="Common plot sizes in square feet"
            sub="The plot sizes Pakistani buyers ask about most, at all three standards. Check your documents before trusting any single column."
          />
          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">Plot size</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">Society · 225</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">CDA · 250</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">Revenue · 272.25</th>
                </tr>
              </thead>
              <tbody>
                {PLOT_ROWS.map((r) => (
                  <tr key={r.size} className="border-b border-stone-100 last:border-0">
                    <td className="px-6 py-4 font-bold text-stone-900">{r.size}</td>
                    <td className="px-6 py-4 text-stone-600">{r.s225} sq ft</td>
                    <td className="px-6 py-4 text-stone-600">{r.s250} sq ft</td>
                    <td className="px-6 py-4 text-stone-600">{r.s272} sq ft</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-sm text-stone-500">
            Measuring a plot by its sides instead? The{" "}
            <Link href="/square-feet-calculator" className="font-semibold text-orange-700 hover:text-orange-800">
              square feet calculator
            </Link>{" "}
            works out area from length and width in any unit.
          </p>
        </div>
      </section>

      {/* FORMULA / WHY TWO STANDARDS */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            The formula
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            How Marla conversions work — and why two standards exist
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            Every conversion on this page runs through square feet:{" "}
            <strong className="text-white">square feet = Marla × sq ft per Marla</strong>, where the second
            number is the standard you picked. The rest of the ladder never changes:{" "}
            <strong className="text-white">
              1 Marla = 9 Sarsai · 1 Kanal = 20 Marla · 1 Acre = 8 Kanal = 160 Marla · 1 square yard
              (gaj) = 9 sq ft · 1 sq ft = 0.0929 sq m
            </strong>
            .
          </p>
          <p className="mt-4 text-stone-300 leading-relaxed">
            The two main standards exist because they were set for different jobs. The{" "}
            <strong className="text-white">revenue standard (272.25 sq ft)</strong> comes from the
            colonial-era land revenue system: it was built so the traditional units divide cleanly into
            the acre, and it is still what government records use. Housing societies later adopted the{" "}
            <strong className="text-white">225 sq ft Marla</strong> because 25 square yards is a rounder
            number to lay out streets and plots with. Neither is &ldquo;wrong&rdquo; — but they are not
            interchangeable, and a price quoted per Marla means different amounts of land under each one.
            Always confirm the standard in the file, registry or fard before you sign anything.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            More free tools in the{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              tools hub
            </Link>{" "}
            — including the{" "}
            <Link href="/concrete-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Concrete Calculator
            </Link>{" "}
            and the{" "}
            <Link href="/board-foot-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Board Foot Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/square-feet-calculator" className="font-semibold text-orange-700 hover:text-orange-800">square feet calculator</Link>, <Link href="/concrete-calculator" className="font-semibold text-orange-700 hover:text-orange-800">concrete calculator</Link>, <Link href="/board-foot-calculator" className="font-semibold text-orange-700 hover:text-orange-800">board foot calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Marla conversion questions, answered" />
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
              Convert your plot <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This converter is a guide for comparing plot sizes. For a legal transaction, the standard and
            measurements in your registered documents prevail — verify them with the relevant land
            authority.
          </p>
        </div>
      </section>
    </>
  );
}
