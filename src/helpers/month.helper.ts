/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as _ from "lodash";
import { ScheduleKey } from "../logic/data-access/persistance-store.model";

export const NUMBER_OF_DAYS_IN_WEEK = 7;

interface DaysMissingToFullWeeks {
  daysMissingFromPrevMonth: number;
  daysMissingFromNextMonth: number;
}

export class MonthHelper {
  static getMonthLastWeekData<T>(
    scheduleKey: ScheduleKey,
    monthData: T[],
    nextMonthData: T[]
  ): T[] {
    const { daysMissingFromNextMonth } = this.calculateMissingFullWeekDays(scheduleKey);
    const monthLen = monthData.length;
    let lastWeek: T[];
    if (daysMissingFromNextMonth > 0) {
      const daysFromCurrentMonthInLastWeek = NUMBER_OF_DAYS_IN_WEEK - daysMissingFromNextMonth;
      const currentMonthDataPart = monthData.slice(
        monthLen - daysFromCurrentMonthInLastWeek,
        monthLen + 1
      );
      const nextMonthDataPart = nextMonthData.slice(0, daysMissingFromNextMonth);
      lastWeek = [...currentMonthDataPart, ...nextMonthDataPart];
    } else {
      lastWeek = monthData.slice(monthLen - NUMBER_OF_DAYS_IN_WEEK, monthLen + 1);
    }

    if (lastWeek.length !== NUMBER_OF_DAYS_IN_WEEK) {
      throw new Error(`Week must have ${NUMBER_OF_DAYS_IN_WEEK} days not ${lastWeek.length}`);
    }

    return lastWeek;
  }

  static getMonthLength(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  static getMonthFullWeeksDaysLen(year: number, month: number): number {
    const {
      daysMissingFromPrevMonth,
      daysMissingFromNextMonth,
    } = this.calculateMissingFullWeekDays(new ScheduleKey(month, year));
    let numberOfWeekInMonth = this.numberOfWeeksInMonth(month, year);
    daysMissingFromPrevMonth > 0 && numberOfWeekInMonth--;
    daysMissingFromNextMonth > 0 && numberOfWeekInMonth--;
    return NUMBER_OF_DAYS_IN_WEEK * numberOfWeekInMonth;
  }

  static findFirstMonthMondayIdx(year: number, month: number): number {
    return (NUMBER_OF_DAYS_IN_WEEK - new Date(year, month).getDay() + 1) % NUMBER_OF_DAYS_IN_WEEK;
  }

  static daysInMonth(month = 0, year = 0): number[] {
    return _.range(1, this.getMonthLength(year, month) + 1);
  }

  static getDateWithMonthOffset(month: number, year: number, offset: number): Date {
    const curDate = new Date(year, month);
    curDate.setMonth(curDate.getMonth() + offset);
    return curDate;
  }

  static calculateMissingFullWeekDays({ month, year }: ScheduleKey): DaysMissingToFullWeeks {
    const firstMonthDay = new Date(year, month, 1).getDay();
    const lastMonthDay = new Date(year, month + 1, 0).getDay();
    return {
      daysMissingFromPrevMonth:
        (firstMonthDay + NUMBER_OF_DAYS_IN_WEEK - 1) % NUMBER_OF_DAYS_IN_WEEK,
      daysMissingFromNextMonth: (NUMBER_OF_DAYS_IN_WEEK - lastMonthDay) % NUMBER_OF_DAYS_IN_WEEK,
    };
  }

  public static numberOfWeeksInMonth(month: number, year: number): number {
    const {
      daysMissingFromPrevMonth,
      daysMissingFromNextMonth,
    } = MonthHelper.calculateMissingFullWeekDays(new ScheduleKey(month, year));
    const monthLength = MonthHelper.daysInMonth(month, year).length;
    const fullScheduleDays = daysMissingFromPrevMonth + monthLength + daysMissingFromNextMonth;

    return fullScheduleDays / NUMBER_OF_DAYS_IN_WEEK;
  }
}
