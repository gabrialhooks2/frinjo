"use client";

import { useMemo, useState } from "react";
import {
  FILING_STATUS_LABELS,
  FilingStatus,
  money0,
} from "@/lib/us-tax-2026";
import { computeOvertimeDeduction } from "../no-tax-on-overtime-calculator/NoTaxOvertimeCalculator";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

const TOLERANCE = 5; // dollars of rounding slack before a mismatch counts

export default function W2CodeTtChecker() {
  const [mode, setMode] = useState<"hours" | "total">("hours");
  const [rate, setRate] = useState("30");
  const [hoursPerWeek, setHoursPerWeek] = useState("10");
  const [weeks, setWeeks] = useState("52");
  const [multiplier, setMultiplier] = useState("1.5");
  const [totalPay, setTotalPay] = useState("23400");
  const [ttAmount, setTtAmount] = useState("7800");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [magi, setMagi] = useState("85800");

  const result = useMemo(() => {
    const m = Number(magi);
    const mult = Number(multiplier);
    const tt = Number(ttAmount);
    if (!(m >= 0) || !(mult === 1.5 || mult === 2) || ttAmount.trim() === "" || !(tt >= 0)) return null;
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
    const withExpected = computeOvertimeDeduction(premium, totalOtPay, m, status);
    const withTt = computeOvertimeDeduction(tt, totalOtPay, m, status);
    const diff = premium - tt;
    const verdict: "match" | "low" | "high" =
      Math.abs(diff) <= TOLERANCE ? "match" : diff > 0 ? "low" : "high";
    return {
      premium,
      totalOtPay,
      tt,
      diff,
      verdict,
      deductionExpected: withExpected.deduction,
      deductionTt: withTt.deduction,
      deductionLost: Math.max(0, withExpected.deduction - withTt.deduction),
      taxLost: Math.max(0, withExpected.taxSaved - withTt.taxSaved),
      taxSavedTt: withTt.taxSaved,
      blockedMfs: withTt.blockedMfs,
    };
  }, [mode, rate, hoursPerWeek, weeks, multiplier, totalPay, ttAmount, status, magi]);

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
                  <label className={labelCls} htmlFor="tt-rate">Regular hourly rate ($)</label>
                  <input id="tt-rate" type="number" min="0" step="0.01" className={inputCls} value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="tt-hours">Overtime hours per week</label>
                  <input id="tt-hours" type="number" min="0" step="0.5" className={inputCls} value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="tt-weeks">Weeks worked per year</label>
                  <input id="tt-weeks" type="number" min="1" max="53" className={inputCls} value={weeks} onChange={(e) => setWeeks(e.target.value)} />
                </div>
              </>
            ) : (
              <div>
                <label className={labelCls} htmlFor="tt-total">Total overtime pay for the year ($)</label>
                <input id="tt-total" type="number" min="0" className={inputCls} value={totalPay} onChange={(e) => setTotalPay(e.target.value)} />
              </div>
            )}
            <div>
              <label className={labelCls} htmlFor="tt-mult">Overtime multiplier</label>
              <select id="tt-mult" className={inputCls} value={multiplier} onChange={(e) => setMultiplier(e.target.value)}>
                <option value="1.5">Time and a half (1.5×)</option>
                <option value="2">Double time (2×)</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="tt-amount">Box 12, code TT amount on your W-2 ($)</label>
              <input id="tt-amount" type="number" min="0" step="0.01" className={inputCls} value={ttAmount} onChange={(e) => setTtAmount(e.target.value)} placeholder="e.g. 7800" />
            </div>
            <div>
              <label className={labelCls} htmlFor="tt-status">Filing status</label>
              <select id="tt-status" className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                {(Object.keys(FILING_STATUS_LABELS) as FilingStatus[]).map((s) => (
                  <option key={s} value={s}>{FILING_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="tt-magi">Total income — MAGI ($ / year)</label>
              <input id="tt-magi" type="number" min="0" className={inputCls} value={magi} onChange={(e) => setMagi(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Two jobs with overtime? Add both W-2s&rsquo; code TT amounts together and enter the total —
            the deduction works off the combined figure. Nothing is stored: the check runs in your
            browser.
          </p>
        </div>

        {result ? (
          <div className="mt-10">
            {result.verdict === "match" && (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-8 sm:p-10 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">Verdict</p>
                <p className="mt-3 font-display text-4xl sm:text-5xl font-bold text-green-800">
                  ✓ Code TT matches
                </p>
                <p className="mt-3 text-stone-600 leading-relaxed max-w-2xl mx-auto">
                  Your employer&rsquo;s code TT figure of <strong>{money0(result.tt)}</strong> matches
                  your expected overtime premium of <strong>{money0(result.premium)}</strong> (within
                  a {money0(TOLERANCE)} rounding tolerance). You can deduct{" "}
                  <strong>{money0(result.deductionTt)}</strong> on Schedule 1-A, worth about{" "}
                  <strong>{money0(result.taxSavedTt)}</strong> of federal income tax at your income.
                </p>
              </div>
            )}
            {result.verdict === "low" && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-8 sm:p-10 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">Verdict</p>
                <p className="mt-3 font-display text-4xl sm:text-5xl font-bold text-red-800">
                  ⚠ Code TT is too low
                </p>
                <p className="mt-3 text-stone-700 leading-relaxed max-w-2xl mx-auto">
                  Your expected overtime premium is <strong>{money0(result.premium)}</strong>, but
                  your W-2 reports only <strong>{money0(result.tt)}</strong> with code TT — a
                  shortfall of <strong>{money0(result.diff)}</strong>. From tax year 2026 the
                  deduction is limited to the code TT amount, so as reported you could deduct{" "}
                  <strong>{money0(result.deductionTt)}</strong> instead of{" "}
                  <strong>{money0(result.deductionExpected)}</strong>
                  {result.deductionLost > 0 ? (
                    <>
                      {" "}— losing <strong>{money0(result.deductionLost)}</strong> of deduction and
                      about <strong>{money0(result.taxLost)}</strong> of federal income tax.
                    </>
                  ) : (
                    <> — the cap or phase-out absorbs the difference this year, so it costs you nothing this time, but the figure is still wrong on the form.</>
                  )}{" "}
                  Ask your employer or payroll provider to correct it on <strong>Form W-2c</strong>{" "}
                  before you file.
                </p>
              </div>
            )}
            {result.verdict === "high" && (
              <div className="rounded-3xl border border-sky-200 bg-sky-50 p-8 sm:p-10 text-center shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">Verdict</p>
                <p className="mt-3 font-display text-4xl sm:text-5xl font-bold text-sky-900">
                  Code TT is higher than your estimate
                </p>
                <p className="mt-3 text-stone-700 leading-relaxed max-w-2xl mx-auto">
                  Your W-2 reports <strong>{money0(result.tt)}</strong> with code TT against your
                  estimate of <strong>{money0(result.premium)}</strong>. That is fine — your
                  deduction is based on the reported code TT figure (employers work from actual
                  payroll records, and shift differentials or blended rates can raise the real
                  premium above a simple estimate). After the cap and phase-out you can deduct{" "}
                  <strong>{money0(result.deductionTt)}</strong>, worth about{" "}
                  <strong>{money0(result.taxSavedTt)}</strong>. Keep your pay stubs with your tax
                  records in case the IRS ever asks how the premium was earned.
                </p>
              </div>
            )}
            {result.blockedMfs && (
              <p className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 max-w-2xl mx-auto text-center">
                Note: married filing separately cannot claim the overtime deduction at all, so the
                deduction figures above are $0 for that filing status whatever code TT says.
              </p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Your expected premium</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.premium)}</p>
                <p className="mt-1 text-sm text-stone-500">0.5 × rate × OT hours — the FLSA premium only</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Code TT on your W-2</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.tt)}</p>
                <p className="mt-1 text-sm text-stone-500">The figure your employer reported in Box 12</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Difference</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                  {result.diff > 0 ? "−" : result.diff < 0 ? "+" : ""}{money0(Math.abs(result.diff))}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {result.verdict === "match" ? "Within rounding — nothing to fix" : result.verdict === "low" ? "Missing premium — ask for a W-2c" : "Extra premium reported — keep your records"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter your rate and overtime hours (or your total overtime pay), plus the code TT amount
            printed in Box 12 of your W-2, to see the verdict.
          </p>
        )}
      </div>
    </section>
  );
}
