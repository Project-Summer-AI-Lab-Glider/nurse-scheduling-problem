/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import * as S from "./cell-details-content.styled";
import { TranslationHelper } from "../../../../helpers/translations.helper";
import { getPresentShiftTypes } from "../../../../state/schedule-data/selectors";

export interface CellDetailsOptions {
  index: number;
  day: number;
  month: number;
  year: number;
  shiftcode: string;
  workerName?: string;
  close: () => void;
}

function prepareYearAndMonth(
  index: number,
  day: number,
  month: number,
  year: number
): [number, string] {
  let displayedYear = year;
  let monthName = `${TranslationHelper.polishMonthsGenetivus[month]}`;

  if (index < day - 1) {
    monthName = `${TranslationHelper.polishMonthsGenetivus[(month + 11) % 12]}`;
    displayedYear = month > 0 ? year : year - 1;
  } else if (index > 20 && day < 8) {
    monthName = `${TranslationHelper.polishMonthsGenetivus[(month + 1) % 12]}`;
    displayedYear = month < 11 ? year : year + 1;
  }
  return [displayedYear, monthName];
}

export function CellDetails(props: CellDetailsOptions): JSX.Element {
  const { index, day, month, year, shiftcode, close, workerName } = props;
  const [displayedYear, monthName] = prepareYearAndMonth(index, day, month, year);
  const shifts = useSelector(getPresentShiftTypes);
  const foundShift = shifts[shiftcode];

  return (
    <S.Wrapper>
      <S.ExitButton onClick={close}>
        <MdClose />
      </S.ExitButton>
      <S.Date>
        {day} {monthName} {displayedYear} r.
      </S.Date>
      {workerName && <div>{workerName}</div>}
      <S.Content>
        <S.ShiftColorBox style={{ backgroundColor: `#${foundShift.color}` }} />
        <S.ShiftBoxName style={{ backgroundColor: `#${foundShift.color}` }}>
          {foundShift.name}
        </S.ShiftBoxName>
        <S.ShiftName>{foundShift.name}</S.ShiftName>
        <S.ShiftDuration className="shift-time-from-to">
          {foundShift.isWorkingShift ? `${foundShift.from}:00 - ${foundShift.to}:00` : ""}
        </S.ShiftDuration>
      </S.Content>
    </S.Wrapper>
  );
}
