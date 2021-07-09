/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ButtonProps } from "@material-ui/core";
import React, { Ref } from "react";
import * as S from "./button.styled";

export type MarginString =
  | `${number}px`
  | `${number}px ${number}px`
  | `${number}px ${number}px ${number}px ${number}px`;

export interface ButtonBaseProps extends Omit<ButtonProps, "variant"> {
  marginString?: MarginString;
}

export type ButtonVariant = "primary" | "secondary" | "circle";
export type ButtonOptions = ButtonBaseProps & {
  variant?: ButtonVariant;
};

export const Button = React.forwardRef(
  (
    { variant = "primary", disabled = false, ...rest }: ButtonOptions,
    ref?: Ref<HTMLButtonElement>
  ) => {
    let Component: typeof S.ButtonBase;
    if (variant === "primary") {
      Component = S.ButtonPrimary;
    } else if (variant === "secondary") {
      Component = S.ButtonSecondary;
    } else if (variant === "circle") {
      Component = S.ButtonCircle;
    } else {
      throw new Error(`Unrecognized Button variant: ${variant}`);
    }

    return <Component {...rest} ref={ref} disabled={disabled} />;
  }
);
