/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import {
  SCHEDULE_CONTAINERS_LENGTH,
  ScheduleContainerType,
  MonthFoundationInfoModel,
} from "../schedule-data.model";
import { MonthHelper } from "../../../helpers/month.helper";
import { ScheduleKey } from "../../../logic/data-access/persistance-store.model";

export enum WeekDay {
  MO = "MO",
  TU = "TU",
  WE = "WE",
  TH = "TH",
  FR = "FR",
  SA = "SA",
  SU = "SU",
}

export interface VerboseDate {
  date: number;
  dayOfWeek: WeekDay;
  isPublicHoliday: boolean;
  isFrozen?: boolean;
  month: string;
}

export interface FoundationInfoModel {
  children_number?: number[];
  extra_workers?: number[];
  frozen_shifts?: [number | string, number][];
  dates: number[];
}

export function validateFoundationInfo(
  foundationInfo: FoundationInfoModel | MonthFoundationInfoModel,
  containerType: ScheduleContainerType
): void {
  const scheduleLen = foundationInfo.dates.length;
  if (!SCHEDULE_CONTAINERS_LENGTH[containerType].includes(scheduleLen)) {
    throw new Error(
      `Schedule dates have wrong length: ${scheduleLen}. It should be equal to one of: ${SCHEDULE_CONTAINERS_LENGTH[containerType]}`
    );
  }
  if (
    foundationInfo.children_number !== undefined &&
    scheduleLen !== foundationInfo.children_number.length
  ) {
    throw new Error(
      `Children number should have the same length as schedule equal to ${scheduleLen} not: ${foundationInfo.children_number.length}`
    );
  }
  if (
    foundationInfo.extra_workers !== undefined &&
    scheduleLen !== foundationInfo.extra_workers.length
  ) {
    throw new Error(
      `Extra workers should have the same length as schedule equal to ${scheduleLen} not ${foundationInfo.extra_workers.length}`
    );
  }
}

export function createDatesForMonth(year: number, month: number): number[] {
  const {
    daysMissingFromPrevMonth,
    daysMissingFromNextMonth,
  } = MonthHelper.calculateMissingFullWeekDays(new ScheduleKey(month, year));
  const { prevMonthKey } = new ScheduleKey(month, year);
  const prevMonthLength = MonthHelper.getMonthLength(prevMonthKey.year, prevMonthKey.month);
  const prevMonthDates = _.range(
    prevMonthLength - daysMissingFromPrevMonth + 1,
    prevMonthLength + 1
  );

  const currentMonthDates = MonthHelper.daysInMonth(month, year);
  const nextMonthDates = _.range(1, daysMissingFromNextMonth + 1);

  return [...prevMonthDates, ...currentMonthDates, ...nextMonthDates];
}
