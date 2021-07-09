/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from "react";
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";

interface ErrorSwitchInterface {
  errorStyle: string;
  errorsLength: number;
  errorRef: React.MutableRefObject<HTMLDivElement>;
}
export const ErrorSwitch = ({ errorsLength, errorStyle, errorRef }: ErrorSwitchInterface) => {
  if (errorsLength !== 0) {
    switch (errorStyle) {
      case "single": {
        return <ErrorTriangle ref={errorRef} />;
      }
      case "right": {
        return (
          <>
            <ErrorLine ref={errorRef} />
            <RightBottomErrorTooltip ref={errorRef} />
          </>
        );
      }
      case "middle": {
        return <ErrorLine ref={errorRef} />;
      }
      case "left": {
        return (
          <>
            <ErrorLine ref={errorRef} />
            <LeftBottomErrorTooltip ref={errorRef} />
          </>
        );
      }
    }
  }
  return <></>;
};

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
const LeftBottomErrorTooltip = styled(ErrorTriangle)`
  transform: rotate(225deg);
  left: -5px;
  bottom: 0;
  top: auto;
`;

const RightBottomErrorTooltip = styled(ErrorTriangle)`
  transform: rotate(135deg);
  top: auto;
  right: -5px;
  bottom: 0;
`;

const ErrorLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: ${colors.errorRed};
`;
