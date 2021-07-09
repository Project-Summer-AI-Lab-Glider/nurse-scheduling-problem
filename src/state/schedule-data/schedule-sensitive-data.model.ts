/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import _ from "lodash";
import { Opaque } from "../../utils/type-utils";
import { ScheduleDataModel } from "./schedule-data.model";

type EmployeeInfoSensitiveData = keyof ScheduleDataModel["employee_info"];
type ScheduleDataSensitiveData = keyof Pick<ScheduleDataModel, "shifts">;

export type WorkerName = Opaque<"WorkerName", string>;
type SensitiveDataField = EmployeeInfoSensitiveData | ScheduleDataSensitiveData;
type SensitiveFieldAccessor = (schedule: ScheduleDataModel) => Record<WorkerName, unknown>;

export const SensitiveDataFieldAccessors: {
  [key in SensitiveDataField]: SensitiveFieldAccessor;
} = {
  time: (schedule) => schedule.employee_info.time,
  contractType: (schedule) => schedule.employee_info.contractType,
  type: (schedule) => schedule.employee_info.type,
  team: (schedule) => schedule.employee_info.team,
  shifts: (schedule) => schedule.shifts,
};

export function getWorkerNames(schedule: ScheduleDataModel): WorkerName[] {
  const workerNames = Object.keys(schedule.shifts);
  validateWorkerNamesConsistency(schedule, workerNames);
  return workerNames as WorkerName[];
}

/**
 * Check if all worker names from schedule exists in workerNames and
 * if all names from workerNames appears in every object with sensitive data in schedule
 */
function validateWorkerNamesConsistency(schedule: ScheduleDataModel, workerNames: string[]): void {
  Object.values(SensitiveDataFieldAccessors).forEach((getFieldFunction) => {
    const field = getFieldFunction(schedule);
    const workerNamesInField = Object.keys(field);
    const workerNameDifference = _.difference(workerNames, workerNamesInField);
    if (workerNameDifference.length !== 0) {
      throw new Error(
        `There are workers in schedule which are not defined in each field: ${workerNameDifference.join(
          ", "
        )}`
      );
    }
  });
}
