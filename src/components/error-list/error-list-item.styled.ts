/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../assets/css-consts";

export const Wrapper = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  text-align: left;
  border: 1px solid ${colors.errorListItemBorder};
  border-radius: 2px;
  margin-bottom: 5px;
  padding: 10px 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RedBar = styled.div`
  position: absolute;
  border-radius: 4px;
  width: 4.5px;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${colors.errorRed};
`;

export const Title = styled.div`
  color: ${colors.errorDateText};
  size: 14px;
`;

export const Message = styled.div`
  color: ${colors.primaryTextColor};
  size: 13px;
  text-align: justify;
  strong {
    letter-spacing: 1.5px;
    font-weight: bolder;
  }
`;
