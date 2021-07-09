/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { fade } from "@material-ui/core";
import { colors, headerHeight } from "./assets/css-consts";

export const Root = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: block;
  overflow-x: auto;
  overflow-y: auto;
  height: 100vh;
  flex-grow: 1;
`;

export const Drawer = styled.div`
  margin-top: ${headerHeight};
  background: ${colors.white};
  border-left: 1px solid ${colors.gray200};
  box-shadow: 0px 0px 5px 0px ${fade(colors.black, 0.15)};
  position: relative;
  z-index: 80;
`;
