"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

export interface CoastRow {
  age: number;
  portfolio: number;
  coastTarget: number;
}

export interface CoastFireResult {
  years: number;
  fireNumber: number;
  coastNumber: number;
  progressPct: number;
  alreadyCoasting: boolean;
  gap: number;
  coastAge: number | null;
  atRetirementContributing: number;
  atRetirementIfStopNow: number;
  rows: CoastRow[];
}

export function computeCoastFire(
  age: number,
  retireAge: number,
  invested: number,
  monthly: number,
  spending: number,
  realReturnPct: number,
  swrPct: number
): CoastFireResult {
  const r = realReturnPct / 100;
  const swr = swrPct / 100;
  const years = retireAge - age;
  const fireNumber = spending / swr;
  const coastNumber = fireNumber / Math.pow(1 + r, years);
  const progressPct = coastNumber > 0 ? (invested / coastNumber) * 100 : 0;
  const alreadyCoasting = invested >= coastNumber;
  const gap = Math.max(0, coastNumber - invested);
  const atRetirementIfStopNow = invested * Math.pow(1 + r, years);

  // Simulate month by month with contributions, in real terms.
  const mr = Math.pow(1 + r, 1 / 12) - 1;
  const totalMonths = Math.round(years * 12);
  let bal = invested;
  let coastAge: number | null = alreadyCoasting ? age : null;
  const rows: CoastRow[] = [{ age, portfolio: invested, coastTarget: coastNumber }];
  for (let m = 1; m <= totalMonths; m++) {
    bal = bal * (1 + mr) + monthly;
    if (coastAge === null) {
      const remainingYears = years - m / 12;
      const targetNow = fireNumber / Math.pow(1 + r, remainingYears);
      if (bal >= targetNow) coastAge = age + m / 12;
    }
    if (m % 12 === 0) {
      const a = age + m / 12;
      if ((a - age) % 5 === 0 || a === retireAge) {
        rows.push({
          age: a,
          portfolio: bal,
          coastTarget: fireNumber / Math.pow(1 + r, retireAge - a),
        });
      }
    }
  }

  return {
    years,
    fireNumber,
    coastNumber,
    progressPct,
    alreadyCoasting,
    gap,
    coastAge,
    atRetirementContributing: bal,
    atRetirementIfStopNow,
    rows,
  };
}

const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

export default function CoastFireCalculator() {
  const [age, setAge] = useState("30");
  const [retireAge, setRetireAge] = useState("60");
  const [invested, setInvested] = useState("50000");
  const [monthly, setMonthly] = useState("500");
  const [spending, setSpending] = useState("40000");
  const [realReturn, setRealReturn] = useState("5");
  const [swr, setSwr] = useState("4");

  const result = useMemo(() => {
    const a = Number(age);
    const ra = Number(retireAge);
    const inv = Number(invested);
    const mo = Number(monthly);
    const sp = Number(spending);
    const rr = Number(realReturn);
    const sw = Number(swr);
    if (!(a > 0) || !(ra > a) || !(ra <= 100)) return null;
    if (!(inv >= 0) || !(mo >= 0) || !(sp > 0)) return null;
    if (!(rr > -50) || !(rr < 50) || !(sw > 0) || !(sw <= 20)) return null;
    return computeCoastFire(a, ra, inv, mo, sp, rr, sw);
  }, [age, retireAge, invested, monthly, spending, realReturn, swr]);

  const barPct = result ? Math.max(0, Math.min(100, result.progressPct)) : 0;

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelCls} htmlFor="cf-age">Current age</label>
              <input id="cf-age" type="number" min="1" max="99" className={inputCls} value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-retire-age">Target retirement age</label>
              <input id="cf-retire-age" type="number" min="2" max="100" className={inputCls} value={retireAge} onChange={(e) => setRetireAge(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-invested">Invested savings today ($)</label>
              <input id="cf-invested" type="number" min="0" className={inputCls} value={invested} onChange={(e) => setInvested(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-monthly">Monthly contribution ($)</label>
              <input id="cf-monthly" type="number" min="0" className={inputCls} value={monthly} onChange={(e) => setMonthly(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-spending">Yearly spending in retirement ($)</label>
              <input id="cf-spending" type="number" min="1" className={inputCls} value={spending} onChange={(e) => setSpending(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-return">Expected real return (% / year)</label>
              <input id="cf-return" type="number" step="0.1" className={inputCls} value={realReturn} onChange={(e) => setRealReturn(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cf-swr">Safe withdrawal rate (%)</label>
              <input id="cf-swr" type="number" step="0.1" min="0.5" max="20" className={inputCls} value={swr} onChange={(e) => setSwr(e.target.value)} />
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Your numbers update as you type. Nothing is stored — the calculation runs in your browser.
            Everything is in today&apos;s dollars: the return is a real (after-inflation) return, so the
            results are in today&apos;s purchasing power.
          </p>
        </div>

        {result ? (
          <>
            <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
                  Your Coast FIRE number — needed today
                </p>
                <p className="mt-3 font-display text-7xl sm:text-8xl font-bold text-stone-900">
                  {money(result.coastNumber)}
                </p>
                <p className="mt-2 font-display text-2xl font-bold" style={{ color: result.alreadyCoasting ? "#22c55e" : "#d97706" }}>
                  {result.alreadyCoasting
                    ? "You are already coasting 🎉"
                    : `${result.progressPct.toFixed(1)}% of the way there`}
                </p>
              </div>

              {/* progress bar */}
              <div className="mt-8 max-w-xl mx-auto">
                <div className="h-4 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${barPct}%`, background: result.alreadyCoasting ? "#22c55e" : "#f59e0b" }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-stone-400 uppercase tracking-wide mt-2">
                  <span>{money(Number(invested) || 0)} invested</span>
                  <span>{money(result.coastNumber)} coast target</span>
                </div>
              </div>

              <p className="mt-6 text-stone-600 leading-relaxed max-w-2xl mx-auto text-center">
                {result.alreadyCoasting ? (
                  <>
                    Your invested savings are already at or above your Coast number. If you stopped
                    contributing today, growth alone is projected to carry your portfolio to your full
                    FIRE number of {money(result.fireNumber)} by age {retireAge} — your job now only has
                    to cover your living costs until then.
                  </>
                ) : (
                  <>
                    You are {money(result.gap)} short of your Coast number. Keep contributing{" "}
                    {money(Number(monthly) || 0)} a month and you are projected to reach it
                    {result.coastAge !== null ? (
                      <> at about age {Math.round(result.coastAge)}</>
                    ) : (
                      <> — though not before age {retireAge} on these numbers</>
                    )}
                    . From that point, you could stop saving entirely and growth alone is projected to
                    do the rest.
                  </>
                )}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Full FIRE number</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">{money(result.fireNumber)}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    {money(Number(spending) || 0)} a year ÷ {swr}% withdrawal rate
                  </p>
                </div>
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Projected coast age</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                    {result.alreadyCoasting
                      ? "Already there"
                      : result.coastAge !== null
                        ? `Age ${Math.round(result.coastAge)}`
                        : `Not before ${retireAge}`}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    First age your portfolio passes the coast target
                  </p>
                </div>
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                    Portfolio at {retireAge} — keep contributing
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                    {money(result.atRetirementContributing)}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    If you keep adding {money(Number(monthly) || 0)} a month
                  </p>
                </div>
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                    Portfolio at {retireAge} — stop today
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                    {money(result.atRetirementIfStopNow)}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">
                    Your current savings, growth only, no new money
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
              <h3 className="font-display text-2xl font-bold text-stone-900 text-center">
                Year by year: portfolio vs coast target
              </h3>
              <p className="mt-2 text-stone-500 text-center text-sm">
                In today&apos;s dollars, assuming a steady {realReturn}% real return and{" "}
                {money(Number(monthly) || 0)} a month in contributions.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-left">
                      <th className="py-3 pr-4 font-bold text-stone-800">Age</th>
                      <th className="py-3 pr-4 font-bold text-stone-800">Projected portfolio</th>
                      <th className="py-3 font-bold text-stone-800">Coast target at that age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row) => (
                      <tr key={row.age} className="border-b border-stone-100 last:border-0">
                        <td className="py-3 pr-4 font-bold text-stone-900">{row.age}</td>
                        <td className="py-3 pr-4 text-stone-600">{money(row.portfolio)}</td>
                        <td className="py-3 text-stone-600">{money(row.coastTarget)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-stone-400 text-center">
                The coast target falls as you age — the closer you get to retirement, the less time
                growth has to work, so the target is the amount you would need invested at that age to
                still arrive on time.
              </p>
            </div>
          </>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter a retirement age above your current age, a yearly spending above zero and a
            withdrawal rate between 0 and 20% to see your Coast FIRE numbers.
          </p>
        )}
      </div>
    </section>
  );
}
