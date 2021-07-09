/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import xlsx from "exceljs";
import { MonthDataModel } from "../../state/schedule-data/schedule-data.model";
import { EMPTY_ROW, ParserHelper, SHIFT_HEADERS } from "../../helpers/parser.helper";
import { CELL_MARGIN, ScheduleExportLogic } from "./schedule-export.logic";

export interface ScheduleInfoExportLogicOptions {
  scheduleModel: MonthDataModel;
}

export class ShiftExportLogic {
  private scheduleModel: MonthDataModel;

  constructor({ scheduleModel }: ScheduleInfoExportLogicOptions) {
    this.scheduleModel = scheduleModel;
  }

  public setShiftsWorkSheet(workSheet: xlsx.Worksheet): void {
    ScheduleExportLogic.setupWorksheet(workSheet);

    const shiftsInfoArray = ShiftExportLogic.createShiftsInfoSection(this.scheduleModel);

    const colLens = shiftsInfoArray[0].map((_, colIndex) =>
      Math.max(...shiftsInfoArray.map((row) => row[colIndex].toString().length))
    );

    workSheet.addRows(shiftsInfoArray);

    colLens.forEach((len, id) => {
      workSheet.getColumn(id + 1).width = len + CELL_MARGIN;
    });

    const firstShiftRow = 3;
    for (let iter = firstShiftRow; iter <= workSheet.rowCount; iter++) {
      const cell = workSheet.getCell(iter, ParserHelper.getShiftColorHeaderIndex() + 1);
      cell.style.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: cell.text },
      };
      cell.value = "";
    }

    for (let iter = 1; iter <= SHIFT_HEADERS.length; iter++) {
      if (iter - 1 === ParserHelper.getShiftNameHeaderIndex()) {
        workSheet.getColumn(iter).alignment = { vertical: "middle", horizontal: "left" };
      } else {
        workSheet.getColumn(iter).alignment = { vertical: "middle", horizontal: "center" };
      }
    }

    workSheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
    workSheet.getRow(1).font = { bold: true };
  }

  private static createShiftsInfoSection(scheduleModel: MonthDataModel): (string | number)[][] {
    const names = Object.values(scheduleModel.shift_types);

    const shifts: (string | number)[][] = [];

    shifts.push(SHIFT_HEADERS);
    shifts.push(EMPTY_ROW);
    names.forEach((name) =>
      shifts.push([
        name.name,
        name.code,
        name.isWorkingShift ? name.from : "-",
        name.isWorkingShift ? name.to : "-",
        ParserHelper.translateBooleanToString(name.isWorkingShift).toUpperCase(),
        name.color,
      ])
    );
    return [...shifts];
  }
}
