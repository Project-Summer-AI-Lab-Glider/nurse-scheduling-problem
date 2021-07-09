/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import xlsx from "exceljs";
import { RevisionType } from "../data-access/persistance-store.model";
import { ScheduleDataModel } from "../../state/schedule-data/schedule-data.model";
import { FileHelper } from "../../helpers/file.helper";
import { ABSENCE_WORKSHEET_NAME } from "../../helpers/parser.helper";
import { WorkersAbsenceExportLogic } from "./workers-absence-export.logic";
import { cropScheduleDMToMonthDM } from "../schedule-container-converter/schedule-container-converter";
import { PrimaryMonthRevisionDataModel } from "../../state/application-state.model";

export class AbsenceExportLogic {
  private scheduleModel: ScheduleDataModel;

  private workerExportLogic: WorkersAbsenceExportLogic;

  constructor(scheduleModel: ScheduleDataModel, revision: PrimaryMonthRevisionDataModel) {
    this.scheduleModel = scheduleModel;
    this.workerExportLogic = new WorkersAbsenceExportLogic(scheduleModel, revision);
  }

  public formatAndSave(revisionType: RevisionType): void {
    const [finalName, workbook] = this.createWorkbook(revisionType);
    FileHelper.saveToFile(workbook, finalName);
  }

  public createWorkbook(revisionType: RevisionType): [string, xlsx.Workbook] {
    const [workbook, workersWorkSheet] = AbsenceExportLogic.createWorkArea();

    this.workerExportLogic.setAbsenceWorkSheet(workersWorkSheet);

    const workbookName = FileHelper.createMonthFilename(
      cropScheduleDMToMonthDM(this.scheduleModel),
      revisionType
    );
    return [workbookName, workbook];
  }

  private static createWorkArea(): [xlsx.Workbook, xlsx.Worksheet] {
    const workbook = new xlsx.Workbook();
    return [
      workbook,
      workbook.addWorksheet(ABSENCE_WORKSHEET_NAME, {
        pageSetup: { paperSize: 9, orientation: "landscape" },
        properties: { defaultColWidth: 5 },
      }),
    ];
  }
}
