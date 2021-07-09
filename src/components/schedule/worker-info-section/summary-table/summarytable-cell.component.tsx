/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./summarytable-cell.styled";
import { summaryCellDataCy, SummaryTableCellOptions } from "./summarytable-cell.models";

function SummaryTableCellF({ value, cellIndex }: SummaryTableCellOptions): JSX.Element {
  return (
    <S.Wrapper data-cy={summaryCellDataCy(cellIndex)}>
      <span>{value}</span>
    </S.Wrapper>
  );
}

export const SummaryTableCell: React.FC<SummaryTableCellOptions> = React.memo(
  SummaryTableCellF,
  (prev, next) => prev.value === next.value
);
