"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function LicSurrenderValueCalculator() {
  const [premium, setPremium] = useState("50000");
  const [term, setTerm] = useState("20");
  const [paidYears, setPaidYears] = useState("8");
  const [bonus, setBonus] = useState("120000");
  const [bonusFactor, setBonusFactor] = useState("30");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(premium));
    const paid = Math.max(0, Math.round(num(paidYears)));
    const totalPremiums = P * paid;
    const exclFirst = Math.max(0, totalPremiums - P);
    const premiumPart = exclFirst * 0.3; // GSV: 30% of premiums excluding the first year
    const bonusPart = (Math.max(0, num(bonus)) * Math.min(100, Math.max(0, num(bonusFactor)))) / 100;
    const gsv = premiumPart + bonusPart;
    return {
      totalPremiums,
      premiumPart,
      bonusPart,
      gsv,
      recoveryPct: totalPremiums > 0 ? (gsv / totalPremiums) * 100 : 0,
      eligible: paid >= 2,
    };
  }, [premium, term, paidYears, bonus, bonusFactor]);

  const stat = (label: string, value: string, highlight = false) => (
    <div className={`rounded-2xl ${highlight ? "bg-orange-50 border-orange-100" : "bg-stone-50 border-stone-100"} border p-5 text-center`}>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${highlight ? "text-orange-700" : "text-stone-500"}`}>{label}</p>
      <p className="mt-2 font-display text-xl font-bold text-stone-900">{value}</p>
    </div>
  );

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border-2 border-dashed border-orange-300 bg-orange-50 p-5 text-sm text-orange-900 leading-relaxed">
          <strong>Estimate only:</strong> LIC computes surrender values with plan-specific factor
          tables. This calculator applies the standard Guaranteed Surrender Value formula — 30% of
          premiums paid excluding the first year, plus the surrender value of vested bonuses — so
          treat the result as a close guide, and confirm the exact figure with LIC before deciding.
        </div>

        <div className="mt-8 rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="sv-premium">Annual premium (₹, excluding GST)</label>
              <input id="sv-premium" type="number" min="0" step="500" className={inputCls} value={premium} onChange={(e) => setPremium(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="sv-term">Policy term (years)</label>
              <input id="sv-term" type="number" min="0" step="1" className={inputCls} value={term} onChange={(e) => setTerm(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Shown for context — the GSV formula itself uses premiums paid.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="sv-paid">Premiums paid (number of years)</label>
              <input id="sv-paid" type="number" min="0" step="1" className={inputCls} value={paidYears} onChange={(e) => setPaidYears(e.target.value)} />
              {!res.eligible && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  A surrender value generally accrues only after at least 2 full years of premiums.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="sv-bonus">Vested bonus accrued so far (₹)</label>
              <input id="sv-bonus" type="number" min="0" step="1000" className={inputCls} value={bonus} onChange={(e) => setBonus(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">The reversionary bonus already added to your policy, from your bonus statement.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="sv-factor">Bonus surrender factor (%)</label>
              <input id="sv-factor" type="number" min="0" max="100" step="1" className={inputCls} value={bonusFactor} onChange={(e) => setBonusFactor(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                LIC&apos;s factor depends on the remaining term; 30% is a mid-range planning figure.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Estimated Guaranteed Surrender Value</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.gsv)}</p>
            <p className="mt-2 text-stone-500">
              about {res.recoveryPct.toFixed(0)}% of the {fmt.format(res.totalPremiums)} you have paid in
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("30% of premiums (excl. year 1)", fmt.format(res.premiumPart))}
            {stat("Bonus surrender value", fmt.format(res.bonusPart))}
            {stat("Total premiums paid", fmt.format(res.totalPremiums), true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            LIC may pay the higher <em>Special Surrender Value</em> instead — it is based on the
            paid-up value and current factors, and is often better than the GSV after many years.
            Before surrendering, also price the alternatives: a policy loan, or making the policy
            paid-up and letting it run.
          </p>
        </div>
      </div>
    </section>
  );
}
