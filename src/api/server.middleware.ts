/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { MonthInfoLogic } from "../logic/schedule-logic/month-info.logic";
import { WorkerHourInfo } from "../logic/schedule-logic/worker-hours-info.logic";
import { PrimaryMonthRevisionDataModel } from "../state/application-state.model";
import { VerboseDate } from "../state/schedule-data/foundation-info/foundation-info.model";
import { ScheduleDataModel } from "../state/schedule-data/schedule-data.model";
import {
  AlgorithmError,
  AlgorithmErrorCode,
  WorkerOvertime,
  WorkerTeamsCollision,
  WorkerUnderTime,
} from "../state/schedule-data/schedule-errors/schedule-error.model";
import {
  getWorkerNames,
  SensitiveDataFieldAccessors,
  WorkerName,
} from "../state/schedule-data/schedule-sensitive-data.model";
import { Opaque } from "../utils/type-utils";
import { BackendErrorObject } from "./backend";
import { ServerScheduleDataModel } from "./models/server-schedule-data.model";

type NameToUUIDMap = {
  [name: string]: string;
};
type AnonynimizedSchedule = Opaque<"Anonymized Schedule", ScheduleDataModel>;
type AnonymizeScheduleReturn = [
  anonynimizedSchedule: AnonynimizedSchedule,
  anonymizationMap: NameToUUIDMap
];

export class ServerMiddleware {
  public static escapeJuliaIndexes(error: AlgorithmError): AlgorithmError {
    const indexFields = ["day", "week"];
    indexFields.forEach((field) => {
      if (error[field]) {
        error = { ...error, [field]: error[field] - 1 };
      }
    });
    return error;
  }

  public static mapCodeTypeToKind(
    error: BackendErrorObject
  ): {
    [key in keyof AlgorithmError]?: AlgorithmError[key];
  } {
    return { ...error, kind: error.code as AlgorithmErrorCode };
  }

  public static anonymizeSchedule(schedule: ScheduleDataModel): AnonymizeScheduleReturn {
    const workerNames = getWorkerNames(schedule);
    const anonymizedSchedule = _.cloneDeep(schedule) as AnonynimizedSchedule;
    const nameToUUIDMap = {};
    workerNames.forEach((workerName) => {
      const workerUID = uuidv4();
      nameToUUIDMap[workerName] = workerUID;
      Object.values(SensitiveDataFieldAccessors).forEach((getFieldObjectFunction) => {
        const objectWithSensitiveData = getFieldObjectFunction(anonymizedSchedule);
        const workerData = objectWithSensitiveData[workerName];
        objectWithSensitiveData[workerUID] = workerData;
        delete objectWithSensitiveData[workerName];
      });
    });
    return [anonymizedSchedule, nameToUUIDMap];
  }

  public static mapIsWorkingTypeSnakeCase(schedule: ScheduleDataModel): ScheduleDataModel {
    const result = _.cloneDeep(schedule);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Object.keys(result.shift_types).forEach((shiftCode) => {
      const isWorkingShift = result.shift_types[shiftCode]?.isWorkingShift;
      if (_.isNil(isWorkingShift)) {
        throw Error(`Shift ${shiftCode} is not defined in shift types`);
      }
      result.shift_types![shiftCode] = {
        ...result.shift_types[shiftCode],
        is_working_shift: isWorkingShift,
      } as any;
    });
    return result;
  }

  public static mapToServerModel(schedule: ScheduleDataModel): ServerScheduleDataModel {
    const month_number = schedule.schedule_info.month_number;
    const result = _.cloneDeep(schedule) as ServerScheduleDataModel;

    const monthLogic = new MonthInfoLogic(month_number, schedule.schedule_info.year);
    const holidays = monthLogic.verboseDates
      .map((d, i) => [d, i])
      .filter((dayIndPair) => (dayIndPair[0] as VerboseDate).isPublicHoliday)
      .map((d) => d[1] as number);
    result.month_info.holidays = holidays;

    return result;
  }

  public static remapScheduleErrorUsernames(
    error: AlgorithmError,
    anonimizationMap: NameToUUIDMap
  ): AlgorithmError {
    const mapUUIDToWorkerName = (uuid: string) =>
      Object.keys(anonimizationMap).find((workerName) => anonimizationMap[workerName] === uuid);

    switch (error.kind) {
      case AlgorithmErrorCode.DissalowedShiftSequence:
      case AlgorithmErrorCode.LackingLongBreak:
      case AlgorithmErrorCode.WorkerUnderTime:
      case AlgorithmErrorCode.WorkerOvertime:
        error.worker = mapUUIDToWorkerName(error.worker);
        break;
      case AlgorithmErrorCode.WorkerTeamsCollision:
        error.workers = error.workers.map(mapUUIDToWorkerName);
        break;
    }
    return error;
  }

  public static aggregateWTCErrors(errors: AlgorithmError[]): AlgorithmError[] {
    const validBackendScheduleErros = errors.filter(
      (err) => err.kind !== AlgorithmErrorCode.WorkerTeamsCollision
    );
    const WTCErrors = errors.filter(
      (err) => err.kind === AlgorithmErrorCode.WorkerTeamsCollision
    ) as WorkerTeamsCollision[];

    const createWTCError = (item: WorkerTeamsCollision): WorkerTeamsCollision => ({
      kind: AlgorithmErrorCode.WorkerTeamsCollision,
      day: item.day,
      hour: -1,
      hours: [item.hour],
      workers: item.workers,
    });

    const aggregatedWTCErrors: WorkerTeamsCollision[] = [];
    WTCErrors.forEach((item, index) => {
      if (item.hour > -1) {
        const newWTCError = createWTCError(item);
        const sameDayErrors = WTCErrors.slice(index + 1).filter(
          (otherError) => item.day === otherError.day
        );
        sameDayErrors.forEach((otherError) => {
          newWTCError.hours.push(otherError.hour);
          newWTCError.workers = _.uniq(_.concat(newWTCError.workers, otherError.workers));
          otherError.hour = -1;
        });

        aggregatedWTCErrors.push(newWTCError);
      }
    });

    return _.concat(validBackendScheduleErros, aggregatedWTCErrors);
  }

  public static replaceOvertimeAndUndertimeErrors(
    actualSchedule: ScheduleDataModel,
    primaryMonthData: PrimaryMonthRevisionDataModel,
    scheduleErrors: AlgorithmError[]
  ): AlgorithmError[] {
    const calculateOvertime = (workerName: string): number =>
      WorkerHourInfo.fromSchedules(workerName, actualSchedule, primaryMonthData).overTime;

    const validBackendScheduleErros = scheduleErrors.filter(
      (err) =>
        err.kind !== AlgorithmErrorCode.WorkerOvertime &&
        err.kind !== AlgorithmErrorCode.WorkerUnderTime
    );
    const overtimeAndUndetimeErrors: (WorkerOvertime | WorkerUnderTime)[] = [];
    Object.keys(actualSchedule.shifts).forEach((workerName) => {
      const workHoursDiff = calculateOvertime(workerName);
      if (workHoursDiff < 0) {
        overtimeAndUndetimeErrors.push({
          kind: AlgorithmErrorCode.WorkerUnderTime,
          hours: Math.abs(workHoursDiff),
          worker: workerName as WorkerName,
        });
      }
    });
    return _.concat(validBackendScheduleErros, overtimeAndUndetimeErrors);
  }
}
