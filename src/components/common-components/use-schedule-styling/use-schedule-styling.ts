/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode } from "../../../common-models/shift-info.model";

interface ResultOptions {
  cellData: ShiftCode;
  keepOn: boolean;
  hasNext: boolean;
}

export function useScheduleStyling(data: ShiftCode[]): ResultOptions[] {
  let prevShift: ShiftCode | null = null;
  let nextShift: ShiftCode | null = null;
  let keepOn: boolean;
  let hasNext: boolean;
  const result: ResultOptions[] = [];

  data.map((cellData: ShiftCode, cellIndex) => {
    if (cellIndex < data.length - 1) {
      nextShift = data[cellIndex + 1];
    } else {
      nextShift = null;
    }
    keepOn =
      prevShift === cellData && [ShiftCode.K, ShiftCode.U, ShiftCode.L4, null].includes(cellData);
    hasNext =
      nextShift === cellData && [ShiftCode.K, ShiftCode.U, ShiftCode.L4, null].includes(cellData);
    prevShift = cellData;

    return result.push({ cellData, keepOn, hasNext });
  });

  return result;
}