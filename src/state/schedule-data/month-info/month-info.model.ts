/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export interface MonthInfoModel {
  UUID?: string;
  month_number: number; // 0 - 11
  year: number; // 2000 - 2100
}

export function validateScheduleInfo(monthInfoModel: MonthInfoModel): void {
  if (monthInfoModel.month_number < 0 || monthInfoModel.month_number > 11) {
    throw new Error(`Month number has to be within range 0-11 not ${monthInfoModel.month_number}`);
  }

  if (monthInfoModel.year < 2000 || monthInfoModel.year > 2100) {
    throw new Error(`Year has to be within range 2000-2100 not ${monthInfoModel.year}`);
  }
}
