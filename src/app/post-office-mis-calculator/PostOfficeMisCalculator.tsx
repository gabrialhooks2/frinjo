"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function PostOfficeMisCalculator() {
  const [deposit, setDeposit] = useState("900000");
  const [rate, setRate] = useState("7.4");
  const [account, setAccount] = useState<"single" | "joint">("single");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const max = account === "single" ? 900000 : 1500000;
    const raw = Math.max(0, num(deposit));
    const capped = Math.min(raw, max);
    const rounded = Math.floor(capped / 1000) * 1000; // deposits must be in multiples of ₹1,000
    const monthly = Math.round((rounded * Math.max(0, num(rate))) / 100 / 12);
    return {
      max,
      overLimit: raw > max,
      notMultiple: raw % 1000 !== 0 && raw > 0,
      depositUsed: rounded,
      monthly,
      yearly: monthly * 12,
      totalFiveYears: monthly * 60,
    };
  }, [deposit, rate, account]);

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
              <label className={labelCls} htmlFor="mis-deposit">One-time deposit (₹)</label>
              <input id="mis-deposit" type="number" min="0" step="1000" className={inputCls} value={deposit} onChange={(e) => setDeposit(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                In multiples of ₹1,000. Maximum {account === "single" ? "₹9,00,000 (single account)" : "₹15,00,000 (joint account)"}.
              </p>
              {res.overLimit && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  Above the {account} limit — calculated at the maximum of {fmt.format(res.max)}.
                </p>
              )}
              {res.notMultiple && !res.overLimit && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  Rounded down to {fmt.format(res.depositUsed)} — deposits must be in multiples of ₹1,000.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="mis-rate">Interest rate (% per year)</label>
              <input id="mis-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                The government revises small-savings rates every quarter; 7.4% is the recent POMIS rate.
              </p>
              <span className={`${labelCls} mt-4`}>Account type</span>
              <div className="flex gap-2">
                {(["single", "joint"] as const).map((a) => (
                  <button key={a} type="button" onClick={() => setAccount(a)}
                    className={`rounded-full px-4 py-2 font-bold text-sm transition ${account === a ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
                    {a === "single" ? "Single (max ₹9L)" : "Joint (max ₹15L)"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Monthly income from the post office</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.monthly)}</p>
            <p className="mt-2 text-stone-500">
              every month for 5 years, on a deposit of {fmt.format(res.depositUsed)}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Income per year", fmt.format(res.yearly))}
            {stat("Total income over 5 years", fmt.format(res.totalFiveYears), true)}
            {stat("Deposit returned at maturity", fmt.format(res.depositUsed))}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            The deposit itself comes back untouched at the end of 5 years — the scheme pays out only
            the interest, monthly. Interest left unwithdrawn in the account earns no further interest,
            so withdraw it or sweep it into a savings account where it does.
          </p>
        </div>
      </div>
    </section>
  );
}
