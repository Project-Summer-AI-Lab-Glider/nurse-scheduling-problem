/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  border: 1px solid ${colors.errorListItemBorder};
  border-radius: 2px;
  margin: 0 24px 8px 24px;
`;

export const RedBar = styled.div`
  border-radius: 4px;
  width: 4.5px;
  position: absolute;
  height: 100%;
  background-color: ${colors.errorRed};
  left: 0;
`;

export const Title = styled.div`
  padding: 10px 0 0 25px;
  color: ${colors.errorDateText};
  size: 14px;
`;

export const Content = styled.div`
  position: static;
  color: ${colors.primaryTextColor};
  size: 13px;
  margin: 10px;
  padding-left: 15px;
  text-align: justify;
  strong {
    letter-spacing: 1.5px;
    font-weight: bolder;
  }
`;
