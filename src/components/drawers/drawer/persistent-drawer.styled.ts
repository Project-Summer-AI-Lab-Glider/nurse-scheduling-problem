/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Box } from "@material-ui/core";
import styled from "styled-components";
import { drawerHeaderHeight, headerHeight } from "../../../assets/css-consts";
import { StyleProps } from "./persistent-drawer.component";

export const Drawer = styled(Box)<StyleProps>`
  width: ${({ width }) => width}px;
  height: calc(
    100vh -
      ${parseInt(headerHeight.slice(0, -2), 10) +
      parseInt(drawerHeaderHeight.slice(0, -2), 10) +
      1}px
  );
`;
