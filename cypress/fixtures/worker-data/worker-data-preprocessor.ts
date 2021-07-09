/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { MonthDataArray } from "../../../src/helpers/month-data-array.model";
import { ShiftCode } from "../../../src/state/schedule-data/shifts-types/shift-types.model";
import { ContractType } from "../../../src/state/schedule-data/worker-info/worker-info.model";
import { monthWorkerData } from "./march-2021-raw-worker-data";

const MARCH_DAY_COUNT = 31;
const MONTH = 2; // march
const YEAR = 2021;

const createWorkerInfoObject = (workerName: string): WorkerTestDataInstance => {
  const cropToMonth = <T>(data: T[]): MonthDataArray<T> =>
    data.slice(0, MARCH_DAY_COUNT) as MonthDataArray<T>;
  const actualWorkerShifts = cropToMonth<ShiftCode>(
    monthWorkerData.actualScheduleShifts[workerName] as ShiftCode[]
  );
  const primaryWorkerShifts = cropToMonth<ShiftCode>(
    monthWorkerData.primaryScheduleShifts[workerName] as ShiftCode[]
  );

  return {
    workerName,
    workerNorm: monthWorkerData.time[workerName],
    workerContract: ContractType.EMPLOYMENT_CONTRACT,
    workerReqiuredHours: monthWorkerData.requiredWorkHours[workerName],
    workerActualHours: monthWorkerData.actualWorkHours[workerName],
    workerOvertime: monthWorkerData.overtime[workerName],
    actualWorkerShifts,
    primaryWorkerShifts,
    month: MONTH,
    year: YEAR,
    dates: cropToMonth(monthWorkerData.dates),
  };
};

export interface WorkerTestDataInstance {
  workerName: string;
  workerNorm: number;
  workerContract: ContractType;
  workerReqiuredHours: number;
  workerActualHours: number;
  workerOvertime: number;
  actualWorkerShifts: ShiftCode[];
  primaryWorkerShifts: MonthDataArray<ShiftCode>;
  month: number;
  year: number;
  dates: number[];
}
export const workerTestData: WorkerTestDataInstance[] = Object.keys(monthWorkerData.time).map(
  createWorkerInfoObject
);
