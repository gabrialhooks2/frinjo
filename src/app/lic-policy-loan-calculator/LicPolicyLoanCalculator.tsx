"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function LicPolicyLoanCalculator() {
  const [sv, setSv] = useState("500000");
  const [pct, setPct] = useState("90");
  const [rate, setRate] = useState("9.5");
  const [years, setYears] = useState("3");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const S = Math.max(0, num(sv));
    const p = Math.min(100, Math.max(0, num(pct)));
    const r = Math.max(0, num(rate)) / 100;
    const t = Math.max(0, num(years));
    const loan = (S * p) / 100;
    // LIC charges loan interest at half-yearly rests; unpaid interest is added to the loan.
    const repay = loan * Math.pow(1 + r / 2, 2 * t);
    const halfYearlyInterest = loan * (r / 2);
    return { loan, repay, interest: Math.max(0, repay - loan), halfYearlyInterest };
  }, [sv, pct, rate, years]);

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
              <label className={labelCls} htmlFor="lic-sv">Policy surrender value (₹)</label>
              <input id="lic-sv" type="number" min="0" step="1000" className={inputCls} value={sv} onChange={(e) => setSv(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                From your LIC branch, the LIC portal, or your latest policy statement.
              </p>
            </div>
            <div>
              <label className={labelCls} htmlFor="lic-pct">Loan percentage of surrender value (%)</label>
              <input id="lic-pct" type="number" min="0" max="100" step="1" className={inputCls} value={pct} onChange={(e) => setPct(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                LIC typically allows up to 90% of surrender value on in-force policies (80% on paid-up).
              </p>
            </div>
            <div>
              <label className={labelCls} htmlFor="lic-rate">Loan interest rate (% per year)</label>
              <input id="lic-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">9.5% is a recent LIC policy-loan rate; confirm the current rate with LIC.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="lic-years">Loan period (years)</label>
              <input id="lic-years" type="number" min="0" step="0.5" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Minimum loan term is 6 months; the loan must be repaid within the policy term.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Maximum loan available</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.loan)}</p>
            <p className="mt-2 text-stone-500">against your surrender value — no credit check, no income proof</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Interest if nothing is paid", fmt.format(res.interest), true)}
            {stat("Total due at the end", fmt.format(res.repay))}
            {stat("Interest each half-year", fmt.format(res.halfYearlyInterest))}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            LIC charges interest half-yearly. Paying just the interest each half-year keeps the loan
            flat at the middle figure&apos;s starting point; paying nothing lets unpaid interest join
            the loan — the “total due” above. If loan plus interest ever exceeds the surrender value,
            the policy can be terminated, so keep a margin.
          </p>
        </div>
      </div>
    </section>
  );
}
