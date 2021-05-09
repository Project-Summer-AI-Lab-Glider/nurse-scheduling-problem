/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTeams } from "../../hooks/use-teams";
import { WorkerHourInfo } from "../../logic/schedule-logic/worker-hours-info.logic";
import { ApplicationStateModel } from "../../state/application-state.model";
import { FoundationInfoComponent } from "./foundation-info-section/foundation-info.component";
import { ScheduleFoldingSection } from "./schedule-folding-section.component";
import { OvertimeHeaderComponent } from "./schedule-header/overtime-header-table/overtime-header.component";
import { TimeTableComponent } from "./schedule-header/timetable/timetable.component";
import { WorkerInfoSection } from "./worker-info-section/worker-info-section.component";

export function ScheduleComponent(): JSX.Element {
  const teams = useTeams();

  const { time } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present.employee_info
  );

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
      <div>
        <TimeHeader>
          <TimeTableContainer>
            <TimeTableComponent />
          </TimeTableContainer>
          <SummaryContainer>
            <OvertimeHeaderComponent data={Object.values(WorkerHourInfo.summaryTranslations)} />
          </SummaryContainer>
        </TimeHeader>

        {Object.entries(teams).map(([teamName, workers], index) => (
          <ScheduleFoldingSection name={teamName} key={teamName}>
            <WorkerInfoSection sectionIndex={index} data={workers} sectionName={teamName} />
          </ScheduleFoldingSection>
        ))}

        <ScheduleFoldingSection name="Informacje">
          <FoundationInfoComponent />
        </ScheduleFoldingSection>
      </div>
    </div>
  );
}
const TimeHeader = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;

  top: 52px;
  z-index: 3;
  flex: 1;
  padding-top: 19px;
  width: 1500px;
`;

const TimeTableContainer = styled.div`
  margin-left: 128px;
`;
const SummaryContainer = styled.div`
  margin-left: 32px;
`;