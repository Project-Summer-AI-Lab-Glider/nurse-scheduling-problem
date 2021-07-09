/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode } from "../../../src/state/schedule-data/shifts-types/shift-types.model";
import {
  GetWorkerShiftOptions,
  ChangeFoundationInfoCellOptions,
  FoundationInfoRowType,
} from "../../support/commands";

interface WorkerCellDescription extends GetWorkerShiftOptions {
  actualShiftCode: ShiftCode;
  newShiftCode: ShiftCode;
}

export const workerCells: WorkerCellDescription[] = [
  {
    teamIdx: 0,
    workerIdx: 0,
    shiftIdx: 6,
    actualShiftCode: ShiftCode.U,
    newShiftCode: ShiftCode.D,
  },
];

export const childrenInfoCell: ChangeFoundationInfoCellOptions = {
  newValue: 1,
  actualValue: 24,
  rowType: FoundationInfoRowType.ChildrenInfoRow,
  cellIdx: 6,
};

export const extraWorkerInfoCell: ChangeFoundationInfoCellOptions = {
  newValue: 10,
  actualValue: 0,
  rowType: FoundationInfoRowType.ExtraWorkersRow,
  cellIdx: 6,
};
