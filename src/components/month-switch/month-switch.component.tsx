/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as S from "./month-switch.styled";
import { useActualMonth } from "../../hooks/use-actual-month";
import { MonthSwitchActionCreator } from "../../state/schedule-data/month-switch.action-creator";
import { AppMode, useAppConfig } from "../../state/app-config-context";
import FontStyles from "../../assets/theme/FontStyles";

interface MonthSwitchComponentOptions {
  isInViewMode: boolean;
}

export function MonthSwitchComponent({ isInViewMode }: MonthSwitchComponentOptions): JSX.Element {
  const [showMonthNavigation, setShowMonthNavigation] = useState(false);

  const actualMonth = useActualMonth();
  const dispatch = useDispatch();
  const { mode } = useAppConfig();
  useEffect(() => {
    mode === AppMode.SCHEDULE
      ? setShowMonthNavigation(isInViewMode)
      : setShowMonthNavigation(false);
  }, [mode, isInViewMode]);

  return (
    <>
      {actualMonth && (
        <S.Wrapper>
          <S.IconWrapper
            data-cy="switch-prev-month"
            onClick={() => dispatch(MonthSwitchActionCreator.switchToNewMonth(-1))}
            style={{ display: showMonthNavigation ? "block" : "none" }}
          >
            <MdChevronLeft />
          </S.IconWrapper>

          <S.MonthName style={FontStyles.roboto.Black16px} data-cy="month-name">
            {actualMonth}
          </S.MonthName>

          <S.IconWrapper
            data-cy="switch-next-month"
            onClick={() => dispatch(MonthSwitchActionCreator.switchToNewMonth(1))}
            style={{ display: showMonthNavigation ? "block" : "none" }}
          >
            <MdChevronRight />
          </S.IconWrapper>
        </S.Wrapper>
      )}
    </>
  );
}
