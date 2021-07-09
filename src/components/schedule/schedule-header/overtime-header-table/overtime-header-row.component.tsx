/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { ArrayHelper } from "../../../../helpers/array.helper";
import FileSignatureIcon from "../../../../assets/images/svg-components/FileSignatureIcon";
import ClockIcon from "../../../../assets/images/svg-components/ClockIcon";
import OvertimeIcon from "../../../../assets/images/svg-components/OvertimeIcon";
import { OvertimeHeaderContainer } from "./overtime-header-cell.styled";

export interface OvertimeHeaderRowOptions {
  data: string[];
}

function OvertimeHeaderRowF({ data }: OvertimeHeaderRowOptions): JSX.Element {
  return (
    <OvertimeHeaderContainer>
      <FileSignatureIcon />
      <ClockIcon />
      <OvertimeIcon />
    </OvertimeHeaderContainer>
  );
}

export const OvertimeHeaderRow = React.memo(OvertimeHeaderRowF, (prev, next) =>
  ArrayHelper.arePrimitiveArraysEqual(prev.data, next.data)
);
