/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./overtime-header-row.styled";
import { ArrayHelper } from "../../../../helpers/array.helper";
import { OvertimeHeaderCell } from "./overtime-header-cell.component";

export interface OvertimeHeaderRowOptions {
  data: string[];
}

function OvertimeHeaderRowF({ data }: OvertimeHeaderRowOptions): JSX.Element {
  return (
    <S.SectionWrapper>
      <S.SummaryRow>
        {data.map((cellData) => (
          <OvertimeHeaderCell value={cellData} key={cellData} />
        ))}
      </S.SummaryRow>
    </S.SectionWrapper>
  );
}

export const OvertimeHeaderRow = React.memo(OvertimeHeaderRowF, (prev, next) =>
  ArrayHelper.arePrimitiveArraysEqual(prev.data, next.data)
);
