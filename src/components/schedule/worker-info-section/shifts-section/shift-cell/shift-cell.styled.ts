/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { ErrorPopper } from "../../../../poppers/error-popper/error-popper.component";
import { colors, fontSizeBase, fontWeightBold } from "../../../../../assets/css-consts";

export const CellWrapper = styled.div`
  flex: 1 1 auto;
  border-left: 1px solid ${colors.tableBorderGrey};
  align-items: center;
  width: 120%;
  height: 100%;
  cursor: cell;
  padding: 0;
  overflow: hidden;

  &:first-child {
    border-left: 0;
  }

  &.weekend {
    background: ${colors.weekendHeader};
  }

  &.otherMonth {
    background: ${colors.cellOtherMonthBackgroundColor};
    color: ${colors.gray600};
  }

  &.selection {
    border-left: 1px solid white;
    background-color: white;
    outline: white solid 1px;
    box-shadow: 0 4px 7px rgba(16, 32, 70, 0.2), 0 0 7px rgba(16, 32, 70, 0.2);
  }
`;

export const StyledErrorPopper = styled(ErrorPopper)`
  height: 100%;
  width: 100%;
  padding: 4px 0 4px 0;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 4px 0 4px 0;
`;

export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

export const ShiftBar = styled.div`
  width: 4px;
  height: 100%;
  margin-right: 4px;
  border-radius: 2px 0 0 2px;
`;

export const Shift = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: auto;
  font-size: ${fontSizeBase};
  font-weight: ${fontWeightBold};
  line-height: 20px;
  letter-spacing: 0.75px;
  text-align: center;
  left: -2px;
`;
