"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

function emiFor(P: number, annualPct: number, months: number): number {
  const r = annualPct / 1200;
  if (r === 0) return P / months;
  const f = Math.pow(1 + r, months);
  return (P * r * f) / (f - 1);
}

function solveRateForEmi(P: number, emi: number, months: number): number {
  if (emi * months <= P) return 0;
  const at = (mr: number) => (mr === 0 ? P / months : (P * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1));
  let lo = 0;
  let hi = 0.1;
  while (at(hi) < emi && hi < 1) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (at(mid) < emi) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 1200;
}

export default function FlatVsReducingCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [flatRate, setFlatRate] = useState("10");
  const [reducingRate, setReducingRate] = useState("10");
  const [years, setYears] = useState("1");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );
  const fmt2 = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(principal));
    const yrs = Math.max(0, num(years));
    const months = Math.max(1, Math.round(yrs * 12));
    const flatInterest = (P * Math.max(0, num(flatRate)) * yrs) / 100;
    const flatEmi = months > 0 ? (P + flatInterest) / months : 0;
    const redEmi = emiFor(P, Math.max(0, num(reducingRate)), months);
    const redInterest = Math.max(0, redEmi * months - P);
    return {
      P,
      months,
      flatInterest,
      flatEmi,
      redEmi,
      redInterest,
      diff: flatInterest - redInterest,
      equivReducing: solveRateForEmi(P, flatEmi, months),
    };
  }, [principal, flatRate, reducingRate, years]);

  const row = (label: string, flat: string, red: string, bold = false) => (
    <tr className="border-t border-stone-200">
      <td className={`px-4 py-2.5 ${bold ? "font-bold text-stone-900" : "text-stone-600"}`}>{label}</td>
      <td className="px-4 py-2.5 font-bold text-stone-900">{flat}</td>
      <td className="px-4 py-2.5 font-bold text-stone-900">{red}</td>
    </tr>
  );

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="fvr-principal">Loan amount (₹)</label>
              <input id="fvr-principal" type="number" min="0" step="1000" className={inputCls} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="fvr-years">Tenure (years)</label>
              <input id="fvr-years" type="number" min="0" step="0.5" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="fvr-flat">Flat rate (% per year)</label>
              <input id="fvr-flat" type="number" min="0" step="0.1" className={inputCls} value={flatRate} onChange={(e) => setFlatRate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="fvr-reducing">Reducing rate (% per year)</label>
              <input id="fvr-reducing" type="number" min="0" step="0.1" className={inputCls} value={reducingRate} onChange={(e) => setReducingRate(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Extra interest the flat rate charges</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.diff)}</p>
            <p className="mt-2 text-stone-500 max-w-xl mx-auto">
              At the same headline rate of {num(flatRate).toFixed(1)}%, the flat method costs{" "}
              {fmt.format(res.flatInterest)} against {fmt.format(res.redInterest)} on reducing balance.
            </p>
          </div>
          <div className="overflow-x-auto mt-8">
            <table className="w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-orange-50 text-stone-900">
                  <th className="px-4 py-3 font-bold">&nbsp;</th>
                  <th className="px-4 py-3 font-bold">Flat rate</th>
                  <th className="px-4 py-3 font-bold">Reducing balance</th>
                </tr>
              </thead>
              <tbody>
                {row("Monthly payment", fmt2.format(res.flatEmi), fmt2.format(res.redEmi))}
                {row("Total interest", fmt.format(res.flatInterest), fmt.format(res.redInterest))}
                {row("Total you repay", fmt.format(res.P + res.flatInterest), fmt.format(res.P + res.redInterest), true)}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            The flat rate of {num(flatRate).toFixed(1)}% on this loan is really a{" "}
            <strong className="text-stone-900">{res.equivReducing.toFixed(2)}% reducing rate</strong>{" "}
            in disguise. Rule of thumb: a flat rate costs roughly what a reducing rate 1.8× higher
            would — and the gap widens with tenure.
          </p>
        </div>
      </div>
    </section>
  );
}
