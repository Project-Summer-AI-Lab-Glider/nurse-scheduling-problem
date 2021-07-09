/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  WorkerHourInfo,
  WorkerHourInfoSummary,
} from "../logic/schedule-logic/worker-hours-info.logic";
import { ApplicationStateModel, ScheduleStateModel } from "../state/application-state.model";
import { getIsEditMode, getPresentSchedule } from "../state/schedule-data/selectors";
import { ContractType } from "../state/schedule-data/worker-info/worker-info.model";
import { isAllValuesDefined } from "../utils/type-utils";

export function useWorkerHoursInfo(workerName: string): WorkerHourInfoSummary {
  const isEditMode = useSelector(getIsEditMode);
  const scheduleKey: keyof ScheduleStateModel = isEditMode
    ? "temporarySchedule"
    : "persistentSchedule";

  const workerTime = useSelector(
    (state: ApplicationStateModel) => state.actualState[scheduleKey].present.employee_info.time
  )[workerName];
  const workerShifts = useSelector(
    (state: ApplicationStateModel) => state.actualState[scheduleKey].present.shifts
  )[workerName];

  const contractType = useSelector(
    (state: ApplicationStateModel) =>
      state.actualState[scheduleKey].present.employee_info.contractType
  );

  const workerContractType =
    contractType && contractType[workerName]
      ? contractType[workerName]
      : ContractType.EMPLOYMENT_CONTRACT;

  const primaryWorkerShifts = useSelector(
    (state: ApplicationStateModel) => state.actualState.primaryRevision.shifts
  )[workerName];

  const { month: primaryRevisionMonth } = useSelector(
    (state: ApplicationStateModel) => state.actualState.primaryRevision.scheduleKey
  );
  const { month_number: month, year } = useSelector(
    (state: ApplicationStateModel) => state.actualState[scheduleKey].present.schedule_info
  );
  const { dates } = useSelector(
    (state: ApplicationStateModel) => state.actualState[scheduleKey].present.month_info
  );
  const { shift_types: shiftTypes } = useSelector(getPresentSchedule);

  const [workHoursInfo, setWorkHoursInfo] = useState<WorkerHourInfo>(new WorkerHourInfo(0, 0, 0));

  useEffect((): void => {
    if (primaryRevisionMonth !== month) {
      return;
    }
    if (!isAllValuesDefined([workerTime, workerShifts, workerContractType])) {
      setWorkHoursInfo(new WorkerHourInfo(0, 0, 0));
      return;
    }
    setWorkHoursInfo(
      WorkerHourInfo.fromWorkerInfo({
        shifts: workerShifts,
        primaryScheduleWorkerShifts: primaryWorkerShifts,
        workerNorm: workerTime,
        workerEmploymentContract: workerContractType,
        month,
        year,
        dates,
        shiftTypes,
      })
    );
  }, [
    shiftTypes,
    workerShifts,
    primaryWorkerShifts,
    workerTime,
    workerContractType,
    month,
    year,
    dates,
    primaryRevisionMonth,
  ]);

  return workHoursInfo.summary;
}
