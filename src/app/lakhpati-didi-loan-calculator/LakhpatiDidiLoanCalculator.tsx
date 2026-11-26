"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function LakhpatiDidiLoanCalculator() {
  const [amount, setAmount] = useState("200000");
  const [months, setMonths] = useState("36");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const raw = Math.max(0, num(amount));
    const P = Math.min(raw, 500000);
    const n = Math.max(0, Math.round(num(months)));
    const base = n > 0 ? Math.floor(P / n) : 0;
    const last = n > 0 ? P - base * (n - 1) : 0;
    return {
      overLimit: raw > 500000,
      principal: P,
      months: n,
      base,
      last,
      even: n > 0 && P % n === 0,
    };
  }, [amount, months]);

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
              <label className={labelCls} htmlFor="ld-amount">Loan amount (₹)</label>
              <input id="ld-amount" type="number" min="0" step="5000" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Interest-free enterprise loans for SHG women run up to ₹5,00,000.</p>
              {res.overLimit && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  Above the scheme maximum — calculated at ₹5,00,000.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="ld-months">Repayment period (months)</label>
              <input id="ld-months" type="number" min="0" step="1" className={inputCls} value={months} onChange={(e) => setMonths(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Choose a period your enterprise&apos;s monthly surplus can carry comfortably.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Monthly repayment</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.base)}</p>
            <p className="mt-2 text-stone-500">
              {res.months > 0
                ? res.even
                  ? `every month for ${res.months} months — principal only, zero interest`
                  : `for the first ${res.months - 1} months, with a final smaller payment of ${fmt.format(res.last)}`
                : "enter a repayment period"}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Total you repay", fmt.format(res.principal), true)}
            {stat("Total interest", "₹0")}
            {stat("Number of payments", String(res.months))}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            Because the loan is interest-free, every rupee you pay reduces the loan itself — there is
            no interest portion eating the early instalments the way it does in a bank loan. The same
            ₹2,00,000 borrowed from a moneylender at village rates could cost over ₹70,000 in interest
            across 3 years.
          </p>
        </div>
      </div>
    </section>
  );
}
