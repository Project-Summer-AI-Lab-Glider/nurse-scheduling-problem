/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { ErrorPopper } from "../../../../poppers/error-popper/error-popper.component";

export const CellWrapper = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 26px;
  background: #fff;
  cursor: cell;
  padding: 0;
  overflow: hidden;

  &:first-child {
    border-left: 0;
  }

  &.weekend {
    background: ${({ theme }) => theme.calendarWeekend};
  }

  &.otherMonth {
    background: ${({ theme }) => theme.calendarOtherMonth};
  }

  &.selection {
    border-left: 1px solid white;
    background-color: white;
    outline: white solid 1px;
    box-shadow: 0 4px 7px rgba(16, 32, 70, 0.2), 0 0 7px rgba(16, 32, 70, 0.2);
  }
`;

export const StyledErrorPopper = styled(ErrorPopper)`
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  align-self: "center";
  width: 100%;
  height: 18px;
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
  align-self: center;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: auto;
  text-align: center;
  left: -2px;
`;
