/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ScheduleKey } from "../../../../../src/logic/data-access/persistance-store.model";
import { MonthHelper } from "../../../../../src/helpers/month.helper";

interface TestCase {
  title: string;
  monthNumber: number;
  year: number;
  dayInMonth: number;
  missingDaysToFullWeek: {
    prevMonth: number;
    nextMonth: number;
  };
}

const testCases: TestCase[] = [
  {
    title: "january (31 days)",
    monthNumber: 0,
    year: 2021,
    dayInMonth: 31,
    missingDaysToFullWeek: {
      prevMonth: 4,
      nextMonth: 0,
    },
  },
  {
    title: "month consisting only of full weeks",
    monthNumber: 1,
    year: 2021,
    dayInMonth: 28,
    missingDaysToFullWeek: {
      prevMonth: 0,
      nextMonth: 0,
    },
  },
  {
    title: "february with leap day (29 days)",
    monthNumber: 1,
    year: 2020,
    dayInMonth: 29,
    missingDaysToFullWeek: {
      prevMonth: 5,
      nextMonth: 1,
    },
  },
];

describe("Schedule preprocessor functions", () => {
  testCases.forEach((test) => {
    it(`calculates proper month length for ${test.title}`, () => {
      const days = MonthHelper.daysInMonth(test.monthNumber, test.year);
      expect(days.length).eql(test.dayInMonth);
    });

    it(`calculates how many days are missing from previous and next month to create full weeks for ${test.title}`, () => {
      const {
        daysMissingFromPrevMonth,
        daysMissingFromNextMonth,
      } = MonthHelper.calculateMissingFullWeekDays(new ScheduleKey(test.monthNumber, test.year));
      expect(daysMissingFromPrevMonth).eql(test.missingDaysToFullWeek.prevMonth);
      expect(daysMissingFromNextMonth).eql(test.missingDaysToFullWeek.nextMonth);
    });
  });

  it("calculates proper weeks number for different months", () => {
    expect(MonthHelper.numberOfWeeksInMonth(0, 2021)).eql(5);
    expect(MonthHelper.numberOfWeeksInMonth(1, 2021)).eql(4);
    expect(MonthHelper.numberOfWeeksInMonth(2, 2021)).eql(5);
    expect(MonthHelper.numberOfWeeksInMonth(3, 2021)).eql(5);
    expect(MonthHelper.numberOfWeeksInMonth(4, 2021)).eql(6);
    expect(MonthHelper.numberOfWeeksInMonth(5, 2021)).eql(5);
    expect(MonthHelper.numberOfWeeksInMonth(6, 2021)).eql(5);
    expect(MonthHelper.numberOfWeeksInMonth(7, 2021)).eql(6);

    expect(MonthHelper.numberOfWeeksInMonth(11, 2019)).eql(6);
  });
});
