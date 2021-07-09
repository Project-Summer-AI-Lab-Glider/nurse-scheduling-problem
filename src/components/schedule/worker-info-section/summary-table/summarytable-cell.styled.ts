/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../../assets/css-consts";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 26px;
  background: ${colors.white};

  &:first-child {
    border-left: 0;
  }
`;
