/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { VerboseDate, WeekDay } from "../state/schedule-data/foundation-info/foundation-info.model";
import { PublicHolidaysLogic } from "../logic/schedule-logic/public-holidays.logic";
import { CellColorSet } from "./colors/cell-color-set.model";
import { ColorHelper } from "./colors/color.helper";
import { Colors } from "./colors/color.model";
import { MonthDataArray } from "./month-data-array.model";
import { Opaque } from "../utils/type-utils";

export type WorkingDay = Opaque<"WorkingDay", VerboseDate>;
export class VerboseDateHelper {
  public static generateVerboseDatesForMonth(
    month: number,
    year: number
  ): MonthDataArray<VerboseDate> {
    const lastDay = new Date(year, month + 1, 0);
    const publicHolidaysLogic = new PublicHolidaysLogic(year.toString());
    const weekDays = [
      WeekDay.SU,
      WeekDay.MO,
      WeekDay.TU,
      WeekDay.WE,
      WeekDay.TH,
      WeekDay.FR,
      WeekDay.SA,
    ];
    const dates = _.range(1, lastDay.getDate() + 1).map(
      (d) =>
        ({
          date: d,
          isPublicHoliday: publicHolidaysLogic.isPublicHoliday(d, month),
          dayOfWeek: weekDays[new Date(year, month, d).getDay()],
        } as VerboseDate)
    );
    return dates as MonthDataArray<VerboseDate>;
  }

  static isNotWeekend(date?: Pick<VerboseDate, "dayOfWeek">): date is WorkingDay {
    if (!date) {
      return false;
    }
    return !(date.dayOfWeek === WeekDay.SA || date.dayOfWeek === WeekDay.SU);
  }

  /**
   According to the law, for each holiday, in other day than Sunday
   an employer should provide an employee with one day off.
  */
  static countDayOffsFromHolidays(
    dates: Pick<VerboseDate, "isPublicHoliday" | "dayOfWeek">[]
  ): number {
    return (dates ?? []).filter((date) => date.isPublicHoliday && date.dayOfWeek !== WeekDay.SU)
      .length;
  }

  static isHolidaySaturday(date?: Pick<VerboseDate, "isPublicHoliday" | "dayOfWeek">): boolean {
    if (!date) {
      return false;
    }
    return date.isPublicHoliday && date.dayOfWeek === WeekDay.SA;
  }

  static getDayColor(
    day?: VerboseDate,
    defaultColorSet: CellColorSet = ColorHelper.DEFAULT_COLOR_SET,
    isFrozen = false,
    ignoreFrozenState = false
  ): CellColorSet {
    if (!day) {
      return defaultColorSet;
    }
    let colorSet = { ...defaultColorSet };
    switch (day.dayOfWeek) {
      case WeekDay.SA:
        colorSet = {
          backgroundColor: Colors.FADED_GREEN,
          textColor: Colors.BLACK,
        };
        break;
      case WeekDay.SU:
        colorSet = {
          backgroundColor: Colors.BEAUTY_BUSH,
          textColor: Colors.BLACK,
        };
        break;
    }
    if (day.isPublicHoliday) {
      colorSet = {
        backgroundColor: Colors.GREY_BLUE,
        textColor: Colors.BLACK,
      };
    }
    return isFrozen && !ignoreFrozenState
      ? { ...colorSet, backgroundColor: colorSet.backgroundColor.fade() }
      : colorSet;
  }

  static isMonthInFuture(month: number, year: number): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return year > currentYear || (year === currentYear && month > currentMonth);
  }
}
