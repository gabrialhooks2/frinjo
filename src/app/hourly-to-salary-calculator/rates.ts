export const POPULAR_RATES = [
  12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38,
  40, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 90, 100,
];

export function rateSlug(rate: number): string {
  return `${rate}-an-hour-is-how-much-a-year`;
}

export interface PayBreakdown {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
}

export function breakdown(hourly: number, hoursPerWeek: number, weeksPerYear: number): PayBreakdown {
  const weekly = hourly * hoursPerWeek;
  const annual = weekly * weeksPerYear;
  return {
    hourly,
    daily: hourly * (hoursPerWeek / 5),
    weekly,
    biweekly: weekly * 2,
    monthly: annual / 12,
    annual,
  };
}

export function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 100 ? 2 : 0,
  });
}

// --- After-tax estimate (2026 US federal, single filer, standard deduction) ---
// Estimate only: federal income tax + FICA. State/local tax is NOT included.
const STD_DEDUCTION_2026 = 16100;
// [bracket floor, marginal rate] — 2026 single-filer federal brackets
const FEDERAL_BRACKETS_2026: [number, number][] = [
  [0, 0.1],
  [12400, 0.12],
  [50400, 0.22],
  [105700, 0.24],
  [201775, 0.32],
  [256225, 0.35],
  [640600, 0.37],
];
const SS_WAGE_CAP_2026 = 184500; // Social Security 6.2% applies up to this wage base; Medicare 1.45% on all wages

export interface NetPay {
  annual: number;
  monthly: number;
  biweekly: number;
  weekly: number;
  totalTax: number;
  effectiveRate: number; // percent, one decimal
}

export function estimateNet(annualGross: number): NetPay {
  const taxable = Math.max(0, annualGross - STD_DEDUCTION_2026);
  let incomeTax = 0;
  for (let i = 0; i < FEDERAL_BRACKETS_2026.length; i++) {
    const [floor, rate] = FEDERAL_BRACKETS_2026[i];
    const ceiling = i + 1 < FEDERAL_BRACKETS_2026.length ? FEDERAL_BRACKETS_2026[i + 1][0] : Infinity;
    if (taxable > floor) incomeTax += (Math.min(taxable, ceiling) - floor) * rate;
  }
  const fica = Math.min(annualGross, SS_WAGE_CAP_2026) * 0.062 + annualGross * 0.0145;
  const totalTax = incomeTax + fica;
  const net = annualGross - totalTax;
  return {
    annual: net,
    monthly: net / 12,
    biweekly: net / 26,
    weekly: net / 52,
    totalTax,
    effectiveRate: annualGross > 0 ? Math.round((totalTax / annualGross) * 1000) / 10 : 0,
  };
}
