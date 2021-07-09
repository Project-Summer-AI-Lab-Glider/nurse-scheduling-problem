/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { ErrorPopper } from "../../../poppers/error-popper/error-popper.component";

export const Wrapper = styled.div`
  flex: 1;
  height: 26px;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  text-align: center;
  cursor: cell;
  padding: 0;
  overflow: hidden;
  background: #fff;

  &:first-child {
    border-left: 0;
  }

  &.weekend {
    background: ${({ theme }) => theme.calendarWeekend};
  }

  &.otherMonth {
    background: ${({ theme }) => theme.calendarOtherMonth};
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 26px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const Popper = styled(ErrorPopper)`
  display: flex;
  justify-content: flex-start;
`;

export const CellWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 26px;
  justify-content: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  text-align: center;
`;

export const CellValue = styled.p`
  display: block;
  margin: 0 auto !important;
  align-self: center;
  font-size: ${({ theme }) => theme.FontStyles.roboto.Light12px.fontSize};
  font-weight: ${({ theme }) => theme.FontStyles.roboto.Light12px.fontWeight};
`;
