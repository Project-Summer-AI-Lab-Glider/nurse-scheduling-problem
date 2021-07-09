/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { t } from "../../../../helpers/translations.helper";
import { ContractType } from "../../../../state/schedule-data/worker-info/worker-info.model";
import {
  ButtonData,
  DropdownButtons,
} from "../../../buttons/dropdown-buttons/dropdown-buttons.component";
import { FormFieldErrorLabel } from "./form-field-error-label.component";
import { FormFieldOptions, translateAndCapitalizeContractType } from "./worker-edit.models";
import * as S from "./worker.styled";

interface WorkerContractTypeSelectorOptions extends FormFieldOptions {
  workerContractType?: ContractType;
  setWorkerContractType: (contractType: ContractType) => void;
}

export function WorkerContractTypeSelector({
  workerContractType,
  setWorkerContractType,
  setIsFieldValid,
}: WorkerContractTypeSelectorOptions): JSX.Element {
  const [firstEditMade, setFirstEditMade] = useState(false);

  function handleWorkerTypeUpdate(contractType: ContractType): void {
    setWorkerContractType(contractType);
    setFirstEditMade(true);
  }

  const contractOptions: ButtonData[] = Object.keys(ContractType).map((contractTypeName) => {
    const contractType = ContractType[contractTypeName];
    return {
      label: translateAndCapitalizeContractType(contractType),
      action: (): void => handleWorkerTypeUpdate(contractType),
      dataCy: contractTypeName.toLowerCase(),
    };
  });

  const isContractTypeValid = useCallback((): boolean => !!workerContractType, [
    workerContractType,
  ]);

  useEffect(() => {
    setIsFieldValid?.(isContractTypeValid());
  }, [workerContractType, setIsFieldValid, isContractTypeValid]);
  return (
    <>
      <Grid item xs={6}>
        <S.Label>{t("workingTime")}</S.Label>
        <DropdownButtons
          dataCy="contract"
          buttons={contractOptions}
          mainLabel={
            workerContractType
              ? translateAndCapitalizeContractType(workerContractType)
              : "Typ umowy"
          }
          buttonVariant="secondary"
          width={workerContractType ? 190 : 154}
        />

        <FormFieldErrorLabel
          shouldBeVisible={!isContractTypeValid() && firstEditMade}
          message={t("selectContractType")}
        />
      </Grid>
    </>
  );
}
