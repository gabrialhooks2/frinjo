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

/** Simulate the loan; if prepay > 0, apply it right after the `afterEmi`-th EMI and keep the EMI unchanged. */
function simulate(P: number, annualPct: number, months: number, prepay: number, afterEmi: number) {
  const r = annualPct / 1200;
  const emi = emiFor(P, annualPct, months);
  let bal = P;
  let totalInterest = 0;
  let m = 0;
  let closedEarly = false;
  while (bal > 0.005 && m < months + 600) {
    m += 1;
    const interest = bal * r;
    totalInterest += interest;
    let principalPaid = emi - interest;
    if (principalPaid > bal) principalPaid = bal;
    bal -= principalPaid;
    if (prepay > 0 && m === afterEmi && bal > 0) {
      const applied = Math.min(prepay, bal);
      bal -= applied;
      if (bal <= 0.005) closedEarly = true;
    }
    if (bal <= 0.005) {
      bal = 0;
      break;
    }
  }
  return { emi, totalInterest, monthsTaken: m, closedEarly };
}

export default function LoanPrepaymentCalculator() {
  const [amount, setAmount] = useState("500000");
  const [rate, setRate] = useState("12");
  const [tenure, setTenure] = useState("60");
  const [prepay, setPrepay] = useState("100000");
  const [afterEmis, setAfterEmis] = useState("12");

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
    const base = simulate(P, num(rate), months, 0, 0);
    const withPre = simulate(P, num(rate), months, Math.max(0, num(prepay)), Math.max(1, Math.round(num(afterEmis))));
    return {
      base,
      withPre,
      saved: Math.max(0, base.totalInterest - withPre.totalInterest),
      monthsSaved: Math.max(0, base.monthsTaken - withPre.monthsTaken),
    };
  }, [amount, rate, tenure, prepay, afterEmis]);

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
              <label className={labelCls} htmlFor="pp-amount">Loan amount (₹)</label>
              <input id="pp-amount" type="number" min="0" step="1000" className={inputCls} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="pp-rate">Interest rate (% per year)</label>
              <input id="pp-rate" type="number" min="0" step="0.05" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="pp-tenure">Original tenure (months)</label>
              <input id="pp-tenure" type="number" min="1" step="1" className={inputCls} value={tenure} onChange={(e) => setTenure(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="pp-prepay">Prepayment amount (₹)</label>
              <input id="pp-prepay" type="number" min="0" step="1000" className={inputCls} value={prepay} onChange={(e) => setPrepay(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="pp-after">Prepay after how many EMIs?</label>
              <input id="pp-after" type="number" min="1" step="1" className={inputCls} value={afterEmis} onChange={(e) => setAfterEmis(e.target.value)} />
            </div>
            <div className="flex items-end">
              <p className="text-sm text-stone-500 pb-3">
                EMI stays at <strong className="text-stone-900">{fmt2.format(res.base.emi)}</strong> — the
                prepayment shortens the loan instead.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Interest you save</p>
            <p className="mt-3 font-display text-6xl sm:text-7xl font-bold text-stone-900">{fmt.format(res.saved)}</p>
            <p className="mt-2 text-stone-500">
              and the loan ends {res.monthsSaved} month{res.monthsSaved === 1 ? "" : "s"} earlier — in month{" "}
              {res.withPre.monthsTaken} instead of {res.base.monthsTaken}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {stat("Interest without prepayment", fmt.format(res.base.totalInterest))}
            {stat("Interest with prepayment", fmt.format(res.withPre.totalInterest), true)}
            {stat("New tenure", `${res.withPre.monthsTaken} months`)}
          </div>
          <p className="mt-6 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            Every rupee prepaid stops paying interest from that month onward — which is why the same
            lump sum saves far more in year one than in year four. Check your loan agreement for
            prepayment charges first: floating-rate home loans carry none by RBI rule, but fixed-rate
            and personal loans may charge 2–5%.
          </p>
        </div>
      </div>
    </section>
  );
}
