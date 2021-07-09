/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase } from "../../assets/css-consts";

export const SeparatorWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

export const Separator = styled.hr`
  width: 102%;
  border: 0;
  border-top: 2px solid ${colors.tableBorderGrey};
`;

export const LabelWrapper = styled.div`
  width: 126px;
  cursor: pointer;
  align-items: center;
  display: flex;
  font-style: normal;
  font-weight: bold;
  font-size: ${fontSizeBase};
  line-height: 20px;
  letter-spacing: 0.75px;
  color: ${colors.primary};
  padding-right: 10px;
`;
