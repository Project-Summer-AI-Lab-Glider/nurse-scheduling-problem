/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import xlsx from "exceljs";
import { MonthDataModel } from "../../state/schedule-data/schedule-data.model";
import { ContractTypeHelper } from "../../helpers/contract-type.helper";
import { WorkerTypeHelper } from "../../helpers/worker-type.helper";
import { PrimaryMonthRevisionDataModel } from "../../state/application-state.model";
import { EMPTY_ROW, WORKER_HEADERS } from "../../helpers/parser.helper";
import { CELL_MARGIN, ScheduleExportLogic } from "./schedule-export.logic";

export interface ScheduleExportLogicOptions {
  scheduleModel: MonthDataModel;
  primaryScheduleModel?: PrimaryMonthRevisionDataModel;
  overtimeExport?: boolean;
  extraWorkersExport?: boolean;
}

export class WorkerExportLogic {
  private scheduleModel: MonthDataModel;

  constructor({ scheduleModel }: ScheduleExportLogicOptions) {
    this.scheduleModel = scheduleModel;
  }

  public setWorkersWorkSheet(workSheet: xlsx.Worksheet): void {
    ScheduleExportLogic.setupWorksheet(workSheet);

    const workersInfoArray = WorkerExportLogic.createWorkersInfoSection(this.scheduleModel);

    const colLens = workersInfoArray[0].map((_, colIndex) =>
      Math.max(...workersInfoArray.map((row) => row[colIndex]?.toString().length ?? 0))
    );

    workSheet.addRows(workersInfoArray);

    colLens.forEach((len, id) => {
      workSheet.getColumn(id + 1).width = len + CELL_MARGIN;
    });

    workSheet.getColumn(1).alignment = { vertical: "middle", horizontal: "left" };
    for (let i = 1; i <= WORKER_HEADERS.length; i++) {
      workSheet.getColumn(i).alignment = { vertical: "middle", horizontal: "center" };
    }

    workSheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
    workSheet.getRow(1).font = { bold: true };
  }

  private static createWorkersInfoSection(scheduleModel: MonthDataModel): (string | number)[][] {
    const names = Object.keys(scheduleModel.employee_info?.type);

    const workers: (string | number)[][] = [];

    workers.push(WORKER_HEADERS);
    workers.push(EMPTY_ROW);
    names.forEach((name) =>
      workers.push([
        name,
        WorkerTypeHelper.translateToShort(scheduleModel.employee_info?.type[name]),
        ContractTypeHelper.translateToShort(scheduleModel.employee_info?.contractType?.[name]),
        scheduleModel.employee_info?.time[name],
        scheduleModel.employee_info?.team[name],
      ])
    );
    return [...workers];
  }
}
