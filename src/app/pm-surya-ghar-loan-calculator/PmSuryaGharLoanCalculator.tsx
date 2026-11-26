"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export function subsidyForKw(kw: number): number {
  if (kw <= 0) return 0;
  if (kw < 2) return 30000 * kw; // pro-rata within the first band is indicative
  if (kw < 3) return 60000;
  return 78000; // ₹78,000 for 3 kW and above (scheme maximum)
}

export function monthlyEmi(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 1200;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export default function PmSuryaGharLoanCalculator() {
  const [kw, setKw] = useState("3");
  const [cost, setCost] = useState("180000");
  const [loan, setLoan] = useState("180000");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("5");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const capacity = Math.max(0, num(kw));
    const totalCost = Math.max(0, num(cost));
    const L = Math.max(0, num(loan));
    const months = Math.max(0, Math.round(num(years) * 12));
    const subsidy = Math.min(subsidyForKw(capacity), totalCost);
    const emi = monthlyEmi(L, Math.max(0, num(rate)), months);
    const totalRepay = emi * months;
    const unitsPerMonth = capacity * 4 * 30; // ~4 units per kW per day
    return {
      subsidy,
      netCost: Math.max(0, totalCost - subsidy),
      subsidyPct: totalCost > 0 ? (subsidy / totalCost) * 100 : 0,
      emi,
      totalRepay,
      loanInterest: Math.max(0, totalRepay - L),
      unitsPerMonth,
      monthlySaving: unitsPerMonth * 6, // at an indicative ₹6 per unit
    };
  }, [kw, cost, loan, rate, years]);

  const stat = (label: string, value: string, highlight = false) => (
    <div className={`rounded-2xl ${highlight ? "bg-orange-50 border-orange-100" : "bg-stone-50 border-stone-100"} border p-5 text-center`}>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${highlight ? "text-orange-700" : "text-stone-500"}`}>{label}</p>
      <p className="mt-2 font-display text-xl font-bold text-stone-900">{value}</p>
    </div>
  );

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="sg-kw">Solar plant capacity (kW)</label>
              <input id="sg-kw" type="number" min="0" step="0.5" className={inputCls} value={kw} onChange={(e) => setKw(e.target.value)} />
              <div className="mt-3 flex flex-wrap gap-2">
                {["1", "2", "3", "5", "10"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setKw(v)}
                    className={`rounded-full px-4 py-1.5 text-sm font-bold border transition ${kw === v ? "bg-orange-600 text-white border-orange-600" : "bg-white text-stone-600 border-stone-300 hover:border-orange-400"}`}
                  >
                    {v} kW
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="sg-cost">Total system cost (₹)</label>
              <input id="sg-cost" type="number" min="0" step="5000" className={inputCls} value={cost} onChange={(e) => setCost(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Installed cost from your vendor&apos;s quote — about ₹55,000–₹65,000 per kW is typical.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="sg-loan">Loan amount (₹)</label>
              <input id="sg-loan" type="number" min="0" step="5000" className={inputCls} value={loan} onChange={(e) => setLoan(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Banks finance rooftop solar readily; loans up to ₹2 lakh for up to 3 kW are collateral-free.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls} htmlFor="sg-rate">Rate (% / year)</label>
                <input id="sg-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              </div>
              <div>
                <label className={labelCls} htmlFor="sg-years">Tenure (years)</label>
                <input id="sg-years" type="number" min="0" step="1" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Central subsidy you receive</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.subsidy)}</p>
            <p className="mt-2 text-stone-500">
              {res.subsidyPct.toFixed(0)}% of the system cost — paid by direct benefit transfer after installation and inspection
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Net cost after subsidy", fmt.format(res.netCost), true)}
            {stat("Monthly EMI on the loan", fmt.format(res.emi))}
            {stat("Total loan interest", fmt.format(res.loanInterest))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {stat("Generation (approx.)", `${res.unitsPerMonth.toLocaleString("en-IN")} units / month`)}
            {stat("Bill saving at ₹6/unit", `${fmt.format(res.monthlySaving)} / month`, true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            For most homes the monthly bill saving covers a large part of the EMI — and once the
            subsidy is netted against the price, the plant largely pays for itself. After the loan
            ends, the electricity is close to free for the panels&apos; 25-year life.
          </p>
        </div>
      </div>
    </section>
  );
}
