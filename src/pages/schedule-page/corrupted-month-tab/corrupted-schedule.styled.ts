/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase, fontWeightBold } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 80vh;
`;

export const Image = styled.img`
  width: 150px;
  height: 100px;
`;

export const Message = styled.pre`
  color: ${colors.primary};
  font-weight: ${fontWeightBold};
  font-size: ${fontSizeBase};
  margin-top: 1rem;
`;
