/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as S from "./workers-tab.styled";
import WorkerDrawerComponent, {
  WorkerDrawerMode,
} from "../../../components/drawers/worker-drawer/worker-drawer.component";
import DeleteWorkerModalComponent from "../../../components/modals/delete-worker-modal/delete-worker.modal.component";
import { ComparatorHelper, Order } from "../../../helpers/comparator.helper";
import { ContractTypeHelper } from "../../../helpers/contract-type.helper";
import { StringHelper } from "../../../helpers/string.helper";
import { WorkerTypeHelper } from "../../../helpers/worker-type.helper";
import { WorkingTimeHelper } from "../../../helpers/working-time.helper";
import { useMonthInfo } from "../../../hooks/use-month-info";
import { WorkerHourInfo } from "../../../logic/schedule-logic/worker-hours-info.logic";
import { DEFAULT_CONTRACT_TYPE } from "../../../logic/schedule-parser/workers-info.parser";
import { WorkerName } from "../../../state/schedule-data/schedule-sensitive-data.model";
import { getPresentEmployeeInfo } from "../../../state/schedule-data/selectors";
import {
  ContractType,
  WorkerInfoModel,
} from "../../../state/schedule-data/worker-info/worker-info.model";
import { EnhancedTableHeaderComponent } from "./enhanced-table-header.component";

function toggleDrawer(
  open: boolean,
  setIsOpen: (value: React.SetStateAction<boolean>) => void,
  setMode: (value: React.SetStateAction<WorkerDrawerMode>) => void,
  setWorker: (value: React.SetStateAction<WorkerInfoModel>) => void,
  mode?: WorkerDrawerMode,
  workerData?: WorkerInfoModel
): void {
  setIsOpen(open);
  mode !== undefined && setMode(mode);
  setWorker(workerData);
}
function workerDeleteModal(
  open: boolean,
  setDelModalOpen: (value: React.SetStateAction<boolean>) => void,
  setWorker: (value: React.SetStateAction<WorkerInfoModel>) => void,
  workerData?: WorkerInfoModel
): void {
  setDelModalOpen(open);
  setWorker(workerData);
}

export default function WorkersTab(): JSX.Element {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof WorkerInfoModel>("name");
  const { type, time, contractType, team } = useSelector(getPresentEmployeeInfo);
  const { year, monthNumber } = useMonthInfo();

  const [workerData, setWorkerData] = useState([] as WorkerInfoModel[]);
  const [open, setIsOpen] = useState(false);
  const [openDelModal, setDelModalOpen] = useState(false);
  const [mode, setMode] = useState(WorkerDrawerMode.ADD_NEW);
  const [worker, setWorker] = useState<WorkerInfoModel | undefined>(undefined);

  useEffect(() => {
    const newWorkerData = Object.keys(type).map(
      (key): WorkerInfoModel => ({
        name: key as WorkerName,
        type: type[key],
        time: time[key],
        team: team[key],
      })
    );
    setWorkerData(newWorkerData);
  }, [type, time, setWorkerData, team]);

  function handleRequestSort(
    event: React.MouseEvent<unknown>,
    property: keyof WorkerInfoModel
  ): void {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  const getWorkerTimeLabel = useCallback(
    (workerName: string) => {
      const workHourNormInMonth = WorkerHourInfo.calculateWorkNormForMonth(monthNumber, year);
      const workerContractType = contractType?.[workerName] ?? DEFAULT_CONTRACT_TYPE;
      const contractTypeLabel = ContractTypeHelper.translate(workerContractType);
      const workerTimeLabel =
        workerContractType === ContractType.CIVIL_CONTRACT
          ? `${time[workerName] * workHourNormInMonth} godz.`
          : WorkingTimeHelper.fromHoursToFraction(
              time[workerName] * workHourNormInMonth,
              workHourNormInMonth
            );
      return `${contractTypeLabel} ${workerTimeLabel}`;
    },
    [year, monthNumber, time, contractType]
  );

  return (
    <S.Wrapper>
      <S.TableContainer>
        <Table size="small">
          <EnhancedTableHeaderComponent
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={workerData.length}
            toggleDrawer={() =>
              toggleDrawer(true, setIsOpen, setMode, setWorker, WorkerDrawerMode.ADD_NEW)
            }
          />
          <TableBody>
            {ComparatorHelper.stableSort(workerData, order, orderBy).map((w) => {
              const workerType = w.type ?? S.WorkerType.NURSE;

              return (
                <TableRow key={w.name}>
                  <S.TableCell data-cy="workerName">{w.name}</S.TableCell>
                  <S.TableCell align="left">
                    <S.WorkerType className={`${workerType.toString().toLowerCase()}-label`}>
                      {StringHelper.capitalize(WorkerTypeHelper.translate(workerType))}
                    </S.WorkerType>
                  </S.TableCell>
                  <S.TableCell align="left" data-cy={`worker-hours-${w.name}`}>
                    {getWorkerTimeLabel(w.name)}
                  </S.TableCell>
                  <S.TableCell align="left">{w.team}</S.TableCell>
                  <TableCell align="right">
                    <S.ActionButton
                      data-cy={`edit-worker-${w.name}`}
                      variant="primary"
                      onClick={(): void =>
                        toggleDrawer(true, setIsOpen, setMode, setWorker, WorkerDrawerMode.EDIT, w)
                      }
                    >
                      Edytuj
                    </S.ActionButton>
                    <S.ActionButton
                      variant="secondary"
                      onClick={(): void => workerDeleteModal(true, setDelModalOpen, setWorker, w)}
                    >
                      Usuń
                    </S.ActionButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </S.TableContainer>
      <WorkerDrawerComponent
        open={open}
        onClose={(): void => toggleDrawer(false, setIsOpen, setMode, setWorker)}
        mode={mode}
        worker={worker}
        setOpen={setIsOpen}
      />
      <DeleteWorkerModalComponent setOpen={setDelModalOpen} open={openDelModal} worker={worker} />
    </S.Wrapper>
  );
}
