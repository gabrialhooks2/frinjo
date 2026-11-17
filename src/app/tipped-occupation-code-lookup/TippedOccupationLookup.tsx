"use client";

import { useMemo, useState } from "react";
import { TTOC_CATEGORIES, TTOC_OCCUPATIONS, findTtoc } from "@/lib/ttoc";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

export default function TippedOccupationLookup() {
  const [query, setQuery] = useState("");
  const [occupationCode, setOccupationCode] = useState("102");
  const [box14b, setBox14b] = useState("102");

  const selected = findTtoc(occupationCode);

  const verdict = useMemo(() => {
    const entered = box14b.trim();
    if (entered === "") return null;
    if (entered === "000") return { kind: "placeholder" as const };
    const enteredOcc = findTtoc(entered);
    if (!enteredOcc) return { kind: "unknown" as const, entered };
    if (selected && enteredOcc.code === selected.code)
      return { kind: "match" as const, occ: enteredOcc };
    return { kind: "wrong" as const, enteredOcc, correct: selected };
  }, [box14b, selected]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return TTOC_OCCUPATIONS.filter(
      (o) =>
        o.code.includes(q) ||
        o.title.toLowerCase().includes(q) ||
        o.examples.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* CHECKER */}
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <p className="font-display text-2xl font-bold text-stone-900 mb-1">Check the code in your Box 14b</p>
          <p className="text-sm text-stone-500 mb-6">
            Pick the occupation your tips came from, then type the code printed in Box 14b of your
            W-2. Box 14b can hold up to two codes — check each one the same way.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="ttoc-occupation">Your tipped occupation</label>
              <select
                id="ttoc-occupation"
                className={inputCls}
                value={occupationCode}
                onChange={(e) => setOccupationCode(e.target.value)}
              >
                {TTOC_CATEGORIES.map((cat) => (
                  <optgroup key={cat} label={cat}>
                    {TTOC_OCCUPATIONS.filter((o) => o.category === cat).map((o) => (
                      <option key={o.code} value={o.code}>
                        {o.code} — {o.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="ttoc-box14b">Code printed in your Box 14b</label>
              <input
                id="ttoc-box14b"
                type="text"
                inputMode="numeric"
                maxLength={3}
                className={inputCls}
                value={box14b}
                onChange={(e) => setBox14b(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="e.g. 102"
              />
            </div>
          </div>

          {verdict?.kind === "match" && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-900">
              <p className="font-bold">✓ Correct — code {verdict.occ.code} is {verdict.occ.title}.</p>
              <p className="mt-1 text-sm leading-relaxed">
                Your Box 14b matches the occupation you picked, so the tips reported with it are
                positioned to count toward the $25,000 no-tax-on-tips deduction (subject to the
                income phase-out and the other rules).
              </p>
            </div>
          )}
          {verdict?.kind === "wrong" && verdict.correct && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-900">
              <p className="font-bold">
                ✗ Wrong code — {verdict.enteredOcc.code} is {verdict.enteredOcc.title}, not your occupation.
              </p>
              <p className="mt-1 text-sm leading-relaxed">
                For {verdict.correct.title} the Box 14b code should be{" "}
                <strong>{verdict.correct.code}</strong>. Ask your employer or payroll provider to
                correct the W-2 (Form W-2c) so your tips are reported under the right occupation —
                a mismatched code can cost you the deduction.
              </p>
            </div>
          )}
          {verdict?.kind === "placeholder" && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-900">
              <p className="font-bold">⚠ 000 is not an occupation code.</p>
              <p className="mt-1 text-sm leading-relaxed">
                Employers enter 000 when tips came from an occupation that is{" "}
                <strong>not</strong> on the Treasury list — and tips under 000 do not qualify for the
                deduction. If your job <em>is</em> on the list below
                {selected ? (
                  <>
                    {" "}({selected.title} is code <strong>{selected.code}</strong>)
                  </>
                ) : null}
                , your employer used the wrong entry: ask payroll to correct it on Form W-2c.
              </p>
            </div>
          )}
          {verdict?.kind === "unknown" && (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900">
              <p className="font-bold">⚠ {verdict.entered} is not a Treasury Tipped Occupation Code.</p>
              <p className="mt-1 text-sm leading-relaxed">
                No occupation on the official list carries that code. Check the digits against your
                W-2 — and if the form really shows it, ask your employer to correct it (Form W-2c)
                to the code for your occupation
                {selected ? (
                  <>
                    : <strong>{selected.code}</strong> for {selected.title}
                  </>
                ) : null}
                .
              </p>
            </div>
          )}
          {!verdict && (
            <p className="mt-6 text-sm text-stone-500">
              Type the three-digit code from your Box 14b to see the verdict.
            </p>
          )}
        </div>

        {/* SEARCH */}
        <div className="mt-12">
          <label className={labelCls} htmlFor="ttoc-search">Search all 71 occupations</label>
          <input
            id="ttoc-search"
            type="text"
            className={inputCls}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “barista”, “603”, “driver”, “florist”…"
          />
          <p className="mt-2 text-xs text-stone-400">
            Search by code, occupation title, or the everyday job names in the IRS examples.
          </p>
        </div>

        {/* RESULTS / FULL TABLE */}
        {filtered ? (
          <div className="mt-6">
            <p className="text-sm font-bold text-stone-700 mb-3">
              {filtered.length} match{filtered.length === 1 ? "" : "es"}
            </p>
            {filtered.length === 0 ? (
              <p className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                No occupation on the official list matches that search. If your job is not on the
                list at all, its tips do not qualify for the deduction — employers report them with
                code 000.
              </p>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-stone-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-100 text-stone-600">
                    <tr>
                      <th className="px-4 py-3 font-bold">Code</th>
                      <th className="px-4 py-3 font-bold">Occupation</th>
                      <th className="px-4 py-3 font-bold hidden sm:table-cell">Category</th>
                      <th className="px-4 py-3 font-bold hidden md:table-cell">IRS examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((o) => (
                      <tr key={o.code} className="border-t border-stone-100">
                        <td className="px-4 py-3 font-display font-bold text-orange-700">{o.code}</td>
                        <td className="px-4 py-3 font-semibold text-stone-900">{o.title}</td>
                        <td className="px-4 py-3 text-stone-500 hidden sm:table-cell">{o.category}</td>
                        <td className="px-4 py-3 text-stone-500 hidden md:table-cell">{o.examples}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {TTOC_CATEGORIES.map((cat) => (
              <div key={cat}>
                <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{cat}</h3>
                <div className="overflow-hidden rounded-3xl border border-stone-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-100 text-stone-600">
                      <tr>
                        <th className="px-4 py-3 font-bold w-20">Code</th>
                        <th className="px-4 py-3 font-bold">Occupation</th>
                        <th className="px-4 py-3 font-bold hidden md:table-cell">IRS examples</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TTOC_OCCUPATIONS.filter((o) => o.category === cat).map((o) => (
                        <tr key={o.code} className="border-t border-stone-100">
                          <td className="px-4 py-3 font-display font-bold text-orange-700">{o.code}</td>
                          <td className="px-4 py-3 font-semibold text-stone-900">{o.title}</td>
                          <td className="px-4 py-3 text-stone-500 hidden md:table-cell">{o.examples}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
