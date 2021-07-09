/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { createAction, createReducer } from "@reduxjs/toolkit";
import { ScheduleActionDestination } from "../../app.reducer";
import { scheduleDataInitialState } from "../schedule-data-initial-state";
import { ScheduleDataModel } from "../schedule-data.model";
import { addNewSchedule, isScheduleAction, updateSchedule } from "../schedule.actions";

const replaceStateWithPayload = (
  state: boolean,
  action: { payload: ScheduleDataModel; type: string }
): boolean => {
  if (!isScheduleAction(action)) {
    return state;
  }
  return action.payload?.isCorrupted ?? true;
};

export const setScheduleCorrupted = createAction("schedule/setIsCorrupted");
export const corruptedInfoReducerF = (name: ScheduleActionDestination) =>
  createReducer(scheduleDataInitialState.isCorrupted, (builder) => {
    builder
      .addCase(addNewSchedule(name), replaceStateWithPayload)
      .addCase(setScheduleCorrupted, () => true)
      .addCase(updateSchedule(name), replaceStateWithPayload)
      .addDefaultCase((state) => state);
  });
