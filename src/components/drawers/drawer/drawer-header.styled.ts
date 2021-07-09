/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid, IconButton, Box } from "@material-ui/core";
import styled from "styled-components";
import {
  colors,
  fontSizeLg,
  drawerHeaderHeight,
  fontFamilyPrimary,
  fontWeightExtra,
} from "../../../assets/css-consts";

export const Container = styled(Grid)`
  padding: 25px 24px 15px 24px;
  height: ${drawerHeaderHeight};
`;

export const FullHeightBox = styled(Box)`
  padding: 25px 24px 15px 24px;
  height: 97%;
  overflow-y: auto;
`;

export const ExitButton = styled(IconButton)`
  margin: -7px -8px;
  margin-top: -15px;
  color: ${colors.primary};
`;

export const Title = styled.h1`
  font-family: ${fontFamilyPrimary};
  font-weight: ${fontWeightExtra};
  font-size: ${fontSizeLg};
  line-height: 1.1;
  color: ${colors.primary};
`;
