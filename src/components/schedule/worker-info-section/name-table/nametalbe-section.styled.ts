/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";

export const Wrapper = styled.div`
  align-items: center;
  padding: 0;
  margin-right: 5px;
  width: 102px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  height: 26px;
  width: 100%;
  padding: 10px, 6px, 10px, 6px;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 2px;
  cursor: default;

  &.isFirst {
  }

  &.isLast {
    margin-bottom: 0;
  }
`;

export const LabelWrapper = styled.div`
  padding: 4px;
`;
