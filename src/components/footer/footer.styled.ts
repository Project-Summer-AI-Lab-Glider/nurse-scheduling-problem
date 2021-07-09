/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { colors, footerHeight } from "../../assets/css-consts";

export const Container = styled(Grid)`
  background: ${colors.white};
  padding: 10px;
  border-top: 1px solid #e9eef9;
  color: ${colors.primary};
  height: ${footerHeight};
  margin-top: 40px;
`;

export const Logo = styled.img`
  height: 46px;
  margin: 0px 10px;
`;
