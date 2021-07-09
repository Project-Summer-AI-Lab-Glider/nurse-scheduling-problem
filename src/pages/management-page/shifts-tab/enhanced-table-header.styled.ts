/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import TableCell from "@material-ui/core/TableCell";
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";
import { Button } from "../../../components/common-components";

export const StyledTableCell = styled(TableCell)`
  margin-top: 45px;
  font-weight: bolder;
  color: ${colors.primary};
  padding: 0px;
`;

export const HeaderButton = styled(Button)`
  width: 187px;
`;
