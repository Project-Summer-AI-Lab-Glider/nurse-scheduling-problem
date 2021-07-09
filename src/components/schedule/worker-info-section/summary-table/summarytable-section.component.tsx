/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./summarytable-section.styled";
import { DataRow } from "../../../../logic/schedule-logic/data-row";
import { SummaryTableRow } from "./summarytable-row.component";
import { summaryTableSectionDataCy } from "./summarytable-section.models";

export interface SummaryTableSectionOptions {
  data: DataRow[];
  sectionIndex: number;
}

export function SummaryTableSection({
  data,
  sectionIndex,
}: SummaryTableSectionOptions): JSX.Element {
  return (
    <S.Wrapper id="summaryTable" data-cy={summaryTableSectionDataCy(sectionIndex)}>
      {data.map((dataRow, rowIndex) => (
        <SummaryTableRow key={dataRow.rowKey} workerName={dataRow.rowKey} rowIndex={rowIndex} />
      ))}
    </S.Wrapper>
  );
}
