/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { Button } from "../button-component/button.component";
import { colors } from "../../../assets/css-consts";

export const ColorSample = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const ColorSampleRow = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
`;

export const ColorSampleWrapper = styled.div`
  margin-top: 20px;
  padding: 10px 20px 20px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const ButtonListWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0 5px 30px 0 ${colors.gray400};
  position: relative;
  margin-top: -20px;
  background-color: ${colors.white};
  white-space: nowrap;
`;

export const DropdownButton = styled.div`
  width: var(--width) px;
  position: relative;
  text-align: left;
  height: 100%;

  padding: 7px 16px 7px;
  background-color: ${colors.white};
  color: ${colors.primary};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0;
    background-color: ${fade(colors.primary, 0.1)};
  }
  &:first-child {
    padding-top: 25px;
  }
`;

export const PlaceholderButton = styled(Button)`
  position: relative;
  width: var(--width) px;
`;

export const PlaceholderButtonContent = styled.div`
  width: calc(100% + 40px);
  margin-left: -15px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
`;
