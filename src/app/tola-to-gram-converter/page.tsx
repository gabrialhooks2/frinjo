import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import TolaConverter from "./TolaConverter";

export const metadata = {
  title: "Tola to Gram Converter — Gold Weight & Price",
  description:
    "Free tola to gram converter: 1 tola = 11.6638 g exactly. Convert tola, masha, ratti, grams, kg and troy ounces, turn per-tola gold prices into per-gram prices, and check pure gold content by karat.",
  keywords: [
    "tola to gram converter",
    "1 tola in grams",
    "how many grams in 1 tola",
    "tola to gram",
    "tola masha ratti converter",
    "gold weight converter pakistan",
    "per tola gold price per gram",
  ],
  alternates: {
    canonical: "https://frinjo.me/tola-to-gram-converter",
    languages: {
      en: "https://frinjo.me/tola-to-gram-converter",
      "x-default": "https://frinjo.me/tola-to-gram-converter",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Tola to Gram Converter — 1 Tola = 11.6638 Grams | WebStore Pro",
    description:
      "Convert tola, masha, ratti, grams and troy ounces both ways, see what a per-tola gold rate means per gram, and check pure gold content for 24K, 22K, 21K and 18K — free and instant.",
    url: "https://frinjo.me/tola-to-gram-converter",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Tola to Gram Converter",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/tola-to-gram-converter",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free tola to gram converter for gold weights in Pakistan and South Asia. 1 tola = 11.6638 grams exactly (180 troy grains); 1 tola = 12 masha = 96 ratti; 1 ratti = 0.1215 g; 1 troy ounce = 31.1035 g = 2.6667 tola. It converts between tola, gram, kilogram, masha, ratti, troy ounce and ounce, converts a per-tola gold price into per-gram and per-10-gram prices (and back), and shows the pure gold content of a weight at 24K, 22K, 21K and 18K. It runs locally in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Tola to Gram Converter", item: "https://frinjo.me/tola-to-gram-converter" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How many grams are in 1 tola?",
    "1 tola is exactly 11.6638 grams. The tola is defined as 180 troy grains, and one troy grain is 0.06479891 grams, so 180 × 0.06479891 = 11.6638038 g — rounded to 11.6638 g. Some jewellers round it to 11.66 g or even 11.7 g for quick mental maths; on a large purchase that rounding changes the price, so always check which figure a quote is using.",
  ],
  [
    "How many masha and ratti are in a tola?",
    "1 tola = 12 masha, and 1 masha = 8 ratti, so 1 tola = 96 ratti. In grams, 1 masha is about 0.9720 g and 1 ratti is 0.1215 g. Jewellers across Pakistan and India still use masha and ratti for small pieces, stones and fine adjustments on the scale.",
  ],
  [
    "How do jewellers in Pakistan quote gold prices?",
    "Rates are quoted per tola, usually for 24K gold — the daily per-tola rate you see in the news and in the sarafa market. Jewellery itself is normally 22K or 21K, so the jeweller adjusts the price for the lower purity, then adds making charges and, on some pieces, a wastage allowance. That is why the same per-tola rate produces different final bills at different shops.",
  ],
  [
    "How do I convert a per-tola gold price to a per-gram price?",
    "Divide the per-tola price by 11.6638. For example, a rate of Rs 300,000 per tola is about Rs 25,721 per gram, and about Rs 257,206 per 10 grams. To go the other way, multiply the per-gram price by 11.6638 to get the per-tola price. The converter above does both directions as you type.",
  ],
  [
    "How much pure gold is in 22K jewellery?",
    "22K gold is 22/24 pure — 91.7%. So 1 tola of 22K jewellery contains about 10.69 g of pure gold; the rest is alloy. For comparison, 1 tola of 21K (87.5% pure) holds about 10.21 g of pure gold, and 1 tola of 18K (75% pure) holds about 8.75 g. Use the karat selector in the converter to see the pure content of any weight.",
  ],
  [
    "Is the Tola to Gram Converter free? Is my data stored?",
    "Yes, completely free with no sign-up. Your weights and prices are processed in your browser only — nothing is sent to or stored on our servers.",
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

const QUICK_TOLA = [1, 2, 5, 10, 20, 50, 100];
const fmtNum = (n: number, dp = 4) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: dp });

export default function TolaToGramConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Exact 11.6638 g per tola
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Tola to Gram <span className="text-gold-gradient">Converter</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Gold Weights in Tola, Masha, Ratti &amp; Grams
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            <strong>1 tola = 11.6638 grams</strong> — exactly. Convert gold weights between tola, gram,
            kilogram, masha, ratti, troy ounce and ounce, see what a per-tola rate means{" "}
            <strong>per gram</strong>, and check the pure gold in 24K, 22K, 21K and 18K pieces. Updates as
            you type.
          </p>
        </div>
      </section>

      {/* CONVERTER */}
      <TolaConverter />

      {/* UNITS EXPLAINED */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="The units"
            title="Tola, masha and ratti, explained"
            sub="The traditional South Asian weight ladder every gold buyer in Pakistan meets at the jeweller's counter — plus the troy ounce the world market uses."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 mb-3">11.6638 grams</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Tola</h3>
              <p className="text-stone-600 leading-relaxed">
                The standard unit for gold in Pakistan, India and Nepal. Jewellers quote rates per tola,
                and the classic 10-tola bar (the &ldquo;TT bar&rdquo;) weighs 116.638 g. One tola is defined
                as exactly 180 troy grains.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">12 in a tola · ≈ 0.972 g</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Masha</h3>
              <p className="text-stone-600 leading-relaxed">
                The middle step of the ladder: 1 tola = 12 masha. Jewellers use masha when a piece is
                weighed in tola plus a fraction — a bangle quoted as &ldquo;2 tola 6 masha&rdquo; is 2.5
                tola, or 29.16 g.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600 mb-3">96 in a tola · 0.1215 g</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Ratti</h3>
              <p className="text-stone-600 leading-relaxed">
                The smallest traditional unit: 1 masha = 8 ratti. Named after the ratti seed, whose
                remarkably uniform weight made it a natural standard. Still used for small pieces, stones
                and fine scale adjustments.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-3">31.1035 g · 2.6667 tola</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Troy ounce</h3>
              <p className="text-stone-600 leading-relaxed">
                The unit of the international bullion market — world gold prices are quoted in US dollars
                per troy ounce. It is heavier than the everyday ounce (28.35 g), so never mix the two when
                comparing prices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK TABLE */}
      <section className="py-16 sm:py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHead
            eyebrow="Quick reference"
            title="Tola to grams table"
            sub="The tola amounts gold is actually traded in — bars, bangles and bridal sets — converted at the exact 11.6638 g standard."
          />
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-100/70 text-xs font-bold uppercase tracking-[0.15em] text-stone-500">
                  <th className="px-5 sm:px-8 py-4">Tola</th>
                  <th className="px-5 sm:px-8 py-4">Grams</th>
                  <th className="px-5 sm:px-8 py-4">Masha</th>
                  <th className="px-5 sm:px-8 py-4">Ratti</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_TOLA.map((t) => (
                  <tr key={t} className="border-t border-stone-100 text-stone-700">
                    <td className="px-5 sm:px-8 py-4 font-display font-bold text-stone-900">{t} tola</td>
                    <td className="px-5 sm:px-8 py-4">{fmtNum(t * 11.6638)} g</td>
                    <td className="px-5 sm:px-8 py-4">{fmtNum(t * 12, 0)}</td>
                    <td className="px-5 sm:px-8 py-4">{fmtNum(t * 96, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-sm text-stone-500">
            Need a different amount? The{" "}
            <a href="#top" className="font-semibold text-orange-700 hover:text-orange-800">
              converter above
            </a>{" "}
            handles any weight, in either direction.
          </p>
        </div>
      </section>

      {/* HOW GOLD IS PRICED */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Read the quote properly
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            How gold is priced in Pakistan
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            The headline rate is <strong className="text-white">per tola of 24K gold</strong>, set daily
            from the international market. Almost no jewellery is 24K — sets and bangles are usually{" "}
            <strong className="text-white">22K or 21K</strong>, so the jeweller first adjusts the rate for
            purity (22K is priced at 22/24 of the 24K rate), weighs your piece in tola, masha and ratti,
            and then adds <strong className="text-white">making charges</strong> — and on some pieces a
            wastage allowance. Two honest warnings: making charges vary a lot between shops and are rarely
            refunded on resale, and not every scale is generous — some jewellers still round the tola to
            11.66 g. This converter does the exact weight and price maths only; it cannot tell you
            today&apos;s rate or what a specific shop will charge.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            Selling or settling an estate? Work out the zakat due on your gold with the{" "}
            <Link href="/zakat-calculator" className="font-semibold text-orange-400 hover:text-orange-300">
              Zakat Calculator
            </Link>{" "}
            — and see all our{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              free tools
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/zakat-calculator" className="font-semibold text-orange-700 hover:text-orange-800">zakat calculator</Link>, <Link href="/percentage-calculator" className="font-semibold text-orange-700 hover:text-orange-800">percentage calculator</Link>, <Link href="/discount-calculator" className="font-semibold text-orange-700 hover:text-orange-800">discount calculator</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Tola questions, answered" />
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
              Convert your gold weight <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This converter does exact weight and price maths only — it is not a live gold rate and not
            financial advice. Gold prices change daily, and jewellers&apos; making charges and scales vary.
            Confirm today&apos;s rate and the purity of your piece before buying or selling.
          </p>
        </div>
      </section>
    </>
  );
}
