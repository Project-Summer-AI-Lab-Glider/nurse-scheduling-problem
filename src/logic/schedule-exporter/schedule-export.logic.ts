/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import xlsx from "exceljs";
import { RevisionType } from "../data-access/persistance-store.model";
import { MonthDataModel } from "../../state/schedule-data/schedule-data.model";
import { Color } from "../../helpers/colors/color.model";
import { FileHelper } from "../../helpers/file.helper";
import { PrimaryMonthRevisionDataModel } from "../../state/application-state.model";
import {
  EMPTY_ROW_SIZE,
  SHIFTS_WORKSHEET_NAME,
  WORKERS_WORKSHEET_NAME,
  SCHEDULE_WORKSHEET_NAME,
} from "../../helpers/parser.helper";
import { WorkerExportLogic } from "./worker-export.logic";
import { ShiftExportLogic } from "./shift-export.logic";
import { ScheduleInfoExportLogic } from "./schedule-info-export.logic";

export const CELL_MARGIN = 4;

export interface ScheduleExportLogicOptions {
  scheduleModel: MonthDataModel;
  primaryScheduleModel?: PrimaryMonthRevisionDataModel;
  overtimeExport?: boolean;
  extraWorkersExport?: boolean;
}

export class ScheduleExportLogic {
  private scheduleModel: MonthDataModel;

  private scheduleInfoExportLogic: ScheduleInfoExportLogic;

  private shiftExportLogic: ShiftExportLogic;

  private workerExportLogic: WorkerExportLogic;

  constructor({
    scheduleModel,
    primaryScheduleModel,
    overtimeExport,
    extraWorkersExport = true,
  }: ScheduleExportLogicOptions) {
    this.scheduleModel = scheduleModel;
    this.scheduleInfoExportLogic = new ScheduleInfoExportLogic({
      scheduleModel,
      primaryScheduleModel,
      overtimeExport,
      extraWorkersExport,
    });
    this.shiftExportLogic = new ShiftExportLogic({
      scheduleModel,
    });
    this.workerExportLogic = new WorkerExportLogic({
      scheduleModel,
      primaryScheduleModel,
      overtimeExport,
      extraWorkersExport,
    });
  }

  public formatAndSave(revisionType: RevisionType): void {
    const [finalName, workbook] = this.createWorkbook(revisionType);
    FileHelper.saveToFile(workbook, finalName);
  }

  public createWorkbook(revisionType: RevisionType): [string, xlsx.Workbook] {
    const [
      workbook,
      scheduleWorkSheet,
      workersWorkSheet,
      shiftsWorkSheet,
    ] = ScheduleExportLogic.createWorkArea();

    this.scheduleInfoExportLogic.setScheduleWorkSheet(scheduleWorkSheet);
    this.workerExportLogic.setWorkersWorkSheet(workersWorkSheet);
    this.shiftExportLogic.setShiftsWorkSheet(shiftsWorkSheet);

    const workbookName = FileHelper.createMonthFilename(this.scheduleModel, revisionType);
    return [workbookName, workbook];
  }

  private static createWorkArea(): [xlsx.Workbook, xlsx.Worksheet, xlsx.Worksheet, xlsx.Worksheet] {
    const workbook = new xlsx.Workbook();
    return [
      workbook,
      workbook.addWorksheet(SCHEDULE_WORKSHEET_NAME, {
        pageSetup: { paperSize: 9, orientation: "landscape" },
        properties: { defaultColWidth: 5 },
      }),
      workbook.addWorksheet(WORKERS_WORKSHEET_NAME, {
        pageSetup: { paperSize: 9, orientation: "landscape" },
        properties: { defaultColWidth: 5 },
      }),
      workbook.addWorksheet(SHIFTS_WORKSHEET_NAME, {
        pageSetup: { paperSize: 9, orientation: "landscape" },
        properties: { defaultColWidth: 5 },
      }),
    ];
  }

  public static setupWorksheet(workSheet: xlsx.Worksheet): void {
    workSheet.pageSetup.showGridLines = true;
    workSheet.pageSetup.fitToPage = true;
    workSheet.pageSetup.fitToHeight = 1;
    workSheet.pageSetup.fitToWidth = 1;
    workSheet.pageSetup.horizontalCentered = true;
  }

  // the values are based on w3c recommendations.
  // We need to determine the color with the highest contrast.
  // https://www.w3.org/TR/WCAG20/#relativeluminancedef
  // https://www.w3.org/TR/WCAG20/#contrast-ratiodef
  public static decideBlackOrWhite(color: Color): string {
    const black = "000000";
    const white = "FFFFFF";
    const rgb = [color.r, color.b, color.g];
    const linearRgb = rgb.map((c) => {
      c /= 255.0;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    const luminance = 0.2126 * linearRgb[0] + 0.7152 * linearRgb[1] + 0.0722 * linearRgb[2];
    return luminance > 0.179 ? black : white;
  }

  public static rgbaToArgbHex(color: Color): string {
    const toHex = (num: number): string => `0${num.toString(16)}`.slice(-2);
    const c = color;
    return `${toHex(c.a)}${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
  }

  public static isEmptyRow(row: xlsx.Row): boolean {
    for (let i = 1; i < EMPTY_ROW_SIZE + 1; i++) {
      if (row.getCell(i).value !== "") {
        return false;
      }
    }
    return true;
  }
}
