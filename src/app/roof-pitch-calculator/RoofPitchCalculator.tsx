"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

export interface RoofPitchResult {
  pitchPer12: number;
  angleDeg: number;
  slopePct: number;
  multiplier: number;
}

export function computeRoofPitch(rise: number, run: number): RoofPitchResult {
  const ratio = rise / run;
  return {
    pitchPer12: ratio * 12,
    angleDeg: (Math.atan(ratio) * 180) / Math.PI,
    slopePct: ratio * 100,
    multiplier: Math.sqrt(1 + ratio * ratio),
  };
}

function fmtFtIn(feet: number): string {
  const wholeFt = Math.floor(feet);
  const inches = (feet - wholeFt) * 12;
  return `${feet.toFixed(2)} ft (${wholeFt} ft ${inches.toFixed(1)} in)`;
}

export default function RoofPitchCalculator() {
  const [units, setUnits] = useState<"inches" | "feet">("inches");
  const [rise, setRise] = useState("6");
  const [run, setRun] = useState("12");
  const [widthFt, setWidthFt] = useState("30");
  const [footprintSqft, setFootprintSqft] = useState("1500");

  const switchUnits = (u: "inches" | "feet") => {
    if (u === units) return;
    const r = Number(rise);
    const rn = Number(run);
    if (u === "feet") {
      if (r > 0) setRise(String(+(r / 12).toFixed(3)));
      if (rn > 0) setRun(String(+(rn / 12).toFixed(3)));
    } else {
      if (r > 0) setRise(String(+(r * 12).toFixed(2)));
      if (rn > 0) setRun(String(+(rn * 12).toFixed(2)));
    }
    setUnits(u);
  };

  const applyPreset = (n: number) => {
    setUnits("inches");
    setRise(String(n));
    setRun("12");
  };

  const parsed = useMemo(() => {
    const r = Number(rise);
    const rn = Number(run);
    if (!(rn > 0) || !(r >= 0)) return null;
    return { rise: r, run: rn };
  }, [rise, run]);

  const result = parsed ? computeRoofPitch(parsed.rise, parsed.run) : null;

  const width = Number(widthFt);
  const footprint = Number(footprintSqft);
  const rafterFt = result && width > 0 ? (width / 2) * result.multiplier : null;
  const roofArea = result && footprint > 0 ? footprint * result.multiplier : null;

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <div className="flex gap-2 mb-6">
            {(["inches", "feet"] as const).map((u) => (
              <button key={u} type="button" onClick={() => switchUnits(u)}
                className={`rounded-full px-5 py-2 font-bold text-sm transition ${
                  units === u ? "bg-orange-600 text-white" : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                }`}>
                {u === "inches" ? "inches" : "feet"}
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="pitch-rise">Rise — vertical ({units})</label>
              <input id="pitch-rise" type="number" min="0" step="any" className={inputCls} value={rise} onChange={(e) => setRise(e.target.value)} />
            </div>
            <div>
              <label className={labelCls} htmlFor="pitch-run">Run — horizontal ({units})</label>
              <input id="pitch-run" type="number" min="0" step="any" className={inputCls} value={run} onChange={(e) => setRun(e.target.value)} />
            </div>
          </div>

          <p className="mt-5 text-sm font-bold text-stone-800">Common pitches — tap to load:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" onClick={() => applyPreset(n)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  units === "inches" && Number(rise) === n && Number(run) === 12
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                }`}>
                {n}/12
              </button>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 mt-6">
            <div>
              <label className={labelCls} htmlFor="pitch-width">Building width (ft) — for rafter length</label>
              <input id="pitch-width" type="number" min="0" step="any" className={inputCls} value={widthFt} onChange={(e) => setWidthFt(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">For a standard gable roof, each rafter&apos;s horizontal run is half the building width.</p>
            </div>
            <div>
              <label className={labelCls} htmlFor="pitch-footprint">Roof footprint area (sq ft) — for roof area</label>
              <input id="pitch-footprint" type="number" min="0" step="any" className={inputCls} value={footprintSqft} onChange={(e) => setFootprintSqft(e.target.value)} />
              <p className="mt-2 text-xs text-stone-400">The flat plan area the roof covers — length × width of the building, before slope.</p>
            </div>
          </div>

          <p className="mt-3 text-xs text-stone-400">
            Your pitch updates as you type. Nothing is stored — the calculation runs in your browser.
          </p>
        </div>

        {result ? (
          <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-sm">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700">Your Roof Pitch</p>
              <p className="mt-3 font-display text-7xl sm:text-8xl font-bold text-stone-900">
                {result.pitchPer12.toFixed(2).replace(/\.?0+$/, "")}
                <span className="text-4xl sm:text-5xl text-stone-400">/12</span>
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-orange-700">
                {result.angleDeg.toFixed(2)}° · {result.slopePct.toFixed(1)}% slope
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Pitch multiplier (slope factor)</p>
                <p className="mt-2 font-display text-2xl font-bold text-stone-900">{result.multiplier.toFixed(3)}</p>
                <p className="mt-1 text-sm text-stone-500">Multiply flat lengths and areas by this to get true sloped values.</p>
              </div>
              <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">The formulas</p>
                <p className="mt-2 font-display text-base font-bold text-stone-900 leading-relaxed">
                  Pitch = rise ÷ run × 12<br />
                  Angle = arctan(rise ÷ run)<br />
                  Multiplier = √(1 + (rise ÷ run)²)
                </p>
              </div>
              {rafterFt !== null && (
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Rafter length — {width} ft wide building</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">{fmtFtIn(rafterFt)}</p>
                  <p className="mt-1 text-sm text-stone-500">Half-width run of {(width / 2).toFixed(1)} ft × {result.multiplier.toFixed(3)}. Excludes overhang and ridge-board deduction.</p>
                </div>
              )}
              {roofArea !== null && (
                <div className="rounded-2xl bg-stone-50 border border-stone-100 p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">Roof area — {footprint} sq ft footprint</p>
                  <p className="mt-2 font-display text-2xl font-bold text-stone-900">{roofArea.toLocaleString("en-US", { maximumFractionDigits: 0 })} sq ft</p>
                  <p className="mt-1 text-sm text-stone-500">≈ {(roofArea / 100).toFixed(1)} roofing squares (1 square = 100 sq ft), before waste allowance.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 text-center">
            Enter a run greater than zero (and a rise of zero or more) to see your roof pitch.
          </p>
        )}
      </div>
    </section>
  );
}
