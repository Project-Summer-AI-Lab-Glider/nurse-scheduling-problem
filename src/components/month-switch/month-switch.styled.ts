/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { colors, fontSizeLg, iconSizeSm } from "../../assets/css-consts";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  margin: auto;

  * {
    color: ${colors.white};
  }
`;

export const IconWrapper = styled(IconButton)`
  outline: none;
  font-size: ${iconSizeSm};
`;

export const MonthName = styled.h2`
  margin: 5px;
  font-weight: 500;
  font-size: ${fontSizeLg};
  letter-spacing: 0.035em;
  width: 140px;
  text-align: center;
`;
