/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode } from "../../../../src/state/schedule-data/shifts-types/shift-types.model";
import { GetWorkerShiftOptions } from "../../../support/commands";

interface WorkerTestCase {
  title: string;
  startShiftCell: GetWorkerShiftOptions;
  endShiftCell: GetWorkerShiftOptions;
  desiredShiftCode: ShiftCode;
}
export const prevMonthDays = 6;

export const workerTestCases: WorkerTestCase[] = [
  {
    title: "Should be able to edit multiple days of single nurse (drag left to right)",
    startShiftCell: {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: 3,
    },
    endShiftCell: {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: 7,
    },
    desiredShiftCode: ShiftCode.L4,
  },
  {
    title: "Should be able to edit multiple days of single nurse (drag right to left)",
    startShiftCell: {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: prevMonthDays + 3,
    },
    endShiftCell: {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: prevMonthDays,
    },
    desiredShiftCode: ShiftCode.U,
  },
  {
    title: "Should be able to edit multiple single day of multiple nurses",
    startShiftCell: {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: prevMonthDays + 5,
    },
    endShiftCell: {
      teamIdx: 0,
      workerIdx: 1,
      shiftIdx: prevMonthDays + 5,
    },
    desiredShiftCode: ShiftCode.L4,
  },
  {
    title: "Should be able to edit multiple days of single babysitter",
    startShiftCell: {
      teamIdx: 1,
      workerIdx: 0,
      shiftIdx: 0,
    },
    endShiftCell: {
      teamIdx: 1,
      workerIdx: 0,
      shiftIdx: prevMonthDays + 8,
    },
    desiredShiftCode: ShiftCode.L4,
  },
  {
    title: "Should be able to edit multiple single day of multiple babysitters",
    startShiftCell: {
      teamIdx: 1,
      workerIdx: 0,
      shiftIdx: prevMonthDays + 3,
    },
    endShiftCell: {
      teamIdx: 1,
      workerIdx: 1,
      shiftIdx: prevMonthDays + 6,
    },
    desiredShiftCode: ShiftCode.L4,
  },
];

export enum FoundationInfoKeys {
  EXTRA_WORKERS,
  CHILDREN,
}

interface FoundationTestCase {
  title: string;
  dataKey: FoundationInfoKeys;
  startDayIdx: number;
  endDayIdx: number;
  desiredNumber: number;
}

export const foundationTestCases: FoundationTestCase[] = [
  {
    title: "Should be able to edit extra workers number with range selection",
    dataKey: FoundationInfoKeys.EXTRA_WORKERS,
    startDayIdx: prevMonthDays + 3,
    endDayIdx: prevMonthDays + 8,
    desiredNumber: 10,
  },
  {
    title: "Should be able to edit children number with range selection",
    dataKey: FoundationInfoKeys.CHILDREN,
    startDayIdx: prevMonthDays + 12,
    endDayIdx: prevMonthDays + 3,
    desiredNumber: 13,
  },
];
