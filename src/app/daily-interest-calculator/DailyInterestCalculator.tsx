"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

const PERIODS: [string, number][] = [
  ["1 day", 1],
  ["7 days (1 week)", 7],
  ["15 days", 15],
  ["30 days", 30],
  ["90 days (1 quarter)", 90],
  ["180 days (half year)", 180],
  ["365 days (1 year)", 365],
  ["730 days (2 years)", 730],
];

export default function DailyInterestCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");

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
    const yearly = (P * Math.max(0, num(rate))) / 100;
    return {
      P,
      yearly,
      perDay: yearly / 365,
      perMonth: yearly / 12,
    };
  }, [principal, rate]);

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
              <label className={labelCls} htmlFor="di-principal">Amount (₹)</label>
              <input id="di-principal" type="number" min="0" step="1000" className={inputCls} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="di-rate">Interest rate (% per year)</label>
              <input id="di-rate" type="number" min="0" step="0.05" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Interest per day</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt2.format(res.perDay)}</p>
            <p className="mt-2 text-stone-500">
              on {fmt.format(res.P)} at {num(rate).toFixed(2)}% a year, simple interest
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Per month (average)", fmt.format(res.perMonth))}
            {stat("Per year", fmt.format(res.yearly), true)}
            {stat("Per day, per ₹1 lakh", fmt2.format((100000 * Math.max(0, num(rate))) / 100 / 365))}
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="w-full text-left text-sm border border-stone-200 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-orange-50 text-stone-900">
                  <th className="px-4 py-3 font-bold">Period</th>
                  <th className="px-4 py-3 font-bold">Days</th>
                  <th className="px-4 py-3 font-bold">Interest earned / owed</th>
                  <th className="px-4 py-3 font-bold">Amount with interest</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {PERIODS.map(([label, d]) => (
                  <tr key={label} className="border-t border-stone-200">
                    <td className="px-4 py-2.5 font-bold text-stone-900">{label}</td>
                    <td className="px-4 py-2.5">{d}</td>
                    <td className="px-4 py-2.5">{fmt2.format(res.perDay * d)}</td>
                    <td className="px-4 py-2.5">{fmt.format(res.P + res.perDay * d)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            Banks count actual days — 365 in a normal year, 366 in a leap year — and many savings
            accounts pay interest on the daily closing balance. This table uses the simple
            365-day convention so any period can be priced in one multiplication.
          </p>
        </div>
      </div>
    </section>
  );
}
