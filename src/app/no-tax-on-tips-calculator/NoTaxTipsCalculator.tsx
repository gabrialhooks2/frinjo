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

export interface TipsResult {
  tips: number;
  capped: number;
  phaseOut: number;
  deduction: number;
  taxSaved: number;
  blockedMfs: boolean;
}

export function computeTipsDeduction(
  tips: number,
  magi: number,
  status: FilingStatus
): TipsResult {
  const capped = Math.min(tips, 25000);
  const threshold = status === "mfj" ? 300000 : 150000;
  const phaseOut = 100 * Math.floor(Math.max(0, magi - threshold) / 1000);
  const blockedMfs = status === "mfs";
  const deduction = blockedMfs ? 0 : Math.max(0, capped - phaseOut);
  return {
    tips,
    capped,
    phaseOut,
    deduction,
    taxSaved: taxSavedByDeduction(magi, deduction, status),
    blockedMfs,
  };
}

export default function NoTaxTipsCalculator() {
  const [tips, setTips] = useState("18000");
  const [status, setStatus] = useState<FilingStatus>("single");
  const [magi, setMagi] = useState("42000");

  const result = useMemo(() => {
    const t = Number(tips);
    const m = Number(magi);
    if (!(t > 0) || !(m >= 0)) return null;
    return computeTipsDeduction(t, m, status);
  }, [tips, status, magi]);

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="tips-total">Reported tips for the year ($)</label>
              <input id="tips-total" type="number" min="0" className={inputCls} value={tips} onChange={(e) => setTips(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="tips-status">Filing status</label>
              <select id="tips-status" className={inputCls} value={status} onChange={(e) => setStatus(e.target.value as FilingStatus)}>
                {(Object.keys(FILING_STATUS_LABELS) as FilingStatus[]).map((s) => (
                  <option key={s} value={s}>{FILING_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="tips-magi">Total income — MAGI ($ / year)</label>
              <input id="tips-magi" type="number" min="0" className={inputCls} value={magi} onChange={(e) => setMagi(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Use the tips total from your W-2 (or 1099) — only reported tips count. MAGI is your total
            income including wages and the tips themselves; it drives the phase-out. Your numbers
            update as you type and nothing is stored: the calculation runs in your browser.
          </p>
        </div>

        {result ? (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                Your tips deduction — Schedule 1-A
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
                  to $0 for that filing status, however much you earned in tips.
                </p>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Reported tips</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.tips)}</p>
                <p className="mt-1 text-sm text-stone-500">Cash and card tips you reported</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">After the $25,000 cap</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money0(result.capped)}</p>
                <p className="mt-1 text-sm text-stone-500">One cap per return, not per job</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Phase-out reduction</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">−{money0(result.phaseOut)}</p>
                <p className="mt-1 text-sm text-stone-500">
                  $100 per full $1,000 of MAGI over {status === "mfj" ? "$300,000" : "$150,000"}
                </p>
              </div>
            </div>

            <p className="mt-6 text-stone-600 leading-relaxed max-w-2xl mx-auto text-center">
              Tax saved is worked out with the real 2026 federal brackets and standard deduction for
              your filing status: your tax on {money0(Number(magi) || 0)} of income, minus your tax
              after the {money0(result.deduction)} deduction. Social Security and Medicare tax on
              tips is unchanged — this deduction is federal income tax only. Estimate only; credits,
              other deductions and state tax are not included.
            </p>
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter your reported tips for the year and your total income to see your deduction.
          </p>
        )}
      </div>
    </section>
  );
}
