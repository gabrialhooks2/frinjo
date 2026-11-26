"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

/** Standard Indian RD maturity: quarterly compounding, monthly deposits.
 *  M = R × [((1 + i)^n − 1) ÷ (1 − (1 + i)^(−1/3))], i = annual rate ÷ 400, n = quarters. */
export function rdMaturity(monthly: number, annualRatePct: number, months: number): number {
  if (monthly <= 0 || months <= 0) return 0;
  const i = annualRatePct / 400;
  const n = months / 3;
  if (i === 0) return monthly * months;
  return (monthly * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));
}

export default function RdCalculator() {
  const [deposit, setDeposit] = useState("5000");
  const [rate, setRate] = useState("7");
  const [monthsIn, setMonthsIn] = useState("12");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const R = Math.max(0, num(deposit));
    const months = Math.max(1, Math.round(num(monthsIn)));
    const maturity = rdMaturity(R, num(rate), months);
    const deposited = R * months;
    return { R, months, maturity, deposited, interest: Math.max(0, maturity - deposited) };
  }, [deposit, rate, monthsIn]);

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
              <label className={labelCls} htmlFor="rd-deposit">Monthly deposit (₹)</label>
              <input id="rd-deposit" type="number" min="0" step="100" className={inputCls} value={deposit} onChange={(e) => setDeposit(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="rd-rate">Interest rate (% per year)</label>
              <input id="rd-rate" type="number" min="0" step="0.05" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="rd-months">Tenure (months)</label>
              <input id="rd-months" type="number" min="1" step="1" className={inputCls} value={monthsIn} onChange={(e) => setMonthsIn(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                {Math.floor(res.months / 12) > 0 ? `${Math.floor(res.months / 12)} year${Math.floor(res.months / 12) === 1 ? "" : "s"} ` : ""}
                {res.months % 12 > 0 ? `${res.months % 12} month${res.months % 12 === 1 ? "" : "s"}` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Maturity value</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.maturity)}</p>
            <p className="mt-2 text-stone-500">
              from {fmt.format(res.R)} a month for {res.months} months, compounded quarterly
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
            {stat("Total you deposit", fmt.format(res.deposited))}
            {stat("Interest earned", fmt.format(res.interest), true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            An RD pays less interest than the same money in an FD — not because the rate is worse, but
            because most of your money arrives late and has less time to grow. The first instalment
            works for the full tenure; the last one barely works at all.
          </p>
        </div>
      </div>
    </section>
  );
}
