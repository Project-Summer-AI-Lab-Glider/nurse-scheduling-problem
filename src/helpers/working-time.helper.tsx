/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const POSSIBLE_FRACTIONS = [
  { dividend: 1, divisor: 1 },
  { dividend: 1, divisor: 2 },
  { dividend: 1, divisor: 3 },
  { dividend: 2, divisor: 3 },
  { dividend: 1, divisor: 4 },
  { dividend: 3, divisor: 4 },
  { dividend: 1, divisor: 5 },
  { dividend: 2, divisor: 5 },
  { dividend: 3, divisor: 5 },
  { dividend: 4, divisor: 5 },
  { dividend: 1, divisor: 8 },
  { dividend: 3, divisor: 8 },
  { dividend: 5, divisor: 8 },
  { dividend: 7, divisor: 8 },
];

export const FRACTIONS_LABELS = POSSIBLE_FRACTIONS.map(
  (fraction) => `${fraction.dividend}/${fraction.divisor}`
);
export const FRACTIONS_NUMBERS = POSSIBLE_FRACTIONS.map(
  (fraction) => fraction.dividend / fraction.divisor
);

export class WorkingTimeHelper {
  static fromHoursToFraction(hours: number, fullTimeBase: number): string {
    const workerNormAsDecimal = hours / fullTimeBase;
    return this.fromDecimalToFraction(workerNormAsDecimal);
  }

  static fromDecimalToFraction(workNorm: number): string {
    return FRACTIONS_LABELS[this.findIdOfClosestFrom(workNorm, FRACTIONS_NUMBERS)];
  }

  static fromFractionToHours(fraction: string, fullTimeBase: number): number {
    const workNorm = this.fromFractionToDecimal(fraction);
    return Math.round(fullTimeBase * workNorm);
  }

  static fromFractionToDecimal(fraction: string): number {
    const result = fraction.split("/");
    const [dividend, divisor] = result.map((string) => Number.parseInt(string, 10));
    return dividend / divisor;
  }

  static findIdOfClosestFrom(search: number, from: Array<number>): number {
    const number = from.reduce((a, b) => (Math.abs(b - search) < Math.abs(a - search) ? b : a));
    return from.indexOf(number);
  }

  static isTimeFractionValid(fraction: string): boolean {
    const result = fraction.split("/");
    const [dividend, divisor] = result.map((string) => Number.parseInt(string, 10));
    return dividend / divisor <= 1;
  }
}
