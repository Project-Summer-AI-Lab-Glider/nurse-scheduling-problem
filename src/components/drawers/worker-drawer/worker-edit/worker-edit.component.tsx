/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as S from "./worker.styled";
import {
  ContractType,
  Team,
  WorkerType,
} from "../../../../state/schedule-data/worker-info/worker-info.model";
import { WorkerActionCreator } from "../../../../state/schedule-data/worker-info/worker.action-creator";
import { useWorkerInfo, WorkerInfo } from "../../../../hooks/use-worker-info";
import { CombinedWorkNormSelector } from "./combined-worknorm-selector.component";
import { WorkerContractTypeSelector } from "./worker-contract-type-selector.component";
import { WorkerEditComponentOptions, WorkerEditComponentMode } from "./worker-edit.models";
import { TeamSelector } from "./worker-team-selector.component";
import { WorkerNameEditField } from "./worker-name-edit-field.components";
import { WorkerWorkerTypeSelector } from "./worker-position-selector.component";
import { t } from "../../../../helpers/translations.helper";
import { WorkerName } from "../../../../state/schedule-data/schedule-sensitive-data.model";

export function WorkerEditComponent(options: WorkerEditComponentOptions): JSX.Element {
  const { mode, setOpen } = options;

  const dispatcher = useDispatch();

  const getWorkerName = useCallback(
    (workerOptions: WorkerEditComponentOptions) =>
      workerOptions.mode === WorkerEditComponentMode.EDIT ? workerOptions.name : ("" as WorkerName),
    []
  );

  const { workerInfo, setWorkerInfo } = useWorkerInfo(getWorkerName(options));
  const [isWorkerNameValid, setIsWorkerNameValid] = useState(true);
  const [isWorkerTimeValid, setIsWorkerTimeValid] = useState(true);
  const [isContractTypeValid, setIsContractTypeValid] = useState(true);
  const [isWorkerTypeValid, setIsWorkerTypeValid] = useState(true);

  useEffect(() => {
    if (options.mode === WorkerEditComponentMode.EDIT) {
      workerInfo.previousWorkerName = options.name;
    }
  }, [mode, workerInfo, options]);
  // #region event handlers
  function handleWorkerNameUpdate(newWorkerName: string): void {
    setWorkerInfo(workerInfo.withNewName(newWorkerName));
  }

  function handleWorkerTimeUpdate(newWorkerTime: number): void {
    setWorkerInfo(workerInfo.withNewWorkerTime(newWorkerTime));
  }

  function handleWorkerContractTypeUpdate(newContractType: ContractType): void {
    setWorkerInfo(workerInfo.withNewContractType(newContractType));
  }

  function handleWorkerWorkerTypeUpdate(newWorkerType: WorkerType): void {
    setWorkerInfo(workerInfo.withNewWorkerType(newWorkerType));
  }

  function handleWorkerTeamUpdate(newTeam: Team): void {
    setWorkerInfo(workerInfo.withNewTeam(newTeam));
  }
  // #endregion

  function canSaveWorker(): boolean {
    return [isWorkerNameValid, isWorkerTimeValid, isContractTypeValid, isWorkerTypeValid].every(
      (item) => item
    );
  }

  function handleClose(): void {
    const newWorker = workerInfo.asWorkerInfoExtendedInterface();
    mode === WorkerEditComponentMode.ADD
      ? dispatcher(WorkerActionCreator.addNewWorker(newWorker))
      : dispatcher(WorkerActionCreator.modifyWorker(newWorker));

    setWorkerInfo(new WorkerInfo());
    setOpen(false);
  }

  // #region view
  return (
    <Grid container direction="column" justify="space-between">
      <S.OptionsContainer container direction="column">
        <WorkerNameEditField
          workerName={workerInfo.workerName}
          setWorkerName={handleWorkerNameUpdate}
          setIsFieldValid={setIsWorkerNameValid}
          mode={mode}
        />

        <WorkerWorkerTypeSelector
          workerType={workerInfo.workerType}
          setActualWorkerType={handleWorkerWorkerTypeUpdate}
          setIsFieldValid={setIsWorkerTypeValid}
        />

        <WorkerContractTypeSelector
          setWorkerContractType={handleWorkerContractTypeUpdate}
          workerContractType={workerInfo.contractType}
          setIsFieldValid={setIsContractTypeValid}
        />

        <CombinedWorkNormSelector
          workerTime={workerInfo.workerTime}
          setWorkerTime={handleWorkerTimeUpdate}
          setIsFieldValid={setIsWorkerTimeValid}
          workerContractType={workerInfo.contractType}
        />

        <TeamSelector team={workerInfo.team} setTeam={handleWorkerTeamUpdate} />
      </S.OptionsContainer>
      <S.SubmitButton
        disabled={!canSaveWorker()}
        variant="primary"
        data-cy="btn-save-worker"
        onClick={handleClose}
      >
        {t("saveWorker")}
      </S.SubmitButton>
    </Grid>
  );
  // #endregion
}
