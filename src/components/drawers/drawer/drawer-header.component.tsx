/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Divider, DrawerProps, Grid } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import React from "react";
import * as S from "./drawer-header.styled";

export interface DrawerHeaderOptions extends DrawerProps {
  title: string;
  setOpen: (open: boolean) => void;
}

export default function DrawerHeader(options: DrawerHeaderOptions): JSX.Element {
  const { title, setOpen, children } = options;

  return (
    <>
      <S.Container container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <S.Title>{title}</S.Title>
        </Grid>
        <Grid item>
          <S.ExitButton data-cy="exit-drawer" onClick={(): void => setOpen(false)}>
            <MdClose />
          </S.ExitButton>
        </Grid>
      </S.Container>

      <Divider />

      <S.FullHeightBox>{children}</S.FullHeightBox>
    </>
  );
}
