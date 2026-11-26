"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

type Mode = "village" | "bank";

export default function ByajCalculator() {
  const [mode, setMode] = useState<Mode>("village");
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("2");
  const [years, setYears] = useState("1");
  const [months, setMonths] = useState("0");

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
    const r = Math.max(0, num(rate));
    const totalMonths = Math.max(0, Math.round(num(years)) * 12 + Math.round(num(months)));
    // Village: rate is % per month. Bank: rate is % per year.
    const interest = mode === "village" ? (P * r * totalMonths) / 100 : (P * r * totalMonths) / 1200;
    const annualRate = mode === "village" ? r * 12 : r;
    return {
      P,
      totalMonths,
      interest,
      total: P + interest,
      annualRate,
      perMonth: totalMonths > 0 ? interest / totalMonths : 0,
    };
  }, [mode, principal, rate, years, months]);

  const stat = (label: string, value: string, highlight = false) => (
    <div className={`rounded-2xl ${highlight ? "bg-orange-50 border-orange-100" : "bg-stone-50 border-stone-100"} border p-5 text-center`}>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${highlight ? "text-orange-700" : "text-stone-500"}`}>{label}</p>
      <p className="mt-2 font-display text-xl font-bold text-stone-900">{value}</p>
    </div>
  );

  const switchMode = (m: Mode) => {
    setMode(m);
    // Sensible defaults per mode: 2% per month in a village ≈ 24% a year at a bank.
    setRate(m === "village" ? "2" : "12");
  };

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <span className={labelCls}>How is the rate quoted?</span>
          <div className="flex flex-wrap gap-2 mb-6">
            <button type="button" onClick={() => switchMode("village")}
              className={`rounded-full px-4 py-2 font-bold text-sm transition ${mode === "village" ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
              Village — % per month (sekda)
            </button>
            <button type="button" onClick={() => switchMode("bank")}
              className={`rounded-full px-4 py-2 font-bold text-sm transition ${mode === "bank" ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
              Bank — % per year
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="byaj-principal">Principal amount (₹)</label>
              <input id="byaj-principal" type="number" min="0" step="1000" className={inputCls} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="byaj-rate">
                {mode === "village" ? "Interest rate — ₹ per ₹100 per month (sekda %)" : "Interest rate (% per year)"}
              </label>
              <input id="byaj-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                {mode === "village"
                  ? "“2 rupaye sekda” means ₹2 every month on every ₹100 — that is 2% per month, or 24% per year."
                  : "Bank and NBFC loans quote a yearly rate. 12% a year is 1% a month."}
              </p>
            </div>
            <div>
              <label className={labelCls} htmlFor="byaj-years">Time — years</label>
              <input id="byaj-years" type="number" min="0" step="1" className={inputCls} value={years} onChange={(e) => setYears(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="byaj-months">Time — extra months</label>
              <input id="byaj-months" type="number" min="0" max="11" step="1" className={inputCls} value={months} onChange={(e) => setMonths(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Total amount to repay / receive</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.total)}</p>
            <p className="mt-2 text-stone-500">
              on {fmt.format(res.P)} over {res.totalMonths} month{res.totalMonths === 1 ? "" : "s"}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Interest (byaj)", fmt.format(res.interest), true)}
            {stat("Interest per month", fmt2.format(res.perMonth))}
            {stat("Same rate, per year", `${res.annualRate.toFixed(2)}%`)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            {mode === "village"
              ? `A village rate of ${num(rate).toFixed(2)}% per month is the same as ${res.annualRate.toFixed(1)}% per year — always convert before comparing with a bank offer.`
              : "Simple interest: the interest is charged only on the original principal, never on interest already earned."}
          </p>
        </div>
      </div>
    </section>
  );
}
