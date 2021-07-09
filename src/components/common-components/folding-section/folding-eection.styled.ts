/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  height: auto;
  overflow: hidden;
`;

export const SeparatorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  padding-right: 10px;
  z-index: 100;
`;
