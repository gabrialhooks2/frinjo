import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import FinalGrade from "./FinalGrade";

export const metadata = {
  title: "Final Grade Calculator — Score You Need",
  description:
    "Free final grade calculator: enter your current grade, target grade and final exam weight to see exactly what you need to score. Honest verdicts.",
  keywords: [
    "final grade calculator",
    "what do i need on my final",
    "final exam calculator",
    "grade calculator final",
    "needed final score",
  ],
  alternates: { canonical: "https://frinjo.me/final-grade-calculator" },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Final Grade Calculator — What You Need on the Final | WebStore Pro",
    description:
      "The exact score you need on your final, and an honest verdict on whether it is reachable. Free, instant.",
    url: "https://frinjo.me/final-grade-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Final Grade Calculator",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/final-grade-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free final exam grade calculator. Given a current course grade, a desired final grade and the final exam's percentage weight, it computes the required final exam score as (desired − current × (1 − weight)) ÷ weight, and reports honestly when the target is already secured or mathematically unreachable. It also computes the reverse: the resulting course grade (with a US letter grade) for any given final exam score. Runs in the visitor's browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Final Grade Calculator", item: "https://frinjo.me/final-grade-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How is the score I need on the final calculated?",
    "Your course grade is a weighted average: current grade × (1 − final weight) + final score × (final weight). Solving that equation for the final score gives: needed = (desired − current × (1 − weight)) ÷ weight. Example: with an 85% current grade, a 90% target and a final worth 30%, you need (90 − 85 × 0.7) ÷ 0.3 = 101.7% — just out of reach, which the calculator tells you plainly.",
  ],
  [
    "What if the calculator says I need more than 100%?",
    "Then the target cannot be reached through the final alone, no matter the score — unless your class allows extra credit on the final or your instructor scales. The useful moves are: aim for the next grade down (use the reverse calculator to find the best reachable grade), and ask your instructor about extra credit or retake policies before the exam, not after.",
  ],
  [
    "What if I need less than 0%?",
    "Your target is already secured by your current average alone. Congratulations — the final can only help. (It also means a disastrous final could still pull you below a higher grade, so check what a realistic score protects.)",
  ],
  [
    "Where do I find how much my final is worth?",
    "Your course syllabus lists the grading breakdown — look for the final exam's percentage weight. If it is given in points instead (e.g. final = 200 of 1,000 total points), the weight is 200 ÷ 1,000 = 20%, and your current grade is your earned points so far divided by the points possible so far.",
  ],
  [
    "Does this work for college and high school?",
    "Yes — the maths is the same anywhere a final exam carries a percentage weight. Letter-grade estimates use the common US scale; if your school uses different cut-offs, trust the percentage, which is exact.",
  ],
  [
    "What do I need on the final just to pass?",
    "Set your desired grade to your school's pass mark — usually 60%. Example: with a 55% current grade and a final worth 30%, passing needs (60 − 55 × 0.7) ÷ 0.3 = 71.7% on the final. If the number comes back negative, you have already passed on coursework alone; if it is above 100%, ask about retakes or incomplete grades now, while options still exist.",
  ],
  [
    "Can I use this calculator for a midterm or a unit test?",
    "Yes — nothing in the maths is specific to finals. For any single remaining assessment, enter your current average, the grade you want, and that assessment's weight in the course, and the answer is the score you need on it. It works for midterms, unit tests, a last project or a final portfolio, as long as it is the one remaining graded item (or you treat everything left as one block with its combined weight).",
  ],
  [
    "How much is a final exam usually worth?",
    "Most commonly 10–40% of the course grade. High-school finals typically sit at 10–20%; college courses more often 20–40%, and some seminars or capstones go higher. The weight is printed in your syllabus grading breakdown — and it matters more than the exam's length or question count, which tell you nothing about its effect on your grade.",
  ],
  [
    "Is the Final Grade Calculator free?",
    "Yes, completely free with no sign-up. Your grades are calculated in your browser and never stored.",
  ],
  [
    "What score do I need just to keep my current grade?",
    "Exactly your current average. Setting the desired grade equal to your current grade makes the formula return that same number: with a current grade of 85% and a final worth 30%, you need (85 − 85 × 0.7) ÷ 0.3 = 85%. Score above your average and the grade rises; below it, it falls.",
  ],
  [
    "Does a heavily weighted final help me or hurt me?",
    "It amplifies whichever way your final score compares with your current average. If you expect to score above your average, a heavier final pulls your grade up more; if you expect to score below it, the same weight drags it down more. The weight itself is neutral — the gap between the two numbers decides.",
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

export default function FinalGradePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · No sign-up · Honest verdicts
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Final Grade <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            What Do I Need on the Final?
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            The exact score — and a straight answer about whether it is reachable. If the maths says a
            target is locked in, it says so. If it says <strong>impossible</strong>, it says that too, and
            shows you the best grade that is still real.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <FinalGrade />

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
            {" "}· Pairs with the <Link href="/weighted-grade-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Weighted Grade Calculator</Link>, <Link href="/gpa-calculator" className="font-semibold text-orange-700 hover:text-orange-800">GPA Calculator</Link> and <Link href="/test-score-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Test Score Calculator</Link>.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="How it works" title="The maths behind the number you need" />
          <div className="space-y-5 text-stone-600 leading-relaxed">
            <p>
              Your course grade is a weighted average of two parts: the work already done, worth
              (1 − weight), and the final exam, worth its weight. The calculator solves that average
              backwards. To find the score you need it uses: needed = (desired − current × (1 − weight))
              ÷ weight. The second box runs the same average forwards — current × (1 − weight) + your
              expected final score × weight — and converts the result to a letter grade on the common US
              scale.
            </p>
            <p>
              <strong className="text-stone-900">Worked example:</strong> you are on 78%, you want 85%, and
              the final is worth 40%. Needed = (85 − 78 × 0.6) ÷ 0.4 = (85 − 46.8) ÷ 0.4 = 38.2 ÷ 0.4 =
              95.5% — a near-perfect paper, which is how the calculator labels it. The forwards check shows
              the cost of falling short: score 80% instead and your course grade is 78 × 0.6 + 80 × 0.4 =
              78.8%, a C+.
            </p>
            <p>
              Three input mistakes explain most surprising results. Using a current grade that already
              includes the final — it must be your average before the final. Entering the final&apos;s
              points instead of its percentage weight (200 of 1,000 points is 20%, not 200). And trusting
              the percentage while ignoring your school&apos;s letter cut-offs, which vary — the percentage
              maths is exact either way.
            </p>
            <p>
              <strong className="text-stone-900">Points-based classes work too.</strong> Earned 390 of 500
              points so far (78%), with a 125-point final still to come? The final&apos;s weight is 125 ÷
              625 total points = 20%. To finish at 80% you need (80 − 78 × 0.8) ÷ 0.2 = 88% of the final —
              that is 110 of its 125 points. Enter 78, 80 and 20 above and the calculator does the same
              conversion for you.
            </p>
          </div>

          <h3 className="font-display text-2xl font-bold text-stone-900 mt-12 mb-4">
            Reference tables: the score you need, by current grade
          </h3>
          <p className="text-stone-600 leading-relaxed mb-6">
            Read across from your current grade to the grade you want to finish with. “Secured” means
            your coursework alone already clears that grade, even with a zero on the final; anything
            above 100% cannot be reached through the final alone.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                label: "Final worth 20%",
                rows: [
                  ["70%", "170%", "120%", "70%", "20%"],
                  ["75%", "150%", "100%", "50%", "0%"],
                  ["80%", "130%", "80%", "30%", "Secured"],
                  ["85%", "110%", "60%", "10%", "Secured"],
                  ["90%", "90%", "40%", "Secured", "Secured"],
                  ["95%", "70%", "20%", "Secured", "Secured"],
                ],
              },
              {
                label: "Final worth 30%",
                rows: [
                  ["70%", "137%", "103%", "70%", "37%"],
                  ["75%", "125%", "92%", "58%", "25%"],
                  ["80%", "113%", "80%", "47%", "13%"],
                  ["85%", "102%", "68%", "35%", "2%"],
                  ["90%", "90%", "57%", "23%", "Secured"],
                  ["95%", "78%", "45%", "12%", "Secured"],
                ],
              },
            ].map((t) => (
              <div key={t.label}>
                <p className="font-bold text-stone-900 mb-2">{t.label}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden">
                    <thead>
                      <tr className="bg-orange-50 text-stone-900">
                        <th className="px-3 py-2.5 font-bold">Now</th>
                        <th className="px-3 py-2.5 font-bold">For 90%</th>
                        <th className="px-3 py-2.5 font-bold">For 80%</th>
                        <th className="px-3 py-2.5 font-bold">For 70%</th>
                        <th className="px-3 py-2.5 font-bold">For 60%</th>
                      </tr>
                    </thead>
                    <tbody className="text-stone-600">
                      {t.rows.map((r) => (
                        <tr key={r[0]} className="border-t border-stone-200">
                          <td className="px-3 py-2 font-bold text-stone-900">{r[0]}</td>
                          <td className="px-3 py-2">{r[1]}</td>
                          <td className="px-3 py-2">{r[2]}</td>
                          <td className="px-3 py-2">{r[3]}</td>
                          <td className="px-3 py-2">{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Final grade questions, answered" />
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
              Find your number <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
