/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { ContractType } from "../../../../state/schedule-data/worker-info/worker-info.model";
import { FormFieldOptions } from "./worker-edit.models";
import { WorkerEmploymentContractWorkNormSelector } from "./worker-employment-contract-work-norm-selector.component";
import { WorkerCivilContractWorkNormSelector } from "./worker-civil-contract-work-norm-selector.component";

export interface WorkNormSelectorOptions extends FormFieldOptions {
  workerContractType?: ContractType;
  workerTime: number;
  setWorkerTime: (newWorkerTime: number) => void;
}

export function CombinedWorkNormSelector(options: WorkNormSelectorOptions): JSX.Element {
  const { workerContractType } = options;

  return (
    <>
      {workerContractType &&
        {
          [ContractType.CIVIL_CONTRACT]: <WorkerCivilContractWorkNormSelector {...options} />,
          [ContractType.EMPLOYMENT_CONTRACT]: (
            <WorkerEmploymentContractWorkNormSelector {...options} />
          ),
        }[workerContractType]}
    </>
  );
}
