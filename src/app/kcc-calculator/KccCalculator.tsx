"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function KccCalculator() {
  const [amount, setAmount] = useState("300000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("1");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(amount));
    const t = Math.max(0, num(years));
    const base = Math.max(0, num(rate));
    const interestAtRate = (P * base * t) / 100;
    const interestAt4 = (P * 4 * t) / 100;
    return {
      eligible: P <= 300000,
      interestAtRate,
      interestAt4,
      saved: Math.max(0, interestAtRate - interestAt4),
      totalAtRate: P + interestAtRate,
      totalAt4: P + interestAt4,
    };
  }, [amount, rate, years]);

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
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="kcc-amount">Crop loan amount (₹)</label>
              <input id="kcc-amount" type="number" min="0" step="1000" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                The 4% effective rate applies to short-term crop loans up to ₹3,00,000 repaid on time.
              </p>
              {!res.eligible && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  Above ₹3,00,000 — the subvention comparison applies only up to ₹3,00,000 of the loan.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="kcc-rate">Bank interest rate (% per year)</label>
              <input id="kcc-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">KCC crop loans are typically priced at 7% under the subvention scheme.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="kcc-years">Period (years)</label>
              <input id="kcc-years" type="number" min="0" step="0.5" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Crop loans are usually seasonal — one year is the standard cycle.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-2xl bg-stone-50 border border-stone-100 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Interest at the bank rate</p>
              <p className="mt-3 font-display text-4xl font-bold text-stone-900">{fmt.format(res.interestAtRate)}</p>
              <p className="mt-2 text-sm text-stone-500">total payable {fmt.format(res.totalAtRate)}</p>
            </div>
            <div className="rounded-2xl bg-orange-50 border border-orange-100 p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Interest at effective 4% (repay on time)</p>
              <p className="mt-3 font-display text-4xl font-bold text-stone-900">{fmt.format(res.interestAt4)}</p>
              <p className="mt-2 text-sm text-stone-500">total payable {fmt.format(res.totalAt4)}</p>
            </div>
          </div>
          <div className="mt-6 max-w-md mx-auto">
            {stat("You save by repaying on time", fmt.format(res.saved), true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            How 4% happens: the government pays the bank a 2% interest subvention, and a further 3%
            subvention is credited when you repay promptly — bringing a 7% loan down to an effective
            4% for the farmer. Miss the due date and the full bank rate applies for that cycle.
          </p>
        </div>
      </div>
    </section>
  );
}
