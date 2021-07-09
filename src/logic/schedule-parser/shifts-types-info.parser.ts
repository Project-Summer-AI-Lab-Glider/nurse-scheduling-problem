/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { AcronymGenerator } from "../../helpers/acronym-generator.helper";
import { ParserHelper } from "../../helpers/parser.helper";
import {
  InputFileErrorCode,
  ScheduleError,
} from "../../state/schedule-data/schedule-errors/schedule-error.model";
import { Shift, ShiftCode, SHIFTS } from "../../state/schedule-data/shifts-types/shift-types.model";

const DEFAULT_SHIFT_NAME = "Zmiana";
export const DEFAULT_FROM = 7;
const DEFAULT_NON_WORKING_FROM = 0;
const DEFAULT_TO = 7;
const DEFAULT_NON_WORKING_TO = 24;
const DEFAULT_IS_WORKING = false;
const DEFAULT_COLOR = { name: "czerwony", value: "FF0000" };

export class ShiftsTypesInfoParser {
  private namelessShifts: number;

  private _shiftsInfoRows: { [key: string]: Shift } = {};

  private _parseErrors: ScheduleError[] = [];

  constructor(data: string[][]) {
    this.namelessShifts = 0;
    data.forEach((a) => {
      const shift = this.mapShift(a);
      if (!ParserHelper.shiftPassesDayStart(shift)) {
        this._shiftsInfoRows[shift.code] = shift;
      } else {
        this.logLoadFileError(`Nie dodano zmiany ${shift.name}. Przecina godzinę 7:00.`);
      }
    });
  }

  public get errors(): ScheduleError[] {
    return [...this._parseErrors];
  }

  public get shiftsDescriptions(): Shift[] {
    return Object.values(this._shiftsInfoRows);
  }

  private logLoadFileError(msg: string): void {
    this._parseErrors.push({
      kind: InputFileErrorCode.LOAD_FILE_ERROR,
      message: msg,
    });
  }

  private parseShiftName(shiftRow: string[]): string {
    const index = ParserHelper.getShiftNameHeaderIndex();

    if (index >= 0 && shiftRow[index] && shiftRow[index] !== "") {
      return shiftRow[index];
    }

    const generatedName = this.generateDefaultName();
    this.logLoadFileError(`Nie ustawiono nazwy dla zmiany. Przyjęto nazwę:  ${generatedName}`);
    return generatedName;
  }

  private generateDefaultName(): string {
    return `${DEFAULT_SHIFT_NAME} ${++this.namelessShifts}`;
  }

  private parseShiftCode(shiftRow: string[], name: string): ShiftCode {
    const index = ParserHelper.getShiftCodeHeaderIndex();

    if (index >= 0 && shiftRow[index]) {
      return shiftRow[index] as ShiftCode;
    }
    const generatedCode = AcronymGenerator.generate(name, SHIFTS);

    this.logLoadFileError(`Nie ustawiono skrótu dla zmiany: ${name}. Ustawiono: ${generatedCode}`);
    return generatedCode;
  }

  private parseShiftFrom(shiftRow: string[], name: string, isWorkingShift: boolean): number {
    const index = ParserHelper.getShiftStartHeaderIndex();

    if (index >= 0 && shiftRow[index]) {
      if (!isWorkingShift) {
        const from = shiftRow[index].trim();
        if (from !== "" && from !== "-") {
          this.logLoadFileError(
            `Nieoczekiwana wartość dla początku dla niepracującej zmiany: ${name}`
          );
        }
        return DEFAULT_NON_WORKING_FROM;
      }

      const number = parseInt(shiftRow[index].trim(), 10);
      if (isNaN(number) || number < 0 || number > 24) {
        this.logLoadFileError(
          `Nieoczekiwana wartość dla początku zmiany: ${name}. Ustawiono: ${DEFAULT_FROM}`
        );
      } else {
        return number;
      }
    } else if (isWorkingShift) {
      this.logLoadFileError(`Nie ustawiono początku zmiany: ${name}. Ustawiono: ${DEFAULT_FROM}`);
    }
    return isWorkingShift ? DEFAULT_FROM : DEFAULT_NON_WORKING_FROM;
  }

  private parseShiftTo(shiftRow: string[], name: string, isWorkingShift: boolean): number {
    const index = ParserHelper.getShiftEndHeaderIndex();

    if (index >= 0 && shiftRow[index]) {
      if (!isWorkingShift) {
        const to = shiftRow[index].trim();
        if (to !== "" && to !== "-") {
          this.logLoadFileError(
            `Nieoczekiwana wartość dla końca dla niepracującej zmiany: ${name}`
          );
        }
        return DEFAULT_NON_WORKING_TO;
      }
      const number = parseInt(shiftRow[index].trim(), 10);
      if (isNaN(number) || number < 0 || number > 24) {
        this.logLoadFileError(
          `Nieoczekiwana wartość dla końca zmiany: ${name}. Ustawiono: ${DEFAULT_TO}`
        );
      } else {
        return number;
      }
    } else if (isWorkingShift) {
      this.logLoadFileError(`Nie ustawiono końca zmiany: ${name}. Ustawiono: ${DEFAULT_TO}`);
    }
    return isWorkingShift ? DEFAULT_TO : DEFAULT_NON_WORKING_TO;
  }

  private parseShiftIsWorking(shiftRow: string[], name: string): boolean {
    const index = ParserHelper.getShiftIsWorkingHeaderIndex();

    if (index >= 0 && shiftRow[index]) {
      const isWorkingShift = ParserHelper.translateStringToBoolean(shiftRow[index]);
      if (isWorkingShift !== undefined) {
        return isWorkingShift;
      }
      this.logLoadFileError(
        `Nieoczekiwana wartość dla rodzaju zmiany: ${name}. Ustawiono: ${ParserHelper.translateBooleanToString(
          DEFAULT_IS_WORKING
        ).toUpperCase()}`
      );
    } else {
      this.logLoadFileError(
        `Nie ustawiono czy zmiana: ${name} jest pracująca. Ustawiono: ${ParserHelper.translateBooleanToString(
          DEFAULT_IS_WORKING
        ).toUpperCase()}`
      );
    }
    return DEFAULT_IS_WORKING;
  }

  private parseShiftColor(shiftRow: string[], name: string): string {
    const index = ParserHelper.getShiftColorHeaderIndex();

    if (index >= 0 && shiftRow[index]) {
      return shiftRow[index];
    }
    // this.logLoadFileError(
    //   "Nie ustawiono koloru dla zmiany: " + name + ". Ustawiono: " + DEFAULT_COLOR.name
    // );
    return DEFAULT_COLOR.value;
  }

  private mapShift(row: string[]): Shift {
    const name = this.parseShiftName(row);
    const code = this.parseShiftCode(row, name);
    const isWorkingShift = this.parseShiftIsWorking(row, name);
    const from = this.parseShiftFrom(row, name, isWorkingShift);
    const to = this.parseShiftTo(row, name, isWorkingShift);
    const color = this.parseShiftColor(row, name);

    return {
      name,
      code,
      from,
      to,
      isWorkingShift,
      color,
    };
  }
}
