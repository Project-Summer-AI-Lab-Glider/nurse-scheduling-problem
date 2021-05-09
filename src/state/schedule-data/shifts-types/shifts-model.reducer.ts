/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { ScheduleActionType } from "../schedule.actions";
import { Shift, ShiftTypesDict } from "./shift-types.model";
import { ActionModel } from "../../../utils/action.model";
import { scheduleDataInitialState } from "../schedule-data-initial-state";

export function shiftsModelReducer(
  state: ShiftTypesDict = scheduleDataInitialState.shift_types,
  action: ActionModel<Shift> | ActionModel<Array<Shift>>
): ShiftTypesDict {
  if (!action.payload) {
    return state;
  }

  switch (action.type) {
    case ScheduleActionType.MODIFY_SHIFT:
      const shiftArray = action.payload as Array<Shift>;
      const newShift = shiftArray[0];
      const oldShift = shiftArray[1];
      if (newShift.code !== oldShift.code) {
        delete state[oldShift.code];
      }
      return { ...state, [newShift.code]: newShift };

    case ScheduleActionType.ADD_NEW_SHIFT:
      const data = action.payload as Shift;
      return { ...state, [data.code]: data };

    case ScheduleActionType.DELETE_SHIFT:
      const dataToDel = action.payload as Shift;
      delete state[dataToDel.code];
      return { ...state };

    default:
      return state;
  }
}