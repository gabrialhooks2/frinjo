// --- 2026 US federal income tax (estimate) ---
// Used by the Schedule 1-A deduction calculators (no tax on overtime / tips,
// car loan interest) to estimate the federal income tax a deduction saves.
// Income tax ONLY: these deductions do not change FICA (Social Security /
// Medicare), so payroll tax is deliberately excluded here.
// Brackets and standard deductions: 2026 figures (single standard deduction
// $16,100 matches the hourly-to-salary rates.ts tables).

export type FilingStatus = "single" | "mfj" | "hoh" | "mfs";

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  mfj: "Married filing jointly",
  hoh: "Head of household",
  mfs: "Married filing separately",
};

const STD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  hoh: 24150,
  mfs: 16100,
};

// [bracket floor, marginal rate] on taxable income — 2026 federal brackets
const FEDERAL_BRACKETS_2026: Record<FilingStatus, [number, number][]> = {
  single: [
    [0, 0.1],
    [12400, 0.12],
    [50400, 0.22],
    [105700, 0.24],
    [201775, 0.32],
    [256225, 0.35],
    [640600, 0.37],
  ],
  mfj: [
    [0, 0.1],
    [24800, 0.12],
    [100800, 0.22],
    [211400, 0.24],
    [403550, 0.32],
    [512450, 0.35],
    [768700, 0.37],
  ],
  hoh: [
    [0, 0.1],
    [17700, 0.12],
    [67450, 0.22],
    [105700, 0.24],
    [201750, 0.32],
    [256200, 0.35],
    [640600, 0.37],
  ],
  mfs: [
    [0, 0.1],
    [12400, 0.12],
    [50400, 0.22],
    [105700, 0.24],
    [201775, 0.32],
    [256225, 0.35],
    [384350, 0.37],
  ],
};

/** Estimated 2026 federal income tax on a given income (AGI), standard deduction only. */
export function federalIncomeTax(income: number, status: FilingStatus): number {
  const taxable = Math.max(0, income - STD_DEDUCTION_2026[status]);
  const brackets = FEDERAL_BRACKETS_2026[status];
  let tax = 0;
  for (let i = 0; i < brackets.length; i++) {
    const [floor, rate] = brackets[i];
    const ceiling = i + 1 < brackets.length ? brackets[i + 1][0] : Infinity;
    if (taxable > floor) tax += (Math.min(taxable, ceiling) - floor) * rate;
  }
  return tax;
}

/** Federal income tax saved by a below-the-line deduction of `deduction` at income `magi`. */
export function taxSavedByDeduction(magi: number, deduction: number, status: FilingStatus): number {
  if (deduction <= 0 || magi <= 0) return 0;
  return Math.max(0, federalIncomeTax(magi, status) - federalIncomeTax(magi - deduction, status));
}

export function money0(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US");
}
