/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../../assets/css-consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  width: 130px;
  cursor: default;

  background: ${colors.white};
  box-sizing: border-box;

  overflow: hidden;
  border: 1px solid ${colors.tableBorderGrey};
  border-radius: 10px;
`;
