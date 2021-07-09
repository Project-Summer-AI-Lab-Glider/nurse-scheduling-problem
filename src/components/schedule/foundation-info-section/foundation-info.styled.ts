/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: row;

  &.borderContainer {
    border: 1px solid ${colors.tableBorderGrey};
    border-radius: 10px;
  }
`;

export const FoundationSectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding: 0;
  margin-right: 107px;
  box-sizing: border-box;

  overflow: hidden;
  border: none;
  border-radius: 0;
  border-left: 1px solid ${colors.tableBorderGrey};
`;
