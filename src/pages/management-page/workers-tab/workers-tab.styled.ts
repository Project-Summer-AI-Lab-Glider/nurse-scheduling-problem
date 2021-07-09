/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import {
  TableCell as MaterialTableCell,
  TableContainer as MaterialTableContainer,
} from "@material-ui/core";
import {
  colors,
  fontFamilyPrimary,
  fontSizeBase,
  fontSizeXs,
  headingLetterSpacing,
} from "../../../assets/css-consts";
import { Button } from "../../../components/common-components";

export const Wrapper = styled.div`
  margin-top: 45px;
`;

export const WorkerType = styled.span`
  border-radius: 20px;
  font-weight: 400;
  letter-spacing: 0.025em;
  background-color: ${colors.nurseColor};
  padding: 6px;

  &.nurse-label {
    background-color: ${colors.nurseColor};
  }

  &.other-label {
    background-color: ${colors.babysitterLabelBackground};
  }
`;

export const ActionButton = styled(Button)`
  font-size: ${fontSizeXs};
  padding: 2px 25px 2px;
`;

export const TableContainer = styled(MaterialTableContainer)`
  padding-top: 0;
  width: 100%;
`;

export const TableCell = styled(MaterialTableCell)`
  color: ${colors.primary};
  font-weight: normal;
  font-size: ${fontSizeBase};
  font-family: ${fontFamilyPrimary};
  letter-spacing: ${headingLetterSpacing};
`;
