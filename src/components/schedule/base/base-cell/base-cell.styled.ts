/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeXs } from "../../../../assets/css-consts";
import { ErrorPopper } from "../../../poppers/error-popper/error-popper.component";

export const Wrapper = styled.div`
  flex: 1 1 auto;
  border-left: 1px solid ${colors.tableBorderGrey};
  align-items: center;
  width: 120%;
  height: 100%;
  cursor: cell;
  padding: 0;
  overflow: hidden;
  color: ${colors.tableColor};
  background: ${colors.white};

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
`;

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 4px 0 4px 0;
`;

export const Popper = styled(ErrorPopper)`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

export const CellWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

export const CellValue = styled.p`
  display: flex;
  flex-direction: row;
  margin: auto;
  font-size: ${fontSizeXs};
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.75px;
  text-align: center;
  left: -2px;

  min-width: 10px;
  min-height: 10px;
  position: relative;
`;
