/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const Message = styled.p`
  font-weight: bolder;
  letter-spacing: 0.75px;
`;

export const Input = styled(TextField)`
  letter-spacing: 0.25px;
  margin-top: 0;
`;
