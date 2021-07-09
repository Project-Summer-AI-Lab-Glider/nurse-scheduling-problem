/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { Divider } from "@material-ui/core";
import { fontSizeBase, fontSizeLg } from "../../../../assets/css-consts";
import { Button } from "../../../common-components";

export const WorkerNameLabel = styled.h2`
  font-size: ${fontSizeLg};
  font-weight: 700;
`;

export const WorkerTypeLabel = styled.p`
  border-radius: 20px;
  letter-spacing: 0.025em;
  background-color: ${({ color }): string | undefined => color};
  padding: 6px;
  width: 100px;
  text-align: center;
`;

export const CalendarDivider = styled(Divider)`
  margin: 20px 0;
`;

export const WorkerInfo = styled.p`
  margin-bottom: 0;
`;

export const ShiftsLabel = styled.h3`
  font-size: ${fontSizeBase};
  font-weight: 700;
`;

export const DownloadButton = styled(Button)`
  position: absolute;
  bottom: 74px;
  left: 23px;
`;
