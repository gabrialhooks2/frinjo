"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

function emiFor(P: number, annualPct: number, months: number): number {
  const r = annualPct / 1200;
  if (r === 0) return P / months;
  const f = Math.pow(1 + r, months);
  return (P * r * f) / (f - 1);
}

/** APR: the annual rate that makes the EMI stream worth exactly the net cash received. */
function solveApr(P: number, emi: number, months: number, netReceived: number): number {
  if (netReceived <= 0 || emi <= 0) return 0;
  const pv = (mr: number) => (mr === 0 ? emi * months : emi * ((1 - Math.pow(1 + mr, -months)) / mr));
  let lo = 0;
  let hi = 0.1;
  while (pv(hi) > netReceived && hi < 1) hi *= 2;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (pv(mid) > netReceived) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 1200;
}

export default function LoanAprCalculator() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("12");
  const [tenure, setTenure] = useState("60");
  const [feeFlat, setFeeFlat] = useState("0");
  const [feePct, setFeePct] = useState("1");
  const [other, setOther] = useState("0");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );
  const fmt2 = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(amount));
    const months = Math.max(1, Math.round(num(tenure)));
    const emi = emiFor(P, num(rate), months);
    const fees = Math.max(0, num(feeFlat)) + (P * Math.max(0, num(feePct))) / 100 + Math.max(0, num(other));
    const netReceived = P - fees;
    const apr = solveApr(P, emi, months, netReceived);
    const totalPaid = emi * months;
    return {
      P,
      months,
      emi,
      fees,
      netReceived,
      apr,
      totalInterest: Math.max(0, totalPaid - P),
      totalCost: Math.max(0, totalPaid - netReceived),
    };
  }, [amount, rate, tenure, feeFlat, feePct, other]);

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
              <label className={labelCls} htmlFor="apr-amount">Loan amount (₹)</label>
              <input id="apr-amount" type="number" min="0" step="1000" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="apr-rate">Quoted rate (% per year)</label>
              <input id="apr-rate" type="number" min="0" step="0.05" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="apr-tenure">Tenure (months)</label>
              <input id="apr-tenure" type="number" min="1" step="1" className={inputCls} value={tenure} onChange={(e) => setTenure(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="apr-feepct">Processing fee (% of loan)</label>
              <input id="apr-feepct" type="number" min="0" step="0.1" className={inputCls} value={feePct} onChange={(e) => setFeePct(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="apr-feeflat">Processing fee (₹, if flat)</label>
              <input id="apr-feeflat" type="number" min="0" step="100" className={inputCls} value={feeFlat} onChange={(e) => setFeeFlat(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="apr-other">Other charges (₹ — file, stamp, etc.)</label>
              <input id="apr-other" type="number" min="0" step="100" className={inputCls} value={other} onChange={(e) => setOther(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Enter the fee in whichever form the lender quotes it — percentage, flat, or split across
            both boxes. Leave a box at zero if it does not apply.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">True APR (fees counted)</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{res.apr.toFixed(2)}%</p>
            <p className="mt-2 text-stone-500">
              against a quoted rate of {num(rate).toFixed(2)}% — the fees add {(res.apr - num(rate)).toFixed(2)} points
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Monthly EMI", fmt2.format(res.emi))}
            {stat("Total fees & charges", fmt.format(res.fees), true)}
            {stat("Cash you actually receive", fmt.format(res.netReceived))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {stat("Total interest", fmt.format(res.totalInterest))}
            {stat("Total cost of the loan", fmt.format(res.totalCost), true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            The APR is the rate that makes your EMI stream worth exactly the cash that reached your
            account. Two offers with the same quoted rate but different fees have different APRs —
            and the APR is the only rate that ranks them honestly.
          </p>
        </div>
      </div>
    </section>
  );
}
