/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import classNames from "classnames/bind";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as S from "./nametalbe-section.styled";
import { WorkerInfo } from "../../../../hooks/use-worker-info";
import { DataRow } from "../../../../logic/schedule-logic/data-row";
import { ScheduleError } from "../../../../state/schedule-data/schedule-errors/schedule-error.model";
import { WorkerName } from "../../../../state/schedule-data/schedule-sensitive-data.model";
import { getPresentEmployeeInfo } from "../../../../state/schedule-data/selectors";
import {
  WorkerInfoModel,
  WorkerType,
} from "../../../../state/schedule-data/worker-info/worker-info.model";
import WorkerDrawerComponent, {
  WorkerDrawerMode,
  WorkerDrawerWorkerInfo,
} from "../../../drawers/worker-drawer/worker-drawer.component";
import { ErrorPopper } from "../../../poppers/error-popper/error-popper.component";
import { BaseSectionOptions } from "../../base/base-section/base-section.component";
import NurseIcon from "../../../../assets/images/svg-components/NurseIcon";
import CaretakerIcon from "../../../../assets/images/svg-components/CaretakerIcon";
import BabyIcon from "../../../../assets/images/svg-components/BabyIcon";
import WorkerIcon from "../../../../assets/images/svg-components/WorkerIcon";
import FontStyles from "../../../../assets/theme/FontStyles";

export interface NameTableSectionOptions extends Pick<BaseSectionOptions, "errorSelector"> {
  data: DataRow[];
  isWorker: boolean;
  workerInfo?: WorkerInfo;
}

const initialWorkerInfo: WorkerInfoModel = { name: "" as WorkerName, time: 0 };

export function NameTableSection({
  data: dataRows,
  errorSelector,
  isWorker,
}: NameTableSectionOptions): JSX.Element {
  const [open, setIsOpen] = useState(false);
  const [workerInfo, setWorkerInfo] = useState<WorkerDrawerWorkerInfo>(initialWorkerInfo);

  const { type } = useSelector(getPresentEmployeeInfo);

  function openDrawer(name: WorkerName): void {
    if (isWorker) {
      setIsOpen(true);
      setWorkerInfo({
        name,
      });
    }
  }

  function closeDrawer(): void {
    setIsOpen(false);
  }

  function getNames(): WorkerName[] {
    return dataRows.map((a) => a.rowKey) as WorkerName[];
  }

  const data = getNames();

  return (
    <>
      <S.Wrapper>
        {data.map((workerName, index) => {
          const isNurse = type[workerName] === WorkerType.NURSE;
          const isLast = index === data.length - 1;
          const isFirst = index === 0;

          return (
            <ErrorPopper
              key={workerName}
              errorSelector={(scheduleErrors): ScheduleError[] =>
                errorSelector?.(workerName, 0, scheduleErrors) ?? []
              }
              showErrorTitle={false}
            >
              <S.Row
                key={workerName}
                onClick={(): void => openDrawer(workerName)}
                className={classNames(
                  "nametableRow",
                  isNurse && isWorker && "nurseMarker",
                  !isNurse && isWorker && "babysitterMarker",
                  isFirst && "isFirst",
                  isLast && "isLast"
                )}
              >
                <div style={{ marginLeft: "8px" }}>
                  {isWorker && isNurse && <NurseIcon />}
                  {isWorker && !isNurse && <CaretakerIcon />}
                  {!isWorker && workerName === "Dzieci" && <BabyIcon />}
                  {!isWorker && workerName === "Pracownicy" && <WorkerIcon />}
                </div>

                <S.LabelWrapper>
                  <span style={FontStyles.roboto.Regular10px}>{workerName}</span>
                </S.LabelWrapper>
              </S.Row>
            </ErrorPopper>
          );
        })}
      </S.Wrapper>
      <WorkerDrawerComponent
        open={open}
        onClose={closeDrawer}
        mode={WorkerDrawerMode.INFO}
        worker={workerInfo}
        setOpen={setIsOpen}
      />
    </>
  );
}
