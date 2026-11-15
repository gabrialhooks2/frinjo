"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

export const GRAMS_PER_TOLA = 11.6638;

export const UNITS = [
  { key: "tola", label: "Tola", grams: GRAMS_PER_TOLA, dp: 4 },
  { key: "gram", label: "Gram", grams: 1, dp: 4 },
  { key: "kilogram", label: "Kilogram", grams: 1000, dp: 6 },
  { key: "masha", label: "Masha", grams: GRAMS_PER_TOLA / 12, dp: 4 },
  { key: "ratti", label: "Ratti", grams: 0.1215, dp: 2 },
  { key: "troyOunce", label: "Troy Ounce", grams: 31.1035, dp: 4 },
  { key: "ounce", label: "Ounce", grams: 28.349523125, dp: 4 },
] as const;

export type UnitKey = (typeof UNITS)[number]["key"];

const KARATS = [24, 22, 21, 18] as const;

export function toGrams(amount: number, unit: UnitKey): number {
  const u = UNITS.find((x) => x.key === unit);
  return amount * (u ? u.grams : 1);
}

function fmt(n: number, dp: number): string {
  if (!isFinite(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: dp,
  });
}

function fmtPkr(n: number): string {
  if (!isFinite(n)) return "—";
  return "Rs " + Math.round(n).toLocaleString("en-US");
}

export default function TolaConverter() {
  const [amount, setAmount] = useState("1");
  const [unit, setUnit] = useState<UnitKey>("tola");
  const [karat, setKarat] = useState<number>(22);
  const [perTola, setPerTola] = useState("300000");
  const [perGram, setPerGram] = useState((300000 / GRAMS_PER_TOLA).toFixed(2));

  const grams = useMemo(() => {
    const a = Number(amount);
    if (!(a > 0)) return null;
    return toGrams(a, unit);
  }, [amount, unit]);

  const rateTola = Number(perTola);
  const rateGram = Number(perGram);
  const hasRate = rateTola > 0 && isFinite(rateTola);

  const onPerTola = (v: string) => {
    setPerTola(v);
    const n = Number(v);
    setPerGram(n > 0 ? (n / GRAMS_PER_TOLA).toFixed(2) : "");
  };
  const onPerGram = (v: string) => {
    setPerGram(v);
    const n = Number(v);
    setPerTola(n > 0 ? String(Math.round(n * GRAMS_PER_TOLA)) : "");
  };

  const pureGrams = grams !== null ? grams * (karat / 24) : null;
  const totalValue =
    grams !== null && hasRate ? (grams / GRAMS_PER_TOLA) * rateTola : null;

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-[1fr_220px]">
            <div>
              <label className={labelCls} htmlFor="tola-amount">
                Weight
              </label>
              <input
                id="tola-amount"
                type="number"
                min="0"
                step="any"
                className={inputCls}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="tola-unit">
                Unit
              </label>
              <select
                id="tola-unit"
                className={inputCls}
                value={unit}
                onChange={(e) => setUnit(e.target.value as UnitKey)}
              >
                {UNITS.map((u) => (
                  <option key={u.key} value={u.key}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Results update as you type. Nothing is stored — the calculation runs in your browser.
            1 tola = 11.6638 g exactly.
          </p>

          {grams !== null ? (
            <>
              <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
                {UNITS.map((u) => (
                  <div
                    key={u.key}
                    className={`rounded-2xl border p-5 text-center ${
                      u.key === "gram"
                        ? "bg-orange-50 border-orange-200"
                        : "bg-white border-stone-100"
                    }`}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                      {u.label}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold text-stone-900 break-words">
                      {fmt(grams / u.grams, u.dp)}
                    </p>
                  </div>
                ))}
                <div className="rounded-2xl bg-white border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                    The standard
                  </p>
                  <p className="mt-2 font-display text-lg font-bold text-stone-900">
                    1 tola = 11.6638 g
                  </p>
                </div>
              </div>

              {/* KARAT / PURITY */}
              <div className="mt-10 border-t border-stone-200 pt-8">
                <p className={labelCls}>Gold purity (karat)</p>
                <div className="flex flex-wrap gap-2">
                  {KARATS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKarat(k)}
                      className={`rounded-full px-5 py-2 font-bold text-sm transition ${
                        karat === k
                          ? "bg-orange-600 text-white"
                          : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                      }`}
                    >
                      {k}K
                    </button>
                  ))}
                </div>
                {pureGrams !== null && (
                  <p className="mt-4 text-stone-600 leading-relaxed">
                    Pure gold content at <strong className="text-stone-900">{karat}K</strong> (
                    {((karat / 24) * 100).toFixed(1)}% pure):{" "}
                    <strong className="text-stone-900">{fmt(pureGrams, 4)} g</strong> (
                    {fmt(pureGrams / GRAMS_PER_TOLA, 4)} tola). The rest is alloy metal added for
                    strength — that is normal for jewellery.
                  </p>
                )}
              </div>

              {/* GOLD VALUE */}
              <div className="mt-10 border-t border-stone-200 pt-8">
                <p className={labelCls}>Gold value — enter today&apos;s rate either way</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="tola-rate-tola">
                      Price per tola (PKR)
                    </label>
                    <input
                      id="tola-rate-tola"
                      type="number"
                      min="0"
                      step="any"
                      className={inputCls}
                      value={perTola}
                      onChange={(e) => onPerTola(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="tola-rate-gram">
                      Price per gram (PKR)
                    </label>
                    <input
                      id="tola-rate-gram"
                      type="number"
                      min="0"
                      step="any"
                      className={inputCls}
                      value={perGram}
                      onChange={(e) => onPerGram(e.target.value)}
                    />
                  </div>
                </div>
                <p className="mt-3 text-xs text-stone-400">
                  The starting rate is an example — replace it with today&apos;s rate before you rely
                  on the value. Editing either price updates the other.
                </p>
                {hasRate && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                        Value of your weight
                      </p>
                      <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                        {totalValue !== null ? fmtPkr(totalValue) : "—"}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white border border-stone-100 p-5 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                        Price per gram
                      </p>
                      <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                        {fmtPkr(rateGram)}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white border border-stone-100 p-5 text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                        Price per 10 grams
                      </p>
                      <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                        {fmtPkr(rateGram * 10)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
              Enter a weight above zero to see the conversions.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
