"use client";

import { useMemo, useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 placeholder-stone-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition";
const labelCls = "block text-sm font-bold text-stone-800 mb-2";

/* ------------------------------------------------------------------ */
/* Unicode style converters                                            */
/* ------------------------------------------------------------------ */

/**
 * Builds a converter from the Mathematical Alphanumeric Symbols blocks.
 * Characters Unicode never made a styled version of (for example digits
 * in script or fraktur) pass through unchanged.
 */
function block(
  upper: number | null,
  lower: number | null,
  digit: number | null,
  exceptions: Record<string, number> = {}
) {
  return (text: string) =>
    Array.from(text, (ch) => {
      if (exceptions[ch] !== undefined) return String.fromCodePoint(exceptions[ch]);
      const code = ch.codePointAt(0) ?? 0;
      if (code >= 65 && code <= 90 && upper !== null)
        return String.fromCodePoint(upper + code - 65);
      if (code >= 97 && code <= 122 && lower !== null)
        return String.fromCodePoint(lower + code - 97);
      if (code >= 48 && code <= 57 && digit !== null)
        return String.fromCodePoint(digit + code - 48);
      return ch;
    }).join("");
}

function circled(text: string) {
  return Array.from(text, (ch) => {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + code - 65); // Ⓐ
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + code - 97); // ⓐ
    if (ch === "0") return String.fromCodePoint(0x24ea); // ⓪
    if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + code - 49); // ①–⑨
    return ch;
  }).join("");
}

const fullwidthBase = block(0xff21, 0xff41, 0xff10);
function fullwidth(text: string) {
  return fullwidthBase(text).replace(/ /g, "　");
}

const SMALL_CAPS = [
  "\u1D00", "\u0299", "\u1D04", "\u1D05", "\u1D07", "\uA730", "\u0262", "\u029C",
  "\u026A", "\u1D0A", "\u1D0B", "\u029F", "\u1D0D", "\u0274", "\u1D0F", "\u1D18",
  "\u01EB", "\u0280", "\uA731", "\u1D1B", "\u1D1C", "\u1D20", "\u1D21", "x",
  "\u028F", "\u1D22",
];
function smallCaps(text: string) {
  return Array.from(text, (ch) => {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 65 && code <= 90) return SMALL_CAPS[code - 65];
    if (code >= 97 && code <= 122) return SMALL_CAPS[code - 97];
    return ch;
  }).join("");
}

const SUPERSCRIPT: Record<string, string> = {
  a: "\u1D43", b: "\u1D47", c: "\u1D9C", d: "\u1D48", e: "\u1D49", f: "\u1DA0",
  g: "\u1D4D", h: "\u02B0", i: "\u1DA6", j: "\u02B2", k: "\u1D4F", l: "\u02E1",
  m: "\u1D50", n: "\u207F", o: "\u1D52", p: "\u1D56", r: "\u02B3", s: "\u02E2",
  t: "\u1D57", u: "\u1D58", v: "\u1D5B", w: "\u02B7", x: "\u02E3", y: "\u02B8",
  z: "\u1DBB",
  A: "\u1D2C", B: "\u1D2D", D: "\u1D30", E: "\u1D31", G: "\u1D33", H: "\u1D34",
  I: "\u1D35", J: "\u1D36", K: "\u1D37", L: "\u1D38", M: "\u1D39", N: "\u1D3A",
  O: "\u1D3C", P: "\u1D3E", R: "\u1D3F", T: "\u1D40", U: "\u1D41", V: "\u2C7D",
  W: "\u1D42",
  "0": "\u2070", "1": "\u00B9", "2": "\u00B2", "3": "\u00B3", "4": "\u2074",
  "5": "\u2075", "6": "\u2076", "7": "\u2077", "8": "\u2078", "9": "\u2079",
};
function superscript(text: string) {
  return Array.from(text, (ch) => SUPERSCRIPT[ch] ?? ch).join("");
}

const FLIP: Record<string, string> = {
  a: "\u0250", b: "q", c: "\u0254", d: "p", e: "\u01DD", f: "\u025F",
  g: "\u0183", h: "\u0265", i: "\u1D09", j: "\u027E", k: "\u029E", l: "\u0283",
  m: "\u026F", n: "u", o: "o", p: "d", q: "b", r: "\u0279", s: "s",
  t: "\u0287", u: "n", v: "\u028C", w: "\u028D", x: "x", y: "\u028E", z: "z",
  A: "\u2200", B: "\u{10412}", C: "\u0186", D: "\u15E1", E: "\u018E",
  F: "\u2132", G: "\u2141", H: "H", I: "I", J: "\u017F", K: "\u029E",
  L: "\uA780", M: "W", N: "N", O: "O", P: "\u0500", R: "\u1D1A", S: "S",
  T: "\u22A5", U: "\u2229", V: "\u039B", W: "M", X: "X", Y: "\u2144", Z: "Z",
  "0": "0", "1": "\u0196", "2": "\u1105", "3": "\u0190", "4": "\u3123",
  "5": "\u03DB", "6": "9", "7": "\u3125", "8": "8", "9": "6",
  ".": "\u02D9", ",": "'", "!": "\u00A1", "?": "\u00BF", "'": ",", '"': ",,",
  "(": ")", ")": "(", "[": "]", "]": "[", "{": "}", "}": "{", "<": ">", ">": "<",
  "&": "\u214B", "_": "\u203E",
};
function upsideDown(text: string) {
  return Array.from(text, (ch) => FLIP[ch] ?? ch)
    .reverse()
    .join("");
}

function overlay(mark: string) {
  return (text: string) =>
    Array.from(text, (ch) => (ch === " " ? ch : ch + mark)).join("");
}

const ZALGO_MARKS = [
  "\u0300", "\u0301", "\u0302", "\u0303", "\u0304",
  "\u0306", "\u0308", "\u030A", "\u0313", "\u0357",
];
function zalgoLite(text: string) {
  let i = 0;
  return Array.from(text, (ch) => {
    if (ch === " ") return ch;
    const mark = ZALGO_MARKS[(i + (ch.codePointAt(0) ?? 0)) % ZALGO_MARKS.length];
    i += 1;
    return ch + mark;
  }).join("");
}

function spaced(text: string) {
  return Array.from(text.toUpperCase()).join(" ");
}

/* ------------------------------------------------------------------ */
/* Style catalogue                                                     */
/* ------------------------------------------------------------------ */

interface StyleDef {
  name: string;
  categories: string[];
  convert: (text: string) => string;
}

const STYLES: StyleDef[] = [
  { name: "Bold", categories: ["Bold"], convert: block(0x1d400, 0x1d41a, 0x1d7ce) },
  { name: "Italic", categories: ["Cursive"], convert: block(0x1d434, 0x1d44e, null, { h: 0x210e }) },
  { name: "Bold Italic", categories: ["Bold", "Cursive"], convert: block(0x1d468, 0x1d482, null) },
  {
    name: "Script (Cursive)",
    categories: ["Cursive"],
    convert: block(0x1d49c, 0x1d4b6, null, {
      B: 0x212c, E: 0x2130, F: 0x2131, H: 0x210b, I: 0x2110, L: 0x2112,
      M: 0x2133, R: 0x211b, e: 0x212f, g: 0x210a, o: 0x2134,
    }),
  },
  { name: "Bold Script", categories: ["Bold", "Cursive"], convert: block(0x1d4d0, 0x1d4ea, null) },
  {
    name: "Fraktur (Gothic)",
    categories: ["Decorative"],
    convert: block(0x1d504, 0x1d51e, null, {
      C: 0x212d, H: 0x210c, I: 0x2111, R: 0x211c, Z: 0x2128,
    }),
  },
  { name: "Bold Fraktur", categories: ["Bold", "Decorative"], convert: block(0x1d56c, 0x1d586, null) },
  {
    name: "Double-Struck",
    categories: ["Decorative"],
    convert: block(0x1d538, 0x1d552, 0x1d7d8, {
      C: 0x2102, H: 0x210d, N: 0x2115, P: 0x2119, Q: 0x211a, R: 0x211d, Z: 0x2124,
    }),
  },
  { name: "Monospace", categories: ["Decorative"], convert: block(0x1d670, 0x1d68a, 0x1d7f6) },
  { name: "Sans-Serif Bold", categories: ["Bold"], convert: block(0x1d5d4, 0x1d5ee, 0x1d7ec) },
  { name: "Sans-Serif Italic", categories: ["Cursive"], convert: block(0x1d608, 0x1d622, null) },
  { name: "Bubble (Circled)", categories: ["Decorative"], convert: circled },
  { name: "Negative Circled", categories: ["Decorative"], convert: block(0x1f150, null, null) },
  { name: "Squared", categories: ["Decorative"], convert: block(0x1f130, null, null) },
  { name: "Negative Squared", categories: ["Decorative"], convert: block(0x1f170, null, null) },
  { name: "Parenthesized", categories: ["Decorative"], convert: block(0x1f110, 0x249c, null) },
  { name: "Fullwidth", categories: ["Decorative"], convert: fullwidth },
  { name: "Small Caps", categories: ["Small"], convert: smallCaps },
  { name: "Superscript (Tiny)", categories: ["Small"], convert: superscript },
  { name: "Upside Down", categories: ["Decorative"], convert: upsideDown },
  { name: "Strikethrough", categories: ["Decorative"], convert: overlay("\u0336") },
  { name: "Underline", categories: ["Decorative"], convert: overlay("\u0332") },
  { name: "Double Underline", categories: ["Decorative"], convert: overlay("\u0333") },
  { name: "Slash Overlay", categories: ["Decorative"], convert: overlay("\u0338") },
  { name: "Zalgo (Lite)", categories: ["Decorative"], convert: zalgoLite },
  { name: "Spaced (Aesthetic)", categories: ["Decorative"], convert: spaced },
];

const CHIPS = ["All", "Bold", "Cursive", "Decorative", "Small"];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FancyTextGenerator() {
  const [text, setText] = useState("Fancy Text");
  const [chip, setChip] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);

  const preview = text.trim() ? text : "Your Text";
  const visible = useMemo(
    () => (chip === "All" ? STYLES : STYLES.filter((s) => s.categories.includes(chip))),
    [chip]
  );

  async function copy(styleName: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(styleName);
    window.setTimeout(() => setCopied((c) => (c === styleName ? null : c)), 1600);
  }

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/60 p-6 sm:p-10 shadow-sm">
          <label className={labelCls} htmlFor="fancy-input">
            Your text
          </label>
          <textarea
            id="fancy-input"
            rows={2}
            maxLength={500}
            className={`${inputCls} resize-none text-lg`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here…"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-xs text-stone-400">{text.length} / 500 characters</p>
            {text && (
              <button
                type="button"
                onClick={() => setText("")}
                className="text-xs font-bold text-orange-700 hover:text-orange-800"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {CHIPS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChip(c)}
                className={`rounded-full px-5 py-2 font-bold text-sm transition ${
                  chip === c
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-stone-300 text-stone-700 hover:border-orange-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Every style updates as you type. Nothing is stored — the conversion runs in your browser.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white shadow-sm overflow-hidden">
          {visible.map((style, i) => {
            const value = style.convert(preview);
            const isCopied = copied === style.name;
            return (
              <div
                key={style.name}
                className={`flex items-center gap-4 px-5 sm:px-7 py-4 ${
                  i > 0 ? "border-t border-stone-100" : ""
                } hover:bg-stone-50/70 transition`}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                    {style.name}
                  </p>
                  <p
                    className={`mt-1 text-lg leading-snug break-words ${
                      text.trim() ? "text-stone-900" : "text-stone-400"
                    }`}
                  >
                    {value}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copy(style.name, value)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                    isCopied
                      ? "bg-green-600 text-white"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  {isCopied ? "Copied" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-stone-500 leading-relaxed text-center max-w-2xl mx-auto">
          Paste any style into your <strong>Instagram bio, name field and captions</strong>, or into
          TikTok, Discord and WhatsApp. One limit: they will not work in{" "}
          <strong>usernames</strong> — Instagram and TikTok only allow plain letters, numbers, periods
          and underscores there.
        </p>
      </div>
    </section>
  );
}
