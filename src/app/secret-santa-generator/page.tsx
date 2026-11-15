import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import SecretSantaGenerator from "./SecretSantaGenerator";

export const metadata = {
  title: "Secret Santa Generator — Free, No Sign-Up, No Email",
  description:
    "Free Secret Santa generator: add names, set exclusions for couples, draw in seconds and share private reveal links — no sign-up, no email addresses, nothing stored.",
  keywords: [
    "secret santa generator",
    "secret santa name generator",
    "secret santa draw",
    "secret santa generator with exclusions",
    "draw names for secret santa",
    "secret santa organiser",
  ],
  alternates: {
    canonical: "https://frinjo.me/secret-santa-generator",
  },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Secret Santa Generator — Free, No Sign-Up, No Email | WebStore Pro",
    description:
      "Add the names, block couples from drawing each other, and draw in seconds. Share private links or pass the phone — nobody sees anyone else's match.",
    url: "https://frinjo.me/secret-santa-generator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Secret Santa Generator",
  applicationCategory: "EntertainmentApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/secret-santa-generator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free Secret Santa generator for groups of 3 to 50 people. The organiser adds participant names, optionally sets a budget, exchange date and exclusions (pairs who must not draw each other, such as couples), and the tool produces a random draw in which nobody draws themselves and every exclusion is respected. Matches are shared either by passing the phone — each person reveals only their own match — or by private links that encode a single match in the URL and reveal nothing else. Everything runs locally in the visitor's browser: no sign-up, no email addresses collected and nothing is stored on a server.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Secret Santa Generator", item: "https://frinjo.me/secret-santa-generator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How does the Secret Santa generator work?",
    "Add the name of everyone taking part (3 to 50 people), optionally set a budget, an exchange date and exclusions for people who must not draw each other. Press Draw names and the generator randomly assigns each person someone to buy for — nobody ever draws themselves, and every exclusion is respected. You then share the matches by passing the phone around, or by sending each person their private link.",
  ],
  [
    "Is the Secret Santa Generator free? Is my data stored?",
    "Yes, completely free with no sign-up — and we store nothing. Everything runs in your browser: the names you type never leave your device, no email addresses are collected, and there is no account and no server copy of your draw. Even the private links carry the match encoded inside the link itself, not in a database.",
  ],
  [
    "Can I stop couples from drawing each other?",
    "Yes. In the Exclusions step, pick a person's name and tick everyone they must not draw. For couples and housemates, set the exclusion on both names so neither can draw the other. You can also use exclusions to avoid repeating last year's matches.",
  ],
  [
    "How do the private links work?",
    "After the draw, each person gets their own link to this page. The link contains only that person's match, encoded in the part of the URL after the # symbol — a part browsers never send to our servers. Whoever opens the link sees a private page showing only their own match. Because anyone holding the link can open it, send each link privately (WhatsApp, text or chat) to the right person.",
  ],
  [
    "What if the draw says no valid match is possible?",
    "That means the exclusions block every possible arrangement — usually one person is excluded from drawing almost everyone else, or a small group has too many couples blocked. Remove a few exclusions and draw again. With 3 people and mutual exclusions, for example, a valid draw often cannot exist.",
  ],
  [
    "How many people can take part in a Secret Santa draw?",
    "A minimum of 3 people is required — with 2, the match would be obvious. This generator supports up to 50 participants, which covers families, classes and most office exchanges. There is no limit on how many separate draws you can run.",
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

export default function SecretSantaGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · No email needed
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Secret Santa <span className="text-gold-gradient">Generator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Draw Names in Seconds — Nobody Sees Anyone Else&apos;s Match
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            A Secret Santa generator randomly assigns everyone in your group one person to buy a
            gift for. Add the names, set a budget, block couples from drawing each other — then
            share the matches by <strong>passing the phone</strong> or sending each person a{" "}
            <strong>private link</strong> that reveals only their own match.
          </p>
        </div>
      </section>

      {/* GENERATOR */}
      <SecretSantaGenerator />

      {/* HOW TO */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="Run a Secret Santa in four steps"
            sub="From a list of names to gifts under the tree — the whole draw takes less time than wrapping one present."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 text-left">
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 1</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Add the names</h3>
              <p className="text-stone-600 leading-relaxed">
                List everyone taking part — family, friends, the whole office. Three people minimum,
                fifty maximum. Add a short wish list next to any name to give their Santa a head
                start.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 2</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Set the ground rules</h3>
              <p className="text-stone-600 leading-relaxed">
                Agree a budget everyone can afford and an exchange date. Then add exclusions:
                partners, housemates or last year&apos;s pairs who should not draw each other this
                time.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 3</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Draw the names</h3>
              <p className="text-stone-600 leading-relaxed">
                One click produces a fair random draw: everyone gives exactly one gift, everyone
                receives exactly one, nobody draws themselves and every exclusion is honoured.
              </p>
            </div>
            <div className={card}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">Step 4</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">Share the secret</h3>
              <p className="text-stone-600 leading-relaxed">
                Same room? Pass the phone — each person reveals only their own match. Spread out?
                Send each person their private link by WhatsApp or text. The organiser never has
                to whisper a single name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RULES */}
      <section className="py-16 sm:py-20 bg-stone-950 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-orange-400 text-center">
            House rules
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
            Secret Santa rules that keep it fun
          </h2>
          <p className="mt-6 text-stone-300 leading-relaxed">
            <strong className="text-white">Set one budget and stick to it.</strong> A clear limit
            (and a gift that roughly respects it) keeps the exchange fair — nobody should feel
            outspent or short-changed. <strong className="text-white">Use exclusions kindly:</strong>{" "}
            they exist so couples do not simply swap gifts and last year&apos;s pairing does not
            repeat, not to freeze anyone out.{" "}
            <strong className="text-white">Respect the reveal.</strong> Your match is a secret
            until gift day: do not compare links, do not peek at someone else&apos;s phone, and if
            you accidentally see a match that is not yours, keep it to yourself. And when your own
            gift arrives, the golden rule — thank your Santa warmly, whether or not you ever learn
            who they were.
          </p>
          <p className="mt-8 text-center text-sm text-stone-400">
            More free tools in the{" "}
            <Link href="/tools" className="font-semibold text-orange-400 hover:text-orange-300">
              tools hub
            </Link>{" "}
            — including the{" "}
            <Link href="/random-number-generator" className="font-semibold text-orange-400 hover:text-orange-300">
              Random Number Generator
            </Link>
            ,{" "}
            <Link href="/dice-roller" className="font-semibold text-orange-400 hover:text-orange-300">
              Dice Roller
            </Link>{" "}
            and{" "}
            <Link href="/coin-flip" className="font-semibold text-orange-400 hover:text-orange-300">
              Coin Flip
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
            {" "}· Or browse our <Link href="/services" className="font-semibold text-orange-700 hover:text-orange-800">services</Link> , <Link href="/random-number-generator" className="font-semibold text-orange-700 hover:text-orange-800">random number generator</Link>, <Link href="/dice-roller" className="font-semibold text-orange-700 hover:text-orange-800">dice roller</Link> and <Link href="/tools" className="font-semibold text-orange-700 hover:text-orange-800">free tools</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Secret Santa questions, answered" />
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
              Draw your names <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs text-stone-400">
            This generator runs entirely in your browser — no names, matches or email addresses are
            ever sent to or stored on our servers.
          </p>
        </div>
      </section>
    </>
  );
}
