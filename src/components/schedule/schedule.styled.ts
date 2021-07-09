/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";

export const TimeHeader = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;

  top: 52px;
  z-index: 3;
  flex: 1;
  padding-top: 19px;
  width: 1500px;
`;

export const TimeTableContainer = styled.div`
  margin-left: 128px;
`;

export const SummaryContainer = styled.div`
  margin-left: 32px;
`;
