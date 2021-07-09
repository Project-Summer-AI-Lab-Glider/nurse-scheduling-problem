/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { TabList as MaterialTabList, TabPanel as MaterialTabPanel } from "@material-ui/lab";
import { Tab as MaterialTab } from "@material-ui/core";
import {
  fontWeightMedium,
  fontWeightBold,
  colors,
  fontSizeLg,
  fontFamilyPrimary,
} from "../../../assets/css-consts";

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 52px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`;

export const TabList = styled(MaterialTabList)`
  & span[class*="indicator"] {
    background-color: ${colors.primary};
    height: 3px;
    outline: none;
  }
`;

export const Tab = styled(MaterialTab)`
  && {
    text-transform: none;
    color: ${({ disabled }) => (disabled ? colors.gray100 : colors.secondaryTextColor)};
    outline: none;
    font-weight: ${fontWeightMedium};
    font-size: ${fontSizeLg};
    font-family: ${fontFamilyPrimary};
    min-width: 0;
    outline: none;
    margin: 0 20px 0 0;
    padding: 0;
  }
  &:hover {
    color: ${({ disabled }) => (disabled ? colors.gray100 : colors.primaryTextColor)};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    opacity: 1;
    outline: none;
  }
  &[class*="selected"] {
    color: ${colors.secondaryTextColor};
    outline: none;
    font-weight: ${fontWeightBold};
  }
`;

export const TabPanel = styled(MaterialTabPanel)`
  && {
    min-width: 0;
    outline: none;
    margin: 0 20px 0 0;
    padding: 0;
  }
`;
