/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";
import { Button } from "../../common-components";

export const Title = styled.h3`
  color: ${colors.errorRed};
`;

export const ErrorLoadingText = styled.div`
  display: block;
  margin: auto;
  text-align: center;
  font-weight: 500;
  size: 16px;
  line-height: 28px;
  color: ${colors.primary};
  clear: both;
  position: relative;
  top: 27px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorButton = styled(Button)`
  display: block;
  margin: auto;
  position: relative;
  top: 41px;
`;

export const Image = styled.img`
  display: block;
  margin: auto;
  width: 55px;
  height: 49px;
`;

export const Spinner = styled.div`
  display: block;
  margin: auto;
  text-indent: -9999em;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #ffffff;
  background: linear-gradient(to right, ${colors.primary} 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: load3 1.4s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: ${colors.primary};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }

  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
