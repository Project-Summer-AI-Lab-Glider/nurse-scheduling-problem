/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShiftCode } from "../state/schedule-data/shifts-types/shift-types.model";
import {
  ContractType,
  Team,
  WorkersInfoModel,
  WorkerType,
} from "../state/schedule-data/worker-info/worker-info.model";
import { DEFAULT_TEAM } from "../logic/schedule-parser/workers-info.parser";
import { ApplicationStateModel } from "../state/application-state.model";
import { WorkerInfoExtendedInterface } from "../components/drawers/worker-drawer/worker-edit";
import { WorkerName } from "../state/schedule-data/schedule-sensitive-data.model";

interface UseWorkerInfoReturn {
  workerInfo: WorkerInfo;
  setWorkerInfo: (workerInfo: WorkerInfo) => void;
}

export function useWorkerInfo(workerName: WorkerName): UseWorkerInfoReturn {
  const getWorkerInfo = <T>(
    state: ApplicationStateModel,
    key: keyof WorkersInfoModel
  ): T | undefined =>
    (state.actualState.persistentSchedule.present.employee_info[key]?.[workerName] as unknown) as
      | T
      | undefined;

  const workerTime = useSelector((state: ApplicationStateModel) =>
    getWorkerInfo<number>(state, "time")
  );
  const workerType = useSelector((state: ApplicationStateModel) =>
    getWorkerInfo<WorkerType>(state, "type")
  );
  const workerContractType = useSelector((state: ApplicationStateModel) =>
    getWorkerInfo<ContractType>(state, "contractType")
  );

  const team = useSelector((state: ApplicationStateModel) => getWorkerInfo<Team>(state, "team"));

  const workerShifts = useSelector(
    (state: ApplicationStateModel) =>
      state.actualState.persistentSchedule.present.shifts[workerName]
  );

  const [workerInfo, setWorkerInfo] = useState<WorkerInfo>(
    new WorkerInfo(workerName, workerContractType, workerTime, workerType, workerShifts, team)
  );
  useEffect(() => {
    const newWorkerInfo = new WorkerInfo(
      workerName,
      workerContractType,
      workerTime,
      workerType,
      workerShifts,
      team
    );
    setWorkerInfo(newWorkerInfo);
  }, [workerName, workerContractType, workerTime, workerType, workerShifts, team]);
  return {
    workerInfo,
    setWorkerInfo,
  };
}

export class WorkerInfo {
  public previousWorkerName: string;

  constructor(
    public workerName: string = "",
    public contractType?: ContractType,
    public workerTime: number = 1,
    public workerType?: WorkerType,
    public workerShifts: ShiftCode[] = [],
    public team: Team = DEFAULT_TEAM
  ) {
    this.previousWorkerName = workerName;
  }

  public withNewName(newName: string): WorkerInfo {
    const copy = _.cloneDeep(this);
    copy.workerName = newName;
    return copy;
  }

  public withNewWorkerTime(newWorkerTime: number): WorkerInfo {
    const copy = _.cloneDeep(this);
    copy.workerTime = newWorkerTime;
    return copy;
  }

  public withNewContractType(newContractType: ContractType): WorkerInfo {
    const copy = _.cloneDeep(this);
    copy.contractType = newContractType;
    return copy;
  }

  public withNewWorkerType(newWorkerType: WorkerType): WorkerInfo {
    const copy = _.cloneDeep(this);
    copy.workerType = newWorkerType;
    return copy;
  }

  public withNewTeam(newTeam: Team): WorkerInfo {
    const copy = _.cloneDeep(this);
    copy.team = newTeam;
    return copy;
  }

  asWorkerInfoExtendedInterface(): WorkerInfoExtendedInterface {
    return {
      prevName: this.previousWorkerName,
      workerName: this.workerName,
      workerType: this.workerType,
      contractType: this.contractType,
      time: this.workerTime,
      team: this.team,
    };
  }
}
