/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./summarytable-cell.styled";
import { summaryCellDataCy, SummaryTableCellOptions } from "./summarytable-cell.models";

function SummaryTableCellF({ value, cellIndex, type }: SummaryTableCellOptions): JSX.Element {
  return (
    <S.Wrapper data-cy={summaryCellDataCy(cellIndex)}>
      <span style={{ color: type === "overTime" && value !== 0 ? "#F31C43" : "#333333" }}>
        {value > 0 && type === "overTime" ? `+${value}` : value}
      </span>
    </S.Wrapper>
  );
}

export const SummaryTableCell: React.FC<SummaryTableCellOptions> = React.memo(
  SummaryTableCellF,
  (prev, next) => prev.value === next.value
);
