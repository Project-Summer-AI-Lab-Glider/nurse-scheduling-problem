/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TabContext } from "@material-ui/lab";
import { useTheme } from "styled-components";
import Envelope from "../../assets/images/svg-components/Envelope";
import OutlineCog from "../../assets/images/svg-components/OutlineCog";
import QuestionCircle from "../../assets/images/svg-components/QuestionCircle";
import FontStyles from "../../assets/theme/FontStyles";
import { t } from "../../helpers/translations.helper";
import { AppConfigContext, AppConfigOptions, AppMode } from "../../state/app-config-context";
import { MonthSwitchActionCreator } from "../../state/schedule-data/month-switch.action-creator";
import { getActualMode, getPresentScheduleInfo } from "../../state/schedule-data/selectors";
import ReportIssueModal from "../modals/report-issue-modal/report-issue-modal.component";
import { MonthSwitchComponent } from "../month-switch/month-switch.component";
import { ScheduleMode } from "../schedule/schedule-state.model";
import * as S from "./header.styled";
import * as SS from "../buttons/route-buttons/route-buttons.styled";
import Logo from "../../assets/images/svg-components/Logo";

function monthDiff(d1: Date, d2: Date): number {
  let months: number;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months;
}
export interface Tabs {
  label: string;
  component: JSX.Element;
  dataCy: string;
  onChange?: () => void;
}

interface RouteButtonsOptions {
  handleChange: (event: React.ChangeEvent<unknown>, newValue: string) => void;
  tabLabel: string;
  tabs: Tabs[];
  disabled?: boolean;
}
export function HeaderComponent(props: RouteButtonsOptions): JSX.Element {
  const { tabs, disabled, handleChange, tabLabel } = props;

  const tabTitles = useMemo(
    () =>
      tabs.map((tab) => (
        <SS.Tab
          disableRipple
          disabled={disabled}
          key={tab.label}
          label={tab.label}
          value={tab.label}
          data-cy={tab.dataCy}
        />
      )),
    [tabs, disabled]
  );

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

  const theme = useTheme();

  return (
    <>
      <S.Header id="header">
        <S.Row style={{ justifyContent: "flex-start" }}>
          <Logo style={{ marginLeft: "16px" }} />
          <S.Row style={{ marginLeft: "8px", marginRight: "50px", flex: 0 }}>
            <p style={{ color: theme.primary, fontSize: "19px" }}>Schedule</p>
            <p style={{ color: theme.primary, fontSize: "19px", fontWeight: 900 }}>.it</p>
          </S.Row>
          {!isInViewMode ? (
            <p
              style={{ ...FontStyles.roboto.Black16px, color: theme.primary }}
              data-cy="edit-mode-text"
            >
              {t("editModeActive")}
            </p>
          ) : (
            <TabContext value={tabLabel}>
              <SS.TabList onChange={!disabled ? handleChange : void 0}>{tabTitles}</SS.TabList>
            </TabContext>
          )}
        </S.Row>

        <S.Row style={{ position: "relative" }}>
          <S.Row style={{ flex: 0 }}>
            <S.ReturnToNowBtn
              data-cy="return-to-now-button"
              hidden={!isNewMonth || !showNowNavigation}
              variant="secondary"
              onClick={returnToCurrentMonth}
              style={{ position: "absolute", margin: 0, left: "16px" }}
            >
              {t("returnToNow")}
            </S.ReturnToNowBtn>
            <MonthSwitchComponent isInViewMode={isInViewMode} />
          </S.Row>
        </S.Row>
        <S.Row style={{ justifyContent: "flex-end" }}>
          <S.UtilityButton onClick={onReportIssueClick}>
            <Envelope style={{ marginRight: "6px" }} />
            <p style={FontStyles.roboto.Regular10px}>{t("reportError")}</p>
          </S.UtilityButton>
          <S.UtilityButton>
            <OutlineCog style={{ marginRight: "6px" }} />
            <p style={FontStyles.roboto.Regular10px}>{t("changeSettings")}</p>
          </S.UtilityButton>

          <S.UtilityButton onClick={redirectToDocumentation} style={{ marginRight: "16px" }}>
            <QuestionCircle style={{ marginRight: "6px" }} />
            <p style={FontStyles.roboto.Regular10px}>{t("help")}</p>
          </S.UtilityButton>
        </S.Row>
      </S.Header>
      <ReportIssueModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
}
