/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { createAction, createReducer } from "@reduxjs/toolkit";
import { Shift } from "./shift-types.model";
import { scheduleDataInitialState } from "../schedule-data-initial-state";

export const deleteShift = createAction<Shift>("schedule/deleteShift");
export const addNewShift = createAction<Shift>("schedule/addNewShift");
export const modifyShift = createAction<Shift[]>("schedule/modifyShift");
export const shiftsModelReducer = createReducer(scheduleDataInitialState.shift_types, (builder) => {
  builder
    .addCase(modifyShift, (state, action) => {
      const shiftArray = action.payload as Array<Shift>;
      const newShift = shiftArray[0];
      const oldShift = shiftArray[1];
      if (newShift.code !== oldShift.code) {
        delete state[oldShift.code];
      }
      return { ...state, [newShift.code]: newShift };
    })
    .addCase(addNewShift, (state, action) => {
      const data = action.payload as Shift;
      return { ...state, [data.code]: data };
    })
    .addCase(deleteShift, (state, action) => {
      const dataToDel = action.payload as Shift;
      delete state[dataToDel.code];
      return { ...state };
    })
    .addDefaultCase((state) => state);
});
