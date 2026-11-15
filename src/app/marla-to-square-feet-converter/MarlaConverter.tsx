"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";
const selectCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";

export type UnitKey = "marla" | "kanal" | "sqft" | "sqyd" | "sqm" | "acre" | "sarsai";

export const UNITS: { key: UnitKey; label: string; short: string }[] = [
  { key: "marla", label: "Marla", short: "Marla" },
  { key: "kanal", label: "Kanal", short: "Kanal" },
  { key: "sqft", label: "Square Feet", short: "sq ft" },
  { key: "sqyd", label: "Square Yards (Gaj)", short: "sq yd" },
  { key: "sqm", label: "Square Metres", short: "sq m" },
  { key: "acre", label: "Acres", short: "acre" },
  { key: "sarsai", label: "Sarsai", short: "Sarsai" },
];

export const SQ_M_IN_SQ_FT = 10.763910416709722;
export const SQ_FT_PER_ACRE = 43560;

/** Convert any supported unit into square feet at the selected marla standard. */
export function toSqFt(value: number, unit: UnitKey, marlaSqFt: number): number {
  switch (unit) {
    case "marla":
      return value * marlaSqFt;
    case "kanal":
      return value * 20 * marlaSqFt;
    case "sqft":
      return value;
    case "sqyd":
      return value * 9;
    case "sqm":
      return value * SQ_M_IN_SQ_FT;
    case "acre":
      return value * SQ_FT_PER_ACRE;
    case "sarsai":
      return value * (marlaSqFt / 9);
  }
}

/** Convert square feet back into any supported unit at the selected marla standard. */
export function fromSqFt(sqFt: number, unit: UnitKey, marlaSqFt: number): number {
  switch (unit) {
    case "marla":
      return sqFt / marlaSqFt;
    case "kanal":
      return sqFt / (20 * marlaSqFt);
    case "sqft":
      return sqFt;
    case "sqyd":
      return sqFt / 9;
    case "sqm":
      return sqFt / SQ_M_IN_SQ_FT;
    case "acre":
      return sqFt / SQ_FT_PER_ACRE;
    case "sarsai":
      return sqFt / (marlaSqFt / 9);
  }
}

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  const digits = Math.abs(n) >= 100 ? 2 : 4;
  const rounded = Math.round(n * 10 ** digits) / 10 ** digits;
  return rounded.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

function fmtMoney(n: number): string {
  if (!isFinite(n)) return "—";
  return Math.round(n).toLocaleString("en-US");
}

const STANDARDS = [
  { key: "272.25", label: "Revenue · 272.25 sq ft", value: 272.25 },
  { key: "225", label: "Society (DHA/Bahria) · 225 sq ft", value: 225 },
  { key: "250", label: "CDA Islamabad · 250 sq ft", value: 250 },
  { key: "custom", label: "Custom", value: 0 },
] as const;

type StandardKey = (typeof STANDARDS)[number]["key"];

export default function MarlaConverter() {
  const [standard, setStandard] = useState<StandardKey>("272.25");
  const [customStd, setCustomStd] = useState("272.25");
  const [amount, setAmount] = useState("5");
  const [fromUnit, setFromUnit] = useState<UnitKey>("marla");
  const [width, setWidth] = useState("25");
  const [length, setLength] = useState("45");
  const [pricePerMarla, setPricePerMarla] = useState("3000000");

  const marlaSqFt = useMemo(() => {
    if (standard === "custom") {
      const v = Number(customStd);
      return v > 0 ? v : 272.25;
    }
    return STANDARDS.find((s) => s.key === standard)?.value ?? 272.25;
  }, [standard, customStd]);

  const converted = useMemo(() => {
    const v = Number(amount);
    if (!(v >= 0) || amount.trim() === "") return null;
    const sqFt = toSqFt(v, fromUnit, marlaSqFt);
    return UNITS.map((u) => ({ ...u, value: fromSqFt(sqFt, u.key, marlaSqFt) }));
  }, [amount, fromUnit, marlaSqFt]);

  const plot = useMemo(() => {
    const w = Number(width);
    const l = Number(length);
    if (!(w > 0) || !(l > 0)) return null;
    const sqFt = w * l;
    return {
      sqFt,
      marla: fromSqFt(sqFt, "marla", marlaSqFt),
      kanal: fromSqFt(sqFt, "kanal", marlaSqFt),
    };
  }, [width, length, marlaSqFt]);

  const price = useMemo(() => {
    const p = Number(pricePerMarla);
    if (!(p > 0) || !converted) return null;
    const marla = converted.find((c) => c.key === "marla")?.value ?? 0;
    const sqFt = converted.find((c) => c.key === "sqft")?.value ?? 0;
    return {
      total: marla * p,
      perSqFt: sqFt > 0 ? (marla * p) / sqFt : 0,
    };
  }, [pricePerMarla, converted]);

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <p className={labelCls}>Marla standard — which size does your plot use?</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {STANDARDS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setStandard(s.key)}
                className={`rounded-full px-5 py-2 font-bold text-sm transition ${
                  standard === s.key
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {standard === "custom" && (
            <div className="mb-6 max-w-xs">
              <label className={labelCls} htmlFor="marla-custom-std">
                Custom — square feet in 1 Marla
              </label>
              <input
                id="marla-custom-std"
                type="number"
                min="1"
                step="any"
                className={inputCls}
                value={customStd}
                onChange={(e) => setCustomStd(e.target.value)}
              />
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="marla-amount">
                Area
              </label>
              <input
                id="marla-amount"
                type="number"
                min="0"
                step="any"
                className={inputCls}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="marla-from-unit">
                Measured in
              </label>
              <select
                id="marla-from-unit"
                className={selectCls}
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitKey)}
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
            1 Kanal = 20 Marla and 1 Acre = 8 Kanal at every standard; only the size of a Marla changes.
          </p>
        </div>

        {converted ? (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 text-center">
              Your area in every unit
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {converted.map((c) => (
                <div
                  key={c.key}
                  className={`rounded-2xl border p-5 text-center ${
                    c.key === fromUnit
                      ? "bg-orange-50 border-orange-200"
                      : "bg-stone-50 border-stone-100"
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{c.label}</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                    {fmt(c.value)} <span className="text-base text-stone-500">{c.short}</span>
                  </p>
                </div>
              ))}
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">The formula</p>
                <p className="mt-2 font-display text-lg font-bold text-stone-900">
                  sq ft = Marla × {fmt(marlaSqFt)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter an area above to see it in every unit.
          </p>
        )}

        {/* PLOT DIMENSIONS */}
        <div className="mt-10 rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-stone-900">Know the plot dimensions instead?</h2>
          <p className="mt-2 text-stone-600 leading-relaxed">
            Enter the width and length of the plot in feet — the size written on most society files, like
            25 × 45 or 35 × 65 — and get the total area.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 mt-6">
            <div>
              <label className={labelCls} htmlFor="marla-width">
                Width — feet
              </label>
              <input
                id="marla-width"
                type="number"
                min="0"
                step="any"
                className={inputCls}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="marla-length">
                Length — feet
              </label>
              <input
                id="marla-length"
                type="number"
                min="0"
                step="any"
                className={inputCls}
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
          </div>
          {plot ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Total area</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{fmt(plot.sqFt)} sq ft</p>
              </div>
              <div className="rounded-2xl bg-white border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">In Marla</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{fmt(plot.marla)} Marla</p>
              </div>
              <div className="rounded-2xl bg-white border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">In Kanal</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{fmt(plot.kanal)} Kanal</p>
              </div>
            </div>
          ) : (
            <p className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
              Enter a width and length to see the plot area.
            </p>
          )}
        </div>

        {/* PRICE */}
        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-stone-900">What is the plot worth?</h2>
          <p className="mt-2 text-stone-600 leading-relaxed">
            Property in Pakistan is usually quoted per Marla. Enter the rate and see the total price for
            the area you converted above.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 mt-6 items-end">
            <div>
              <label className={labelCls} htmlFor="marla-price">
                Price per Marla (PKR)
              </label>
              <input
                id="marla-price"
                type="number"
                min="0"
                step="any"
                className={inputCls}
                value={pricePerMarla}
                onChange={(e) => setPricePerMarla(e.target.value)}
              />
            </div>
            {price ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Total price</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                    Rs {fmtMoney(price.total)}
                  </p>
                </div>
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Per sq ft</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">
                    Rs {fmtMoney(price.perSqFt)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
                Enter a price per Marla to see the total.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
