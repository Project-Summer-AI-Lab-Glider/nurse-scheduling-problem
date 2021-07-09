/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { createAction, createReducer } from "@reduxjs/toolkit";
import { ScheduleMode } from "../../components/schedule/schedule-state.model";

export const setMode = createAction<ScheduleMode>("schedule/setMode");
const modeInfoReducer = createReducer(ScheduleMode.Readonly, (builder) => {
  builder
    .addCase(setMode, (state, action) => {
      if (!action.payload) return state;
      return action.payload;
    })
    .addDefaultCase((state) => state);
});
export default modeInfoReducer;
