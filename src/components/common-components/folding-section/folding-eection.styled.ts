/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  min-height: 50px;
  height: auto;
  overflow: hidden;
  padding-top: 20px;
`;

export const SeparatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
`;

export const Separator = styled.hr`
  width: 100%;
  border: 0;
  border-top: 2px solid ${colors.tableBorderGrey};
  z-index: 1;
`;

export const LabelWrapper = styled.div`
  cursor: pointer;
  white-space: nowrap;
  align-items: center;
  display: flex;
  font-style: normal;
  font-size: ${fontSizeBase};
  line-height: 20px;
  letter-spacing: 0.75px;
  color: ${colors.primaryTextColor};
  padding-right: 10px;
  z-index: 100;
  background-color: white;
`;
