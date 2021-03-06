/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useActualMonth } from "./use-actual-month";
import { MonthSwitchActionCreator } from "../../../state/reducers/month-state/schedule-data/month-switch.action-creator";
import { IconButton } from "@material-ui/core";
import { AppMode, useAppConfig } from "../../../state/app-config-context";

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
    <div id="month-switch" className="month-switch-container">
      {actualMonth && (
        <div className="switch-container">
          {
            /* https://github.com/mui-org/material-ui/issues/13957 */
            showMonthNavigation && (
              <IconButton
                className="arrow-button"
                id="month-switch"
                data-cy="switch-prev-month"
                onClick={(): void => {
                  dispatch(MonthSwitchActionCreator.switchToNewMonth(-1));
                }}
              >
                <MdChevronLeft />
              </IconButton>
            )
          }

          <h2 className="month-tittle">{actualMonth}</h2>

          {
            /* https://github.com/mui-org/material-ui/issues/13957 */
            showMonthNavigation && (
              <IconButton
                className="arrow-button"
                id="month-switch"
                data-cy="switch-next-month"
                onClick={(): void => {
                  dispatch(MonthSwitchActionCreator.switchToNewMonth(1));
                }}
              >
                <MdChevronRight />
              </IconButton>
            )
          }
        </div>
      )}
    </div>
  );
}
