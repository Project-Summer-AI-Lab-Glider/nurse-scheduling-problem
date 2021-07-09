/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { DEFAULT_FROM } from "../logic/schedule-parser/shifts-types-info.parser";
import { Shift } from "../state/schedule-data/shifts-types/shift-types.model";
import { t } from "./translations.helper";

export const EMPTY_ROW_SIZE = 40;
export const EMPTY_ROW = Array(EMPTY_ROW_SIZE).fill("");

export const SCHEDULE_WORKSHEET_NAME = t("scheduleworksheetName");
export const WORKERS_WORKSHEET_NAME = t("workersWorksheetName");
export const SHIFTS_WORKSHEET_NAME = t("shiftsWorksheetName");
export const ABSENCE_WORKSHEET_NAME = t("absenceWorksheetName");

const SHIFT_NAME = t("shiftNameExportHeader");
const ABBREVIATION = t("abbreviationExportHeader");
const FROM = t("fromExportHeader");
const TO = t("toExportHeader");
const WORKING_SHIFT = t("isWorkingShiftExportHeader");
const COLOR = t("colorExportHeader");
export const SHIFT_HEADERS = [SHIFT_NAME, ABBREVIATION, FROM, TO, WORKING_SHIFT, COLOR];

const NAME_SURNAME = t("nameSurnameExportHeader");
const WORKER_TYPE = t("workerTypeExportHeader");
const CONTRACT_TYPE = t("contractTypeExportHeader");
const WORKTIME_NORM = t("worktimeNormExportHeader");
const WORKER_TEAM = t("workerTeamExportHeader");
const TYPE = t("leaveTypeExportHeader");
const DAYSNO = t("daysNoExportHeader");
const HOURSNO = t("hoursNoExportHeader");
const FORYEAR = t("forYearExportHeader");

export const WORKER_HEADERS = [
  NAME_SURNAME,
  WORKER_TYPE,
  CONTRACT_TYPE,
  WORKTIME_NORM,
  WORKER_TEAM,
];
const CELLS_TO_AVOID = [
  SCHEDULE_WORKSHEET_NAME,
  SHIFT_NAME,
  NAME_SURNAME,
  WORKER_TYPE,
  CONTRACT_TYPE,
  WORKTIME_NORM,
];

export const ABSENCE_HEADERS = [NAME_SURNAME, TYPE, FROM, TO, DAYSNO, HOURSNO, FORYEAR];

export class ParserHelper {
  public static isEmptyRow(rowValues: Array<string>): boolean {
    const rowValuesSet = new Set(rowValues.map((a) => a.toString()));

    return (
      rowValuesSet.size === 0 ||
      (rowValuesSet.size === 1 && rowValuesSet.has("")) ||
      Array.from(rowValuesSet).some((a) => typeof a === "undefined") ||
      contains(CELLS_TO_AVOID)
    );

    function contains(cellToAvoid: Array<string>): boolean {
      return Array.from(rowValuesSet).some((setItem) =>
        cellToAvoid.some((cellToAvoid) =>
          setItem.trim().toLowerCase().includes(cellToAvoid.trim().toLowerCase())
        )
      );
    }
  }

  public static translateStringToBoolean(key: string): boolean | undefined {
    switch (key.trim().toLowerCase()) {
      case "yes":
      case "tak":
        return true;
      case "no":
      case "nie":
        return false;
    }
    return undefined;
  }

  public static translateBooleanToString(key: boolean | undefined, inEnglish = false): string {
    switch (key) {
      case true:
        return inEnglish ? "yes" : "tak";
      case false:
      default:
        return inEnglish ? "no" : "nie";
    }
  }

  static getShiftHeaderIndex(code: string): number {
    return SHIFT_HEADERS.indexOf(code);
  }

  public static getShiftNameHeaderIndex(): number {
    return this.getShiftHeaderIndex(SHIFT_NAME);
  }

  public static getShiftStartHeaderIndex(): number {
    return this.getShiftHeaderIndex(FROM);
  }

  public static getShiftEndHeaderIndex(): number {
    return this.getShiftHeaderIndex(TO);
  }

  public static getShiftIsWorkingHeaderIndex(): number {
    return this.getShiftHeaderIndex(WORKING_SHIFT);
  }

  public static getShiftCodeHeaderIndex(): number {
    return this.getShiftHeaderIndex(ABBREVIATION);
  }

  public static getShiftColorHeaderIndex(): number {
    return this.getShiftHeaderIndex(COLOR);
  }

  public static shiftPassesDayStart(shift: Shift): boolean {
    if (shift.isWorkingShift) {
      if (shift.from <= shift.to) {
        return shift.from < DEFAULT_FROM && DEFAULT_FROM < shift.to;
      } else {
        return DEFAULT_FROM < shift.to || shift.from < DEFAULT_FROM;
      }
    }
    return false;
  }
}
