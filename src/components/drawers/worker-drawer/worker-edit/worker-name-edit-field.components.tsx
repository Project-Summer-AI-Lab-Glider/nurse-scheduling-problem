/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { t } from "../../../../helpers/translations.helper";
import { getPresentWorkerNames } from "../../../../state/schedule-data/selectors";
import {
  FormFieldErrorLabelOptions,
  FormFieldErrorLabelStack,
} from "./form-field-error-label.component";
import { FormFieldOptions, WorkerEditComponentMode } from "./worker-edit.models";
import * as S from "./worker.styled";

export interface WorkerNameEditFieldOptions extends FormFieldOptions {
  workerName: string;
  setWorkerName: (newWorkerName: string) => void;
  mode: WorkerEditComponentMode;
}

export function WorkerNameEditField({
  workerName,
  setWorkerName,
  setIsFieldValid,
  mode,
}: WorkerNameEditFieldOptions): JSX.Element {
  const [firstEditMade, setFirstEditMade] = useState(false);
  const workerNames = useSelector(getPresentWorkerNames);

  const isWorkerWithSameNameExists = useCallback(
    (): boolean =>
      workerNames.includes((workerName ?? "").trim()) && mode !== WorkerEditComponentMode.EDIT,
    [mode, workerName, workerNames]
  );

  const isWorkerNameEmpty = useCallback((): boolean => workerName === "", [workerName]);

  useEffect(() => {
    const isNameValid = !isWorkerNameEmpty() && !isWorkerWithSameNameExists();
    setIsFieldValid?.(isNameValid);
  }, [workerName, setIsFieldValid, isWorkerWithSameNameExists, isWorkerNameEmpty]);

  const nameFieldErrorLabels: FormFieldErrorLabelOptions[] = [
    {
      shouldBeVisible: isWorkerWithSameNameExists() && firstEditMade,
      message: t("workerAlreadyExists", { name: workerName }),
    },
    {
      shouldBeVisible: isWorkerNameEmpty() && firstEditMade,
      message: t("enterWorkersFirstAndLastName"),
    },
  ];

  const handleWorkerNameChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setWorkerName(event.target.value);
      setFirstEditMade(true);
    },
    [setWorkerName]
  );
  return (
    <>
      <Grid item xs={6}>
        <S.Label>{t("firstAndLastName")}</S.Label>
        <S.TextField
          fullWidth
          name="workerName"
          style={{
            marginBottom: 5,
          }}
          data-cy="name"
          value={workerName}
          onChange={handleWorkerNameChange}
          color="primary"
        />
        <FormFieldErrorLabelStack errorLabels={nameFieldErrorLabels} />
      </Grid>
    </>
  );
}
