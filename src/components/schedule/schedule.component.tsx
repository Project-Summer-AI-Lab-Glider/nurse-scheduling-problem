/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { useSelector } from "react-redux";
import * as S from "./schedule.styled";
import { t } from "../../helpers/translations.helper";
import { useTeams } from "../../hooks/use-teams";
import { WorkerHourInfo } from "../../logic/schedule-logic/worker-hours-info.logic";
import { getPresentEmployeeInfo } from "../../state/schedule-data/selectors";
import { FoundationInfoComponent } from "./foundation-info-section/foundation-info.component";
import { ScheduleFoldingSection } from "./schedule-folding-section.component";
import { OvertimeHeaderRow } from "./schedule-header/overtime-header-table/overtime-header-row.component";
import { TimeTableRow } from "./schedule-header/timetable/timetable-row.component";
import { WorkerInfoSection } from "./worker-info-section/worker-info-section.component";

export function ScheduleComponent(): JSX.Element {
  const teams = useTeams();

  const { time } = useSelector(getPresentEmployeeInfo);

  // Only for testing purposes
  if (
    process.env.REACT_APP_TEST_MODE &&
    Object.keys(time)
      .map((worker) => worker.toLowerCase())
      .includes(process.env.REACT_APP_ERROR_WORKER ?? "ERROR")
  ) {
    throw new Error("[TEST MODE] Error user was added");
  }

  return (
    <div style={{ margin: "20 0" }}>
      <S.TimeHeader>
        <S.TimeTableContainer>
          <TimeTableRow />
        </S.TimeTableContainer>
        <S.SummaryContainer>
          <OvertimeHeaderRow data={Object.values(WorkerHourInfo.summaryTranslations)} />
        </S.SummaryContainer>
      </S.TimeHeader>

      {Object.entries(teams).map(([teamName, workers], index) => (
        <ScheduleFoldingSection name={teamName} key={teamName}>
          <WorkerInfoSection sectionIndex={index} data={workers} sectionName={teamName} />
        </ScheduleFoldingSection>
      ))}

      <ScheduleFoldingSection name={t("scheduleSectionNameInformation")}>
        <FoundationInfoComponent />
      </ScheduleFoldingSection>
    </div>
  );
}
