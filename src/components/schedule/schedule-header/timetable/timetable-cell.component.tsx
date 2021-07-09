/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback, useEffect } from "react";
import classNames from "classnames/bind";
import * as S from "./timetable-cell.styled";
import {
  VerboseDate,
  WeekDay,
} from "../../../../state/schedule-data/foundation-info/foundation-info.model";
import {
  AlgorithmErrorCode,
  GroupedScheduleErrors,
  ScheduleError,
} from "../../../../state/schedule-data/schedule-errors/schedule-error.model";
import { TranslationHelper } from "../../../../helpers/translations.helper";
import FontStyles from "../../../../assets/theme/FontStyles";

export interface TimeTableCellOptions {
  value: VerboseDate;
  currMonth: number;
  index: number;
}

function TimeTableCellF({ value, currMonth, index }: TimeTableCellOptions): JSX.Element {
  function getHeaderClass(): string {
    if (value.month !== TranslationHelper.englishMonths[currMonth]) {
      return "otherMonth";
    }
    if (value.isPublicHoliday || value.dayOfWeek === WeekDay.SA || value.dayOfWeek === WeekDay.SU) {
      return "weekend";
    }
    return "";
  }
  const [today, setToday] = React.useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    setToday(
      value.month === TranslationHelper.englishMonths[now.getMonth()] &&
        value.date === now.getDate()
    );
  }, [value]);

  const errorSelector = useCallback(
    (scheduleErrors: GroupedScheduleErrors): ScheduleError[] => {
      const matchingErrorTypes = [
        ...(scheduleErrors[AlgorithmErrorCode.WorkerNumberDuringDay] ?? []),
        ...(scheduleErrors[AlgorithmErrorCode.WorkerNumberDuringNight] ?? []),
        ...(scheduleErrors[AlgorithmErrorCode.AlwaysAtLeastOneNurse] ?? []),
        ...(scheduleErrors[AlgorithmErrorCode.WorkerTeamsCollision] ?? []),
      ];
      return matchingErrorTypes.filter((error) => error.day === index);
    },
    [index]
  );

  return (
    <S.Wrapper className={getHeaderClass()}>
      <S.Popper errorSelector={errorSelector}>
        <S.DayName style={FontStyles.roboto.Light12px}>
          {TranslationHelper.weekDaysTranslations[value.dayOfWeek]}
        </S.DayName>
        <S.DayMarker style={FontStyles.roboto.Black12px} className={classNames({ today })}>
          <span>{value.date}</span>
        </S.DayMarker>
      </S.Popper>
    </S.Wrapper>
  );
}

export const TimeTableCell: React.FC<TimeTableCellOptions> = React.memo(
  TimeTableCellF,
  (prev, next) => prev.value === next.value
);
