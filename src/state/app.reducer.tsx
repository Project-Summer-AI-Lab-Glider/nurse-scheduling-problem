/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { combineReducers } from "redux";
import undoable from "redux-undo";
import { ActionModel } from "../utils/action.model";
import { ApplicationStateModel, ScheduleStateModel } from "./application-state.model";
import {
  PERSISTENT_SCHEDULE_UNDOABLE_CONFIG,
  TEMPORARY_SCHEDULE_UNDOABLE_CONFIG,
} from "./schedule-data/schedule.actions";
import { scheduleReducerF } from "./schedule-data/schedule.reducer";
import { scheduleErrorsReducer } from "./schedule-data/schedule-errors/schedule-errors.reducer";
import { revisionInfoReducer } from "./schedule-data/schedule-condition/revision-info.reducer";
import modeInfoReducer from "./app-condition/mode-info-reducer";
import { primaryRevisionReducer } from "./schedule-data/primary-revision/primary-revision.reducer";
import { themeReducer } from "./schedule-data/theme/theme.reducer";

export type CombinedReducers<StateModel> = {
  [key in keyof StateModel]: <T, U>(state: T, action: ActionModel<U>) => T;
};

export const PERSISTENT_SCHEDULE_NAME: ScheduleActionDestination = "PERSISTENT";
export const TEMPORARY_SCHEDULE_NAME: ScheduleActionDestination = "TEMPORARY";

export type ScheduleActionDestination = "PERSISTENT" | "TEMPORARY";

const monthStateReducer = combineReducers({
  revision: revisionInfoReducer,
  mode: modeInfoReducer,
  persistentSchedule: undoable(scheduleReducerF(PERSISTENT_SCHEDULE_NAME), {
    limit: 50,
    ...PERSISTENT_SCHEDULE_UNDOABLE_CONFIG,
  }),
  temporarySchedule: undoable(scheduleReducerF(TEMPORARY_SCHEDULE_NAME), {
    limit: 50,
    ...TEMPORARY_SCHEDULE_UNDOABLE_CONFIG,
  }),
  primaryRevision: primaryRevisionReducer,
  scheduleErrors: scheduleErrorsReducer,
} as CombinedReducers<ScheduleStateModel>);

export const appReducer = combineReducers({
  actualState: monthStateReducer,
  theme: themeReducer,
} as CombinedReducers<ApplicationStateModel>);
