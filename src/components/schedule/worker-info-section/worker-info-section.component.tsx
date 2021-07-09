/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { useSelector } from "react-redux";
import * as S from "./worker-info-section.styled";
import { DataRow } from "../../../logic/schedule-logic/data-row";
import { NameTableSectionOptions } from "./name-table/nametable-section.component";
import { NameTableComponent } from "./name-table/nametable.component";
import { WorkerInfo } from "../../../hooks/use-worker-info";
import { ScheduleMode } from "../schedule-state.model";
import {
  ShiftsSectionComponent,
  ShiftsSectionOptions,
} from "./shifts-section/shifts-section.component";
import { shiftSectionDataCy } from "./worker-info-section.models";
import { getActualMode } from "../../../state/schedule-data/selectors";
import {
  SummaryTableSection,
  SummaryTableSectionOptions,
} from "./summary-table/summarytable-section.component";

type SubcomponentsOptions = Omit<NameTableSectionOptions, "isWorker" | "uuid" | "updateData"> &
  ShiftsSectionOptions &
  SummaryTableSectionOptions;

export interface WorkerInfoSectionOptions
  extends Omit<SubcomponentsOptions, "data" | "team" | "sectionKey"> {
  sectionName: string;
  data: WorkerInfo[];
  sectionIndex: number;
}

export function WorkerInfoSection({
  data,
  sectionIndex,
  ...options
}: WorkerInfoSectionOptions): JSX.Element {
  const mode = useSelector(getActualMode);

  const dataRows = data.map(
    (workerInfo) =>
      new DataRow(workerInfo.workerName, workerInfo.workerShifts, mode === ScheduleMode.Edit)
  );
  return (
    <S.Wrapper>
      <S.SectionContainer className="borderContainer">
        <div>
          <NameTableComponent data={dataRows} isWorker {...options} />
        </div>
        <S.ShiftSectionWrapper data-cy={shiftSectionDataCy(sectionIndex)}>
          <ShiftsSectionComponent sectionKey={options.sectionName} data={dataRows} {...options} />
        </S.ShiftSectionWrapper>
      </S.SectionContainer>
      <S.SummarySectionWrapper>
        <SummaryTableSection data={dataRows} {...options} sectionIndex={sectionIndex} />
      </S.SummarySectionWrapper>
    </S.Wrapper>
  );
}
