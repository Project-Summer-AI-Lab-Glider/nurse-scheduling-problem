/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { Box, Snackbar as MaterialSnackbar } from "@material-ui/core";

export const List = styled(Box)`
  position: fixed;
  bottom: 0;
`;

export const Snackbar = styled(MaterialSnackbar)`
  position: relative;
  margin: 25px;
`;
