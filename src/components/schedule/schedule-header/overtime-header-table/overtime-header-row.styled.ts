/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";

export const SummaryRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-content: center;
  padding: 0;

  //text
  text-align: center;
  font-style: normal;

  &:not(:last-child) {
    &.selection {
      border-color: white;
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

export const SectionWrapper = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`;
