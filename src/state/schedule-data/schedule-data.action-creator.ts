/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import _ from "lodash";
import { NewShiftTemplate } from "../../components/shifts-drawer/shift-edit-drawer.component";
import {
  getMonthRevision,
  getOrGenerateMonthRevision,
} from "../../logic/data-access/month-revision-manager";
import {
  PersistStorageManager,
  RevisionType,
  ScheduleKey,
  ThunkFunction,
} from "../../logic/data-access/persistance-store.model";
import { saveSchedule } from "../../logic/data-access/schedule-persistance-manager";
import {
  cropScheduleDMToMonthDM,
  extendMonthDMRevisionToScheduleDM,
} from "../../logic/schedule-container-converter/schedule-container-converter";
import { ActionModel } from "../../utils/action.model";
import { PERSISTENT_SCHEDULE_NAME, TEMPORARY_SCHEDULE_NAME } from "../app.reducer";
import { PrimaryMonthRevisionDataModel } from "../application-state.model";
import { addMonthPrimaryRevision } from "./primary-revision/primary-revision.reducer";
import { MonthDataModel, ScheduleDataModel } from "./schedule-data.model";
import { ScheduleErrorMessageModel } from "./schedule-errors/schedule-error-message.model";
import { cleanScheduleErrors } from "./schedule-errors/schedule-errors.reducer";
import { createActionName, ScheduleActionModel, ScheduleActionType } from "./schedule.actions";
import { Shift } from "./shifts-types/shift-types.model";

export class ScheduleDataActionCreator {
  // #region Update state
  private static setCurrentAndPrimaryScheduleState(
    currentSchedule: ScheduleDataModel,
    baseSchedule: PrimaryMonthRevisionDataModel
  ): ThunkFunction<ScheduleDataModel | MonthDataModel> {
    return async (dispatch): Promise<void> => {
      const destinations = [PERSISTENT_SCHEDULE_NAME, TEMPORARY_SCHEDULE_NAME];
      destinations.forEach((destination) => {
        const addNewSchedule = {
          type: createActionName(destination, ScheduleActionType.ADD_NEW),
          payload: currentSchedule,
        };
        dispatch(addNewSchedule);
      });
      dispatch(addMonthPrimaryRevision(baseSchedule));
    };
  }

  private static setScheduleFromMonthDM(
    monthDataModel: MonthDataModel
  ): ThunkFunction<ScheduleDataModel> {
    return async (dispatch): Promise<void> => {
      const newSchedule = await extendMonthDMRevisionToScheduleDM(monthDataModel);
      const primaryMonthDM = await this.getMonthPrimaryRevisionDM(monthDataModel);

      dispatch(this.setCurrentAndPrimaryScheduleState(newSchedule, primaryMonthDM));
    };
  }

  static setScheduleStateAndCreateIfNeeded(
    monthKey: ScheduleKey,
    baseMonthModel: MonthDataModel,
    revision: RevisionType
  ): ThunkFunction<ScheduleDataModel> {
    return async (dispatch): Promise<void> => {
      const monthDataModel = await getOrGenerateMonthRevision(
        monthKey,
        revision,
        baseMonthModel,
        PersistStorageManager.getInstance().actualPersistProvider
      );
      dispatch(this.setScheduleFromMonthDM(monthDataModel));
    };
  }

  static setScheduleIfExistsInDb(
    monthKey: ScheduleKey,
    revision?: RevisionType
  ): ThunkFunction<ScheduleDataModel> {
    return async (dispatch, getState): Promise<void> => {
      if (_.isNil(revision)) {
        revision = getState().actualState.revision;
      }

      const monthDataModel = await getMonthRevision(
        monthKey.getRevisionKey(revision),
        PersistStorageManager.getInstance().actualPersistProvider
      );

      if (!_.isNil(monthDataModel)) {
        dispatch(this.setScheduleFromMonthDM(monthDataModel));
      }
    };
  }
  // #endregion

  // #region Update state and save to DB
  static setScheduleStateAndSaveToDb(
    newSchedule: ScheduleDataModel,
    revision?: RevisionType
  ): ThunkFunction<ScheduleDataModel | MonthDataModel> {
    return async (dispatch, getState): Promise<void> => {
      if (_.isNil(revision)) {
        revision = getState().actualState.revision;
      }
      await saveSchedule(revision, newSchedule);
      const primaryMonthDM = await this.getMonthPrimaryRevisionDM(
        cropScheduleDMToMonthDM(newSchedule)
      );
      dispatch(this.setCurrentAndPrimaryScheduleState(newSchedule, primaryMonthDM));
    };
  }

  static setScheduleFromMonthDMAndSaveInDB(
    newMonth: MonthDataModel,
    revision?: RevisionType
  ): ThunkFunction<ScheduleDataModel> {
    return async (dispatch, getState): Promise<void> => {
      if (_.isNil(revision)) {
        revision = getState().actualState.revision;
      }
      const newSchedule = await extendMonthDMRevisionToScheduleDM(newMonth);
      dispatch(this.setScheduleStateAndSaveToDb(newSchedule, revision));
    };
  }

  // #endregion

  private static async getMonthPrimaryRevisionDM(
    monthDataModel: MonthDataModel
  ): Promise<PrimaryMonthRevisionDataModel> {
    const primaryMonthDM = await getMonthRevision(
      monthDataModel.scheduleKey.getRevisionKey("primary"),
      PersistStorageManager.getInstance().actualPersistProvider
    );
    return (primaryMonthDM ?? monthDataModel) as PrimaryMonthRevisionDataModel;
  }

  static updateSchedule(newScheduleModel: ScheduleDataModel): ScheduleActionModel {
    return {
      type: createActionName(TEMPORARY_SCHEDULE_NAME, ScheduleActionType.UPDATE),
      payload: newScheduleModel,
    };
  }

  static addNewShift(shift: Shift) {
    throw Error("Not implemented");
  }

  static modifyShift(shift: Shift, oldShift: Shift | NewShiftTemplate) {
    throw Error("Not implemented");
  }

  static deleteShift(shift: Shift) {
    throw Error("Not implemented");
  }

  static hideErrors(): ActionModel<unknown> {
    return this.showError(undefined);
  }

  static showError(error: ScheduleErrorMessageModel | undefined): ActionModel<unknown> {
    throw Error("Not implemented");
  }

  static cleanErrors = cleanScheduleErrors;
}
