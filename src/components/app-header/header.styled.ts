/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase } from "../../assets/colors";
import { Button as MaterialButton } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button } from "../buttons/button-component/button.component";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 52px;
  background-color: ${colors.primary};
  padding: 0 20px 0 20px;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  z-index: 2;
`;

export const ReturnToNowBtn = styled(Button)`
  margin-top: 0;
  font-size: ${fontSizeBase};
  padding: 0 10px;
  margin-bottom: 0;
`;

export const Settings = styled(SettingsIcon)`
  color: ${colors.white};
`;

export const Help = styled(HelpOutlineIcon)`
  margin: auto 5px;
  cursor: pointer;
  color: ${colors.white};
`;

export const Logo = styled(AssignmentIndIcon)`
  color: ${colors.white};
`;

export const Filler = styled.div`
  flex-grow: 1;
`;

export const ReportIssueBtn = styled(MaterialButton)`
  color: ${colors.white};
  padding-right: 5px;
  letter-spacing: 0.75px;
  outline: none;
  text-transform: none;
  &:hover {
    text-decoration: underline;
    transform: none;
  }
`;
