/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { createAction, createReducer } from "@reduxjs/toolkit";
import { RevisionType, ThunkFunction } from "../../../logic/data-access/persistance-store.model";
import { ScheduleDataActionCreator } from "../schedule-data.action-creator";
import { cropScheduleDMToMonthDM } from "../../../logic/schedule-container-converter/schedule-container-converter";

export enum RevisionReducerAction {
  CHANGE_REVISION = "CHANGE_REVISION",
}
export const changeRevision = createAction<RevisionType>(RevisionReducerAction.CHANGE_REVISION);
export class RevisionReducerActionCreator {
  static changeRevisionThunk(newRevisionType: RevisionType): ThunkFunction<unknown> {
    return async (dispatch, getState): Promise<void> => {
      const actualSchedule = getState().actualState.persistentSchedule.present;
      const actualMonthDM = cropScheduleDMToMonthDM(actualSchedule);

      const setRevisionAction = ScheduleDataActionCreator.setScheduleStateAndCreateIfNeeded(
        actualMonthDM.scheduleKey,
        actualMonthDM,
        newRevisionType
      );

      dispatch(changeRevision(newRevisionType));
      dispatch(setRevisionAction);
    };
  }
}

export const revisionInfoReducer = createReducer("actual", (builder) => {
  builder
    .addCase(changeRevision, (state, action) => {
      if (!action.payload) return state;
      return action.payload;
    })
    .addDefaultCase((state) => state);
});
