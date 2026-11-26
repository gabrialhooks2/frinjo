"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const num = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(v) ? v : 0;
};

export function monthlyEmi(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 1200;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}

export default function PmVidyalaxmiLoanCalculator() {
  const [loan, setLoan] = useState("750000");
  const [rate, setRate] = useState("10.5");
  const [repayYears, setRepayYears] = useState("7");
  const [moratorium, setMoratorium] = useState("4");
  const [eligible, setEligible] = useState(true);

  const fmt = useMemo(
    () => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
    [],
  );

  const res = useMemo(() => {
    const L = Math.max(0, num(loan));
    const months = Math.max(0, Math.round(num(repayYears) * 12));
    const emi = monthlyEmi(L, Math.max(0, num(rate)), months);
    const totalRepay = emi * months;
    // PM-Vidyalaxmi: 3% interest subvention during the moratorium (course period + 1 year)
    // for students with annual family income up to ₹8 lakh, on loans up to ₹10 lakh.
    // Estimated on the sanctioned amount as a simple-interest approximation.
    const subventionBase = Math.min(L, 1000000);
    const benefit = eligible ? subventionBase * 0.03 * Math.max(0, num(moratorium)) : 0;
    return {
      emi,
      totalRepay,
      interest: Math.max(0, totalRepay - L),
      benefit,
      withinGuarantee: L <= 750000,
    };
  }, [loan, rate, repayYears, moratorium, eligible]);

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
              <label className={labelCls} htmlFor="vl-loan">Education loan amount (₹)</label>
              <input id="vl-loan" type="number" min="0" step="10000" className={inputCls} value={loan} onChange={(e) => setLoan(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">
                {res.withinGuarantee
                  ? "Within ₹7,50,000 — collateral-free and guarantor-free under the scheme, with a 75% government credit guarantee to the bank."
                  : "Above ₹7,50,000 — the bank may ask for collateral or a guarantor under its normal policy."}
              </p>
            </div>
            <div>
              <label className={labelCls} htmlFor="vl-rate">Interest rate (% per year)</label>
              <input id="vl-rate" type="number" min="0" step="0.1" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Education-loan rates at major banks currently sit around 9–12%.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="vl-repay">Repayment period after the course (years)</label>
              <input id="vl-repay" type="number" min="0" step="1" className={inputCls} value={repayYears} onChange={(e) => setRepayYears(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">EMIs start after the moratorium — course period plus up to 1 year.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="vl-mora">Moratorium length (years)</label>
              <input id="vl-mora" type="number" min="0" step="0.5" className={inputCls} value={moratorium} onChange={(e) => setMoratorium(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">Course duration plus the grace year — the window the subvention covers.</p>
            </div>
          </div>
          <label className="mt-6 flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={eligible}
              onChange={(e) => setEligible(e.target.checked)}
              className="mt-1 h-4 w-4 accent-orange-600"
            />
            <span className="text-sm text-stone-700">
              <strong>Family income up to ₹8,00,000 a year</strong> — eligible for the 3% interest
              subvention during the moratorium under PM-Vidyalaxmi.
            </span>
          </label>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Monthly EMI after the course</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.emi)}</p>
            <p className="mt-2 text-stone-500">over {Math.round(num(repayYears) * 12)} months, once the moratorium ends</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Total repayment", fmt.format(res.totalRepay))}
            {stat("Total interest", fmt.format(res.interest))}
            {stat("Subvention benefit (estimate)", eligible ? fmt.format(res.benefit) : "Not eligible", true)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            The subvention estimate applies 3% a year to the sanctioned amount (capped at ₹10 lakh)
            across the moratorium. Because fees are usually disbursed semester by semester, the
            credited benefit on your actual disbursed balance can be lower — treat this as the
            upper, fully-disbursed figure. Interest also accrues during the moratorium itself unless
            you choose to service it.
          </p>
        </div>
      </div>
    </section>
  );
}
