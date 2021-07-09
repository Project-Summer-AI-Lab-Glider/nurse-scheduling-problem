/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase } from "../../assets/css-consts";

export const SeparatorWrapper = styled.div`
  height: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const Separator = styled.div`
  width: 102%;
  height: 1px;
  border: 0;
  background: #c4c4c4;
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
