"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

type Mode = "flat" | "percent";

export default function BankAqbCalculator() {
  const [required, setRequired] = useState("10000");
  const [actual, setActual] = useState("6000");
  const [mode, setMode] = useState<Mode>("flat");
  const [flatCharge, setFlatCharge] = useState("500");
  const [pct, setPct] = useState("5");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const req = Math.max(0, num(required));
    const act = Math.max(0, num(actual));
    const shortfall = Math.max(0, req - act);
    const base =
      shortfall === 0
        ? 0
        : mode === "flat"
          ? Math.max(0, num(flatCharge))
          : (shortfall * Math.min(100, Math.max(0, num(pct)))) / 100;
    const gst = base * 0.18; // banks levy 18% GST on service charges
    return { shortfall, base, gst, total: base + gst, met: shortfall === 0 };
  }, [required, actual, mode, flatCharge, pct]);

  const stat = (label: string, value: string, highlight = false) => (
    <div className={`rounded-2xl ${highlight ? "bg-orange-50 border-orange-100" : "bg-stone-50 border-stone-100"} border p-5 text-center`}>
      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${highlight ? "text-orange-700" : "text-stone-500"}`}>{label}</p>
      <p className="mt-2 font-display text-xl font-bold text-stone-900">{value}</p>
    </div>
  );

  const modeBtn = (m: Mode, label: string) => (
    <button
      type="button"
      onClick={() => setMode(m)}
      className={`rounded-full px-4 py-2 text-sm font-bold border transition ${mode === m ? "bg-orange-600 text-white border-orange-600" : "bg-white text-stone-600 border-stone-300 hover:border-orange-400"}`}
    >
      {label}
    </button>
  );

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="aqb-required">Required AQB / MAB for your account (₹)</label>
              <input id="aqb-required" type="number" min="0" step="500" className={inputCls} value={required} onChange={(e) => setRequired(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">From your account&apos;s schedule of charges — ₹5,000 to ₹25,000 is typical for savings accounts.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="aqb-actual">Your actual average balance this quarter (₹)</label>
              <input id="aqb-actual" type="number" min="0" step="500" className={inputCls} value={actual} onChange={(e) => setActual(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                AQB = sum of each day&apos;s closing balance ÷ days in the quarter. Your bank app usually shows it.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <span className={labelCls}>How does your bank charge for a shortfall?</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {modeBtn("flat", "Flat charge")}
              {modeBtn("percent", "% of shortfall")}
            </div>
            <div className="mt-4 max-w-xs">
              {mode === "flat" ? (
                <>
                  <label className={labelCls} htmlFor="aqb-flat">Flat charge per quarter (₹)</label>
                  <input id="aqb-flat" type="number" min="0" step="50" className={inputCls} value={flatCharge} onChange={(e) => setFlatCharge(e.target.value)} />
                </>
              ) : (
                <>
                  <label className={labelCls} htmlFor="aqb-pct">Charge as % of the shortfall</label>
                  <input id="aqb-pct" type="number" min="0" step="0.5" className={inputCls} value={pct} onChange={(e) => setPct(e.target.value)} />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          {res.met ? (
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">Requirement met</p>
              <p className="mt-3 font-display text-5xl sm:text-6xl font-bold text-stone-900">No charge</p>
              <p className="mt-2 text-stone-500">Your average balance covers the required AQB — nothing is due this quarter.</p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Estimated charge this quarter</p>
                <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.total)}</p>
                <p className="mt-2 text-stone-500">including 18% GST, which banks add to service charges</p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
                {stat("Balance shortfall", fmt.format(res.shortfall), true)}
                {stat("Bank charge", fmt.format(res.base))}
                {stat("GST at 18%", fmt.format(res.gst))}
              </div>
            </>
          )}
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            The cheapest fix is timing, not money: AQB counts every day equally, so parking funds for
            the last few days of a quarter barely moves the average. Keeping the balance steady all
            quarter — or shifting to a zero-balance account if the balance is hard to hold — beats
            paying this charge four times a year.
          </p>
        </div>
      </div>
    </section>
  );
}
