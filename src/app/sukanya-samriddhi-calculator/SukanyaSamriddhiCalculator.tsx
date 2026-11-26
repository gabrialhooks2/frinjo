"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

/** SSY model: deposit at the start of each year for 15 years, interest compounded
 *  annually at the scheme rate, account matures 21 years after opening. */
export function ssyProjection(yearlyDeposit: number, annualRatePct: number) {
  const r = annualRatePct / 100;
  let balance = 0;
  const rows: { year: number; deposited: number; interest: number; balance: number }[] = [];
  for (let y = 1; y <= 21; y++) {
    const dep = y <= 15 ? yearlyDeposit : 0;
    balance += dep;
    const interest = balance * r;
    balance += interest;
    rows.push({ year: y, deposited: dep, interest, balance });
  }
  return rows;
}

export default function SukanyaSamriddhiCalculator() {
  const [yearly, setYearly] = useState("150000");
  const [age, setAge] = useState("5");
  const [rate, setRate] = useState("8.2");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const dep = Math.min(150000, Math.max(0, num(yearly)));
    const girlAge = Math.min(10, Math.max(0, Math.round(num(age))));
    const rows = ssyProjection(dep, Math.max(0, num(rate)));
    const maturity = rows[20]?.balance ?? 0;
    const deposited = dep * 15;
    return {
      dep,
      girlAge,
      maturityAge: girlAge + 21,
      rows,
      maturity,
      deposited,
      interest: Math.max(0, maturity - deposited),
      belowMin: num(yearly) > 0 && num(yearly) < 250,
      aboveMax: num(yearly) > 150000,
    };
  }, [yearly, age, rate]);

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
              <label className={labelCls} htmlFor="ssy-deposit">Yearly deposit (₹)</label>
              <input id="ssy-deposit" type="number" min="0" step="250" className={inputCls} value={yearly} onChange={(e) => setYearly(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Minimum ₹250, maximum ₹1,50,000 per financial year.</p>
              {res.aboveMax && <p className="mt-2 text-xs font-bold text-orange-700">Capped at the ₹1,50,000 yearly maximum.</p>}
              {res.belowMin && <p className="mt-2 text-xs font-bold text-orange-700">Below the ₹250 yearly minimum to keep the account active.</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="ssy-age">Girl&apos;s age at opening (years)</label>
              <input id="ssy-age" type="number" min="0" max="10" step="1" className={inputCls} value={age} onChange={(e) => setAge(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">The account can only be opened before she turns 10.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="ssy-rate">Interest rate (% per year)</label>
              <input id="ssy-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">8.2% is the recent notified SSY rate, revised quarterly for the scheme.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Maturity value at 21 years</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.maturity)}</p>
            <p className="mt-2 text-stone-500">
              when she turns about {res.maturityAge} — deposits stop after year 15, growth continues to year 21
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("You deposit in total", fmt.format(res.deposited))}
            {stat("Interest earned", fmt.format(res.interest), true)}
            {stat("Deposit period", "15 years")}
          </div>
          <details className="mt-8 rounded-2xl border border-stone-200 bg-stone-50/60 transition group">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-4 font-bold text-stone-900 [&::-webkit-details-marker]:hidden">
              Year-by-year growth
              <span className="shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-700 grid place-items-center group-open:rotate-45 transition-transform text-xl leading-none">+</span>
            </summary>
            <div className="px-6 pb-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-stone-400 border-b border-stone-200">
                    <th className="py-2 pr-3">Year</th>
                    <th className="py-2 pr-3 text-right">Deposit</th>
                    <th className="py-2 pr-3 text-right">Interest</th>
                    <th className="py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {res.rows.map((r) => (
                    <tr key={r.year} className="border-b border-stone-100 last:border-0">
                      <td className="py-2 pr-3 font-bold text-stone-800">{r.year}</td>
                      <td className="py-2 pr-3 text-right text-stone-600">{r.deposited > 0 ? fmt.format(r.deposited) : "—"}</td>
                      <td className="py-2 pr-3 text-right text-stone-600">{fmt.format(r.interest)}</td>
                      <td className="py-2 text-right text-stone-600">{fmt.format(r.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            Model: the full year&apos;s deposit is made at the start of each year and interest is
            compounded annually. Depositing monthly through the year gives a slightly lower figure,
            because later deposits earn for fewer months.
          </p>
        </div>
      </div>
    </section>
  );
}
