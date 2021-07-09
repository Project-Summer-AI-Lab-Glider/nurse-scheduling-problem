/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { DataRowHelper } from "../../../../helpers/data-row.helper";
import { DataRow } from "../../../../logic/schedule-logic/data-row";
import {
  AlgorithmErrorCode,
  GroupedScheduleErrors,
} from "../../../../state/schedule-data/schedule-errors/schedule-error.model";
import { ShiftCode } from "../../../../state/schedule-data/shifts-types/shift-types.model";
import { WorkerShiftsActionCreator } from "../../../../state/schedule-data/workers-shifts/worker-shifts.action-creator";
import { StyledScheduleError } from "../../../poppers/error-popper/error-popper.component";
import {
  BaseSectionComponent,
  BaseSectionOptions,
} from "../../base/base-section/base-section.component";
import { SelectionMatrix } from "../../base/base-section/use-selection-matrix";
import { ShiftCellComponent } from "./shift-cell/shift-cell.component";
import { ShiftRowComponent } from "./shift-row.component";

export type ShiftsSectionOptions = Omit<BaseSectionOptions, "updateData">;

function shiftSectionErrorSelector(
  worker: string,
  cellIndex: number,
  scheduleErrors: GroupedScheduleErrors
): StyledScheduleError[] {
  const errors = [
    ...(scheduleErrors[AlgorithmErrorCode.DissalowedShiftSequence]?.filter(
      (error) => error.worker === worker && error.day === cellIndex
    ) ?? []),
    ...(scheduleErrors[AlgorithmErrorCode.LackingLongBreak]?.filter(
      (error) => error.worker === worker && Math.floor(cellIndex / 7) === error.week
    ) ?? []),
  ];

  return errors.map((x) => {
    if ("week" in x) {
      if (Math.floor(cellIndex % 7) === 0) return { ...x, className: "left" };
      if (Math.floor(cellIndex % 7) === 6) return { ...x, className: "right" };
      return { ...x, className: "middle" };
    }
    return x;
  });
}

export function ShiftsSectionComponent(options: ShiftsSectionOptions): JSX.Element {
  const { data = [], sectionKey } = options;

  const dispatch = useDispatch();
  const updateWorkerShifts = useCallback(
    (selectionMatrix: SelectionMatrix, oldWorkerShifts: DataRow[], newShift) => {
      const updatedDataRows = DataRowHelper.copyWithReplaced(
        selectionMatrix,
        oldWorkerShifts,
        newShift
      );
      const newWorkers = DataRowHelper.dataRowsAsValueDict<ShiftCode>(updatedDataRows);
      const action = WorkerShiftsActionCreator.replaceWorkerShiftsInTmpSchedule(newWorkers);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <BaseSectionComponent
      {...options}
      sectionKey={sectionKey}
      data={data}
      cellComponent={ShiftCellComponent}
      rowComponent={ShiftRowComponent}
      errorSelector={shiftSectionErrorSelector}
      updateData={updateWorkerShifts}
    />
  );
}
