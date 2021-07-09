/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import _ from "lodash";
import { ThunkFunction } from "../../../logic/data-access/persistance-store.model";
import { WorkerShiftsModel } from "./worker-shifts.model";
import { ScheduleDataActionCreator } from "../schedule-data.action-creator";

export class WorkerShiftsActionCreator {
  static replaceWorkerShiftsInTmpSchedule(
    newWorkerShifts: WorkerShiftsModel
  ): ThunkFunction<unknown> {
    newWorkerShifts = _.cloneDeep(newWorkerShifts);
    return async (dispatch, getState): Promise<void> => {
      const temporarySchedule = _.cloneDeep(getState().actualState.temporarySchedule.present);
      temporarySchedule.shifts = { ...temporarySchedule.shifts, ...newWorkerShifts };
      const action = ScheduleDataActionCreator.updateSchedule(temporarySchedule);
      dispatch(action);
    };
  }
}
