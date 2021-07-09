/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { DrawerProps } from "@material-ui/core";
import React from "react";
import DrawerHeader from "./drawer-header.component";
import * as S from "./drawer.styled";

export interface DrawerOptions extends DrawerProps {
  title: string;
  setOpen: (open: boolean) => void;
}

export default function Drawer(options: DrawerOptions): JSX.Element {
  const { title, setOpen, children, ...otherOptions } = options;

  return (
    <S.Drawer {...otherOptions} anchor="right">
      <DrawerHeader title={title} setOpen={setOpen}>
        {children}
      </DrawerHeader>
    </S.Drawer>
  );
}
