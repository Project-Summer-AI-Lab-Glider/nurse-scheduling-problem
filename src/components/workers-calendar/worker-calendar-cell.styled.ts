/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../assets/css-consts";

export const ShiftBar = styled.div`
  width: 4px;
  height: 100%;
  margin-right: 4px;
  border-radius: 2px 0 0 2px;
`;

export const ShiftCell = styled.div`
  width: 14.2%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-right: 1px solid ${colors.tableBorderGrey};
  border-bottom: 1px solid ${colors.tableBorderGrey};
`;

export const ShiftTop = styled.div`
  letter-spacing: 0.75px;
  font-weight: 400;
  display: flex;
  height: 40%;
  margin: 2px 5px 4px 5px;
  flex-direction: row;
  justify-content: flex-end;

  &.notCurrentMonthtrue {
    color: ${colors.gray500};
  }
`;

export const ShiftBottom = styled.div`
  height: 100%;
  min-height: 3vh;
  size: 4px;
  letter-spacing: 0.25px;
  font-weight: 800;
  display: flex;
  margin: 0 4px 4px 4px;
  justify-content: flex-start;
  flex-direction: row;
  border-radius: 2px;
`;

export const ShiftSymbol = styled.p`
  margin: auto;
`;
