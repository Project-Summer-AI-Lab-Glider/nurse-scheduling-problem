/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import {
  TableContainer as MaterialTableContainer,
  TableCell as MaterialTableCell,
} from "@material-ui/core";
import {
  fontFamilyPrimary,
  fontSizeBase,
  headingLetterSpacing,
  fontSizeXs,
} from "../../../assets/css-consts";
import { Button } from "../../../components/common-components";

export const TableContainer = styled(MaterialTableContainer)`
  padding: 0 0 0 10px;
  width: 100%;
`;

export const TableCell = styled(MaterialTableCell)`
  color: black;
  font-weight: normal;
  font-size: ${fontSizeBase};
  font-family: ${fontFamilyPrimary};
  letter-spacing: ${headingLetterSpacing};
  text-align: left;
  padding: 0 0 0 0;
`;

export const Wrapper = styled.div`
  margin-top: 45px;
`;

export const ActionButton = styled(Button)`
  font-size: ${fontSizeXs};
  padding: 2px 25px 2px;
`;

export const ColorSample = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 24px;
  background: #${({ color }) => color};
`;
