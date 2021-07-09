/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import * as _ from "lodash";
import { MonthDataArray } from "../../helpers/month-data-array.model";
import { ShiftHelper, WORK_HOURS_PER_DAY } from "../../helpers/shifts.helper";
import { TranslationHelper } from "../../helpers/translations.helper";
import { VerboseDateHelper } from "../../helpers/verbose-date.helper";
import { PrimaryMonthRevisionDataModel } from "../../state/application-state.model";
import { VerboseDate } from "../../state/schedule-data/foundation-info/foundation-info.model";
import { MonthDataModel, ScheduleDataModel } from "../../state/schedule-data/schedule-data.model";
import {
  NotWorkingShift,
  NotWorkingShiftType,
  Shift,
  ShiftCode,
  ShiftTypesDict,
} from "../../state/schedule-data/shifts-types/shift-types.model";
import { ContractType } from "../../state/schedule-data/worker-info/worker-info.model";
import { isAllValuesDefined } from "../../utils/type-utils";
import { nameOf } from "../../utils/utils";
import { MonthInfoLogic } from "./month-info.logic";

export const DEFAULT_NORM_SUBTRACTION = WORK_HOURS_PER_DAY;

// #region models
export enum OvertimeType {
  MaxiumNotOvertimeHoursExceed = "Maxium not overtime hours exceed",
  RevisionDifference = "revision difference",
}

interface WorkHoursInfoCalulationOptions {
  considerOvetimeTypes: OvertimeType[];
}

const DEFAULT_WORK_HOURS_INFO_CALCULATION_OPTIONS = {
  considerOvetimeTypes: [],
};
interface DataForOvertimeCalculation {
  actualWorkerShifts: ShiftCode[];
  primaryScheduleWorkerShifts: ShiftCode[];
  shiftTypes: ShiftTypesDict;
}

interface WorkerInfoForCalculateWorkerHoursInfo extends DataForOvertimeCalculation {
  actualWorkerShifts: ShiftCode[];
  primaryScheduleWorkerShifts: MonthDataArray<ShiftCode>;
  workerNorm: number;
  month: string;
  dates: DateInformationForWorkInfoCalculation[];
  shiftTypes: ShiftTypesDict;
  workerContractType: ContractType;
}

export type DateInformationForWorkInfoCalculation = Pick<
  VerboseDate,
  "isPublicHoliday" | "dayOfWeek" | "month"
>;

const MAXIMUM_NOT_OVERTIME_HOURS = 12;

export interface WorkerHourInfoSummary {
  overTime: number;
  workerHourNorm: number;
  workerTime: number;
}

export type WorkerHourInfoSummaryTranslation = { [key in keyof WorkerHourInfoSummary]: string };
// #endregion

export class WorkerHourInfo {
  public readonly overTime: number;

  public readonly workerHourNorm: number;

  public readonly workerTime: number;

  constructor(workerHourNorm: number, workerTime: number, overTime: number) {
    this.workerHourNorm = Math.round(workerHourNorm);
    this.workerTime = Math.round(workerTime);
    this.overTime = Math.round(overTime);
  }

  public get summary(): WorkerHourInfoSummary {
    return {
      workerHourNorm: this.workerHourNorm,
      workerTime: this.workerTime,
      overTime: this.overTime,
    };
  }

  public static get summaryTranslations(): WorkerHourInfoSummaryTranslation {
    return {
      workerHourNorm: "norma",
      workerTime: "aktualne",
      overTime: "nagodziny",
    };
  }

  // #region preprocessing
  // to test
  public static fromSchedules(
    workerName: string,
    actualScheduleModel: ScheduleDataModel | MonthDataModel,
    primaryScheduleModel?: PrimaryMonthRevisionDataModel
  ): WorkerHourInfo {
    const { time, contractType } = actualScheduleModel.employee_info;
    const workerContractType =
      contractType && contractType[workerName]
        ? contractType[workerName]
        : ContractType.CIVIL_CONTRACT;
    const { shifts } = actualScheduleModel;
    let month: number;
    let year: number;
    if (!_.isNil((actualScheduleModel as ScheduleDataModel).schedule_info)) {
      const info = (actualScheduleModel as ScheduleDataModel).schedule_info;
      month = info.month_number;
      year = info.year;
    } else {
      const info = (actualScheduleModel as MonthDataModel).scheduleKey;
      month = info.month;
      year = info.year;
    }
    const { dates } = actualScheduleModel.month_info;
    return this.fromWorkerInfo({
      shifts: shifts[workerName],
      primaryScheduleWorkerShifts: primaryScheduleModel?.shifts[workerName],
      workerNorm: time[workerName],
      workerEmploymentContract: workerContractType,
      month,
      year,
      dates,
      shiftTypes: actualScheduleModel.shift_types,
    });
  }

  public static fromWorkerInfo({
    shifts,
    primaryScheduleWorkerShifts,
    workerNorm,
    workerEmploymentContract,
    month,
    year,
    dates,
    shiftTypes,
  }: {
    shifts: ShiftCode[];
    primaryScheduleWorkerShifts: MonthDataArray<ShiftCode>;
    workerNorm: number;
    workerEmploymentContract: ContractType;
    month: number;
    year: number;
    dates: number[];
    shiftTypes: ShiftTypesDict;
  }): WorkerHourInfo {
    const { verboseDates } = new MonthInfoLogic(month, year, dates);
    const monthName = TranslationHelper.englishMonths[month];
    return this.calculateWorkHoursInfo({
      actualWorkerShifts: shifts,
      primaryScheduleWorkerShifts,
      workerNorm,
      dates: verboseDates,
      month: monthName,
      workerContractType: workerEmploymentContract,
      shiftTypes,
    });
  }
  // #endregion

  // #region logic
  private static calculateWorkHoursInfo(
    {
      actualWorkerShifts,
      workerNorm,
      dates,
      month,
      primaryScheduleWorkerShifts,
      workerContractType,
      shiftTypes,
    }: WorkerInfoForCalculateWorkerHoursInfo,
    options: WorkHoursInfoCalulationOptions = DEFAULT_WORK_HOURS_INFO_CALCULATION_OPTIONS
  ): WorkerHourInfo {
    this.validateActualWorkersShifts(actualWorkerShifts, dates);

    const cropToMonth = this.createCropToMonthFunc(dates, month);
    const currentMonthDates = cropToMonth(dates);
    const actualShiftsFromCurrentMonth = cropToMonth(actualWorkerShifts);

    primaryScheduleWorkerShifts = primaryScheduleWorkerShifts ?? actualShiftsFromCurrentMonth;

    if (!isAllValuesDefined([primaryScheduleWorkerShifts, actualShiftsFromCurrentMonth])) {
      return new WorkerHourInfo(0, 0, 0);
    }

    if (actualShiftsFromCurrentMonth.length !== primaryScheduleWorkerShifts.length) {
      primaryScheduleWorkerShifts = cropToMonth(primaryScheduleWorkerShifts);
    }

    this.validatePrimaryWorkersShifts(actualShiftsFromCurrentMonth, primaryScheduleWorkerShifts);

    const workerHourNorm = this.calculateWorkerHourNorm(
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts,
      currentMonthDates,
      workerNorm,
      workerContractType,
      shiftTypes
    );
    const workerActualWorkTime = this.calculateWorkerActualWorkTime(
      actualShiftsFromCurrentMonth,
      shiftTypes
    );

    const workerOvertime = this.calculateWorkerOvertime(
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts,
      currentMonthDates,
      workerNorm,
      workerContractType,
      shiftTypes,
      options.considerOvetimeTypes
    );

    return new WorkerHourInfo(workerHourNorm, workerActualWorkTime, workerOvertime);
  }

  private static validateActualWorkersShifts(
    actualWorkerShifts: ShiftCode[],
    dates: DateInformationForWorkInfoCalculation[]
  ): void {
    if (actualWorkerShifts.length !== dates.length) {
      throw Error(
        `Length of ${nameOf({ actualWorkerShifts })} should be the same as length of ${nameOf({
          dates,
        })}`
      );
    }
  }

  private static createCropToMonthFunc(
    dates: DateInformationForWorkInfoCalculation[],
    month: string
  ): <T>(array: T[]) => MonthDataArray<T> {
    const firstDayOfCurrentMonth = dates.findIndex((d) => d.month === month);
    const lastDayOfCurrentMonth = _.findLastIndex(dates, (d) => d.month === month);
    return <T>(array: T[]): MonthDataArray<T> =>
      array?.slice(firstDayOfCurrentMonth, lastDayOfCurrentMonth + 1) as MonthDataArray<T>;
  }

  private static validatePrimaryWorkersShifts(
    actualShiftsFromCurrentMonth: MonthDataArray<ShiftCode>,
    primaryScheduleWorkerShifts: MonthDataArray<ShiftCode>
  ): void {
    if (actualShiftsFromCurrentMonth.length !== primaryScheduleWorkerShifts.length) {
      throw Error(
        `Length of ${nameOf({
          primaryScheduleWorkerShifts,
        })} should be the same as length of ${nameOf({
          actualShiftsFromCurrentMonth,
        })}`
      );
    }
  }

  private static calculateWorkerHourNorm(
    actualShiftsFromCurrentMonth: ShiftCode[],
    primaryScheduleWorkerShifts: ShiftCode[],
    currentMonthDates: DateInformationForWorkInfoCalculation[],
    workerNorm: number,
    workerContractType: ContractType,
    shiftTypes: ShiftTypesDict
  ): number {
    const requiredHours = this.calculateRequiredHoursFromVerboseDates(currentMonthDates);
    const freeHours = this.calculateFreeHoursForContractType(
      workerContractType,
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts,
      currentMonthDates,
      shiftTypes
    );
    return Math.max(requiredHours * workerNorm - freeHours, 0);
  }

  private static calculateRequiredHoursFromVerboseDates(
    verboseDates: DateInformationForWorkInfoCalculation[]
  ): number {
    const weekDaysCount = verboseDates.filter((d) => VerboseDateHelper.isNotWeekend(d)).length;
    const holidayDayOffs = VerboseDateHelper.countDayOffsFromHolidays(verboseDates);
    return WORK_HOURS_PER_DAY * (weekDaysCount - holidayDayOffs);
  }

  public static calculateFreeHoursForContractType(
    workerContractType: ContractType,
    actualShiftsFromCurrentMonth: ShiftCode[],
    primaryScheduleWorkerShifts: ShiftCode[],
    currentMonthDates: DateInformationForWorkInfoCalculation[],
    shiftTypes: ShiftTypesDict
  ): number {
    if (workerContractType === ContractType.EMPLOYMENT_CONTRACT) {
      return this.calculateFreeHoursForEmplContract(
        actualShiftsFromCurrentMonth,
        primaryScheduleWorkerShifts,
        currentMonthDates,
        shiftTypes
      );
    }
    return 0;
  }

  private static calculateFreeHoursForEmplContract(
    actualShiftsFromCurrentMonth: ShiftCode[],
    primaryScheduleWorkerShifts: ShiftCode[],
    currentMonthDates: DateInformationForWorkInfoCalculation[],
    shiftTypes: ShiftTypesDict
  ): number {
    const monthShiftsWithHistoryShiftsAndDates = _.zip(
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts,
      currentMonthDates
    ) as [ShiftCode, ShiftCode, DateInformationForWorkInfoCalculation][];

    return monthShiftsWithHistoryShiftsAndDates.reduce((calculateFreeHours, shiftPair) => {
      const [actualShiftCode, historyShiftCode, date] = shiftPair;
      const actualShift = shiftTypes[actualShiftCode];
      const historyShift = shiftTypes[historyShiftCode];
      if (!ShiftHelper.isNotWorkingShift(actualShift)) {
        return calculateFreeHours;
      }
      return calculateFreeHours + this.calculateNormSubtraction(date, actualShift, historyShift);
    }, 0);
  }

  private static calculateNormSubtraction(
    date: DateInformationForWorkInfoCalculation,
    actualShift: NotWorkingShift,
    primaryShift: Shift
  ): number {
    // ignore any free shifts in weekends
    switch (actualShift.type) {
      case NotWorkingShiftType.MedicalLeave:
        return this.calculateMedicalLeaveSubtraction(primaryShift);
      case NotWorkingShiftType.AnnualLeave:
        return this.calculateAnnualLeaveSubtraction(date, actualShift, primaryShift);
      default:
        return 0;
    }
  }

  /**
   * Medical leaves subtract from norm only if there was a working shift in primary schedule
   */
  private static calculateMedicalLeaveSubtraction(primaryShift: Shift): number {
    if (ShiftHelper.isNotWorkingShift(primaryShift)) {
      return 0;
    }
    return ShiftHelper.shiftToWorkTime(primaryShift);
  }

  /**
   * Annual leaves subtract from norm only in working days.
   */
  private static calculateAnnualLeaveSubtraction(
    date: DateInformationForWorkInfoCalculation,
    actualShift: NotWorkingShift,
    primaryShift: Shift
  ): number {
    if (!VerboseDateHelper.isNotWeekend(date)) {
      return 0;
    }
    const actualShiftSubtraction = actualShift.normSubtraction ?? DEFAULT_NORM_SUBTRACTION;
    if (ShiftHelper.isNotWorkingShift(primaryShift)) {
      // If primary shift is not working shift, than shift from actual schedule
      // always takes precedence and we subtracts its normSubtraction
      return actualShiftSubtraction;
    }
    return Math.max(actualShiftSubtraction, ShiftHelper.shiftToWorkTime(primaryShift));
  }

  private static calculateWorkerActualWorkTime(
    actualShiftsFromCurrentMonth: ShiftCode[],
    shiftTypes: ShiftTypesDict
  ): number {
    return actualShiftsFromCurrentMonth.reduce(
      (acc, shift) => acc + ShiftHelper.shiftToWorkTime(shiftTypes[shift]),
      0
    );
  }

  static overtimeHandlers: {
    [ovetimeType in OvertimeType]: (calculationData: DataForOvertimeCalculation) => number;
  } = {
    [OvertimeType.MaxiumNotOvertimeHoursExceed]: WorkerHourInfo.calculateOvertimeForExceeding,
    [OvertimeType.RevisionDifference]: WorkerHourInfo.calculateOvertimeForRevisionDifference,
  };

  private static calculateWorkerOvertime(
    actualShiftsFromCurrentMonth: ShiftCode[],
    primaryScheduleWorkerShifts: ShiftCode[],
    currentMonthDates: DateInformationForWorkInfoCalculation[],
    workerNorm: number,
    workerContractType: ContractType,
    shiftTypes: ShiftTypesDict,
    considerOvertimeTypes: OvertimeType[] = Object.values(OvertimeType)
  ): number {
    const workerHourNorm = this.calculateWorkerHourNorm(
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts,
      currentMonthDates,
      workerNorm,
      workerContractType,
      shiftTypes
    );

    const workerActualWorkTime = this.calculateWorkerActualWorkTime(
      actualShiftsFromCurrentMonth,
      shiftTypes
    );

    const algorithmOvertime = considerOvertimeTypes.reduce((acc, ovetimeType) => {
      const calculationResut = this.overtimeHandlers[ovetimeType]({
        actualWorkerShifts: actualShiftsFromCurrentMonth,
        primaryScheduleWorkerShifts,
        shiftTypes,
      });
      return acc + calculationResut;
    }, 0);

    const normAndActualDiff = Math.round(workerActualWorkTime) - Math.round(workerHourNorm);
    return normAndActualDiff < 0
      ? algorithmOvertime + normAndActualDiff // In case if normAndActualDiff is smaller then 0, we are trying to compensate difference
      : // with overtime calculated based on selected overtime types
        Math.max(normAndActualDiff, algorithmOvertime);
  }

  private static calculateOvertimeForRevisionDifference({
    actualWorkerShifts: actualShiftsFromCurrentMonth,
    primaryScheduleWorkerShifts,
    shiftTypes,
  }: DataForOvertimeCalculation): number {
    const monthShiftsWithHistoryShifts = _.zip(
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts
    ) as [ShiftCode, ShiftCode][];

    let diffBetweenRevisionsOvertime = 0;
    monthShiftsWithHistoryShifts.forEach(([actualShift, historyShift]) => {
      if (actualShift !== historyShift) {
        const workHoursDiffBetweenRevisions =
          ShiftHelper.shiftToWorkTime(shiftTypes[actualShift]) -
          ShiftHelper.shiftToWorkTime(shiftTypes[historyShift]);

        const exceedMaxNormalTime =
          ShiftHelper.shiftToWorkTime(shiftTypes[actualShift]) - MAXIMUM_NOT_OVERTIME_HOURS;
        diffBetweenRevisionsOvertime += Math.max(
          workHoursDiffBetweenRevisions,
          exceedMaxNormalTime,
          0
        );
      }
    });
    return diffBetweenRevisionsOvertime;
  }

  private static calculateOvertimeForExceeding({
    actualWorkerShifts: actualShiftsFromCurrentMonth,
    primaryScheduleWorkerShifts,
    shiftTypes,
  }: DataForOvertimeCalculation): number {
    const monthShiftsWithHistoryShifts = _.zip(
      actualShiftsFromCurrentMonth,
      primaryScheduleWorkerShifts
    ) as [ShiftCode, ShiftCode][];

    let exceedMaximumDayWorkTimeOvertime = 0;
    monthShiftsWithHistoryShifts
      .filter(([actualShift, historyShift]) => actualShift === historyShift)
      .map(([actualShift]) => actualShift)
      .forEach((shift) => {
        const shiftWorkTime = ShiftHelper.shiftToWorkTime(shiftTypes[shift]);
        if (shiftWorkTime > MAXIMUM_NOT_OVERTIME_HOURS) {
          exceedMaximumDayWorkTimeOvertime += Math.max(
            shiftWorkTime - MAXIMUM_NOT_OVERTIME_HOURS,
            0
          );
        }
      });
    return exceedMaximumDayWorkTimeOvertime;
  }

  // to test
  public static calculateWorkNormForMonth(month: number, year: number): number {
    const dates = VerboseDateHelper.generateVerboseDatesForMonth(month, year);
    return Math.round(this.calculateRequiredHoursFromVerboseDates(dates));
  }
  // #endregion
}
