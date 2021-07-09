/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { baseRowDataCy } from "../../base/base-row/base-row.models";

export const summaryRowDataCy = (cellIndex: number): string => baseRowDataCy(cellIndex);
export interface SummaryTableRowOptions {
  rowIndex: number;
  workerName: string;
}
