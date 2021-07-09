/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import styled from "styled-components";
import { fontFamilyPrimary, colors } from "../../../assets/css-consts";
import { ButtonBaseProps } from "./button.component";

export const ButtonBase = styled.button<ButtonBaseProps>`
  background: none;
  border: none;
  padding: 6px 20px 6px 20px;
  margin: ${({ marginString }) => marginString ?? "5px 10px 5px 10px"};
  white-space: nowrap;
  border-radius: 40px;
  font-family: ${fontFamilyPrimary};
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.025em;
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
  background-color: ${colors.primary};
  color: ${colors.white};

  &:disabled {
    color: ${colors.white};
    opacity: 0.65;

    &:hover {
      cursor: default;
      box-shadow: none;
      font-weight: 400;
    }
  }
`;

export const ButtonSecondary = styled(ButtonBase)`
  border: 1px solid ${colors.primary};
  background-color: ${colors.white};
  color: ${colors.primary};

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
