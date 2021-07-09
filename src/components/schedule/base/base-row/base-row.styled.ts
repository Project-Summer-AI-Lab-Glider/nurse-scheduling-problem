/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../../assets/css-consts";

export const MainRow = styled.div`
  display: inline-flex;
  gap: 1px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0;
  position: static;
  height: 26px;

  //text
  text-align: center;
  margin-bottom: 5px;

  &:not(:last-child) {
    /* border-bottom: 1px solid ${colors.tableBorderGrey}; */

    &.selection {
      /* border-color: white; */
    }
  }

  &.selection {
    background-color: white;
    outline: white solid 1px;
    box-shadow: 0 4px 7px rgba(16, 32, 70, 0.2), 0 0 7px rgba(16, 32, 70, 0.2);
  }

  &.blocked {
    cursor: default;
  }
`;
