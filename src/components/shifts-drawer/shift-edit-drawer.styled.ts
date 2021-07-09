/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { Radio, RadioGroup } from "@material-ui/core";
import { colors, fontSizeBase, fontWeightExtra } from "../../assets/css-consts";

export const FormLabel = styled.h4`
  font-weight: 700;
  font-size: ${fontSizeBase};
  color: ${colors.primary};
`;

export const TimeRange = styled.div`
  * {
    display: inline-flex;
  }
`;

export const Dash = styled.p`
  font-weight: ${fontWeightExtra};
  font-size: ${fontSizeBase};
  color: ${colors.gray700};
  margin-left: 10px;
  margin-right: 10px;
`;

export const RadioGroupStyled = styled(RadioGroup)`
  color: ${colors.primary};
  fill: ${colors.primary};

  &:hover {
    background-color: ${colors.gray100};
  }
`;

export const StyledRadio = styled(Radio)`
  color: ${colors.primary};
`;

export const DropdownWrapper = styled.div`
  margin-left: -10px;
`;
