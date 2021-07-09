/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import xlsx from "exceljs";
import * as _ from "lodash";
import { ABSENCE_HEADERS, EMPTY_ROW } from "../../helpers/parser.helper";
import { TranslationHelper } from "../../helpers/translations.helper";
import { PrimaryMonthRevisionDataModel } from "../../state/application-state.model";
import {
  VerboseDate,
  WeekDay,
} from "../../state/schedule-data/foundation-info/foundation-info.model";
import { ScheduleDataModel } from "../../state/schedule-data/schedule-data.model";
import { ShiftCode, SHIFTS } from "../../state/schedule-data/shifts-types/shift-types.model";
import { ContractType } from "../../state/schedule-data/worker-info/worker-info.model";
import { MonthInfoLogic } from "../schedule-logic/month-info.logic";
import { WorkerHourInfo } from "../schedule-logic/worker-hours-info.logic";
import { CELL_MARGIN } from "./schedule-export.logic";

interface AbsenceInfo {
  workersAbsenceInfoArray: (string | number)[][];
  cellsToMerge: number[][];
}

export class WorkersAbsenceExportLogic {
  private scheduleModel: ScheduleDataModel;

  private revision: PrimaryMonthRevisionDataModel;

  constructor(scheduleModel: ScheduleDataModel, revision: PrimaryMonthRevisionDataModel) {
    this.scheduleModel = scheduleModel;
    this.revision = revision;
  }

  private pageSetup(workSheet: xlsx.Worksheet): void {
    workSheet.pageSetup.showGridLines = true;
    workSheet.pageSetup.fitToPage = true;
    workSheet.pageSetup.fitToHeight = 1;
    workSheet.pageSetup.fitToWidth = 1;
    workSheet.pageSetup.horizontalCentered = true;
  }

  private styleWorkSheet(workSheet: xlsx.Worksheet, colLens: number[]): void {
    colLens.forEach((len, id) => {
      workSheet.getColumn(id + 1).width = len + CELL_MARGIN;
    });

    for (let i = 1; i <= ABSENCE_HEADERS.length; i++) {
      workSheet.getColumn(i).alignment = { vertical: "middle", horizontal: "center" };
    }

    workSheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
    workSheet.getRow(1).font = { bold: true };
  }

  public setAbsenceWorkSheet(workSheet: xlsx.Worksheet): void {
    this.pageSetup(workSheet);

    const { workersAbsenceInfoArray, cellsToMerge } = this.createAbsenceInfoSection(
      this.scheduleModel
    );

    const colLens = workersAbsenceInfoArray[0].map((absence, colIndex) =>
      Math.max(...workersAbsenceInfoArray.map((row) => row[colIndex]?.toString().length ?? 0))
    );

    workSheet.addRows(workersAbsenceInfoArray);

    cellsToMerge.forEach((pair, index) => {
      if (cellsToMerge[index][0] > 0) {
        const top = pair[0];
        let bottom = pair[1];
        let i = index;

        while (cellsToMerge[i + 1] !== undefined && cellsToMerge[i + 1][0] === bottom) {
          cellsToMerge[i + 1][0] = -1;
          bottom = cellsToMerge[i + 1][1];
          i++;
        }

        workSheet.mergeCells(top, 1, bottom, 1);
      }
    });

    this.styleWorkSheet(workSheet, colLens);
  }

  private isNonHolidayWeekDay(verboseDate: VerboseDate): boolean {
    return !(
      verboseDate.isPublicHoliday ||
      verboseDate.dayOfWeek === WeekDay.SA ||
      verboseDate.dayOfWeek === WeekDay.SU
    );
  }

  private isExcludedShift(shift: ShiftCode): boolean {
    return shift === ShiftCode.W || shift === ShiftCode.NZ || SHIFTS[shift].isWorkingShift;
  }

  private pushWorkersRow({
    workerName,
    workers,
    shift,
    from,
    to,
    month,
    totalDaysNo,
    workerContractType,
    verboseDates,
  }: {
    workerName: string;
    workers: (string | number)[][];
    shift: ShiftCode;
    from: number;
    to: number;
    month: number;
    totalDaysNo: number;
    workerContractType: ContractType;
    verboseDates: VerboseDate[];
  }): void {
    workers.push([
      workerName,
      SHIFTS[shift].name,
      `${from} ${TranslationHelper.polishMonthsGenetivus[month]}`,
      `${to} ${TranslationHelper.polishMonthsGenetivus[month]}`,
      totalDaysNo,
      WorkerHourInfo.calculateFreeHoursForContractType(
        workerContractType,
        this.scheduleModel.shifts[workerName],
        this.revision.shifts[workerName],
        verboseDates,
        this.scheduleModel.shift_types
      ),
    ]);
  }

  private setDaysNoAndIndex(
    index: number,
    workerShifts: ShiftCode[],
    verboseDates: VerboseDate[],
    daysNo: number
  ): [number, number] {
    while (index + 1 < workerShifts.length && workerShifts[index + 1] === workerShifts[index]) {
      workerShifts[index] = ShiftCode.W;
      index++;
      if (this.isNonHolidayWeekDay(verboseDates[index])) daysNo++;
    }
    return [daysNo, index];
  }

  private createAbsenceInfoSection(scheduleModel: ScheduleDataModel): AbsenceInfo {
    scheduleModel = _.cloneDeep(scheduleModel);
    const cellsToMerge: number[][] = [];
    const names = Object.keys(scheduleModel.employee_info?.type);
    const month = scheduleModel.schedule_info.month_number;
    const year = scheduleModel.schedule_info.year;
    const dates = scheduleModel.month_info.dates;
    const workers: (string | number)[][] = [];

    let employeeRowIndex = 2;

    workers.push(ABSENCE_HEADERS);
    workers.push(EMPTY_ROW);
    names.forEach((name) => {
      const workerShifts = scheduleModel.shifts[name];
      const workerContractType = scheduleModel.employee_info.contractType[name];
      const { verboseDates } = new MonthInfoLogic(month, year, dates);

      let moreThanOneRow = false;
      workerShifts.forEach((shift, index) => {
        let daysNo = 0;
        if (this.isNonHolidayWeekDay(verboseDates[index])) daysNo++;
        if (!this.isExcludedShift(shift)) {
          employeeRowIndex++;
          const from = scheduleModel.month_info.dates[index];
          const [totalDaysNo, endIndex] = this.setDaysNoAndIndex(
            index,
            workerShifts,
            verboseDates,
            daysNo
          );
          const to = scheduleModel.month_info.dates[endIndex];

          workerShifts[endIndex] = ShiftCode.W;
          const workerName = moreThanOneRow ? "" : name;
          if (!moreThanOneRow) {
            moreThanOneRow = true;
          } else {
            const toMerge: number[] = [];
            toMerge.push(employeeRowIndex - 1);
            toMerge.push(employeeRowIndex);
            cellsToMerge.push(toMerge);
          }
          this.pushWorkersRow({
            workerName,
            workers,
            shift,
            from,
            to,
            month,
            totalDaysNo,
            workerContractType,
            verboseDates,
          });
        }
      });
    });
    return { workersAbsenceInfoArray: [...workers], cellsToMerge };
  }
}
