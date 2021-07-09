/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { colors } from "../../../assets/css-consts";
import { ButtonBaseProps } from "./button.component";

export const ButtonBase = styled.button<ButtonBaseProps>`
  background: none;
  border: none;
  padding: 9px 16px 9px 16px;
  /* margin: ${({ marginString }) => marginString ?? "5px 10px 5px 10px"}; */
  white-space: nowrap;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.025em;
  height: 32px;
  text-align: center;

  &:hover {
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0 10px 20px -10px ${colors.gray500};
  }

  &:focus {
    outline: none;
  }
}
`;

export const ButtonPrimary = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.primary};
  color: #fff;

  &:disabled {
    opacity: 0.65;

    &:hover {
      cursor: default;
      box-shadow: none;
      font-weight: 400;
    }
  }
`;

export const ButtonSecondary = styled(ButtonBase)`
  border: 1px solid ${({ theme }) => theme.primaryText};
  background-color: #fff;
  color: ${({ theme }) => theme.primaryText};

  &:disabled {
    border: 1px solid ${colors.secondaryButtonDisabledColor};
    color: ${colors.secondaryButtonDisabledColor};

    &:hover {
      cursor: default;
      box-shadow: none;
      font-weight: 400;
    }
  }
`;

export const ButtonCircle = styled(ButtonBase)`
  padding: 0;
  height: 24px;
  width: 24px;
  margin: 15px 10px 15px 10px;
  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    box-shadow: none;
    background-color: ${colors.circleButtonHoverColor};
  }

  &:disabled {
    color: ${colors.circleButtonHoverColor};
    opacity: 0.65;

    &:hover {
      cursor: default;
      box-shadow: none;
      background: none;
    }
`;
