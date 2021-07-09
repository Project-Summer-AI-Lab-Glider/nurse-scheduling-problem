/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { VerboseDate } from "../state/schedule-data/foundation-info/foundation-info.model";
import {
  NotWorkingShift,
  NotWorkingShiftType,
  Shift,
  ShiftCode,
  ShiftTypesDict,
} from "../state/schedule-data/shifts-types/shift-types.model";
import { Opaque } from "../utils/type-utils";
import { CellColorSet } from "./colors/cell-color-set.model";
import { ColorHelper } from "./colors/color.helper";
import { Color, Colors } from "./colors/color.model";
import { VerboseDateHelper } from "./verbose-date.helper";

export const WORK_HOURS_PER_DAY = 8;
export type WorkHourInfoTuple = Opaque<"WorkHourInfoArray", [number, number, number]>;

export class ShiftHelper {
  public static isNotWorkingShift(shift?: Shift): shift is NotWorkingShift {
    return shift?.isWorkingShift === false && shift?.type !== NotWorkingShiftType.Util;
  }

  public static shiftToWorkTime(shift: Shift): number {
    if (!shift?.isWorkingShift ?? true) {
      return 0;
    }
    let duration = shift.to - shift.from;
    if (shift.to < shift.from) {
      const dayLenght = 24;
      duration = dayLenght - shift.from + shift.to;
    }
    return duration === 0 ? 24 : duration;
  }

  public static requiredFreeTimeAfterShift(shift: Shift): number {
    if (this.shiftToWorkTime(shift) < 9) return 11;
    if (this.shiftToWorkTime(shift) > 12) return 24;
    return 16;
  }

  public static nextLegalShiftStart(shift: Shift): [number, boolean] {
    const sum = shift.to + this.requiredFreeTimeAfterShift(shift);
    if (sum > 24) {
      if ((shift.to + this.requiredFreeTimeAfterShift(shift)) % 24 === 0) return [24, true];
      return [(shift.to + this.requiredFreeTimeAfterShift(shift)) % 24, true];
    }
    return [sum, false];
  }

  private static createRGBFromHex(hexCode: string): Color {
    let hex = hexCode.replace("#", "");

    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return new Color(r, g, b, 1);
  }

  static getShiftColor(
    shift: ShiftCode,
    shiftTypes: ShiftTypesDict,
    day?: VerboseDate,
    isFrozen?: boolean,
    ignoreFrozenState = false
  ): CellColorSet {
    const colorSet: CellColorSet = ColorHelper.DEFAULT_COLOR_SET;
    const shiftFromSHIFTS = shiftTypes[shift];

    if (shiftFromSHIFTS && shift !== "W") {
      if (shiftFromSHIFTS.isWorkingShift) {
        colorSet.textColor = this.createRGBFromHex(shiftFromSHIFTS.color!);
        return {
          ...colorSet,
          ...VerboseDateHelper.getDayColor(day, colorSet, isFrozen, ignoreFrozenState),
        };
      }
      colorSet.backgroundColor = this.createRGBFromHex(shiftFromSHIFTS.color!);
      return {
        ...VerboseDateHelper.getDayColor(day, colorSet, isFrozen, ignoreFrozenState),
        ...colorSet,
      };
    }

    switch (shift) {
      case ShiftCode.D:
        colorSet.textColor = Colors.DARK_GREEN;
        break;
      case ShiftCode.DN:
        colorSet.textColor = Colors.DARK_GREEN;
        break;
      case ShiftCode.L4:
        colorSet.backgroundColor = Colors.RED;
        break;
      case ShiftCode.N:
        colorSet.textColor = Colors.DARK_RED;
        break;
      case ShiftCode.U:
        colorSet.backgroundColor = Colors.LIME_GREEN;
        break;
      default:
        break;
    }
    return {
      ...colorSet,
      ...VerboseDateHelper.getDayColor(day, colorSet, isFrozen, ignoreFrozenState),
    };
  }

  static getShiftColorForWorkersCalendar(
    shift: ShiftCode,
    shiftTypes: ShiftTypesDict,
    day?: VerboseDate,
    isFrozen?: boolean,
    ignoreFrozenState = false
  ): CellColorSet {
    const colorSet: CellColorSet = ColorHelper.DEFAULT_COLOR_SET;
    const shiftFromSHIFTS = shiftTypes[shift];
    if (shiftFromSHIFTS && shift !== "W") {
      colorSet.backgroundColor = this.createRGBFromHex(shiftFromSHIFTS.color);
      return {
        ...colorSet,
        ...VerboseDateHelper.getDayColor(day, colorSet, isFrozen, ignoreFrozenState),
      };
    }
    return {
      ...colorSet,
      ...VerboseDateHelper.getDayColor(day, colorSet, isFrozen, ignoreFrozenState),
    };
  }

  static replaceFreeShiftsWithFreeDay(
    shifts: ShiftCode[],
    freeShiftCodes: ShiftCode[],
    startIndex = 0
  ): ShiftCode[] {
    return shifts.map((shift, idx) => {
      const isIndexValid = idx >= startIndex;
      const shouldReplace = freeShiftCodes.includes(shift);
      return isIndexValid && shouldReplace ? ShiftCode.W : shift;
    });
  }
}
