import React, { ChangeEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleError } from "../../../common-models/schedule-error.model";
import { ScheduleExportLogic } from "../../../logic/schedule-exporter/schedule-export.logic";
import { ActionModel } from "../../../state/models/action.model";
import { ApplicationStateModel } from "../../../state/models/application-state.model";
import { ScheduleDataActionCreator } from "../../../state/reducers/schedule-data-reducers/schedule-data.action-creator";
import { ScheduleErrorActionType } from "../../../state/reducers/schedule-errors.reducer";
import {
  ButtonData,
  DropdownButtons,
} from "../../common-components/dropdown-buttons/dropdown-buttons.component";
import { useScheduleConverter } from "./hooks/use-schedule-converter";

export function ImportButtonsComponent(): JSX.Element {
  const DEFAULT_FILENAME = "grafik.xlsx";
  const { scheduleModel, setSrcFile, scheduleErrors, errorOccurred } = useScheduleConverter();
  const fileUpload = useRef<HTMLInputElement>(null);

  const stateScheduleModel = useSelector(
    (state: ApplicationStateModel) => state.scheduleData?.present
  );
  const scheduleDipatcher = useDispatch();

  const btnData1: ButtonData = {
    label: "Wczytaj",
    action: () => fileUpload.current?.click(),
    dataCy: "load-schedule-button",
  };
  const btnData2: ButtonData = {
    label: "Zapisz jako...",
    action: (): void => handleExport(),
    dataCy: "export-schedule-button",
  };

  const btnData = [btnData1, btnData2];

  useEffect(() => {
    if (scheduleModel) {
      const action = ScheduleDataActionCreator.addNewSchedule(scheduleModel);
      scheduleDipatcher(action);
    } else if (errorOccurred) {
      //todo display message
    }

    scheduleDipatcher({
      type: ScheduleErrorActionType.UPDATE,
      payload: scheduleErrors,
    } as ActionModel<ScheduleError[]>);
  }, [scheduleModel, scheduleDipatcher, scheduleErrors, errorOccurred]);

  function handleImport(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target?.files && event.target?.files[0];
    if (file) {
      setSrcFile(file);
    }
  }

  function handleExport(): void {
    if (stateScheduleModel) {
      new ScheduleExportLogic(stateScheduleModel).formatAndSave(DEFAULT_FILENAME);
    }
  }

  return (
    <div>
      <DropdownButtons
        buttons={btnData}
        mainLabel="Plik"
        variant="primary"
        dataCy={"file-dropdown"}
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
    </div>
  );
}
