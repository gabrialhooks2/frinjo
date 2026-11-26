"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export default function MsscCalculator() {
  const [deposit, setDeposit] = useState("200000");
  const [rate, setRate] = useState("7.5");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const raw = Math.max(0, num(deposit));
    const capped = Math.min(raw, 200000);
    const rounded = Math.floor(capped / 1000) * 1000;
    const r = Math.max(0, num(rate)) / 100;
    const maturity = rounded * Math.pow(1 + r / 4, 8); // 2 years, quarterly compounding
    return {
      overLimit: raw > 200000,
      depositUsed: rounded,
      maturity,
      interest: Math.max(0, maturity - rounded),
      afterOneYear: rounded * Math.pow(1 + r / 4, 4),
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
              <label className={labelCls} htmlFor="mssc-deposit">Deposit (₹)</label>
              <input id="mssc-deposit" type="number" min="0" step="1000" className={inputCls} value={deposit} onChange={(e) => setDeposit(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                Minimum ₹1,000, in multiples of ₹1,000, maximum ₹2,00,000 per account.
              </p>
              {res.overLimit && (
                <p className="mt-2 text-xs font-bold text-orange-700">
                  Above the scheme maximum — calculated at ₹2,00,000.
                </p>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="mssc-rate">Interest rate (% per year)</label>
              <input id="mssc-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                7.5% is the notified MSSC rate, compounded quarterly; it stays fixed for your certificate.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Maturity value after 2 years</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.maturity)}</p>
            <p className="mt-2 text-stone-500">on a deposit of {fmt.format(res.depositUsed)}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Interest earned", fmt.format(res.interest), true)}
            {stat("Value after 1 year", fmt.format(res.afterOneYear))}
            {stat("Term", "2 years")}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            After the first year you may withdraw up to 40% of the eligible balance once before
            maturity. Premature closure is restricted to specified grounds (such as the account
            holder&apos;s death or serious illness) and otherwise costs a 2% cut in the interest rate.
          </p>
        </div>
      </div>
    </section>
  );
}
