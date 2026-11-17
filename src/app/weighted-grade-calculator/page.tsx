import Link from "next/link";
import { SectionHead, Icon, btnPrimary, btnOutline } from "@/components/ui";
import WeightedGrade from "./WeightedGrade";

export const metadata = {
  title: "Weighted Grade Calculator — Points or %",
  description:
    "Free weighted grade calculator: grades as % or raw points (45/50), extra credit, and the average you still need for 90, 80, 70 or 60%. No sign-up.",
  keywords: ["weighted grade calculator", "grade calculator weighted", "calculate weighted grade", "category grade calculator", "weighted average grade"],
  alternates: { canonical: "https://frinjo.me/weighted-grade-calculator" },
  openGraph: {
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "WebStore Pro — Frinjo" }],
    title: "Weighted Grade Calculator — Points Welcome | WebStore Pro",
    description:
      "Weighted course grade from % or points, with extra credit and a what-you-still-need table. Free.",
    url: "https://frinjo.me/weighted-grade-calculator",
    type: "website",
  },
};

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Weighted Grade Calculator",
  applicationCategory: "EducationApplication",
  operatingSystem: "Web",
  url: "https://frinjo.me/weighted-grade-calculator",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "WebStore Pro", url: "https://frinjo.me" },
  description:
    "A free weighted grade calculator for courses graded by weighted categories (homework, quizzes, exams). Each category accepts either a percentage grade or raw points earned/possible, which it converts itself — unlike calculators that require users to convert points to percentages by hand. It computes the weighted average over graded categories, the course points already secured out of 100 (with an optional extra-credit addition), warns when weights do not total 100%, and shows the average required on the remaining weight to finish at 90, 80, 70 or 60 percent, flagging targets already secured or mathematically impossible. The result summary can be copied. Runs in the browser.",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://frinjo.me/" },
    { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://frinjo.me/tools" },
    { "@type": "ListItem", position: 3, name: "Weighted Grade Calculator", item: "https://frinjo.me/weighted-grade-calculator" },
  ],
};

const FAQS: [string, string][] = [
  [
    "How do I calculate a weighted grade?",
    "For each category, multiply the category average (as a percent) by its weight, add those products, and divide by the total weight graded. Example: homework 90% at weight 20, quizzes 85% at 20, midterm 78% at 25 gives (90×20 + 85×20 + 78×25) ÷ 65 = 83.8% across the graded 65% of the course. This calculator does the arithmetic and also tracks how many of the 100 course points you have already secured.",
  ],
  [
    "Can I enter points instead of percentages?",
    "Yes — set a category to 'Points' and enter earned/possible (for example 180 out of 200). The calculator converts it to a percentage itself. Many weighted-grade calculators make you convert by hand first; this one was built specifically to remove that step.",
  ],
  [
    "What does 'secured points' mean?",
    "If categories worth 65% of the course are graded and your weighted contribution from them is 54.5, you have banked 54.5 of the 100 points that decide your final grade. Even a zero on everything remaining cannot take those away — and the table under the result shows exactly what average the remaining weight must produce for each target grade.",
  ],
  [
    "My weights don't add up to 100%. Is that a problem?",
    "Usually it means a category is missing (participation and a final exam are the usual suspects) or one weight was mistyped — the calculator flags the total so you notice. Some syllabi genuinely use weights summing to something else; the weighted average is still computed correctly over the graded weight, but the secured-points figure assumes a 100-point course.",
  ],
  [
    "How does extra credit fit in?",
    "Enter extra credit as course points (for example 2 if it is worth 2 points toward the final grade) in the extra-credit field. It is added to your secured points, which is how most syllabi apply it. If your class applies extra credit inside one category instead, add it to that category's earned points.",
  ],
  [
    "What if my teacher drops the lowest score?",
    "Many syllabi drop the lowest quiz or homework score in a category. This calculator takes one average per category, so drop the score yourself before you average: quizzes of 72, 85, 90, 88 and 94 average 85.8% — with the 72 dropped, the same set averages 89.25%. Enter 89.25% (or 357 out of 400 in Points mode) and the weighted result matches your teacher's gradebook. Dropping a low score helps most in heavily weighted categories, so check those first.",
  ],
  [
    "What if I need more than 100% on what's left to reach my target?",
    "Then that target is mathematically out of reach — no score on the remaining work can pull the average up enough, because the points already lost outweigh what is left. Your secured points cannot go down, though: the table under the result also shows the targets that are still reachable, and finishing one band higher (a B instead of a B-, say) is usually still on the table. Recheck that every category and weight from your syllabus is entered — a missing category is the most common reason for an impossible number.",
  ],
  [
    "How do I turn my weighted percentage into a letter grade or GPA points?",
    "Use the standard scale in the table above: 93–100% is an A (4.0), 90–92% an A- (3.7), 83–86% a B (3.0), 73–76% a C (2.0) and below 60% an F (0.0). Schools vary the cut-offs by a point or two, and some weight AP and honors courses on a 5.0 scale instead — check your student handbook for the exact bands your school uses.",
  ],
  [
    "Is the Weighted Grade Calculator free?",
    "Yes, completely free with no sign-up. Your grades are calculated in your browser and never stored.",
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

export default function WeightedGradePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section id="top" className="bg-orange-50 dot-grid pt-16 sm:pt-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] bg-orange-600 text-white rounded-full px-3 py-1 mb-5">
            Free · Points or % · Extra credit built in
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-bold text-stone-900 leading-tight">
            Weighted Grade <span className="text-gold-gradient">Calculator</span>
          </h1>
          <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-stone-800">
            Your Course Grade, Category by Category
          </p>
          <p className="mt-5 text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Enter homework as <strong>180/200 points</strong> if that is what you have — no converting to
            percentages on paper first. Plus the answer students actually want: what you still need on the
            rest of the course to finish with the grade you want.
          </p>
        </div>
      </section>

      <WeightedGrade />

      <section className="py-16 sm:py-20 bg-white border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead
            eyebrow="How it works"
            title="The formula, worked end to end"
            sub="A weighted grade is not a plain average: each category pulls in proportion to its weight."
          />
          <p className="text-stone-600 leading-relaxed">
            For every category, multiply its average by its weight, add the products, and divide by the
            total weight graded so far: <strong>(score₁ × weight₁ + score₂ × weight₂ + …) ÷ total weight</strong>.
            The same course with the same scores can land a full letter apart under a plain average —
            an 78 on a midterm worth 25% costs more than a 78 on homework worth 20%, and the weighted
            figure is the one your transcript sees.
          </p>
          <div className="overflow-x-auto mt-8">
            <table className="w-full text-left text-sm sm:text-base border border-stone-200 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-orange-50 text-stone-900">
                  <th className="px-4 py-3 font-bold">Category</th>
                  <th className="px-4 py-3 font-bold">Score</th>
                  <th className="px-4 py-3 font-bold">Weight</th>
                  <th className="px-4 py-3 font-bold">Score × weight</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">Homework</td>
                  <td className="px-4 py-3">90%</td>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3">1,800</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">Quizzes</td>
                  <td className="px-4 py-3">85%</td>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3">1,700</td>
                </tr>
                <tr className="border-t border-stone-200">
                  <td className="px-4 py-3">Midterm</td>
                  <td className="px-4 py-3">78%</td>
                  <td className="px-4 py-3">25</td>
                  <td className="px-4 py-3">1,950</td>
                </tr>
                <tr className="border-t border-stone-200 font-bold text-stone-900">
                  <td className="px-4 py-3">Weighted grade</td>
                  <td className="px-4 py-3" colSpan={2}>5,450 ÷ 65</td>
                  <td className="px-4 py-3">83.8% (B)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-stone-600 leading-relaxed mt-6">
            Only 65% of this course is graded, so 54.5 of the 100 course points are already secured.
            The calculator&apos;s table under the result runs the same formula forward: the average the
            remaining 35% must produce for a 90, 80, 70 or 60% finish —{" "}
            <strong>needed = (target − secured) ÷ remaining weight</strong>.
          </p>

          <h3 className="font-display text-2xl font-bold text-stone-900 mt-12 mb-4">
            The standard grading scale
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border border-stone-200 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-orange-50 text-stone-900">
                  <th className="px-4 py-3 font-bold">Letter</th>
                  <th className="px-4 py-3 font-bold">Percentage</th>
                  <th className="px-4 py-3 font-bold">GPA points</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {[
                  ["A+", "97–100%", "4.0"],
                  ["A", "93–96%", "4.0"],
                  ["A-", "90–92%", "3.7"],
                  ["B+", "87–89%", "3.3"],
                  ["B", "83–86%", "3.0"],
                  ["B-", "80–82%", "2.7"],
                  ["C+", "77–79%", "2.3"],
                  ["C", "73–76%", "2.0"],
                  ["C-", "70–72%", "1.7"],
                  ["D+", "67–69%", "1.3"],
                  ["D", "63–66%", "1.0"],
                  ["D-", "60–62%", "0.7"],
                  ["F", "Below 60%", "0.0"],
                ].map(([letter, pct, gpa]) => (
                  <tr key={letter} className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">{letter}</td>
                    <td className="px-4 py-2.5">{pct}</td>
                    <td className="px-4 py-2.5">{gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-stone-600 leading-relaxed mt-6">
            Cut-offs move a point or two between schools, and weighted AP or honors courses often use a
            5.0 scale for the GPA column — but the percentage-to-letter bands above are the ones most US
            high schools and colleges publish.
          </p>
        </div>
      </section>

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
            {" "}· Pairs with the <Link href="/final-grade-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Final Grade Calculator</Link>, <Link href="/gpa-calculator" className="font-semibold text-orange-700 hover:text-orange-800">GPA Calculator</Link> and <Link href="/test-score-calculator" className="font-semibold text-orange-700 hover:text-orange-800">Test Score Calculator</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHead eyebrow="FAQ" title="Weighted grade questions, answered" />
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
              Calculate your grade <Icon name="arrow" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
