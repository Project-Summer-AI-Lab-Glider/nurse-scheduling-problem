/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./timetable-row.styled";
import { useMonthInfo } from "../../../../hooks/use-month-info";
import { MonthInfoLogic } from "../../../../logic/schedule-logic/month-info.logic";
import { VerboseDate } from "../../../../state/schedule-data/foundation-info/foundation-info.model";
import { TimeTableCell } from "./timetable-cell.component";

export function TimeTableRow(): JSX.Element {
  let { verboseDates, monthNumber: currMont } = useMonthInfo();

  function createActualMonthData(): number[] {
    const today = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    return Array.from({ length: today.getDate() }, (_, i) => i + 1);
  }

  function getVerboseDates(): [VerboseDate[], number] {
    if (verboseDates && verboseDates.length > 0) {
      return [verboseDates, currMont];
    }
    const today = new Date();

    const monthLogic = new MonthInfoLogic(
      today.getMonth(),
      today.getFullYear().toString(),
      createActualMonthData()
    );

    return [monthLogic.verboseDates, monthLogic.monthNumber];
  }

  [verboseDates, currMont] = getVerboseDates();

  return (
    <S.TimetableRow data-cy="timetable-row">
      {verboseDates.map((verboseDate, cellIndex) => (
        <TimeTableCell
          key={`${verboseDate.date}_${cellIndex}`}
          value={verboseDate}
          currMonth={currMont}
          index={cellIndex}
        />
      ))}
    </S.TimetableRow>
  );
}
