/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { createAction, createReducer } from "@reduxjs/toolkit";
import { ThemeKey } from "../../../assets/theme";
import { ThemeInitialState } from "./theme.model";

export const changeTheme = createAction<ThemeKey>("Theme/CHANGE_THEME");
export const themeReducer = createReducer(ThemeInitialState, (builder) => {
  builder
    .addCase(changeTheme, (state, action) => {
      if (action.payload) state.key = action.payload;
      return state;
    })
    .addDefaultCase((state) => state);
});
