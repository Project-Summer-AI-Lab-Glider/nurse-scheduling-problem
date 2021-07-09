/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { useSelector } from "react-redux";
import { ApplicationStateModel, ScheduleStateModel } from "../state/application-state.model";
import { ScheduleMode } from "../components/schedule/schedule-state.model";
import { getActualMode } from "../state/schedule-data/selectors";

export function useFoundationInfo(): {
  childrenNumber: number[];
  extraWorkers: number[];
} {
  const mode = useSelector(getActualMode);
  const key: keyof ScheduleStateModel =
    mode === ScheduleMode.Edit ? "temporarySchedule" : "persistentSchedule";
  const { children_number: childrenNumber = [], extra_workers: extraWorkers = [] } = useSelector(
    (state: ApplicationStateModel) => state.actualState[key].present.month_info
  );
  return {
    childrenNumber,
    extraWorkers,
  };
}
