/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import * as _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { t } from "../../../../helpers/translations.helper";
import { useMonthInfo } from "../../../../hooks/use-month-info";
import { WorkerHourInfo } from "../../../../logic/schedule-logic/worker-hours-info.logic";
import { WorkNormSelectorOptions } from "./combined-worknorm-selector.component";
import { FormFieldErrorLabel } from "./form-field-error-label.component";
import * as S from "./worker.styled";

export function WorkerCivilContractWorkNormSelector({
  workerTime,
  setWorkerTime,
  setIsFieldValid: setIsFormValid,
}: WorkNormSelectorOptions): JSX.Element {
  const [firstEditMade, setFirstEditMade] = useState(false);

  const { year, monthNumber } = useMonthInfo();
  const requiredHours = WorkerHourInfo.calculateWorkNormForMonth(monthNumber, year);

  const convertToNormalHours = useCallback(
    (workNorm: number): number => Math.floor(workNorm * requiredHours),
    [requiredHours]
  );

  const [workerCivilTime, setWorkerCivilTime] = useState(
    convertToNormalHours(workerTime).toString()
  );

  useEffect(() => {
    setWorkerCivilTime(convertToNormalHours(workerTime).toString());
  }, [workerTime, setWorkerCivilTime, convertToNormalHours]);

  const maximumWorkHoursForMonth = requiredHours * 2;
  function isTimeValid(): boolean {
    const workerTimeCivilTimeAsNumber = parseInt(workerCivilTime, 10);
    const isValid =
      !_.isNaN(workerTimeCivilTimeAsNumber) &&
      workerTimeCivilTimeAsNumber <= maximumWorkHoursForMonth;
    setIsFormValid?.(isValid);
    return isValid;
  }

  function toWorkerNorm(workerHours: string | number): number {
    const workerHoursAsNumber = parseInt(workerHours.toString(), 10);
    if (_.isNaN(workerHoursAsNumber)) {
      return 1;
    }
    return workerHoursAsNumber / requiredHours;
  }

  function handleCivilTimeChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    setWorkerCivilTime(event.target.value);
    setFirstEditMade(true);
  }

  return (
    <>
      <Grid item xs={6}>
        <S.Label>{t("hourAmmount")}</S.Label>
        <S.TextField
          fullWidth
          name="civilTime"
          data-cy="input-civil-time"
          value={workerCivilTime}
          type="number"
          style={{
            width: 100,
          }}
          onChange={handleCivilTimeChange}
          onBlur={(): void => setWorkerTime(toWorkerNorm(workerCivilTime))}
          color="primary"
        />
        <FormFieldErrorLabel
          shouldBeVisible={!isTimeValid() && firstEditMade}
          message={t("incorrectWorkHoursForWorker", { from: 0, to: maximumWorkHoursForMonth })}
        />
      </Grid>
    </>
  );
}
