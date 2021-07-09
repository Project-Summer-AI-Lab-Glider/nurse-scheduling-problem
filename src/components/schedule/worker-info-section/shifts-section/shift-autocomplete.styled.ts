/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import {
  colors,
  fontFamilyPrimary,
  fontSizeBase,
  fontWeightNormal,
} from "../../../../assets/css-consts";

export const AutoSeparator = styled.div`
  flex: 1;
  width: 90%;
  background-color: ${colors.gray400};
  height: 1.25px;
  display: flex;
  align-self: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ListBox = styled.div`
  position: absolute;
  padding: 10px 0;
  margin: -5px 0 0 -2px;
  overflow: auto;
  font-family: ${fontFamilyPrimary};
  font-size: ${fontSizeBase}rem;
  text-align: left;
  color: ${colors.primary};
  background-color: ${colors.white};
  font-weight: ${fontWeightNormal};
  box-shadow: 0 4px 7px rgba(16, 32, 70, 0.2);
  max-height: 500px;
  border-radius: 7px;
  min-width: 260px;
  z-index: 300;

  & > div {
    display: flex;
    margin-left: 0.6em;
    flex: 1;
    flex-direction: row;
    flex-wrap: nowrap;
    letter-spacing: 0.75px;
    align-content: center;
    justify-items: center;
    justify-content: left;
    &:hover {
      cursor: pointer;
    }
    &[data-focus="true"] {
      cursor: pointer;
    }
  }
`;

export const OptionLabel = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-right: 0.2em;
  word-wrap: normal;
  overflow-wrap: normal;
`;

export const OptionColor = styled.div`
  display: flex;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  margin: 0 0;
  align-self: center;
`;
