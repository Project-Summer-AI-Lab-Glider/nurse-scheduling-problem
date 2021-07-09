/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import * as S from "./enhanced-table-header.styled";
import { Order } from "../../../helpers/comparator.helper";
import { WorkerInfoModel } from "../../../state/schedule-data/worker-info/worker-info.model";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof WorkerInfoModel) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  toggleDrawer: () => void;
}

interface WorkerDataCell {
  id: keyof WorkerInfoModel;
  label: string;
  numeric: boolean;
}

const headCells: WorkerDataCell[] = [
  { id: "name", numeric: false, label: "Imię i nazwisko" },
  { id: "type", numeric: true, label: "Stanowisko" },
  { id: "time", numeric: true, label: "Wymiar pracy" },
  { id: "team", numeric: false, label: "Zespół" },
];

export function EnhancedTableHeaderComponent(props: EnhancedTableProps): JSX.Element {
  const { order, orderBy, onRequestSort, toggleDrawer } = props;

  function createSortHandler(
    property: keyof WorkerInfoModel,
    event: React.MouseEvent<unknown>
  ): void {
    onRequestSort(event, property);
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const isActive = orderBy === headCell.id;
          return (
            <TableCell key={headCell.id} sortDirection={isActive ? order : false}>
              <S.TableSortLabel
                active={isActive}
                direction={isActive ? order : "asc"}
                onClick={(event: React.MouseEvent<unknown>): void =>
                  createSortHandler(headCell.id, event)
                }
              >
                {headCell.label}
              </S.TableSortLabel>
            </TableCell>
          );
        })}
        <TableCell align="right">
          <S.HeaderButton
            variant="primary"
            data-cy="btn-add-worker"
            onClick={(): void => {
              toggleDrawer();
            }}
          >
            Dodaj pracownika
          </S.HeaderButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
