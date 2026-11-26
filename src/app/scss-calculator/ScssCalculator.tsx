"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function ScssCalculator() {
  const [deposit, setDeposit] = useState("1000000");
  const [rate, setRate] = useState("8.2");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const raw = Math.max(0, num(deposit));
    const capped = Math.min(raw, 3000000);
    const rounded = Math.floor(capped / 1000) * 1000;
    const quarterly = Math.round((rounded * Math.max(0, num(rate))) / 100 / 4);
    return {
      overLimit: raw > 3000000,
      depositUsed: rounded,
      quarterly,
      yearly: quarterly * 4,
      totalFiveYears: quarterly * 20,
      totalWithExtension: quarterly * 32, // 5 years + one 3-year extension block
    };
  }, [deposit, rate]);

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
              <label className={labelCls} htmlFor="scss-deposit">One-time deposit (₹)</label>
              <input id="scss-deposit" type="number" min="0" step="1000" className={inputCls} value={deposit} onChange={(e) => setDeposit(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                Minimum ₹1,000, in multiples of ₹1,000, maximum ₹30,00,000 across all SCSS accounts.
              </p>
              {res.overLimit && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  Above the scheme maximum — calculated at ₹30,00,000.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="scss-rate">Interest rate (% per year)</label>
              <input id="scss-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                8.2% is the recent notified SCSS rate; it is fixed for your account at opening.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Quarterly payout</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.quarterly)}</p>
            <p className="mt-2 text-stone-500">
              paid every quarter for 5 years, on a deposit of {fmt.format(res.depositUsed)}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Income per year", fmt.format(res.yearly))}
            {stat("Total over 5 years", fmt.format(res.totalFiveYears), true)}
            {stat("If extended 3 more years", fmt.format(res.totalWithExtension))}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            After 5 years the account can be extended in blocks of 3 years — with or without a fresh
            deposit. The deposit itself is returned whenever the account is closed; premature closure
            costs 1–1.5% of the deposit depending on how long the account has run.
          </p>
        </div>
      </div>
    </section>
  );
}
