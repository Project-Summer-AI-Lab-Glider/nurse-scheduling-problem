/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

interface BaseShift {
  code: ShiftCode;
  name: string;
  from: number;
  to: number;
  color: string;
}
export interface WorkingShift extends BaseShift {
  isWorkingShift: true;
}

export enum NotWorkingShiftType {
  MedicalLeave = "zwolnienie lekarskie",
  AnnualLeave = "urlop",
  Util = "util",
}
export interface NotWorkingShift extends BaseShift {
  isWorkingShift: false;
  normSubtraction?: number;
  type?: NotWorkingShiftType;
}

export type Shift = WorkingShift | NotWorkingShift;

export enum ShiftCode {
  RP = "RP",
  RPN = "RPN",
  N8 = "N8",
  D1 = "D1",
  D2 = "D2",
  P1 = "P1",
  R1 = "R1",
  R = "R",
  P = "P",
  D = "D",
  N = "N",
  DN = "DN",
  PN = "PN",
  W = "W",
  U = "U",
  L4 = "L4",
  K = "K",
  NZ = "NZ",
  IZ = "IZ",
  OK = "OK",
  OP = "OP",
  P2 = "P2",
}

export type ShiftsDictionary = {
  [code in ShiftCode]: Shift;
};
export const SHIFTS: ShiftsDictionary = {
  P2: {
    code: ShiftCode.P2,
    name: "popołudnie 2",
    from: 13,
    to: 19,
    color: "805646",
    isWorkingShift: true,
  },
  RP: {
    code: ShiftCode.RP,
    name: "rano, popołudnie",
    from: 7,
    to: 19,
    color: "FFD100",
    isWorkingShift: true,
  },
  RPN: {
    code: ShiftCode.RPN,
    name: "rano, popołudnie, noc",
    from: 7,
    to: 7,
    color: "9025cf",
    isWorkingShift: true,
  },
  N8: {
    code: ShiftCode.N8,
    name: "noc 8h",
    from: 23,
    to: 7,
    color: "76a877",
    isWorkingShift: true,
  },
  D1: {
    code: ShiftCode.D1,
    name: "dzień 1",
    from: 7,
    to: 17,
    color: "396e75",
    isWorkingShift: true,
  },
  D2: {
    code: ShiftCode.D2,
    name: "dzień 2",
    from: 7,
    to: 16,
    color: "eda81c",
    isWorkingShift: true,
  },
  P1: {
    code: ShiftCode.P1,
    name: "popołudnie 1",
    from: 15,
    to: 21,
    color: "2003fc",
    isWorkingShift: true,
  },
  R1: {
    code: ShiftCode.R1,
    name: "rano 1",
    from: 7,
    to: 13,
    color: "5ce6dc",
    isWorkingShift: true,
  },

  R: {
    code: ShiftCode.R,
    name: "rano",
    from: 7,
    to: 15,
    color: "a82758",
    isWorkingShift: true,
  },
  P: {
    code: ShiftCode.P,
    name: "popołudnie",
    from: 15,
    to: 19,
    color: "00A3FF",
    isWorkingShift: true,
  },
  D: {
    code: ShiftCode.D,
    name: "dzień",
    from: 7,
    to: 19,
    color: "73B471",
    isWorkingShift: true,
  },
  N: {
    code: ShiftCode.N,
    name: "noc",
    from: 19,
    to: 7,
    color: "1D3557",
    isWorkingShift: true,
  },
  DN: {
    code: ShiftCode.DN,
    name: "dzień, noc",
    from: 7,
    to: 7,
    color: "641EAA",
    isWorkingShift: true,
  },
  PN: {
    code: ShiftCode.PN,
    name: "popołudnie, noc",
    from: 15,
    to: 7,
    color: "FFD100",
    isWorkingShift: true,
  },
  W: {
    code: ShiftCode.W,
    name: "wolne",
    from: 0,
    to: 24,
    color: "FF8A00",
    isWorkingShift: false,
    type: NotWorkingShiftType.Util,
  },
  U: {
    code: ShiftCode.U,
    name: "urlop wypoczynkowy",
    from: 0,
    to: 24,
    color: "92D050",
    isWorkingShift: false,
    type: NotWorkingShiftType.AnnualLeave,
  },
  L4: {
    code: ShiftCode.L4,
    name: "zwolnienie lekarskie (L4)",
    from: 0,
    to: 24,
    color: "C60000",
    isWorkingShift: false,
    type: NotWorkingShiftType.MedicalLeave,
  },
  K: {
    code: ShiftCode.K,
    name: "kwarantanna",
    from: 0,
    to: 24,
    color: "000000",
    isWorkingShift: false,
    type: NotWorkingShiftType.MedicalLeave,
  },
  IZ: {
    code: ShiftCode.IZ,
    name: "izolacja",
    from: 0,
    to: 24,
    color: "fc03e7",
    isWorkingShift: false,
    type: NotWorkingShiftType.MedicalLeave,
  },

  OK: {
    code: ShiftCode.OK,
    name: "urlop okolicznościowy 8h",
    from: 0,
    to: 24,
    color: "127622",
    isWorkingShift: false,
    normSubtraction: 8,
    type: NotWorkingShiftType.AnnualLeave,
  },
  OP: {
    code: ShiftCode.OP,
    name: "urlop opiekuńczy",
    from: 0,
    to: 24,
    color: "C3A000",
    isWorkingShift: false,
    normSubtraction: 12,
    type: NotWorkingShiftType.AnnualLeave,
  },
  NZ: {
    code: ShiftCode.NZ,
    name: "niezatrudniony",
    from: 0,
    to: 24,
    color: "000000",
    isWorkingShift: false,
    type: NotWorkingShiftType.Util,
  },
};

export const FREE_SHIFTS_CODES = Object.values(SHIFTS)
  .filter((shift) => !shift.isWorkingShift && shift.code !== "W")
  .map((shift) => shift.code);

export const WORKING_SHIFTS_CODES = Object.values(SHIFTS)
  .filter((shift) => shift.isWorkingShift)
  .map((shift) => shift.code);

export interface ShiftTypesDict extends Record<keyof typeof SHIFTS, Shift> {
  [shiftCode: string]: Shift;
}
