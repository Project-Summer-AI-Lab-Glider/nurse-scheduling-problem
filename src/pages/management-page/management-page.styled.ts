/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../assets/css-consts";

export const Wrapper = styled.div`
  overflow: auto;
  width: 100%;
  padding: 20px;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: ${colors.primaryTextColor};
  margin: 0 10px 10px 10px;
`;
