/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { ErrorPopper } from "../../../poppers/error-popper/error-popper.component";
import {
  colors,
  fontSizeBase,
  fontWeightBase,
  fontWeightBold,
} from "../../../../assets/css-consts";

export const Wrapper = styled.div`
  width: 100%;
  border-left: 1px solid ${colors.tableBorderGrey};
  color: ${colors.tableColor};
  background: ${colors.currMonthBackground};

  &:first-child {
    border-left: none;
  }

  &.weekend {
    background: ${colors.weekendHeader};
  }
  &.otherMonth {
    opacity: 0.5;
  }
`;

export const Popper = styled(ErrorPopper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  height: 75px;
  padding-top: 30%;
`;

export const DayName = styled.span`
  color: ${colors.primary};
  font-size: ${fontSizeBase};
  font-weight: ${fontWeightBase};
`;

export const DayMarker = styled.div`
  color: ${colors.primary};
  font-size: ${fontSizeBase};
  font-weight: ${fontWeightBold};
  text-align: center;

  &.today {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background: ${colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: ${colors.white};
      text-align: center;
    }
  }
`;
