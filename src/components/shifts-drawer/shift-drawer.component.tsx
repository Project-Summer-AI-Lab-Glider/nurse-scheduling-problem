/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import i18next from "i18next";
import Drawer, { DrawerOptions } from "../drawers/drawer/drawer.component";
import ShiftEditComponent, {
  ShiftEditComponentMode,
  ShiftEditComponentOptions,
} from "./shift-edit-drawer.component";

type ShiftDrawerOptions = Omit<DrawerOptions, "title"> & ShiftEditComponentOptions;

function getTitle(mode: ShiftEditComponentMode): string {
  switch (mode) {
    case ShiftEditComponentMode.EDIT:
      return i18next.t("shiftEdit");
    case ShiftEditComponentMode.ADD_NEW:
      return i18next.t("shiftAdd");
    default:
      throw Error(`Invalid drawer mode ${mode}`);
  }
}

export default function ShiftDrawerComponent(options: ShiftDrawerOptions): JSX.Element {
  const { mode, selectedShift, saveChangedShift, setOpen, ...otherOptions } = options;
  const title = getTitle(mode);
  return (
    <Drawer setOpen={setOpen} title={title} {...otherOptions}>
      <ShiftEditComponent
        selectedShift={selectedShift}
        saveChangedShift={saveChangedShift}
        mode={mode}
      />
    </Drawer>
  );
}
