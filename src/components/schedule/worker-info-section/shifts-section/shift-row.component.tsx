/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { ShiftCode } from "../../../../state/schedule-data/shifts-types/shift-types.model";
import { DataRow } from "../../../../logic/schedule-logic/data-row";
import { applyScheduleStyling } from "../../../../hooks/apply-schedule-styling/apply-schedule-styling";
import { BaseCellOptions } from "../../base/base-cell/base-cell.models";
import { BaseRowComponent } from "../../base/base-row/base-row.component";
import { BaseRowOptions } from "../../base/base-row/base-row.models";
import { ShiftCellComponent } from "./shift-cell/shift-cell.component";
import { getPresentShiftTypes } from "../../../../state/schedule-data/selectors";

export interface ShiftRowOptions extends BaseRowOptions {
  dataRow: DataRow;
  onRowUpdated?: (row: DataRow) => void;
  cellComponent?: React.FC<BaseCellOptions>;
}

export function ShiftRowComponent(options: ShiftRowOptions): JSX.Element {
  const { dataRow } = options;
  const shiftTypes = useSelector(getPresentShiftTypes);
  const styledDataRow = useMemo(() => {
    const data = dataRow.rowData(false) as ShiftCode[];
    const styles = applyScheduleStyling(data, shiftTypes).map((styledItem) => ({
      ...styledItem,
      workerName: dataRow.rowKey,
    }));
    return new DataRow(dataRow.rowKey, styles, dataRow.isEditable);
  }, [dataRow, shiftTypes]);
  return (
    <BaseRowComponent
      {...options}
      dataRow={styledDataRow}
      cellComponent={ShiftCellComponent}
      defaultEmpty={ShiftCode.W}
    />
  );
}
