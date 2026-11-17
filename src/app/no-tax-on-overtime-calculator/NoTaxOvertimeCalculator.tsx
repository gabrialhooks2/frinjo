"use client";

import { useMemo, useState } from "react";
import {
  FILING_STATUS_LABELS,
  FilingStatus,
  money0,
  taxSavedByDeduction,
} from "@/lib/us-tax-2026";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

export interface OvertimeResult {
  totalOtPay: number;
  premium: number;
  cap: number;
  capped: number;
  phaseOut: number;
  deduction: number;
  taxSaved: number;
  ficaOnOt: number;
  blockedMfs: boolean;
}

export function computeOvertimeDeduction(
  premium: number,
  totalOtPay: number,
  magi: number,
  status: FilingStatus
): OvertimeResult {
  const cap = status === "mfj" ? 25000 : 12500;
  const capped = Math.min(premium, cap);
  const threshold = status === "mfj" ? 300000 : 150000;
  const phaseOut = 100 * Math.floor(Math.max(0, magi - threshold) / 1000);
  const blockedMfs = status === "mfs";
  const deduction = blockedMfs ? 0 : Math.max(0, capped - phaseOut);
  return {
    totalOtPay,
    premium,
    cap,
    capped,
    phaseOut,
    deduction,
    taxSaved: taxSavedByDeduction(magi, deduction, status),
    ficaOnOt: totalOtPay * 0.0765,
    blockedMfs,
  };
}

export default function NoTaxOvertimeCalculator() {
  const [mode, setMode] = useState<"hours" | "total">("hours");
  const [rate, setRate] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("10");
  const [weeks, setWeeks] = useState("52");
  const [multiplier, setMultiplier] = useState("1.5");
  const [totalPay, setTotalPay] = useState("23400");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [magi, setMagi] = useState("85800");

  const result = useMemo(() => {
    const m = Number(magi);
    const mult = Number(multiplier);
    if (!(m >= 0) || !(mult === 1.5 || mult === 2)) return null;
    let premium: number;
    let totalOtPay: number;
    if (mode === "hours") {
      const r = Number(rate);
      const h = Number(hoursPerWeek);
      const w = Number(weeks);
      if (!(r > 0) || !(h > 0) || !(w > 0) || !(w <= 53)) return null;
      totalOtPay = r * mult * h * w;
      premium = r * 0.5 * h * w;
    } else {
      const t = Number(totalPay);
      if (!(t > 0)) return null;
      totalOtPay = t;
      premium = mult === 1.5 ? t / 3 : t / 4;
    }
    return computeOvertimeDeduction(premium, totalOtPay, m, status);
  }, [mode, rate, hoursPerWeek, weeks, multiplier, totalPay, status, magi]);

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              type="button"
              onClick={() => setMode("hours")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                mode === "hours"
                  ? "bg-orange-600 text-white"
                  : "bg-white border border-stone-300 text-stone-700 hover:border-orange-300"
              }`}
            >
              I know my rate &amp; hours
            </button>
            <button
              type="button"
              onClick={() => setMode("total")}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                mode === "total"
                  ? "bg-orange-600 text-white"
                  : "bg-white border border-stone-300 text-stone-700 hover:border-orange-300"
              }`}
            >
              I know my total overtime pay
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mode === "hours" ? (
              <>
                <div>
                  <label className={labelCls} htmlFor="ot-rate">Regular hourly rate ($)</label>
                  <input id="ot-rate" type="number" min="0" step="0.01" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ot-hours">Overtime hours per week</label>
                  <input id="ot-hours" type="number" min="0" step="0.5" className={inputCls} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="ot-weeks">Weeks worked per year</label>
                  <input id="ot-weeks" type="number" min="1" max="53" className={inputCls} value={weeks} onChange={(e) => setWeeks(e.target.value)} />
                </div>
              </>
            ) : (
              <div>
                <label className={labelCls} htmlFor="ot-total">Total overtime pay for the year ($)</label>
                <input id="ot-total" type="number" min="0" className={inputCls} value={totalPay} onChange={(e) => setTotalPay(e.target.value)} />
              </div>
            )}
            <div>
              <label className={labelCls} htmlFor="ot-mult">Overtime multiplier</label>
              <select id="ot-mult" className={inputCls} value={multiplier} onChange={(e) => setMultiplier(e.target.value)}>
                <option value="1.5">Time and a half (1.5×)</option>
                <option value="2">Double time (2×)</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="ot-status">Filing status</label>
              <select id="ot-status" className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                {(Object.keys(FILING_STATUS_LABELS) as FilingStatus[]).map((s) => (
                  <option key={s} value={s}>{FILING_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="ot-magi">Total income — MAGI ($ / year)</label>
              <input id="ot-magi" type="number" min="0" className={inputCls} value={magi} onChange={(e) => setMagi(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            MAGI is your total income including the overtime itself — roughly your AGI. It drives the
            phase-out. Your numbers update as you type and nothing is stored: the calculation runs in
            your browser.
          </p>
        </div>

        {result ? (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                Your overtime deduction — Schedule 1-A
              </p>
              <p className="mt-3 font-display text-7xl sm:text-8xl font-bold text-stone-900">
                {money0(result.deduction)}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-green-600">
                ≈ {money0(result.taxSaved)} of federal income tax saved
              </p>
              {result.blockedMfs && (
                <p className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 max-w-xl mx-auto">
                  Married filing separately cannot claim this deduction at all — the statute sets it
                  to $0 for that filing status, however much overtime you worked.
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Qualified overtime premium</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.premium)}</p>
                <p className="mt-1 text-sm text-stone-500">
                  Only the extra &ldquo;half&rdquo; — out of {money0(result.totalOtPay)} total overtime pay
                </p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">After the cap</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.capped)}</p>
                <p className="mt-1 text-sm text-stone-500">
                  Cap is {money0(result.cap)} for your filing status
                </p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Phase-out reduction</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">−{money0(result.phaseOut)}</p>
                <p className="mt-1 text-sm text-stone-500">
                  $100 per full $1,000 of MAGI over {status === "mfj" ? "$300,000" : "$150,000"}
                </p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Payroll tax still owed</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">≈ {money0(result.ficaOnOt)}</p>
                <p className="mt-1 text-sm text-stone-500">
                  Social Security + Medicare (7.65%) on your overtime pay — the deduction does not touch FICA
                </p>
              </div>
            </div>

            <p className="mt-6 text-stone-600 leading-relaxed max-w-2xl mx-auto text-center">
              Tax saved is worked out with the real 2026 federal brackets and standard deduction for
              your filing status: your tax on {money0(Number(magi) || 0)} of income, minus your tax
              after the {money0(result.deduction)} deduction. It is an estimate — credits, other
              deductions and state tax are not included.
            </p>
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter a pay rate above zero, your overtime hours and weeks, and your total income to see
            your deduction.
          </p>
        )}
      </div>
    </section>
  );
}
