/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { TableSortLabel as MaterialTableSortLabel } from "@material-ui/core";
import { Button } from "../../../components/common-components";
import {
  colors,
  fontFamilyPrimary,
  fontSizeBase,
  headingLetterSpacing,
} from "../../../assets/css-consts";

export const HeaderButton = styled(Button)`
  width: 187px;
`;

export const TableSortLabel = styled(MaterialTableSortLabel)`
  && {
    font-size: ${fontSizeBase};
    font-family: ${fontFamilyPrimary};
    letter-spacing: ${headingLetterSpacing};
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
  }
  &&,
  &&:hover,
  &&[class*="active"] {
    color: ${colors.primary};
  }
`;
