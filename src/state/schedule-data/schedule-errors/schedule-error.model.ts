/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { WorkerName } from "../schedule-sensitive-data.model";
import { ShiftCode } from "../shifts-types/shift-types.model";

export enum AlgorithmErrorCode {
  AlwaysAtLeastOneNurse = "AON",
  WorkerNumberDuringDay = "WND",
  WorkerNumberDuringNight = "WNN",
  DissalowedShiftSequence = "DSS",
  LackingLongBreak = "LLB",
  WorkerUnderTime = "WUH",
  WorkerOvertime = "WOH",
  WorkerTeamsCollision = "WTC",
}

export enum ParseErrorCode {
  UNKNOWN_VALUE = "unknownSymbol",
}

export enum InputFileErrorCode {
  EMPTY_FILE = "EMPTY_FILE",
  LOAD_FILE_ERROR = "LOAD_FILE_ERROR",
  UNHANDLED_FILE_EXTENSION = "UNHANDLED_FILE_EXTENSION",
}

export enum NetworkErrorCode {
  NETWORK_ERROR = "NETWORK_ERROR",
}

interface UnknownValueError {
  kind: ParseErrorCode.UNKNOWN_VALUE;
  isVisible?: boolean;
  actual: string;
  day?: number;
  worker?: WorkerName;
}

interface InputFileError {
  kind: InputFileErrorCode;
  isVisible?: boolean;

  message?: string;
  filename?: string;
}

export interface NetworkError {
  isVisible?: boolean;

  kind: NetworkErrorCode;
}

// #region  alghorithm error-list

export type DayTime = "MORNING" | "AFTERNOON" | "NIGHT";

export interface AlwaysAtLeastOneNurse {
  kind: AlgorithmErrorCode.AlwaysAtLeastOneNurse;
  isVisible?: boolean;
  day: number;
  day_time: number;
  segments: [[number, number]];
}

export interface WorkerNumberDuringDay {
  kind: AlgorithmErrorCode.WorkerNumberDuringDay;
  isVisible?: boolean;

  day: number;
  required: number;
  actual: number;
  segments: [[number, number]];
}
export interface WorkerNumberDuringNight {
  kind: AlgorithmErrorCode.WorkerNumberDuringNight;
  isVisible?: boolean;

  day: number;
  required: number;
  actual: number;
  segments: [[number, number]];
}
export interface DissalowedShiftSequence {
  kind: AlgorithmErrorCode.DissalowedShiftSequence;
  isVisible?: boolean;

  day: number;
  worker: string;
  preceding: ShiftCode;
  succeeding: ShiftCode;
}
export interface LackingLongBreak {
  kind: AlgorithmErrorCode.LackingLongBreak;
  isVisible?: boolean;

  week: number;
  worker: WorkerName;
}
export interface WorkerUnderTime {
  kind: AlgorithmErrorCode.WorkerUnderTime;
  isVisible?: boolean;

  hours: number;
  worker: WorkerName;
}
export interface WorkerOvertime {
  kind: AlgorithmErrorCode.WorkerOvertime;
  isVisible?: boolean;

  hours: number;
  worker: WorkerName;
}
export interface WorkerTeamsCollision {
  kind: AlgorithmErrorCode.WorkerTeamsCollision;
  isVisible?: boolean;

  day: number;
  hour: number;
  hours?: number[];
  workers: string[];
}

// #endregion

// #endregion
export type AlgorithmError =
  | AlwaysAtLeastOneNurse
  | WorkerNumberDuringDay
  | WorkerNumberDuringNight
  | DissalowedShiftSequence
  | LackingLongBreak
  | WorkerUnderTime
  | WorkerOvertime
  | WorkerTeamsCollision;

export type ScheduleError = UnknownValueError | InputFileError | NetworkError | AlgorithmError;

export type ErrorCode = ParseErrorCode | InputFileErrorCode;

export type GroupedScheduleErrors = {
  [key in ErrorCode]?: ScheduleError[];
} & {
  [AlgorithmErrorCode.AlwaysAtLeastOneNurse]?: AlwaysAtLeastOneNurse[];
  [AlgorithmErrorCode.WorkerNumberDuringDay]?: WorkerNumberDuringDay[];
  [AlgorithmErrorCode.WorkerNumberDuringNight]?: WorkerNumberDuringNight[];
  [AlgorithmErrorCode.DissalowedShiftSequence]?: DissalowedShiftSequence[];
  [AlgorithmErrorCode.LackingLongBreak]?: LackingLongBreak[];
  [AlgorithmErrorCode.WorkerUnderTime]?: WorkerUnderTime[];
  [AlgorithmErrorCode.WorkerOvertime]?: WorkerOvertime[];
  [AlgorithmErrorCode.WorkerTeamsCollision]?: WorkerTeamsCollision[];
};
