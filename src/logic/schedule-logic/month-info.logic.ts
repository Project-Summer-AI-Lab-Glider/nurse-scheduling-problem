/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { StringHelper } from "../../helpers/string.helper";
import { TranslationHelper } from "../../helpers/translations.helper";
import {
  VerboseDate,
  WeekDay,
} from "../../state/schedule-data/foundation-info/foundation-info.model";
import { PublicHolidaysLogic } from "./public-holidays.logic";

export class MonthInfoLogic {
  public monthNumber: number;

  private _verboseDates: VerboseDate[] = [];

  private monthDates: number[];

  private publicHolidaysLogic: PublicHolidaysLogic;

  public get currentDate(): [number, number] {
    return [new Date().getMonth(), new Date().getFullYear()];
  }

  public get dates(): number[] {
    return this._verboseDates.map((d) => d.date);
  }

  public get dayCount(): number {
    return this._verboseDates.length;
  }

  public get daysOfWeek(): WeekDay[] {
    return this._verboseDates.map((d) => d.dayOfWeek);
  }

  public readonly year: string;

  constructor(monthId: string | number, year: string | number, monthDates?: number[]) {
    this.year = year.toString();
    if (typeof monthId == "string") {
      monthId = TranslationHelper.polishMonths.findIndex(
        (month) => StringHelper.getRawValue(month) === monthId
      );
    }
    if (!monthDates) {
      this.monthDates = this.generateMonthDates(monthId, year);
    } else {
      this.monthDates = monthDates;
    }

    this.monthNumber = monthId;

    this.publicHolidaysLogic = new PublicHolidaysLogic(year.toString());

    this._verboseDates = this.createCalendar(this.monthNumber, parseInt(this.year, 10));
  }

  private generateMonthDates(monthNumber: number, year: string | number): number[] {
    const dates: number[] = [];
    const month = TranslationHelper.englishMonths[monthNumber];
    let day = 1;
    while (this.isDateBelongsToMonth(day, month, year)) {
      dates.push(day);
      ++day;
    }
    return dates;
  }

  public get verboseDates(): VerboseDate[] {
    return this._verboseDates;
  }

  public get numberOfPreviousMonthDays(): number {
    const month = TranslationHelper.englishMonths[this.monthNumber];
    return this._verboseDates.filter((date) => date.month !== month).length;
  }

  private createCalendar(monthNumber: number, year: number): VerboseDate[] {
    const verboseDates: VerboseDate[] = [];
    // declare array by hand instead of using Object.values(WeekDay), to be sure
    // that order of day will always be consistent with js-function Date.getDay()
    const weekDays = [
      WeekDay.SU,
      WeekDay.MO,
      WeekDay.TU,
      WeekDay.WE,
      WeekDay.TH,
      WeekDay.FR,
      WeekDay.SA,
    ];
    let currentMonth = monthNumber - 1;
    if (currentMonth === -1) {
      currentMonth = 11;
      year -= 1;
    }
    for (const day of this.monthDates) {
      if (day === 1) {
        currentMonth += 1;
        if (currentMonth === 12) {
          currentMonth = 0;
          year += 1;
        }
      }
      const isPublicHoliday = this.publicHolidaysLogic.isPublicHoliday(day, currentMonth);
      const monthName = TranslationHelper.englishMonths[currentMonth];
      const date = new Date(`${day} ${monthName} ${year}`);
      verboseDates.push({
        date: day,
        dayOfWeek: weekDays[date.getDay()],
        isPublicHoliday,
        isFrozen: false,
        month: monthName,
      });
    }
    return verboseDates;
  }

  private isDateBelongsToMonth(date: number, month: string, year: string | number): boolean {
    return (
      TranslationHelper.englishMonths[new Date(`${date} ${month} ${year}`).getMonth()] === month
    );
  }
}
