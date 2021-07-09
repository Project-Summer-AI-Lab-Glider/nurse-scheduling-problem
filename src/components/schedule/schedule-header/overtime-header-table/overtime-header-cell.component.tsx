/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./overtime-header-cell.styled";

export interface OvertimeHeaderCellOptions {
  value: string;
}

function OvertimeHeaderCellF({ value }: OvertimeHeaderCellOptions): JSX.Element {
  return (
    <S.Wrapper>
      <S.RotatedText>{value}</S.RotatedText>
    </S.Wrapper>
  );
}

export const OvertimeHeaderCell: React.FC<OvertimeHeaderCellOptions> = React.memo(
  OvertimeHeaderCellF,
  (prev, next) => prev.value === next.value
);
