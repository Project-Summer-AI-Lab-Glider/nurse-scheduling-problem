/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { ErrorPopper } from "../../../poppers/error-popper/error-popper.component";
import { colors } from "../../../../assets/css-consts";

export const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    border-left: none;
  }

  &.weekend {
    background: ${({ theme }) => theme.calendarWeekend};
  }
  &.otherMonth {
    background: ${({ theme }) => theme.calendarOtherMonth};
  }
`;

export const Popper = styled(ErrorPopper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DayName = styled.span``;

export const DayMarker = styled.div`
  text-align: center;

  &.today {
    border-radius: 50%;
    height: 18px;
    width: 18px;
    background: ${({ theme }) => theme.primaryText};
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: ${colors.white};
      text-align: center;
    }
  }
`;
