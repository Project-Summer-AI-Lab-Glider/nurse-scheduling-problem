/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { WorkersInfoModel } from "./worker-info.model";
import { MonthInfoModel } from "./month-info.model";
import { ScheduleMetadata } from "./schedule.model";
import { ShiftCode, ShiftInfoModel } from "./shift-info.model";
import { ScheduleKey } from "../api/persistance-store.model";
import _ from "lodash";
import { daysInMonth } from "../state/reducers/month-state/schedule-data/common-reducers";
/* eslint-disable @typescript-eslint/camelcase */

export interface ScheduleDataModel {
  schedule_info: ScheduleMetadata;
  month_info: MonthInfoModel;
  employee_info: WorkersInfoModel;
  shifts: ShiftInfoModel;
}

export interface MonthDataModel extends Omit<ScheduleDataModel, "schedule_info"> {
  scheduleKey: ScheduleKey;
}

export function isMonthModelEmpty(monthDataModel: MonthDataModel): boolean {
  const requiredFields: (keyof MonthDataModel)[] = ["employee_info", "month_info", "shifts"];
  return requiredFields.every((field) => {
    const requiredObject = monthDataModel[field];
    return Object.values(requiredObject).every((field) => _.isEmpty(field));
  });
}

export function createEmptyMonthDataModel(
  scheduleKey: ScheduleKey,
  { employee_info, shifts }: Pick<MonthDataModel, "employee_info" | "shifts">
): MonthDataModel {
  const dates = daysInMonth(scheduleKey.month, scheduleKey.year);
  const monthLength = dates.length;

  const freeShifts: ShiftInfoModel = {};
  Object.keys(shifts).forEach((key) => {
    freeShifts[key] = new Array(monthLength).fill(ShiftCode.W);
  });

  return {
    scheduleKey,
    month_info: {
      children_number: new Array(monthLength).fill(0),
      extra_workers: new Array(monthLength).fill(0),
      frozen_shifts: [],
      dates,
    },
    employee_info: employee_info,
    shifts: freeShifts,
  };
}

export function getScheduleKey(newSchedule: ScheduleDataModel): ScheduleKey {
  return new ScheduleKey(
    newSchedule.schedule_info.month_number ?? new Date().getMonth(),
    newSchedule.schedule_info.year ?? new Date().getFullYear()
  );
}
