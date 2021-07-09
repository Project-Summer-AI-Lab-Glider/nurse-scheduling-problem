/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../assets/css-consts";

export const Wrapper = styled.div`
  width: 100%;
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: space-between;
  border-left: 1px solid ${colors.tableBorderGrey};
  border-top: 1px solid ${colors.tableBorderGrey};
`;

export const DayName = styled.div`
  size: 14px;
  letter-spacing: 0.75px;
  font-weight: 400;
  width: 14.2%;
  height: 30px;
  padding: 5px;
  margin: auto;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.tableBorderGrey};
  border-right: 1px solid ${colors.tableBorderGrey};
`;
