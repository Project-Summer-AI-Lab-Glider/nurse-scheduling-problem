/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors, fontSizeBase } from "../../../assets/css-consts";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 5px;
`;

export const RevisionWrapper = styled.div`
  font-size: ${fontSizeBase};
  letter-spacing: 0.75px;
  color: ${colors.primary};
  padding: 0 25px 0 25px;

  .revision-select {
    border: 0;
    background: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    font-family: inherit;
    color: inherit;
  }
  select:focus {
    outline: none !important;
  }
`;

export const Filler = styled.div`
  flex-grow: 1;
`;

export const ErrorPresentInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0;
  color: ${colors.orange};
  p {
    margin: 2px auto auto 10px;
  }
`;
