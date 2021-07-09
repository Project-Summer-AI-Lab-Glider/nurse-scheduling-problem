/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { baseCellDataCy } from "../../base/base-cell/base-cell.models";

export interface SummaryTableCellOptions {
  value: number;
  cellIndex: number;
}

export const summaryCellDataCy = (index: number): string => baseCellDataCy(index, "cell");
