/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: left;
  line-height: normal;
`;

export const ExitButton = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 5px;
`;

export const Date = styled.div`
  font-weight: lighter;
  padding-right: 20px;
`;

export const Content = styled.div`
  width: 100%;
  margin: auto;
  height: 40px;
  align-content: stretch;
  padding-top: 10px;
  display: flex;
`;

export const ShiftBoxName = styled.div`
  color: white;
  opacity: 0.3;
  padding: 7px;
  padding-right: 13px;
  height: 100%;
  display: inline-block;
`;

export const ShiftName = styled.div`
  color: black;
  opacity: 1;
  display: inline;
  position: absolute;
  top: 57px;
  left: 22px;
`;

export const ShiftColorBox = styled.div`
  opacity: 1;
  width: 5px;
  height: 100%;
  border-radius: 5px;
  display: inline-block;
`;

export const ShiftDuration = styled.div`
  padding-top: 7px;
  padding-right: 20px;
  position: relative;
  left: 15px;
  vertical-align: middle;
  font-weight: lighter;
`;
