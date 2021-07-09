/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";

export const Wrapper = styled.div`
  align-content: center;
  position: relative;

  &:first-child {
    border-left: 0;
  }
`;

export const RotatedText = styled.span`
  position: absolute;
  writing-mode: vertical-rl;
  -ms-writing-mode: tb-lr;
  transform: rotate(180deg);
  letter-spacing: 0.4px;
`;
export const OvertimeHeaderContainer = styled.div`
  display: flex;
  width: 102px;
  margin-left: 5px;
  align-content: center;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
`;
