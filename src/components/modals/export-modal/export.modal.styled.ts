/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase } from "../../../assets/css-consts";

export const Label = styled.span`
  color: ${colors.primary};
  font-size: ${fontSizeBase};
  line-height: 1.1;
`;

export const FormatWrapper = styled.div`
  display: flex;
  align-items: center;
`;
