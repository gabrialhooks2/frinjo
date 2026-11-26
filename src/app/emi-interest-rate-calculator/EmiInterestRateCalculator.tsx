"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

/** Solve the annual interest rate (%) that produces the given EMI, by bisection on the monthly rate. */
export function solveAnnualRatePct(principal: number, emi: number, months: number): number | null {
  if (principal <= 0 || emi <= 0 || months <= 0) return null;
  if (emi * months <= principal) return 0; // payments never exceed principal → 0% (or worse)
  const emiAt = (monthlyRate: number) => {
    if (monthlyRate === 0) return principal / months;
    const f = Math.pow(1 + monthlyRate, months);
    return (principal * monthlyRate * f) / (f - 1);
  };
  let lo = 0;
  let hi = 0.1; // 10% per month = 120% per year, far above any real loan
  while (emiAt(hi) < emi && hi < 1) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (emiAt(mid) < emi) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 1200;
}

export default function EmiInterestRateCalculator() {
  const [amount, setAmount] = useState("500000");
  const [emiIn, setEmiIn] = useState("11122");
  const [tenure, setTenure] = useState("60");
  const [unit, setUnit] = useState<"months" | "years">("months");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(amount));
    const emi = Math.max(0, num(emiIn));
    const months = Math.max(1, Math.round(num(tenure) * (unit === "years" ? 12 : 1)));
    const ratePct = solveAnnualRatePct(P, emi, months);
    const totalPayment = emi * months;
    return {
      P,
      emi,
      months,
      ratePct,
      totalPayment,
      totalInterest: Math.max(0, totalPayment - P),
      tooLow: emi * months < P,
      zeroRate: emi * months === P,
    };
  }, [amount, emiIn, tenure, unit]);

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
              <label className={labelCls} htmlFor="eirc-amount">Loan amount (₹)</label>
              <input id="eirc-amount" type="number" min="0" step="1000" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="eirc-emi">Monthly EMI you pay (₹)</label>
              <input id="eirc-emi" type="number" min="0" step="10" className={inputCls} value={emiIn} onChange={(e) => setEmiIn(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="eirc-tenure">Tenure ({unit})</label>
              <input id="eirc-tenure" type="number" min="1" step="1" className={inputCls} value={tenure} onChange={(e) => setTenure(e.target.value)} />
              <div className="flex gap-2 mt-3">
                {(["months", "years"] as const).map((u) => (
                  <button key={u} type="button" onClick={() => setUnit(u)}
                    className={`rounded-full px-3 py-1.5 font-bold text-xs transition ${unit === u ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"}`}>
                    {u === "months" ? "Months" : "Years"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          {res.tooLow ? (
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">These numbers cannot repay the loan</p>
              <p className="mt-3 font-display text-3xl sm:text-4xl font-bold text-stone-900">
                {fmt.format(res.emi)} × {res.months} months is less than {fmt.format(res.P)}
              </p>
              <p className="mt-3 text-stone-500 max-w-xl mx-auto">
                The EMIs do not even add up to the amount borrowed, so no interest rate — not even a
                negative one a bank would offer — fits. Check the EMI or the tenure; one of them is
                probably copied wrong.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">The interest rate hidden in your EMI</p>
                <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">
                  {res.ratePct !== null ? `${res.ratePct.toFixed(2)}%` : "—"}
                </p>
                <p className="mt-2 text-stone-500">per year, reducing balance — the rate your EMI implies</p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
                {stat("Total interest", fmt.format(res.totalInterest), true)}
                {stat("Total payment", fmt.format(res.totalPayment))}
                {stat("Monthly rate", res.ratePct !== null ? `${(res.ratePct / 12).toFixed(3)}%` : "—")}
              </div>
              {res.zeroRate && (
                <p className="mt-6 text-center text-sm text-stone-500">
                  Your EMIs add up to exactly the loan amount — a genuinely interest-free loan.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
