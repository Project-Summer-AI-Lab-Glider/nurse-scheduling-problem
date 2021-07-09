/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ScheduleKey } from "../../../logic/data-access/persistance-store.model";
import { PrimaryMonthRevisionDataModel } from "../../application-state.model";
import { initialDate } from "../month-info/month-info.initial-state";
import { scheduleDataInitialState } from "../schedule-data-initial-state";

export const primaryRevisionInitialState: PrimaryMonthRevisionDataModel = ({
  scheduleKey: new ScheduleKey(initialDate.getMonth(), initialDate.getFullYear()),
  ...scheduleDataInitialState,
  __TYPE__: "PrimaryScheduleRevision",
} as unknown) as PrimaryMonthRevisionDataModel;
