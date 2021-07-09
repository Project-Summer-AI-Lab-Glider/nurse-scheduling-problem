/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { ButtonData, DropdownButtons } from "../dropdown-buttons/dropdown-buttons.component";
import ExportModal from "../../modals/export-modal/export.modal.component";
import { useImportModal } from "./import-modal-context";
import { t } from "../../../helpers/translations.helper";
import { AbsenceExportLogic } from "../../../logic/schedule-exporter/absence-export.logic";
import {
  getActualRevision,
  getPresentTemporarySchedule,
  getPrimaryRevision,
} from "../../../state/schedule-data/selectors";

export function ImportButtonsComponent(): JSX.Element {
  const { handleImport } = useImportModal();
  const fileUpload = useRef<HTMLInputElement>(null);
  const revision = useSelector(getActualRevision);
  const primaryRevision = useSelector(getPrimaryRevision);

  const stateScheduleModel = useSelector(getPresentTemporarySchedule);

  const btnData1: ButtonData = {
    label: t("load"),
    action: () => fileUpload.current?.click(),
    dataCy: "load-schedule-button",
  };
  const btnData2: ButtonData = {
    label: t("saveAs"),
    action: (): void => handleExport(),
    dataCy: "export-schedule-button",
  };
  const btnData3: ButtonData = {
    label: t("absenceSummary"),
    action: (): void => handleAbsenceExport(),
  };

  const btnData = [btnData1, btnData2, btnData3];

  function handleExport(): void {
    if (stateScheduleModel) {
      setExportModalOpen(true);
    }
  }

  function handleAbsenceExport(): void {
    new AbsenceExportLogic(stateScheduleModel, primaryRevision).formatAndSave(revision);
  }

  const [exportModalOpen, setExportModalOpen] = React.useState(false);

  return (
    <>
      <DropdownButtons
        buttons={btnData}
        mainLabel={t("file")}
        buttonVariant="secondary"
        width={100}
        dataCy="file-dropdown"
      />
      <input
        ref={fileUpload}
        id="file-input"
        data-cy="file-input"
        onChange={(event): void => handleImport(event)}
        style={{ display: "none" }}
        type="file"
        accept=".xlsx"
      />
      <ExportModal open={exportModalOpen} setOpen={setExportModalOpen} model={stateScheduleModel} />
    </>
  );
}
