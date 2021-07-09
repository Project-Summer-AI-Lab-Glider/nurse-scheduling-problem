/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import _ from "lodash";
import { createReducer } from "@reduxjs/toolkit";
import { ScheduleDataModel } from "../schedule-data.model";
import { WorkersInfoModel } from "./worker-info.model";
import {
  DEFAULT_CONTRACT_TYPE,
  DEFAULT_TEAM,
} from "../../../logic/schedule-parser/workers-info.parser";
import { scheduleDataInitialState } from "../schedule-data-initial-state";
import { addNewSchedule, updateSchedule } from "../schedule.actions";
import { ScheduleActionDestination } from "../../app.reducer";

export const employeeInfoReducerF = (name: ScheduleActionDestination) =>
  createReducer(scheduleDataInitialState.employee_info, (builder) => {
    let monthEmployeeInfo: WorkersInfoModel;
    builder
      .addCase(addNewSchedule(name), (state, action) => {
        monthEmployeeInfo = (action.payload as ScheduleDataModel)?.employee_info;
        if (!monthEmployeeInfo) return state;
        monthEmployeeInfo = preprocessWorkerInfoModel(monthEmployeeInfo);
        return { ...monthEmployeeInfo };
      })
      .addCase(updateSchedule(name), (state, action) => {
        monthEmployeeInfo = (action.payload as ScheduleDataModel)?.employee_info;
        if (!monthEmployeeInfo) return state;
        monthEmployeeInfo = preprocessWorkerInfoModel(monthEmployeeInfo);
        return { ...state, ...monthEmployeeInfo };
      })
      .addDefaultCase((state) => state);
  });
/* eslint-disable @typescript-eslint/no-explicit-any */
function fillWorkerInfoWithDefaultValue(
  workerInfo: WorkersInfoModel,
  workerNames: string[],
  sectionName: keyof WorkersInfoModel,
  defaultValue: any
): void {
  if (_.isNil(workerInfo[sectionName])) {
    workerInfo[sectionName] = {};
  }
  workerNames.forEach((workerName) => {
    if (_.isNil(workerInfo[sectionName]![workerName])) {
      workerInfo[sectionName]![workerName] = defaultValue;
    }
  });
}

function preprocessWorkerInfoModel(workerInfo: WorkersInfoModel): WorkersInfoModel {
  workerInfo = _.cloneDeep(workerInfo);
  const workerNames = Object.keys(workerInfo.type);
  fillWorkerInfoWithDefaultValue(workerInfo, workerNames, "contractType", DEFAULT_CONTRACT_TYPE);
  fillWorkerInfoWithDefaultValue(workerInfo, workerNames, "team", DEFAULT_TEAM);
  return workerInfo;
}
