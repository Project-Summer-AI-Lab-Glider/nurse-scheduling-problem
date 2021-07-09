/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { t } from "../../../../helpers/translations.helper";
import { WorkerType } from "../../../../state/schedule-data/worker-info/worker-info.model";
import {
  ButtonData,
  DropdownButtons,
} from "../../../buttons/dropdown-buttons/dropdown-buttons.component";
import { FormFieldErrorLabel } from "./form-field-error-label.component";
import { FormFieldOptions, translateAndCapitalizeWorkerType } from "./worker-edit.models";
import * as S from "./worker.styled";

interface WorkerPositionSelectorOptions extends FormFieldOptions {
  workerType?: WorkerType;
  setActualWorkerType: (newWorkerPosition: WorkerType) => void;
}

export function WorkerWorkerTypeSelector({
  workerType,
  setActualWorkerType,
  setIsFieldValid,
}: WorkerPositionSelectorOptions): JSX.Element {
  const [firstEditMade, setFirstEditMade] = useState(false);

  function handleWorkerTypeUpdate(type: WorkerType): void {
    setActualWorkerType(type);
    setFirstEditMade(true);
  }

  const positionOptions: ButtonData[] = Object.keys(WorkerType).map((workerTypeName) => {
    const type = WorkerType[workerTypeName];
    return {
      label: translateAndCapitalizeWorkerType(type),
      action: (): void => handleWorkerTypeUpdate(type),
      dataCy: workerTypeName.toLowerCase(),
    };
  });

  const isWorkerPositionValid = useCallback((): boolean => !!workerType, [workerType]);

  useEffect((): void => {
    setIsFieldValid?.(isWorkerPositionValid());
  }, [workerType, setIsFieldValid, isWorkerPositionValid]);
  return (
    <Grid item xs={6}>
      <S.Label>{t("position")}</S.Label>
      <DropdownButtons
        dataCy="position"
        buttons={positionOptions}
        mainLabel={workerType ? translateAndCapitalizeWorkerType(workerType) : t("position")}
        buttonVariant="secondary"
        width={160}
      />
      <FormFieldErrorLabel
        shouldBeVisible={!isWorkerPositionValid() && firstEditMade}
        message={t("selectWorkerPosition")}
      />
    </Grid>
  );
}
