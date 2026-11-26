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

export default function NoCostEmiCalculator() {
  const [price, setPrice] = useState("60000");
  const [tenure, setTenure] = useState("12");
  const [rate, setRate] = useState("15");
  const [fee, setFee] = useState("199");

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );
  const fmt2 = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    [],
  );

  const res = useMemo(() => {
    const P = Math.max(0, num(price));
    const months = Math.max(1, Math.round(num(tenure)));
    const emi = emiFor(P, num(rate), months);
    const interest = Math.max(0, emi * months - P); // charged by the bank, offset by the merchant's discount
    const gstOnInterest = interest * 0.18; // never discounted — the buyer's real cost
    const processingFee = Math.max(0, num(fee));
    const extraCost = gstOnInterest + processingFee;
    return {
      P,
      months,
      emi,
      interest,
      gstOnInterest,
      processingFee,
      extraCost,
      effectiveTotal: P + extraCost,
    };
  }, [price, tenure, rate, fee]);

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
              <label className={labelCls} htmlFor="nce-price">Product price (₹)</label>
              <input id="nce-price" type="number" min="0" step="500" className={inputCls} value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="nce-tenure">Tenure (months)</label>
              <input id="nce-tenure" type="number" min="1" step="1" className={inputCls} value={tenure} onChange={(e) => setTenure(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="nce-rate">Interest rate the bank charges (% per year)</label>
              <input id="nce-rate" type="number" min="0" step="0.25" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                Printed in the offer&apos;s fine print — typically 14–18% even when the banner says 0%.
              </p>
            </div>
            <div>
              <label className={labelCls} htmlFor="nce-fee">Processing fee (₹)</label>
              <input id="nce-fee" type="number" min="0" step="1" className={inputCls} value={fee} onChange={(e) => setFee(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Commonly ₹99–₹299 per transaction, plus GST on the fee at billing.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">The hidden cost of “no-cost”</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.extraCost)}</p>
            <p className="mt-2 text-stone-500 max-w-xl mx-auto">
              on top of the {fmt.format(res.P)} sticker price — your effective total is{" "}
              {fmt.format(res.effectiveTotal)}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Interest the bank charges", fmt.format(res.interest))}
            {stat("GST on that interest (18%)", fmt.format(res.gstOnInterest), true)}
            {stat("Processing fee", fmt.format(res.processingFee))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
            {stat("Your monthly EMI", fmt2.format(res.emi))}
            {stat("Effective total you pay", fmt.format(res.effectiveTotal), true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            The interest itself is neutralised by the merchant&apos;s upfront discount — that part of
            “no-cost” is real. What is never discounted is the 18% GST on the interest, and the
            processing fee. If a cash discount bigger than {fmt.format(res.extraCost)} is available
            for paying upfront, paying upfront wins.
          </p>
        </div>
      </div>
    </section>
  );
}
