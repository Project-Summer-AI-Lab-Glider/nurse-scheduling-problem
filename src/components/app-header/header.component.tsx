/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "../../helpers/translations.helper";
import { AppConfigContext, AppConfigOptions, AppMode } from "../../state/app-config-context";
import { MonthSwitchActionCreator } from "../../state/schedule-data/month-switch.action-creator";
import { getActualMode, getPresentScheduleInfo } from "../../state/schedule-data/selectors";
import ReportIssueModal from "../modals/report-issue-modal/report-issue-modal.component";
import { MonthSwitchComponent } from "../month-switch/month-switch.component";
import { ScheduleMode } from "../schedule/schedule-state.model";
import * as S from "./header.styled";

function monthDiff(d1: Date, d2: Date): number {
  let months: number;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months;
}

export function HeaderComponent(): JSX.Element {
  const applicationStateModel = useSelector(getActualMode);
  const appConfigContext = useAppConfig().mode;

  const dispatch = useDispatch();
  const { month_number: monthNumber, year } = useSelector(getPresentScheduleInfo);

  const [isNewMonth, setIsNewMonth] = useState(false);
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setIsNewMonth(monthNumber !== currentMonth);
  }, [monthNumber]);

  function returnToCurrentMonth(): void {
    const offset = monthDiff(new Date(year, monthNumber), new Date());
    dispatch(MonthSwitchActionCreator.switchToNewMonth(offset));
  }

  const isInViewMode = applicationStateModel === ScheduleMode.Readonly;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onReportIssueClick(): void {
    setIsModalOpen(true);
  }

  function useAppConfig(): AppConfigOptions {
    const context = useContext(AppConfigContext);

    if (!context) throw new Error("useAppConfig have to be used within AppConfigProvider");

    return context;
  }

  const [showNowNavigation, setShowNowNavigation] = useState(false);

  useEffect(() => {
    appConfigContext === AppMode.SCHEDULE
      ? setShowNowNavigation(isInViewMode)
      : setShowNowNavigation(false);
  }, [appConfigContext, isInViewMode]);

  const redirectToDocumentation = useCallback((): void => {
    window.open(process.env.REACT_APP_HELP_PAGE_URL);
  }, []);
  return (
    <S.Header id="header">
      <S.Logo />
      <S.ReturnToNowBtn
        data-cy="return-to-now-button"
        hidden={!isNewMonth || !showNowNavigation}
        variant="secondary"
        onClick={returnToCurrentMonth}
      >
        {t("returnToNow")}
      </S.ReturnToNowBtn>
      <S.Filler />
      <MonthSwitchComponent isInViewMode={isInViewMode} />
      <S.Filler />
      <S.ReportIssueBtn onClick={onReportIssueClick}>{t("reportError")}</S.ReportIssueBtn>
      <ReportIssueModal open={isModalOpen} setOpen={setIsModalOpen} />
      <S.Settings />
      <S.Help onClick={redirectToDocumentation} />
    </S.Header>
  );
}
