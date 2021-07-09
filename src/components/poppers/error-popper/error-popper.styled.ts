/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { Popper } from "../popper";
import { colors } from "../../../assets/css-consts";

export const ErrorTooltip = styled(Popper)`
  position: absolute;
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: 13px;
  border-radius: 4px;
  z-index: 3;
  max-width: 500px;
`;

export const ErrorTriangle = styled.span`
  --border-width: 7px;
  position: absolute;
  top: 0;
  right: -5px;

  display: block;
  width: 0;
  height: 0;
  border-left: var(--border-width) solid transparent;
  border-right: var(--border-width) solid transparent;

  border-bottom: var(--border-width) solid ${colors.errorRed};
  box-shadow: 0 3px 2px -1px rgba(0, 0, 0, 0.25);

  transform: rotate(45deg);
`;
export const LeftBottomErrorTooltip = styled(ErrorTriangle)`
  transform: rotate(225deg);
  left: -5px;
  bottom: 0;
  top: auto;
`;

export const RightBottomErrorTooltip = styled(ErrorTriangle)`
  transform: rotate(135deg);
  top: auto;
  right: -5px;
  bottom: 0;
`;

export const ErrorLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${colors.errorRed};
`;
