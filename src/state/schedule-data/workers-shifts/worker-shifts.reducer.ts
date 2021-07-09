/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { createReducer } from "@reduxjs/toolkit";
import { ScheduleDataModel } from "../schedule-data.model";
import { Shift, ShiftCode } from "../shifts-types/shift-types.model";
import { scheduleDataInitialState } from "../schedule-data-initial-state";
import { addNewSchedule, updateSchedule } from "../schedule.actions";
import { deleteShift, modifyShift } from "../shifts-types/shifts-model.reducer";
import { ScheduleActionDestination } from "../../app.reducer";

export const workerShiftsReducerF = (name: ScheduleActionDestination) =>
  createReducer(scheduleDataInitialState.shifts, (builder) => {
    builder
      .addCase(addNewSchedule(name), (state, action) => {
        const data = (action.payload as ScheduleDataModel)?.shifts;
        return _.cloneDeep(data);
      })
      .addCase(updateSchedule(name), (state, action) => {
        const data = (action.payload as ScheduleDataModel)?.shifts;
        return _.cloneDeep(data);
      })
      .addCase(deleteShift, (state, action) => {
        const { code } = action.payload as Shift;
        Object.entries(state).forEach(([workerName, workersShifts]) => {
          state[workerName] = workersShifts.map((shiftCodeInArray) =>
            shiftCodeInArray === code ? ShiftCode.W : shiftCodeInArray
          );
        });
        return state;
      })
      .addCase(modifyShift, (state, action) => {
        const shiftArray = action.payload as Array<Shift>;

        const newShift = shiftArray[0];
        const oldShift = shiftArray[1];
        if (newShift.code !== oldShift.code) {
          delete state[oldShift.code];
        }
        Object.entries(state).forEach(([key, value]) => {
          state[key] = value.map((shiftCodeInArray) =>
            shiftCodeInArray === oldShift.code ? newShift.code : shiftCodeInArray
          );
        });
        return state;
      })
      .addDefaultCase((state) => state);
  });
