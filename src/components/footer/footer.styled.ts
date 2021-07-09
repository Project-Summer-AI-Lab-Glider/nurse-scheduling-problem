/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  background: #fff;
  border-top: 1px solid #e9eef9;
  height: 42px;
  margin-top: 10px;
`;

export const Logo = styled.img`
  height: 46px;
  margin: 0px 10px;
`;
export const Part = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  justify-content: center;
  flex: 1;
`;
