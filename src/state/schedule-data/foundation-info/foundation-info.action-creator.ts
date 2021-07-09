/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { createAction } from "@reduxjs/toolkit";
import { ActionModel } from "../../../utils/action.model";
import { ScheduleActionDestination } from "../../app.reducer";
import { createActionName } from "../schedule.actions";

export enum FoundationInfoActionType {
  UPDATE_CHILDREN_AND_EXTRAWORKERS = "UPDATE_CHILDREN_AND_EXTRAWORKERS",
}

export type FoundationInfoAction = ActionModel<UpdateChildrenAndExtraworkersPayload>;

interface UpdateChildrenAndExtraworkersPayload {
  extraWorkers: number[];
  childrenNumber: number[];
}

export const updateChildrenAndExtraworkers = (name: ScheduleActionDestination) =>
  createAction<UpdateChildrenAndExtraworkersPayload>(
    createActionName(name, FoundationInfoActionType.UPDATE_CHILDREN_AND_EXTRAWORKERS)
  );
