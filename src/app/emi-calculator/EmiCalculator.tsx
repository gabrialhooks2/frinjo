"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export function emiFor(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 1200;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export default function EmiCalculator() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("12");
  const [tenure, setTenure] = useState("60");
  const [unit, setUnit] = useState<"months" | "years">("months");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );
  const fmt2 = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(amount));
    const months = Math.max(1, Math.round(num(tenure) * (unit === "years" ? 12 : 1)));
    const emi = emiFor(P, num(rate), months);
    const totalPayment = emi * months;
    const totalInterest = Math.max(0, totalPayment - P);
    return {
      P,
      months,
      emi,
      totalPayment,
      totalInterest,
      share: totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0,
    };
  }, [amount, rate, tenure, unit]);

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
              <label className={labelCls} htmlFor="emi-amount">Loan amount (₹)</label>
              <input id="emi-amount" type="number" min="0" step="1000" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="emi-rate">Interest rate (% per year)</label>
              <input id="emi-rate" type="number" min="0" step="0.05" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="emi-tenure">Tenure ({unit})</label>
              <input id="emi-tenure" type="number" min="1" step="1" className={inputCls} value={tenure} onChange={(e) => setTenure(e.target.value)} />
              <div className="flex gap-2 mt-3">
                {(["months", "years"] as const).map((u) => (
                  <button key={u} type="button" onClick={() => setUnit(u)}
                    className={`rounded-full px-3 py-1.5 font-bold text-xs transition ${unit === u ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
                    {u === "months" ? "Months" : "Years"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Your monthly EMI</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt2.format(res.emi)}</p>
            <p className="mt-2 text-stone-500">
              for {res.months} months on a loan of {fmt.format(res.P)}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Total interest", fmt.format(res.totalInterest), true)}
            {stat("Total payment", fmt.format(res.totalPayment))}
            {stat("Interest share of payments", `${res.share.toFixed(1)}%`)}
          </div>
          <div className="mt-8 max-w-3xl mx-auto">
            <div className="flex h-4 rounded-full overflow-hidden border border-stone-200">
              <div className="bg-orange-500" style={{ width: `${100 - res.share}%` }} />
              <div className="bg-stone-800" style={{ width: `${res.share}%` }} />
            </div>
            <p className="mt-2 text-xs text-stone-500 text-center">
              Orange is your principal coming back to you as the loan balance; dark is interest — money
              that leaves and never returns. On long tenures the dark slice quietly becomes the bigger one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
