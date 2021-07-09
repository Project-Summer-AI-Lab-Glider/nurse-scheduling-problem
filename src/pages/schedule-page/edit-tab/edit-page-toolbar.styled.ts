/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled, { css } from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { colors, fontSizeBase, fontSizeXl } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 5px;
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const undoRedoIcon = css`
  color: ${colors.primary};
  font-size: ${fontSizeXl};
  margin: auto 10px auto 10px;
`;

export const UndoIcon = styled(ArrowBackIcon)`
  ${undoRedoIcon}
`;

export const RedoIcon = styled(ArrowForwardIcon)`
  ${undoRedoIcon}
`;

export const Filler = styled.div`
  flex-grow: 1;
`;

export const EditTextWrapper = styled.p`
  color: ${colors.primary};
  font-size: ${fontSizeBase};
  margin: auto;
`;
