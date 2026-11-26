"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

const FREQS = [
  { key: "12", label: "Monthly", perYear: 12 },
  { key: "4", label: "Quarterly", perYear: 4 },
  { key: "2", label: "Half-yearly", perYear: 2 },
  { key: "1", label: "Yearly", perYear: 1 },
] as const;

export default function FdCalculator() {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("1");
  const [months, setMonths] = useState("0");
  const [days, setDays] = useState("0");
  const [freq, setFreq] = useState<string>("4");
  const [payout, setPayout] = useState<"cumulative" | "non-cumulative">("cumulative");

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
    const r = Math.max(0, num(rate)) / 100;
    const totalDays = Math.max(0, Math.round(num(years)) * 365 + Math.round(num(months)) * 30 + Math.round(num(days)));
    const t = totalDays / 365; // tenure in years
    const f = FREQS.find((x) => x.key === freq)?.perYear ?? 4;
    if (payout === "cumulative") {
      const maturity = P * Math.pow(1 + r / f, f * t);
      return { P, maturity, interest: maturity - P, perPayout: 0, f, t, totalDays };
    }
    // Non-cumulative: interest is paid out each compounding period, principal returned at the end.
    const perPayout = (P * r) / f;
    const periods = f * t;
    const interest = perPayout * periods;
    return { P, maturity: P, interest, perPayout, f, t, totalDays };
  }, [principal, rate, years, months, days, freq, payout]);

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
              <label className={labelCls} htmlFor="fd-principal">Deposit amount (₹)</label>
              <input id="fd-principal" type="number" min="0" step="1000" className={inputCls} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="fd-rate">Interest rate (% per year)</label>
              <input id="fd-rate" type="number" min="0" step="0.05" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-3 mt-5">
            <div>
              <label className={labelCls} htmlFor="fd-years">Tenure — years</label>
              <input id="fd-years" type="number" min="0" step="1" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="fd-months">Months</label>
              <input id="fd-months" type="number" min="0" step="1" className={inputCls} value={months} onChange={(e) => setMonths(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="fd-days">Days</label>
              <input id="fd-days" type="number" min="0" step="1" className={inputCls} value={days} onChange={(e) => setDays(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 mt-5">
            <div>
              <span className={labelCls}>Compounding frequency</span>
              <div className="flex flex-wrap gap-2">
                {FREQS.map((x) => (
                  <button key={x.key} type="button" onClick={() => setFreq(x.key)}
                    className={`rounded-full px-4 py-2 font-bold text-sm transition ${freq === x.key ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
                    {x.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={labelCls}>Payout type</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setPayout("cumulative")}
                  className={`rounded-full px-4 py-2 font-bold text-sm transition ${payout === "cumulative" ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
                  Cumulative (reinvested)
                </button>
                <button type="button" onClick={() => setPayout("non-cumulative")}
                  className={`rounded-full px-4 py-2 font-bold text-sm transition ${payout === "non-cumulative" ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
                  Non-cumulative (paid out)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
              {payout === "cumulative" ? "Maturity value" : "You get back at maturity (principal)"}
            </p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.maturity)}</p>
            <p className="mt-2 text-stone-500">
              on {fmt.format(res.P)} over {res.totalDays} days
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Interest earned", fmt.format(res.interest), true)}
            {payout === "non-cumulative"
              ? stat("Interest per payout", fmt2.format(res.perPayout))
              : stat("Effective annual yield", res.P > 0 && res.t > 0 ? `${((Math.pow(res.maturity / res.P, 1 / res.t) - 1) * 100).toFixed(2)}%` : "—")}
            {stat("Total you receive", fmt.format(res.maturity + (payout === "non-cumulative" ? res.interest : 0)))}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            {payout === "cumulative"
              ? "Cumulative FDs reinvest every payout, so interest itself earns interest — the compounding is why the maturity value beats simple interest on the same rate."
              : "Non-cumulative FDs pay the interest out each period and return the principal untouched at the end — the right choice when you need the income, not the growth."}
          </p>
        </div>
      </div>
    </section>
  );
}
