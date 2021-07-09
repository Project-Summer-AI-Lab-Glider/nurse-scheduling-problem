/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import React, { ReactNode } from "react";
import * as S from "./alert.styled";

interface AlertOptions {
  severity: string;
  children: ReactNode;
}

export const Alert = ({ severity, children }: AlertOptions): JSX.Element => (
  <S.ShadowContainer>
    <S.AlertContainer container>
      <Grid item>{severity === "success" && <S.DoneIcon />}</Grid>
      <S.Text item>{children}</S.Text>
    </S.AlertContainer>
  </S.ShadowContainer>
);
