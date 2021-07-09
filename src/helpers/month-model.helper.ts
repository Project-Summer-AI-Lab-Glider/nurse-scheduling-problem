/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ArrayHelper, ArrayPositionPointer } from "./array.helper";
import { MonthDataArray } from "./month-data-array.model";
import { MonthHelper } from "./month.helper";

export class MonthModelHelper {
  static updateArray<T>(
    updatedArr: MonthDataArray<T> | undefined[],
    updatePosition: ArrayPositionPointer,
    baseArr: T[],
    numberOfElements: number
  ): MonthDataArray<T> {
    return ArrayHelper.update(
      updatedArr,
      updatePosition,
      baseArr,
      numberOfElements
    ) as MonthDataArray<T>;
  }

  static createMonthArray<T>(year: number, month: number, defaultValue: T): MonthDataArray<T> {
    const monthLen = MonthHelper.getMonthLength(year, month);
    return new Array(monthLen).fill(defaultValue) as MonthDataArray<T>;
  }
}
