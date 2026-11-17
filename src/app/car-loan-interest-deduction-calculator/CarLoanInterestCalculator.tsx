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

export interface EligibilityItem {
  key: string;
  label: string;
  reason: string;
}

export const ELIGIBILITY_ITEMS: EligibilityItem[] = [
  {
    key: "isNew",
    label: "Bought new (not used, not a lease)",
    reason: "The vehicle must be bought new — used vehicles and leases never qualify.",
  },
  {
    key: "usAssembly",
    label: "Final assembly in the United States",
    reason: "Final assembly must be in the United States — vehicles assembled in Mexico, Canada or overseas do not qualify, even from a US brand.",
  },
  {
    key: "loanDate",
    label: "Loan taken out after Dec 31, 2024",
    reason: "The loan must have originated after December 31, 2024 — older loans on the same car do not count.",
  },
  {
    key: "secured",
    label: "Loan secured by the vehicle",
    reason: "The loan must be secured by the vehicle itself — an unsecured personal loan used to buy a car does not qualify.",
  },
  {
    key: "personalUse",
    label: "Vehicle mainly for personal use",
    reason: "The vehicle must be for personal use — vehicles bought for a business follow different rules.",
  },
  {
    key: "weight",
    label: "Under 14,000 lbs GVWR",
    reason: "The vehicle must have a gross vehicle weight rating under 14,000 lbs — heavy commercial trucks are out.",
  },
];

export interface CarLoanResult {
  eligible: boolean;
  failedReasons: string[];
  capped: number;
  phaseOut: number;
  deduction: number;
  taxSaved: number;
}

export function computeCarLoanDeduction(
  interest: number,
  magi: number,
  status: FilingStatus,
  checks: Record<string, boolean>
): CarLoanResult {
  const failedReasons = ELIGIBILITY_ITEMS.filter((i) => !checks[i.key]).map((i) => i.reason);
  const eligible = failedReasons.length === 0;
  const capped = Math.min(interest, 10000);
  const threshold = status === "mfj" ? 200000 : 100000;
  const phaseOut = 200 * Math.ceil(Math.max(0, magi - threshold) / 1000);
  const deduction = eligible ? Math.max(0, capped - phaseOut) : 0;
  return {
    eligible,
    failedReasons,
    capped,
    phaseOut,
    deduction,
    taxSaved: taxSavedByDeduction(magi, deduction, status),
  };
}

export default function CarLoanInterestCalculator() {
  const [interest, setInterest] = useState("4200");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [magi, setMagi] = useState("85000");
  const [checks, setChecks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ELIGIBILITY_ITEMS.map((i) => [i.key, true]))
  );

  const result = useMemo(() => {
    const t = Number(interest);
    const m = Number(magi);
    if (!(t > 0) || !(m >= 0)) return null;
    return computeCarLoanDeduction(t, m, status, checks);
  }, [interest, status, magi, checks]);

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="car-interest">Interest paid this year ($)</label>
              <input id="car-interest" type="number" min="0" className={inputCls} value={interest} onChange={(e) => setInterest(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="car-status">Filing status</label>
              <select id="car-status" className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                {(Object.keys(FILING_STATUS_LABELS) as FilingStatus[]).map((s) => (
                  <option key={s} value={s}>{FILING_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="car-magi">Total income — MAGI ($ / year)</label>
              <input id="car-magi" type="number" min="0" className={inputCls} value={magi} onChange={(e) => setMagi(e.target.value)} />
            </div>
          </div>

          <p className="mt-8 mb-3 text-sm font-bold text-stone-800">
            Eligibility checklist — every answer must be Yes
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {ELIGIBILITY_ITEMS.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white px-4 py-3">
                <span className="text-sm font-semibold text-stone-800">{item.label}</span>
                <select
                  aria-label={item.label}
                  className="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm font-bold text-stone-900 focus:border-orange-500 focus:outline-none"
                  value={checks[item.key] ? "yes" : "no"}
                  onChange={(e) => setChecks((c) => ({ ...c, [item.key]: e.target.value === "yes" }))}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone-400">
            The interest figure is on your lender&apos;s year-end statement — for 2026 onwards, lenders
            send Form 1098-VLI and Box 1 is the number. Your answers update as you change them and
            nothing is stored: the calculation runs in your browser.
          </p>
        </div>

        {result ? (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                Your car loan interest deduction — Schedule 1-A
              </p>
              <p className="mt-3 font-display text-7xl sm:text-8xl font-bold text-stone-900">
                {money0(result.deduction)}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-green-600">
                ≈ {money0(result.taxSaved)} of federal income tax saved
              </p>
              {!result.eligible && (
                <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 max-w-xl mx-auto text-left">
                  <p className="font-bold mb-1">This loan does not qualify:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.failedReasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">After the $10,000 cap</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.capped)}</p>
                <p className="mt-1 text-sm text-stone-500">One cap per return, even with two cars</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Phase-out reduction</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">−{money0(result.phaseOut)}</p>
                <p className="mt-1 text-sm text-stone-500">
                  $200 per $1,000 (or part of $1,000) of MAGI over {status === "mfj" ? "$200,000" : "$100,000"}
                </p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Tax years covered</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">2025–2028</p>
                <p className="mt-1 text-sm text-stone-500">Interest paid after 2028 does not count</p>
              </div>
            </div>

            <p className="mt-6 text-stone-600 leading-relaxed max-w-2xl mx-auto text-center">
              Tax saved is worked out with the real 2026 federal brackets and standard deduction for
              your filing status. Remember: the vehicle&apos;s VIN must be on your return or the
              deduction is disallowed outright. Estimate only; credits, other deductions and state
              tax are not included.
            </p>
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter the interest you paid this year and your total income to see your deduction.
          </p>
        )}
      </div>
    </section>
  );
}
