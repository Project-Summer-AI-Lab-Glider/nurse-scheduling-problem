/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { PublicHolidaysLogic } from "../../../../../src/logic/schedule-logic/public-holidays.logic";
import {
  FIXED_HOLIDAYS,
  MOVEABLE_HOLIDAYS,
  NON_HOLIDAYS,
} from "../../../../fixtures/unit/logic/schedule-logic/public-holidays";

type CustomDate = { day: number; month: number };

describe("PublicHolidayLogic", () => {
  describe("isPublicHoliday", () => {
    const YEARS_TO_TEST = ["2020", "2021", "2022"];

    YEARS_TO_TEST.forEach((year) => {
      context(`when year is ${year}`, () => {
        const logic = new PublicHolidaysLogic(year);

        it("sees fixed holidays as holidays", () => {
          testDates(logic, year, FIXED_HOLIDAYS, true);
        });

        it("sees moveable holidays as holidays", () => {
          testDates(logic, year, MOVEABLE_HOLIDAYS[year], true);
        });

        it("sees non-holidays as non-holidays", () => {
          testDates(logic, year, NON_HOLIDAYS[year], false);
        });
      });
    });
  });
});

function testDates(
  logic: PublicHolidaysLogic,
  year: string,
  dates: CustomDate[],
  shouldBeHolidays: boolean
): void {
  dates.forEach((date) => {
    const { day, month } = date;
    const message = `${day}.${month}.${year} is ${shouldBeHolidays ? "" : "not"} a holiday`;
    expect(logic.isPublicHoliday(day, month)).to.equal(shouldBeHolidays, message);
  });
}
