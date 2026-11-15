import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import RoofPitchCalculator from "./RoofPitchCalculator";

export const metadata = {
  title: "Roof Pitch Calculator — Pitch, Angle, Slope % & Rafter Length",
  description:
    "Free roof pitch calculator: enter rise and run for your pitch (x/12), angle in degrees, slope %, pitch multiplier, rafter length and roof area — plus the full 1/12 to 12/12 chart.",
  keywords: [
    "roof pitch calculator",
    "roof slope calculator",
    "roof pitch chart",
    "roof angle calculator",
    "roof pitch multiplier",
    "rafter length calculator",
  ],
  alternates: {
    canonical: "https://frinjo.me/roof-pitch-calculator",
    languages: {
      en: "https://frinjo.me/roof-pitch-calculator",
      "x-default": "https://frinjo.me/roof-pitch-calculator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Roof Pitch Calculator — Pitch, Angle, Slope % & Rafter Length | WebStore Pro",
    description:
      "Your roof pitch in x/12, degrees and percent slope, with the pitch multiplier, rafter length and true roof area — free, instant, no sign-up.",
    url: "https://frinjo.me/roof-pitch-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Roof Pitch Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/roof-pitch-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free roof pitch calculator for builders, roofers and homeowners. Enter a roof's rise and run to get its pitch expressed as x/12, the angle in degrees, the slope as a percentage and the pitch multiplier (slope factor), plus rafter length for a given building width and true roof area from a footprint area. Includes the full 1/12 to 12/12 pitch chart and runs locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Roof Pitch Calculator", item: "https://frinjo.me/roof-pitch-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How do you calculate roof pitch?",
    "Pitch is the rise divided by the run, expressed as inches of rise per 12 inches of horizontal run. Divide rise by run and multiply by 12: a roof that rises 6 inches over a 12-inch run is a 6/12 pitch. The angle is arctan(rise ÷ run) — 26.57° for a 6/12 pitch.",
  ],
  [
    "What is the most common roof pitch for a house?",
    "6/12 is the most common residential roof pitch in the United States — a 26.57° angle and a 50% slope. Most homes fall between 4/12 and 9/12: steep enough to shed water and snow reliably, shallow enough to build affordably and walk on with care.",
  ],
  [
    "What is the minimum roof pitch for asphalt shingles?",
    "Under the International Residential Code (IRC), asphalt shingles need at least a 2/12 pitch, and between 2/12 and 4/12 they require a double layer of underlayment. 4/12 is the practical minimum for a standard shingle installation; below 2/12, use standing-seam metal or a membrane roofing system instead.",
  ],
  [
    "How do I measure my roof pitch from the attic?",
    "Take a level (24 inches is ideal) and a tape measure into the attic. Hold the level horizontally against the underside of a rafter and mark 12 inches along the level from the point where it touches the rafter. From that mark, measure straight up to the rafter — that vertical distance is the rise, so a 6-inch measurement means a 6/12 pitch. No ladder or roof climb needed.",
  ],
  [
    "What is a roof pitch multiplier (slope factor)?",
    "The pitch multiplier converts flat, horizontal measurements into true sloped ones: multiplier = √(1 + (rise ÷ run)²). For a 6/12 pitch it is 1.118. Multiply a roof's footprint area by the multiplier to get the actual roof area for ordering shingles, and multiply a rafter's horizontal run by it to get the rafter length.",
  ],
  [
    "Is the Roof Pitch Calculator free? Is my data stored?",
    "Yes, completely free with no sign-up. Your measurements are processed in your browser only — nothing is sent to or stored on our servers.",
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

const PITCH_USES: Record<number, string> = {
  1: "Nearly flat — membrane or standing-seam metal only, never shingles",
  2: "Minimum for metal roofing; shingles only with double underlayment (IRC)",
  3: "Low slope — metal, or shingles with double underlayment",
  4: "Minimum standard pitch for asphalt shingles (IRC)",
  5: "Common on porches, sheds and modest homes",
  6: "The most common residential pitch in the US",
  7: "Steep — classic Cape Cod and northern homes",
  8: "Steep — sheds snow well; walkable only with care",
  9: "Very steep — strong snow-shedding, roof jacks recommended",
  10: "Snow-country pitch; roof jacks needed to work on it",
  11: "Near 45° — dramatic gables and chalets",
  12: "A true 45° angle — A-frames and steep gables",
};

function chartRow(n: number) {
  const ratio = n / 12;
  return {
    pitch: `${n}/12`,
    angle: ((Math.atan(ratio) * 180) / Math.PI).toFixed(2),
    slope: (ratio * 100).toFixed(1),
    multiplier: Math.sqrt(1 + ratio * ratio).toFixed(3),
    use: PITCH_USES[n],
  };
}

export default function RoofPitchCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Full 1/12–12/12 chart
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Roof Pitch <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Pitch, Angle, Slope % &amp; Rafter Length
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            A <strong>6/12 pitch rises 6 inches for every 12 inches of horizontal run</strong> — an angle of
            26.57°, a 50% slope and a pitch multiplier of 1.118. Enter your rise and run below to get your
            pitch, angle, slope, multiplier, rafter length and true roof area. Updates as you type.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <RoofPitchCalculator />

      {/* PITCH CHART */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The full chart"
            title="Roof pitch chart: 1/12 to 12/12"
            sub="Every standard pitch with its angle, slope percentage and multiplier — and what each pitch is typically used for. Two code landmarks to remember: 2/12 is the floor for metal roofing, and 4/12 is the minimum standard pitch for asphalt shingles under the IRC."
          />
          <div className="overflow-x-auto rounded-3xl border border-stone-200">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-stone-50 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                  <th className="px-5 py-4">Pitch</th>
                  <th className="px-5 py-4">Angle</th>
                  <th className="px-5 py-4">Slope</th>
                  <th className="px-5 py-4">Multiplier</th>
                  <th className="px-5 py-4">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }, (_, i) => chartRow(i + 1)).map((row) => (
                  <tr key={row.pitch} className={`border-t border-stone-100 ${row.pitch === "6/12" ? "bg-orange-50 font-semibold" : ""}`}>
                    <td className="px-5 py-3 font-display font-bold text-stone-900">{row.pitch}</td>
                    <td className="px-5 py-3 text-stone-600">{row.angle}°</td>
                    <td className="px-5 py-3 text-stone-600">{row.slope}%</td>
                    <td className="px-5 py-3 text-stone-600">{row.multiplier}</td>
                    <td className="px-5 py-3 text-stone-600">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-stone-500 text-center">
            The 6/12 row is highlighted — it is the most common residential pitch in the US.
          </p>
        </div>
      </section>

      {/* HOW TO MEASURE + FORMULAS */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Measure it safely
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            How to measure roof pitch from the attic
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            You do not need to climb onto the roof. From inside the attic, the underside of any rafter gives
            you the exact pitch with two household tools — a <strong className="text-white">level</strong> and
            a <strong className="text-white">tape measure</strong>:
          </p>
          <ol className="mt-6 space-y-4 text-stone-300 leading-relaxed list-none">
            <li>
              <strong className="text-white">1. Hold the level horizontally</strong> against the underside of
              a rafter, with one end touching the rafter.
            </li>
            <li>
              <strong className="text-white">2. Mark 12 inches</strong> along the level, measured from the
              point where the level meets the rafter. That 12 inches is your run.
            </li>
            <li>
              <strong className="text-white">3. Measure straight up</strong> from your mark to the underside
              of the rafter. That vertical distance is the rise — 6 inches of rise over the 12-inch run means
              a 6/12 pitch.
            </li>
          </ol>
          <p className="mt-6 text-stone-300 leading-relaxed">
            The maths behind every number on this page: <strong className="text-white">pitch = rise ÷ run × 12</strong>,{" "}
            <strong className="text-white">angle = arctan(rise ÷ run)</strong>,{" "}
            <strong className="text-white">slope % = rise ÷ run × 100</strong> and{" "}
            <strong className="text-white">pitch multiplier = √(1 + (rise ÷ run)²)</strong>. Rafter length is
            the horizontal run multiplied by the multiplier, and true roof area is the footprint area
            multiplied by the same factor.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            Planning the build? Pair this with the{" "}
            <Link href="/board-foot-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Board Foot Calculator
            </Link>{" "}
            and the{" "}
            <Link href="/concrete-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Concrete Calculator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/board-foot-calculator" className="font-semibold text-orange-700 hover:text-orange-800">board foot calculator</Link>, <Link href="/concrete-calculator" className="font-semibold text-orange-700 hover:text-orange-800">concrete calculator</Link>, <Link href="/square-feet-calculator" className="font-semibold text-orange-700 hover:text-orange-800">square feet calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Roof pitch questions, answered" />
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
              Calculate your pitch <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            Results are planning estimates. Verify measurements on site — and your local code
            requirements — before ordering materials or cutting rafters.
          </p>
        </div>
      </section>
    </>
  );
}
