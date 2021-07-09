/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export enum ScheduleErrorLevel {
  INFO = "info",
  WARNING = "warning",
  CRITICAL_ERROR = "error",
}

export enum ScheduleErrorType {
  OTH = "OTH",
  AON = "AON",
  WND = "WND",
  WNN = "WNN",
  DSS = "DSS",
  LLB = "LLB",
  WUH = "WUH",
  WOH = "WOH",
  WTC = "WTC",
  ILLEGAL_SHIFT_VALUE = "ILLEGAL_SHIFT_VALUE",
}

export interface ScheduleErrorMessageModel {
  index?: number;
  kind: string;
  title?: string;
  message?: string;
  worker?: string;
  workers?: string[];
  day?: number;
  week?: number;
  level?: ScheduleErrorLevel;
  type?: ScheduleErrorType;
  isVisible?: boolean;
}
