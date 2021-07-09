/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getIsEditMode } from "../../../state/schedule-data/selectors";
import DrawerHeader from "./drawer-header.component";
import { usePersistentDrawer } from "./persistent-drawer-context";
import * as S from "./persistent-drawer.styled";

export interface StyleProps {
  width: number;
}

export default function PersistentDrawer({ width }: StyleProps): JSX.Element {
  const isEditMode = useSelector(getIsEditMode);
  const { title, open, setOpen, childrenComponent } = usePersistentDrawer();

  useEffect(() => {
    if (!isEditMode) setOpen(false);
  }, [isEditMode, setOpen]);

  return (
    <Box>
      {title && open && setOpen && childrenComponent && isEditMode && (
        <S.Drawer width={width}>
          <DrawerHeader title={title} setOpen={setOpen}>
            {childrenComponent}
          </DrawerHeader>
        </S.Drawer>
      )}
    </Box>
  );
}
