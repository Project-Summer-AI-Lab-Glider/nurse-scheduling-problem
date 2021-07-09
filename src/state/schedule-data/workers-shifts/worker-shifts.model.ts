/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as _ from "lodash";
import {
  SCHEDULE_CONTAINERS_LENGTH,
  ScheduleContainerType,
  MonthWorkerShiftsModel,
} from "../schedule-data.model";
import { ShiftCode } from "../shifts-types/shift-types.model";

export interface WorkerShiftsModel {
  [nurseName: string]: ShiftCode[];
}

export function validateWorkerShiftsModel(
  shifts: WorkerShiftsModel | MonthWorkerShiftsModel,
  containerType: ScheduleContainerType
): void {
  if (shifts !== undefined && !_.isEmpty(shifts)) {
    const [worker, workerShifts] = Object.entries(shifts)[0];
    const shiftLen = workerShifts.length;
    if (!SCHEDULE_CONTAINERS_LENGTH[containerType].includes(shiftLen)) {
      throw new Error(
        `Schedule shift for worker ${worker} have wrong length: ${shiftLen} it should be on of ${SCHEDULE_CONTAINERS_LENGTH[containerType]}`
      );
    }
    Object.entries(shifts).forEach(([workerName, shift]) => {
      if (shift.length !== shiftLen) {
        throw new Error(`Shifts for worker: ${workerName} have wrong length: ${shift.length}`);
      }
    });
  }
}
