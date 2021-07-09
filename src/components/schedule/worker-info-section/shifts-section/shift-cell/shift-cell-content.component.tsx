/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { CSSProperties, useMemo } from "react";
import { useSelector } from "react-redux";
import { ColorHelper } from "../../../../../helpers/colors/color.helper";
import { getPresentShiftTypes } from "../../../../../state/schedule-data/selectors";
import { ShiftCode } from "../../../../../state/schedule-data/shifts-types/shift-types.model";
import { baseCellDataCy } from "../../../base/base-cell/base-cell.models";
import { Content, ContentWrapper, Shift, ShiftBar, StyledErrorPopper } from "./shift-cell.styled";
import { ShiftCellOptions, DEFAULT_SHIFT_HEX } from "./shift-cell.component";

interface ShiftCellContentOptions extends Pick<ShiftCellOptions, "onClick" | "errorSelector"> {
  shiftCode: ShiftCode;
  keepOn?: boolean;
  isBlocked: boolean;
  cellIndex: number;
}
export function ShiftCellContent({
  shiftCode,
  keepOn,
  isBlocked,
  onClick,
  cellIndex,
  errorSelector,
}: ShiftCellContentOptions): JSX.Element {
  const shiftTypes = useSelector(getPresentShiftTypes);
  function conditionalClick() {
    if (!isBlocked) onClick?.();
  }

  const colorHex = `#${shiftTypes[shiftCode].color ?? DEFAULT_SHIFT_HEX}`;

  const cellStyle: CSSProperties = useMemo(() => {
    const color = ColorHelper.hexToRgb(colorHex).fade(0.3).toString();
    return !shiftTypes[shiftCode].isWorkingShift && shiftCode !== ShiftCode.W
      ? {
          boxShadow: !keepOn ? `-1px 0 0 0 ${color}` : "",
          margin: "0 0 4px 0px",
          backgroundColor: color,
          color,
        }
      : {};
  }, [shiftCode, keepOn, colorHex, shiftTypes]);

  return (
    <StyledErrorPopper errorSelector={errorSelector} showTooltip>
      <ContentWrapper onClick={conditionalClick}>
        <Content style={cellStyle}>
          {!keepOn && !shiftTypes[shiftCode].isWorkingShift && shiftCode !== ShiftCode.W && (
            <ShiftBar style={{ backgroundColor: colorHex }} />
          )}
          <Shift style={{ color: colorHex }} data-cy={baseCellDataCy(cellIndex, "cell")}>
            {keepOn || shiftCode === ShiftCode.W ? "" : shiftCode}
          </Shift>
        </Content>
      </ContentWrapper>
    </StyledErrorPopper>
  );
}
