/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { alertHeight, colors, fontSizeBase } from "../../assets/css-consts";
import { ReactComponent } from "../../assets/images/done.svg";

export const ShadowContainer = styled.div`
  height: ${alertHeight};
  border-radius: ${alertHeight};
  backgroundcolor: ${colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
`;

export const AlertContainer = styled(Grid)`
  height: ${alertHeight};
  border-radius: ${alertHeight};
  background-color: ${colors.secondary};
  opacity: 0.8;
  padding: 15px 22px;
  text-align: center;
`;

export const DoneIcon = styled(ReactComponent)`
  margin-right: 9px;
`;

export const Text = styled(Grid)`
  font-size: ${fontSizeBase};
  letter-spacing: 0.75;
  color: ${colors.white};
`;
