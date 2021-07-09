/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { StateWithHistory } from "redux-undo";
import { RevisionType } from "../logic/data-access/persistance-store.model";
import { MonthDataModel, ScheduleDataModel } from "./schedule-data/schedule-data.model";
import { GroupedScheduleErrors } from "./schedule-data/schedule-errors/schedule-error.model";
import { Opaque } from "../utils/type-utils";
import { ScheduleMode } from "../components/schedule/schedule-state.model";
import { ThemeState } from "./schedule-data/theme/theme.model";

export type PrimaryMonthRevisionDataModel = Opaque<"PrimaryScheduleRevision", MonthDataModel>;
export interface ScheduleStateModel {
  persistentSchedule: StateWithHistory<ScheduleDataModel>;
  temporarySchedule: StateWithHistory<ScheduleDataModel>;
  scheduleErrors: GroupedScheduleErrors;
  revision: RevisionType;
  mode: ScheduleMode;
  primaryRevision: PrimaryMonthRevisionDataModel;
}

export interface ApplicationStateModel {
  actualState: ScheduleStateModel;
  theme: ThemeState;
}
