import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import FancyTextGenerator from "./FancyTextGenerator";

export const metadata = {
  title: "Fancy Text Generator — Instagram Fonts, Copy & Paste",
  description:
    "Free fancy text generator: type once and copy 25+ stylish Unicode fonts for your Instagram bio, name and captions — bold, script, gothic, bubble, small caps and more.",
  keywords: [
    "fancy text generator",
    "instagram fonts",
    "fancy fonts copy and paste",
    "instagram font generator",
    "cool text generator",
    "stylish text generator",
  ],
  alternates: {
    canonical: "https://frinjo.me/fancy-text-generator",
    languages: {
      en: "https://frinjo.me/fancy-text-generator",
      "x-default": "https://frinjo.me/fancy-text-generator",
    },
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Fancy Text Generator — Instagram Fonts, Copy & Paste | WebStore Pro",
    description:
      "Type once, copy 25+ fancy Unicode styles — bold, script, gothic, bubble, small caps — for your Instagram bio, name and captions. Free, no sign-up.",
    url: "https://frinjo.me/fancy-text-generator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Fancy Text Generator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/fancy-text-generator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free fancy text generator that converts plain text into 25+ copy-and-paste Unicode styles — bold, italic, script (cursive), fraktur (gothic), double-struck, monospace, circled (bubble), squared, fullwidth, small caps, superscript, upside down and more — for Instagram bios, names and captions, TikTok, Discord and WhatsApp. The styles are Unicode characters, not fonts, so they paste anywhere text is accepted. Runs locally in the visitor's browser; nothing is stored.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Fancy Text Generator", item: "https://frinjo.me/fancy-text-generator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "What is a fancy text generator?",
    "A fancy text generator rewrites your plain text in other Unicode characters that look like different fonts — bold, script, gothic, bubble, small caps and more. You type once, tap a style to copy it, and paste it anywhere: an Instagram bio, a TikTok caption, a Discord name or a WhatsApp message.",
  ],
  [
    "How do I use these fonts on Instagram?",
    "Type your text above, tap the style you like to copy it, then open Instagram, go to Edit profile and paste it into your name field or bio. The styles also work in captions and comments. They do not work in your username — Instagram only allows plain letters, numbers, periods and underscores there.",
  ],
  [
    "Are these real fonts?",
    "No. There is no font file and nothing to install. Every fancy letter is a separate Unicode character — the same way A and a are separate characters — so the styling is inside the text itself and survives being pasted from app to app.",
  ],
  [
    "Why do some letters or numbers stay plain in certain styles?",
    "Unicode never created styled versions of every character. Script and fraktur have no digits, italic and script are missing a few letters (the italic h, for example, is a separate symbol), and squared and negative styles only exist for capital letters. Where no styled version exists, this generator leaves the original character unchanged rather than faking it.",
  ],
  [
    "Do fancy fonts affect accessibility or search?",
    "Yes, a little. Screen readers treat styled characters as symbols, so they may skip them or read them oddly, and Instagram search will not match a styled display name to the plain name people type. Use fancy text for short, decorative lines and keep important information — your real name, contact details, prices — in plain text.",
  ],
  [
    "Is the Fancy Text Generator free? Is my text stored?",
    "Yes, completely free with no sign-up. Everything runs in your browser: your text is converted on your device and is never sent to or stored on our servers.",
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

export default function FancyTextGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Copy &amp; Paste
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Fancy Text <span className="text-gold-gradient">Generator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Instagram Fonts You Can Copy &amp; Paste
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Type your text once and this generator rewrites it in <strong>25+ fancy styles</strong> —
            bold, script, gothic, bubble, small caps and more. Tap any style to copy it, then paste it
            into your Instagram bio, name or captions, TikTok, Discord or WhatsApp. These are real
            Unicode characters, not fonts, so they work anywhere you can paste text — no app, no
            install, no sign-up.
          </p>
        </div>
      </section>

      {/* GENERATOR */}
      <FancyTextGenerator />

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Not fonts — Unicode characters"
            sub="Instagram has no font setting for bios or captions. Fancy text works because of a trick built into Unicode itself — here is what is actually happening when you copy a style."
          />
          <div className="grid gap-5 md:grid-cols-3 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The trick</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Every style is a character set</h3>
              <p className="text-stone-600 leading-relaxed">
                When you copy 𝓬𝓾𝓻𝓼𝓲𝓿𝓮 text you are not copying a font file. Each styled letter is its
                own Unicode character, with its own code point — the same way “A” and “a” are separate
                characters. The app simply draws the characters you pasted in its normal font.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Why it works everywhere</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">If you can paste, it works</h3>
              <p className="text-stone-600 leading-relaxed">
                Because the styling lives inside the characters, it survives the trip between apps:
                Instagram bios, names, captions and comments, TikTok, Discord nicknames, WhatsApp
                messages, X posts. Nothing to install, nothing to upload.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">The honest limit</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Some characters stay plain</h3>
              <p className="text-stone-600 leading-relaxed">
                Unicode never made styled versions of a few characters — there are no script or fraktur
                digits, for example. Where a styled version does not exist, this generator leaves your
                original character unchanged instead of faking it with a lookalike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST STYLES / BEFORE YOU PASTE */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            Before you paste
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Best styles for Instagram — and three warnings
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            For a bio or display name, <strong className="text-white">Bold, Small Caps and Script</strong>{" "}
            stay readable at small sizes and read as deliberate styling. Fraktur, squared and zalgo are
            decorative — great for one short line, hard work as a whole paragraph. Whatever you pick,
            keep three things in mind. First,{" "}
            <strong className="text-white">accessibility</strong>: screen readers treat styled
            characters as symbols, so they may skip them or read them strangely — keep your real name,
            contact details and anything important in plain text. Second,{" "}
            <strong className="text-white">search</strong>: someone typing your plain name will not
            match a styled display name. Third, <strong className="text-white">usernames</strong>:
            the @handle only accepts plain letters, numbers, periods and underscores, so styled text
            belongs in the name field, bio and captions — never the handle.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            More free tools in the{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              tools hub
            </Link>{" "}
            — including the{" "}
            <Link href="/case-converter" className="font-semibold text-orange-400 hover:text-orange-300">
              Case Converter
            </Link>
            ,{" "}
            <Link href="/word-counter" className="font-semibold text-orange-400 hover:text-orange-300">
              Word Counter
            </Link>{" "}
            and{" "}
            <Link href="/password-generator" className="font-semibold text-orange-400 hover:text-orange-300">
              Password Generator
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/case-converter" className="font-semibold text-orange-700 hover:text-orange-800">case converter</Link>, <Link href="/word-counter" className="font-semibold text-orange-700 hover:text-orange-800">word counter</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Fancy text questions, answered" />
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
              Style your text <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This generator runs entirely in your browser — your text is never sent to or stored on our
            servers.
          </p>
        </div>
      </section>
    </>
  );
}
