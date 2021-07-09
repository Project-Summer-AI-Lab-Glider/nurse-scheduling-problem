/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { DataRowModel } from "../utils/data-row.model";
import { DataRow } from "../logic/schedule-logic/data-row";
import { ArrayHelper } from "./array.helper";

export class DataRowHelper {
  public static dataRowsAsValueDict<T>(
    dataRows: DataRowModel[],
    includeNulls = false
  ): { [key: string]: T[] } {
    return ArrayHelper.objectArrayToDict<DataRowModel, T[]>(
      dataRows,
      (row) => row.rowKey,
      (key, dataRow) => dataRow.rowData(includeNulls, false)
    );
  }

  public static copyWithReplaced<TData>(
    booleanMatrix: boolean[][],
    source: DataRow<TData>[],
    newValue: TData
  ): DataRow<TData>[] {
    const copy = _.cloneDeep(source);
    copy.forEach((row, rowInd) => {
      row.updateData((data) =>
        data.map((cellValue, cellInd) => {
          if (booleanMatrix[rowInd][cellInd]) {
            return newValue;
          }
          return cellValue;
        })
      );
    });
    return copy;
  }

  private static areDataRowsEqual(dataRow1: DataRow, dataRow2: DataRow): boolean {
    const rowData1 = dataRow1.rowData(true, true);
    const rowData2 = dataRow2.rowData(true, true);
    return ArrayHelper.arePrimitiveArraysEqual(rowData1, rowData2);
  }

  public static areDataRowArraysEqual(
    dataRowArray1: DataRow[] = [],
    dataRowArray2: DataRow[] = []
  ): boolean {
    if (dataRowArray1.length !== dataRowArray2.length) return false;
    for (let ind = 0; ind < dataRowArray1.length; ++ind) {
      const isContentSame = DataRowHelper.areDataRowsEqual(dataRowArray1[ind], dataRowArray2[ind]);
      const isEditModeSame = dataRowArray1[ind].isEditable === dataRowArray2[ind].isEditable;
      if (!isContentSame || !isEditModeSame) return false;
    }
    return true;
  }
}
