/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  withStyles,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import React from "react";
import { useSelector } from "react-redux";
import * as S from "./export.modal.styled";
import { Button } from "../../common-components";
import { ScheduleDataModel } from "../../../state/schedule-data/schedule-data.model";
import { cropScheduleDMToMonthDM } from "../../../logic/schedule-container-converter/schedule-container-converter";
import { ScheduleExportLogic } from "../../../logic/schedule-exporter/schedule-export.logic";
import {
  ButtonData,
  DropdownButtons,
} from "../../buttons/dropdown-buttons/dropdown-buttons.component";
import DefaultModal from "../modal.component";
import { t } from "../../../helpers/translations.helper";
import { getActualRevision, getPrimaryRevision } from "../../../state/schedule-data/selectors";

export interface ExportModalComponent {
  setOpen: (open: boolean) => void;
  open: boolean;
  model: ScheduleDataModel;
}
const BlueCheckBox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default function ExportModal(options: ExportModalComponent): JSX.Element {
  const { setOpen, open, model } = options;
  const [exportMode, setexportMode] = React.useState("XLSX");
  const handleClose = (): void => {
    setOpen(false);
  };

  const [exportOptions, setExportOptions] = React.useState({
    extraWorkers: { value: true, label: t("dayWorkers") },
    overtime: { value: true, label: t("overtime").toLowerCase() },
  });
  const revision = useSelector(getActualRevision);
  const primaryRevision = useSelector(getPrimaryRevision);

  const exportExtensions = {
    xlsx: (): void => {
      new ScheduleExportLogic({
        scheduleModel: cropScheduleDMToMonthDM(model),
        primaryScheduleModel: primaryRevision,
        overtimeExport: exportOptions.overtime.value,
        extraWorkersExport: exportOptions.extraWorkers.value,
      }).formatAndSave(revision);
    },
  };
  const handleExport = (): void => {
    exportExtensions[exportMode.toLowerCase()]();
    setOpen(false);
  };

  const btnData: ButtonData[] = [];
  for (const key of Object.keys(exportExtensions)) {
    const button: ButtonData = {
      label: key.toUpperCase(),
      action: () => setexportMode(key.toUpperCase()),
    };
    btnData.push(button);
  }

  const title = t("downloadScheduleTitle");

  const footer = (
    <>
      <Button
        onClick={handleExport}
        size="small"
        variant="primary"
        data-cy="confirm-export-button"
        marginString="5px 10px 5px 0px"
      >
        {t("confirm")}
      </Button>
      <Button
        onClick={handleClose}
        size="small"
        variant="secondary"
        marginString="5px 10px 5px 0px"
      >
        {t("cancel")}
      </Button>
    </>
  );
  const handleChange = (event): void => {
    setExportOptions({
      ...exportOptions,
      [event.target.name]: {
        value: event.target.checked,
        label: exportOptions[event.target.name].label,
      },
    });
  };

  const body = (
    <>
      <S.FormatWrapper>
        <S.Label>{t("fileFormat")}: </S.Label>
        <DropdownButtons
          buttons={btnData}
          mainLabel={exportMode}
          buttonVariant="secondary"
          width={112}
        />
      </S.FormatWrapper>
      <div>
        <S.Label>{t("fileOptions")}: </S.Label>
        <FormGroup>
          {Object.keys(exportOptions).map((key, index) => (
            <FormControlLabel
              style={{ color: "black" }}
              key={key + index}
              control={
                <BlueCheckBox
                  checked={exportOptions[key].value}
                  onChange={handleChange}
                  name={key}
                />
              }
              label={exportOptions[key].label}
            />
          ))}
        </FormGroup>
      </div>
    </>
  );

  return <DefaultModal open={open} setOpen={setOpen} title={title} body={body} footer={footer} />;
}
