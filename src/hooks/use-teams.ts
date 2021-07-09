/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import _ from "lodash";
import { useSelector } from "react-redux";
import { WorkerShiftsModel } from "../state/schedule-data/workers-shifts/worker-shifts.model";
import { WorkersInfoModel } from "../state/schedule-data/worker-info/worker-info.model";
import { ApplicationStateModel, ScheduleStateModel } from "../state/application-state.model";
import { WorkerInfo } from "./use-worker-info";
import { ScheduleMode } from "../components/schedule/schedule-state.model";
import { ScheduleDataModel } from "../state/schedule-data/schedule-data.model";
import { getActualState } from "../state/schedule-data/selectors";

export type WorkersByTeam = Map<string, WorkerInfo[]>;

const aggregateWorkerInfo = (
  workerName: string,
  workerShifts: WorkerShiftsModel,
  workerInfo: WorkersInfoModel
): WorkerInfo =>
  new WorkerInfo(
    workerName,
    workerInfo.contractType?.[workerName],
    workerInfo.time[workerName],
    workerInfo.type[workerName],
    workerShifts[workerName],
    workerInfo.team[workerName]
  );

export function groupWorkersByTeam({
  shifts: workerShifts,
  employee_info: workerInfo,
}: Pick<ScheduleDataModel, "shifts" | "employee_info">): WorkersByTeam {
  const aggregatedData = Object.keys(workerShifts).map((workerName) =>
    aggregateWorkerInfo(workerName, workerShifts, workerInfo)
  );
  const workersByTeam = _.groupBy(aggregatedData, (item) => item.team);
  const sortedWorkersByTeam = new Map();
  _.sortBy(Object.keys(workersByTeam)).forEach((key) => {
    sortedWorkersByTeam[key] = _.sortBy(Object.values(workersByTeam[key]), [
      "workerType",
      "workerName",
    ]);
  });
  return sortedWorkersByTeam;
}

export function useTeams(): WorkersByTeam {
  const { mode } = useSelector(getActualState);
  const targetSchedule: keyof ScheduleStateModel =
    mode === ScheduleMode.Edit ? "temporarySchedule" : "persistentSchedule";

  const workerInfo = useSelector(
    (state: ApplicationStateModel) => state.actualState[targetSchedule].present.employee_info
  );
  const workerShifts = useSelector(
    (state: ApplicationStateModel) => state.actualState[targetSchedule].present.shifts
  );

  return groupWorkersByTeam({ shifts: workerShifts, employee_info: workerInfo });
}
