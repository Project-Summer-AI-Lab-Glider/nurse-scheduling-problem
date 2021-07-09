/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
// months as used here are human-readable i.e. go from 1 to 12 (hence + 1)
/* eslint-disable no-bitwise */
type CustomDate = { day: number; month: number };

export class PublicHolidaysLogic {
  private publicHolidayDates: CustomDate[];

  constructor(year: string) {
    this.publicHolidayDates = [
      // fixed holidays (święta stałe)
      { day: 1, month: 1 },
      { day: 6, month: 1 },
      { day: 1, month: 5 },
      { day: 3, month: 5 },
      { day: 15, month: 8 },
      { day: 1, month: 11 },
      { day: 11, month: 11 },
      { day: 25, month: 12 },
      { day: 26, month: 12 },
      // moveable holidays (święta ruchome)
      ...this.moveableHolidays(parseInt(year, 10)),
    ];
  }

  public isPublicHoliday(day: number, month: number): boolean {
    return (
      this.publicHolidayDates.find(
        (holiday) => holiday.day === day && holiday.month === month + 1
      ) !== undefined
    );
  }

  private moveableHolidays(year: number): CustomDate[] {
    function dateToDayMonth(date: Date): CustomDate {
      return { day: date.getDate(), month: date.getMonth() + 1 };
    }

    // Easter
    const holidayDate = this.calculateEasterDate(year);
    let result = [dateToDayMonth(holidayDate)];

    // Easter Monday, 1 day after Easter (Poniedziałek Wielkanocny)
    holidayDate.setDate(holidayDate.getDate() + 1);
    result = [...result, dateToDayMonth(holidayDate)];

    // Green Week, 49 days after Easter (Zielone Świątki)
    holidayDate.setDate(holidayDate.getDate() + 48);
    result = [...result, dateToDayMonth(holidayDate)];

    // Feast of Corpus Christi, 60 days after Easter (Boże Ciało)
    holidayDate.setDate(holidayDate.getDate() + 11);
    result = [...result, dateToDayMonth(holidayDate)];

    return result;
  }

  // refer to https://pl.wikipedia.org/wiki/Wielkanoc#Metoda_Meeusa/Jonesa/Butchera
  private calculateEasterDate(year: number): Date {
    const a = year % 19;
    const b = (year / 100) | 0;
    const c = year % 100;
    const h = (19 * a + b - ((b / 4) | 0) - (((b - (((b + 8) / 25) | 0) + 1) / 3) | 0) + 15) % 30;
    const l = (32 + 2 * (b % 4) + 2 * ((c / 4) | 0) - h - (c % 4)) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);

    return new Date(
      year,
      Math.floor((h + l - 7 * m + 114) / 31) - 1,
      ((h + l - 7 * m + 114) % 31) + 1
    );
  }
}
