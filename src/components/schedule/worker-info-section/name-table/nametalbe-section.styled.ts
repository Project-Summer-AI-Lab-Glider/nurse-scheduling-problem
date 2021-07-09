/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeXs } from "../../../../assets/css-consts";

export const Wrapper = styled.div`
  align-items: center;
  padding: 0;
  width: 126px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;

  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizeXs};

  color: ${colors.primaryTextColor};
  border-bottom: 1px solid ${colors.tableBorderGrey};
  cursor: default;

  &.babysitterMarker {
    border-left: 3px solid ${colors.babysitterColor};
    cursor: pointer;
  }

  &.nurseMarker {
    border-left: 3px solid ${colors.nurseColor};
    cursor: pointer;
  }

  &.isFirst {
    border-top-left-radius: 10px;
  }

  &.isLast {
    border-bottom-left-radius: 10px;
    border-bottom: 0;
  }
`;

export const LabelWrapper = styled.div`
  padding: 4px;
`;
