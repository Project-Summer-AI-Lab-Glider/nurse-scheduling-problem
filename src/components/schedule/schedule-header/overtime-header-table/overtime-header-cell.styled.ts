/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../../assets/css-consts";

export const Wrapper = styled.div`
  padding-top: 100%;
  padding-bottom: 100%;
  align-content: center;
  position: relative;
  bottom: 25%;

  height: 100%;
  width: 100%;
  border-left: 1px solid ${colors.tableBorderGrey};

  color: ${colors.tableColor};
  background: ${colors.currMonthBackground};

  &:first-child {
    border-left: 0;
  }
`;

export const RotatedText = styled.span`
  writing-mode: vertical-rl;
  -ms-writing-mode: tb-lr;
  transform: rotate(180deg);
  letter-spacing: 0.4px;
  margin-top: -5px;
`;
