/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { TabList as MaterialTabList, TabPanel as MaterialTabPanel } from "@material-ui/lab";
import { Tab as MaterialTab } from "@material-ui/core";
import { colors } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  width: calc(100% - 20px);
  margin-top: 42px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
`;

export const TabList = styled(MaterialTabList)`
  & span[class*="indicator"] {
    background-color: ${({ theme }) => theme.primary};
    height: 3px;
    bottom: 7px;
    outline: none;
  }
`;

export const Tab = styled(MaterialTab)`
  && {
    text-transform: none;
    color: ${({ disabled, theme }) => (disabled ? colors.gray100 : theme.primaryText)};
    outline: none;
    font-weight: ${({ theme }) => theme.FontStyles.roboto.Regular16px.fontWeight};
    font-size: ${({ theme }) => theme.FontStyles.roboto.Regular16px.fontSize};
    min-width: 0;
    opacity: 1;
    outline: none;
    margin: 0 20px 0 0;
    padding: 0;
  }
  &:hover {
    color: ${({ disabled, theme }) => (disabled ? colors.gray100 : theme.primaryText)};
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
    opacity: 1;
    outline: none;
  }
  &[class*="selected"] {
    outline: none;
    font-weight: ${({ theme }) => theme.FontStyles.roboto.Black16px.fontWeight};
  }
`;

export const TabPanel = styled(MaterialTabPanel)`
  && {
    min-width: 0;
    outline: none;
    padding: 0;
  }
`;
