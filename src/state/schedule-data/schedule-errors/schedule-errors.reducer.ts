/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import _ from "lodash";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { GroupedScheduleErrors, ScheduleError } from "./schedule-error.model";

export const updateScheduleErrors = createAction<ScheduleError[]>("schedule/updateErrors");
export const cleanScheduleErrors = createAction("schedule/cleanErrors");
export const scheduleErrorsReducer = createReducer({} as GroupedScheduleErrors, (builder) => {
  builder
    .addCase(updateScheduleErrors, (state, action) => {
      if (!action.payload) action.payload = [];
      return _.groupBy(action.payload, (item) => item.kind);
    })
    .addCase(cleanScheduleErrors, (state, action) => ({}))
    .addDefaultCase((state) => state);
});
