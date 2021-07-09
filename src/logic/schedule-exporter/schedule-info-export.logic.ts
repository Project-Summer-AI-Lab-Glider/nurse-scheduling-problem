/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import xlsx from "exceljs";
import * as _ from "lodash";
import { VerboseDate } from "../../state/schedule-data/foundation-info/foundation-info.model";
import { MonthDataModel } from "../../state/schedule-data/schedule-data.model";
import { ShiftCode } from "../../state/schedule-data/shifts-types/shift-types.model";
import { ColorHelper } from "../../helpers/colors/color.helper";
import { ShiftHelper } from "../../helpers/shifts.helper";
import { TranslationHelper } from "../../helpers/translations.helper";
import { PrimaryMonthRevisionDataModel } from "../../state/application-state.model";
import { MonthInfoLogic } from "../schedule-logic/month-info.logic";
import {
  ChildrenSectionKey,
  ExtraWorkersSectionKey,
  MetaDataRowLabel,
  MetaDataSectionKey,
} from "../section.model";
import { EMPTY_ROW } from "../../helpers/parser.helper";
import { groupWorkersByTeam } from "../../hooks/use-teams";
import { WorkerInfo } from "../../hooks/use-worker-info";
import { MonthHelper } from "../../helpers/month.helper";
import { ScheduleExportLogic } from "./schedule-export.logic";
import { WorkerHourInfo } from "../schedule-logic/worker-hours-info.logic";

export interface ScheduleExportLogicOptions {
  scheduleModel: MonthDataModel;
  primaryScheduleModel?: PrimaryMonthRevisionDataModel;
  overtimeExport?: boolean;
  extraWorkersExport?: boolean;
}

const OVERTIME_LABEL_LEN = 3;
const HEADER_LEN = 1;
const ROW_HEIGHT = 18;
const HEADER_ROW_HEIGHT = 40;

const NAME_COL_INDEX = 1;
const NAME_COL_WIDTH = 20;

const METADATA_START_COL = 1;

export class ScheduleInfoExportLogic {
  private scheduleModel: MonthDataModel;

  private primaryScheduleModel?: PrimaryMonthRevisionDataModel;

  private overtimeExport?: boolean;

  private extraWorkersExport: boolean;

  private scheduleLen: number;

  constructor({
    scheduleModel,
    primaryScheduleModel,
    overtimeExport,
    extraWorkersExport = true,
  }: ScheduleExportLogicOptions) {
    this.scheduleModel = scheduleModel;
    const { month, year } = this.scheduleModel.scheduleKey;
    this.scheduleLen = MonthHelper.getMonthLength(year, month);
    this.primaryScheduleModel = primaryScheduleModel;
    this.overtimeExport = !!overtimeExport && !!primaryScheduleModel;
    this.extraWorkersExport = extraWorkersExport;
  }

  public setScheduleWorkSheet(workSheet: xlsx.Worksheet): void {
    ScheduleExportLogic.setupWorksheet(workSheet);

    const headerRow = this.createHeader(this.scheduleModel);
    const datesSection = ScheduleInfoExportLogic.createDatesSection(this.scheduleModel);
    const extraWorkersSection = ScheduleInfoExportLogic.createExtraWorkersSection(
      this.scheduleModel
    );
    const childrenInfoSection = ScheduleInfoExportLogic.createChildrenInfoSection(
      this.scheduleModel
    );

    const schedule: (
      | string[]
      | (number | ExtraWorkersSectionKey | MetaDataSectionKey | ChildrenSectionKey)[]
    )[] = [headerRow, ...datesSection];
    let foundationInfoLen = 0;

    if (this.extraWorkersExport) {
      schedule.push(...extraWorkersSection);
      foundationInfoLen++;
    }
    if (this.overtimeExport) {
      foundationInfoLen++;
    }
    schedule.push(...childrenInfoSection);
    foundationInfoLen++;

    schedule.push(EMPTY_ROW);

    const workersByTeam = groupWorkersByTeam(this.scheduleModel);
    Object.keys(workersByTeam).forEach((team) => {
      let teamRows = this.createGroupWorkersRows(workersByTeam[team]);
      if (this.overtimeExport) {
        teamRows = this.extendWithOvertimeInfo(teamRows);
      }
      schedule.push(...teamRows);
      schedule.push(EMPTY_ROW);
    });

    workSheet.addRows(schedule);

    const emptySpace = 1;
    const shiftSectionStartIndex = 1 + foundationInfoLen + HEADER_LEN + emptySpace;
    this.styleWorksheet(workSheet, shiftSectionStartIndex);

    workSheet.mergeCells(
      HEADER_LEN,
      METADATA_START_COL,
      HEADER_LEN,
      METADATA_START_COL + this.scheduleLen + OVERTIME_LABEL_LEN + 1
    );
    workSheet.getColumn(METADATA_START_COL).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    if (this.overtimeExport) {
      this.addOvertimeHoursLabels(workSheet);
    }
  }

  private createGroupWorkersRows(workersInfo: WorkerInfo[]): string[][] {
    const workerRows: string[][] = [];
    workersInfo.forEach((worker) => {
      const printableSifts = worker.workerShifts.map((shift) =>
        shift === ShiftCode.W ? "" : shift
      );
      workerRows.push([worker.workerName, ...printableSifts]);
    });
    return workerRows;
  }

  private extendWithOvertimeInfo(workerRows: string[][]): string[][] {
    const extendedRows: string[][] = [];
    workerRows.forEach((row) => {
      extendedRows.push([
        ...row,
        ...Object.values(
          WorkerHourInfo.fromSchedules(row[0], this.scheduleModel, this.primaryScheduleModel)
            .summary
        ),
      ]);
    });
    return extendedRows;
  }

  private styleWorksheet(workSheet: xlsx.Worksheet, shiftStartIndex: number): void {
    workSheet.getColumn(NAME_COL_INDEX).width = NAME_COL_WIDTH;

    workSheet.eachRow((row, index) => {
      if (index === 1) {
        ScheduleInfoExportLogic.styleHeaderRow(row);
        return;
      }

      row.height = ROW_HEIGHT;
      if (index >= shiftStartIndex && !ScheduleExportLogic.isEmptyRow(row)) {
        this.styleShiftRow(row);
      }
    });
  }

  private addOvertimeHoursLabels(workSheet: xlsx.Worksheet): void {
    const labelStartRow = HEADER_LEN + 1;

    let labelColumn = 1 + this.scheduleLen + 1;
    Object.values(WorkerHourInfo.summaryTranslations).forEach((translation) => {
      const cell = workSheet.getCell(labelStartRow, labelColumn);

      const cellAddress = cell.address;
      workSheet.mergeCells(
        labelStartRow,
        labelColumn,
        labelStartRow + OVERTIME_LABEL_LEN - 1,
        labelColumn
      );
      cell.value = _.startCase(translation);
      workSheet.getCell(cellAddress).alignment = {
        textRotation: -90,
        vertical: "top",
        horizontal: "center",
      };
      labelColumn++;
    });
  }

  private styleShiftRow(row: xlsx.Row): void {
    const { month, year } = this.scheduleModel.scheduleKey;
    const monthLogic = new MonthInfoLogic(month, year, this.scheduleModel.month_info?.dates || []);
    const { verboseDates } = monthLogic;

    const calendarDataMargin = -2;

    row.eachCell((cell, colNumber) => {
      const cellValue = cell.value?.toString() || "";
      cell.style = this.getShiftStyle(
        ShiftCode[cellValue] || ShiftCode.W,
        verboseDates[colNumber + calendarDataMargin]
      );
    });
  }

  private static styleHeaderRow(row: xlsx.Row): void {
    row.height = HEADER_ROW_HEIGHT;
    row.eachCell((cell) => {
      cell.font = {
        family: 4,
        size: 28,
        bold: true,
      };
    });
  }

  private getShiftStyle(code: ShiftCode, verboseDate?: VerboseDate): Partial<xlsx.Style> {
    const shiftFillColor = ShiftHelper.getShiftColor(
      code,
      this.scheduleModel.shift_types,
      verboseDate
    ).backgroundColor;
    const borderColor: Partial<xlsx.Border> = {
      color: { argb: ScheduleExportLogic.rgbaToArgbHex(ColorHelper.getBorderColor()) },
      style: "thin",
    };
    return {
      alignment: {
        horizontal: "center",
        vertical: "middle",
      },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: ScheduleExportLogic.rgbaToArgbHex(shiftFillColor) },
      },
      border: {
        top: borderColor,
        bottom: borderColor,
        left: borderColor,
        right: borderColor,
      },
      font: {
        color: {
          argb: ScheduleExportLogic.decideBlackOrWhite(
            ShiftHelper.getShiftColor(code, this.scheduleModel.shift_types, verboseDate)
              .backgroundColor
          ),
        },
      },
    };
  }

  private createHeader(scheduleModel: MonthDataModel): string[] {
    const headerRow = { [MetaDataRowLabel]: "" };
    headerRow[MetaDataSectionKey.Month] =
      TranslationHelper.polishMonths[scheduleModel?.scheduleKey.month || 0];
    headerRow[MetaDataSectionKey.Year] = scheduleModel?.scheduleKey.year || 0;
    headerRow[MetaDataSectionKey.RequiredavailableWorkersWorkTime] = 0;
    let infoStr = Object.keys(headerRow)
      .map((key) => `${key} ${headerRow[key]}`)
      .join("  |  ")
      .slice(9)
      .toUpperCase();
    infoStr = `${infoStr.slice(0, infoStr.length - 2)} ${WorkerHourInfo.calculateWorkNormForMonth(
      scheduleModel?.scheduleKey.month,
      scheduleModel?.scheduleKey.year
    )}`;
    return [`GRAFIK ${infoStr}`];
  }

  private static createChildrenInfoSection(
    scheduleModel: MonthDataModel
  ): (number | ChildrenSectionKey)[][] {
    // in case if it will be more complicated section
    return [
      [
        ChildrenSectionKey.RegisteredChildrenCount,
        ...(scheduleModel.month_info?.children_number || []),
      ],
    ];
  }

  private static createExtraWorkersSection(
    scheduleModel: MonthDataModel
  ): (number | ExtraWorkersSectionKey)[][] {
    return [
      [
        ExtraWorkersSectionKey.ExtraWorkersCount,
        ...(scheduleModel.month_info?.extra_workers || []),
      ],
    ];
  }

  private static createDatesSection(
    scheduleModel: MonthDataModel
  ): (number | MetaDataSectionKey)[][] {
    return [[MetaDataSectionKey.MonthDays, ...(scheduleModel.month_info?.dates || [])]];
  }
}
