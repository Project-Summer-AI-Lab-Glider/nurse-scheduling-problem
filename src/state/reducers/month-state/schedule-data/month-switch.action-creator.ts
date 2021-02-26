/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* eslint-disable @typescript-eslint/camelcase */

import { ScheduleKey, ThunkFunction } from "../../../../api/persistance-store.model";
import { ScheduleDataActionCreator } from "./schedule-data.action-creator";
import * as _ from "lodash";
import { copyShiftsToMonth, cropMonthInfoToMonth, getDateWithMonthOffset } from "./common-reducers";
import {
  cropScheduleDMToMonthDM,
  MonthDataModel,
} from "../../../../common-models/schedule-data.model";
import { LocalStorageProvider } from "../../../../api/local-storage-provider.model";
import { RevisionReducerAction } from "../revision-info.reducer";
import { VerboseDateHelper } from "../../../../helpers/verbose-date.helper";

type MonthOffset = -1 | 1;

export class MonthSwitchActionCreator {
  static switchToNewMonth(offset: number): ThunkFunction<unknown> {
    return async (dispatch, getState): Promise<void> => {
      const actualSchedule = getState().actualState.persistentSchedule.present;
      const actualMonthDM = cropScheduleDMToMonthDM(actualSchedule);
      const { month, year } = actualMonthDM.scheduleKey;

      const newDate = getDateWithMonthOffset(month, year, offset);
      const newYear = newDate.getFullYear();
      const newMonth = newDate.getMonth();
      const newMonthKey = new ScheduleKey(newDate.getMonth(), newDate.getFullYear());

      // Set default revision type - primary in future, actual for present and past
      const { revision } = getState().actualState;
      const isFuture = VerboseDateHelper.isMonthInFuture(newMonth, newYear);
      const newRevisionType = isFuture ? "primary" : "actual";
      if (revision !== newRevisionType) {
        dispatch({
          type: RevisionReducerAction.CHANGE_REVISION,
          payload: newRevisionType,
        });
      }

      const addNewScheduleAction = ScheduleDataActionCreator.setScheduleFromKeyIfExistsInDB(
        newMonthKey,
        newRevisionType,
        actualMonthDM
      );
      dispatch(addNewScheduleAction);
    };
  }

  static copyActualMonthToMonthWithOffset(offset: MonthOffset): ThunkFunction<unknown> {
    return async (dispatch, getState): Promise<void> => {
      const {
        month_number: month,
        year,
      } = getState().actualState.persistentSchedule.present.schedule_info;
      if (!_.isNil(month) && !_.isNil(year)) {
        const fromDate = getDateWithMonthOffset(month, year, offset);
        const { revision } = getState().actualState;

        const baseSchedule = await new LocalStorageProvider().getMonthRevision(
          new ScheduleKey(fromDate.getMonth(), fromDate.getFullYear()).getRevisionKey(revision)
        );

        const currentSchedule = await new LocalStorageProvider().getMonthRevision(
          new ScheduleKey(month, year).getRevisionKey(revision)
        );
        if (baseSchedule && currentSchedule) {
          const monthDataModel = copyMonthDM(currentSchedule, baseSchedule);
          dispatch(ScheduleDataActionCreator.setScheduleFromMonthDM(monthDataModel, true));
        }
      }
    };
  }
}

function copyMonthDM(currentSchedule: MonthDataModel, baseMonth: MonthDataModel): MonthDataModel {
  return {
    scheduleKey: currentSchedule.scheduleKey,
    shifts: copyShiftsToMonth(currentSchedule, baseMonth),
    month_info: cropMonthInfoToMonth(currentSchedule.scheduleKey, baseMonth.month_info),
    employee_info: _.cloneDeep(baseMonth.employee_info),
    isAutoGenerated: false,
    shift_types: _.cloneDeep(baseMonth.shift_types),
  };
}
