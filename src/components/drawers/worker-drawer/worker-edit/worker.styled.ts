/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  Grid,
  Typography,
  TextField as MaterialTextField,
  Input as MaterialInput,
} from "@material-ui/core";
import styled from "styled-components";
import { fontSizeBase, fontSizeXs, lineHeightXl } from "../../../../assets/css-consts";
import { Button } from "../../../common-components";

export const OptionsContainer = styled(Grid)`
  min-height: 80%;
`;

export const SubmitButton = styled(Button)`
  position: absolute;
  bottom: 74px;
  left: 23px;
`;

export const Label = styled(Typography)`
  font-size: ${fontSizeBase};
  font-weight: 700;
  line-height: ${lineHeightXl};
  margin-left: 4%;
`;

export const ErrorLabel = styled(Typography)`
  font-size: ${fontSizeXs};
  font-weight: 100;
  line-height: ${lineHeightXl};
  margin-left: 4%;
  color: red;
  height: 20px;
`;

export const TextField = styled(MaterialTextField)`
  margin-left: 4%;
`;

export const Input = styled(MaterialInput)`
  margin-left: 4%;
`;
