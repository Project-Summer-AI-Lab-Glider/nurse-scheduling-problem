/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  InputFileErrorCode,
  ParseErrorCode,
  ScheduleError,
} from "../../state/schedule-data/schedule-errors/schedule-error.model";
import { ShiftCode } from "../../state/schedule-data/shifts-types/shift-types.model";
import { Team } from "../../state/schedule-data/worker-info/worker-info.model";
import { StringHelper } from "../../helpers/string.helper";
import { ShiftsProvider } from "../schedule-providers/shifts-provider.model";
import { DataRowParser } from "./data-row.parser";
import { MetaDataParser } from "./metadata.parser";
import { TEAM_PREFIX } from "./workers-info.parser";
import { WorkerName } from "../../state/schedule-data/schedule-sensitive-data.model";

export class ShiftsInfoParser extends ShiftsProvider {
  get availableTeam(): { [workerName: string]: Team } {
    const result = {};
    Object.keys(this.workerShifts).forEach((workerName) => {
      result[workerName] = `${TEAM_PREFIX} ${this.teamNumber}`;
    });
    return result;
  }

  private _sectionRows: { [key: string]: DataRowParser } = {};

  private _parseErrors: ScheduleError[] = [];

  constructor(private metaData: MetaDataParser, private teamNumber: number, data?: string[][]) {
    super();

    if (data) {
      this.myPersonel(data).forEach((row) => {
        this._sectionRows[row.rowKey] = row;
      });
    }
  }

  public get errors(): ScheduleError[] {
    return [...this._parseErrors];
  }

  private myPersonel(raw: string[][]): DataRowParser[] {
    const sectionData: DataRowParser[] = [];

    raw.forEach((personelRow) => {
      if (personelRow.length > 1) {
        const slicedPersonelRow = personelRow.slice(
          this.metaData.offset,
          this.metaData.offset + this.metaData.dayCount
        );

        if (slicedPersonelRow.length !== this.metaData.dayCount) {
          this.logLoadFileError("Sekcja nie ma oczekiwanych wymiarów.");
        }

        const personel = Array<string>();

        const name = StringHelper.capitalizeEach(personelRow[0].toLowerCase(), " ") as WorkerName;
        personel.push(name);
        for (let i = 0; i < this.metaData.dayCount; i++) {
          const b = slicedPersonelRow[i]?.trim();
          if (b === " " || b === "") {
            personel.push("W");
          } else if (typeof b !== "string" || !(b in ShiftCode)) {
            this.logUnknownValue(i, name, b);
            personel.push("W");
          } else {
            personel.push(b);
          }
        }

        sectionData.push(new DataRowParser(personel));
      }
    });
    return sectionData;
  }

  public get sectionData(): DataRowParser[] {
    return Object.values(this._sectionRows);
  }

  private mockAvailableWorkersWorkTime(): { [key: string]: number } {
    const workerDict = {};
    Object.keys(this.workerShifts).forEach((key) => {
      workerDict[key] = 1.0;
    });
    return workerDict;
  }

  public get availableWorkersWorkTime(): { [key: string]: number } {
    return this.mockAvailableWorkersWorkTime();
  }

  public get workersCount(): number {
    return this.sectionData.length;
  }

  public get workerShifts(): { [workerName: string]: ShiftCode[] } {
    if (this.workersCount > 0) {
      return this.sectionData
        .map((row) => ({
          [row.rowKey]: this.fillRowWithShifts(row),
        }))
        .reduce((prev, curr) => ({ ...prev, ...curr }));
    }
    return {};
  }

  private fillRowWithShifts(row: DataRowParser): ShiftCode[] {
    return row.rowData(true, false).map((cellValue, cellInd) => ShiftCode[cellValue]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private logUnknownValue(date: number, worker: WorkerName, value: any): void {
    this._parseErrors.push({
      kind: ParseErrorCode.UNKNOWN_VALUE,
      day: date,
      worker,
      actual: value,
    });
  }

  private logLoadFileError(msg: string): void {
    this._parseErrors.push({
      kind: InputFileErrorCode.LOAD_FILE_ERROR,
      message: msg,
    });
  }
}
