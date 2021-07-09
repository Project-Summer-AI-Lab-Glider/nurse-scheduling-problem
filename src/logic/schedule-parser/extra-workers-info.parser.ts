/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  InputFileErrorCode,
  ScheduleError,
} from "../../state/schedule-data/schedule-errors/schedule-error.model";
import { MetaDataParser } from "./metadata.parser";
import { ExtraWorkersInfoProvider } from "../schedule-providers/extra-workers-info-provider.model";

export class ExtraWorkersInfoParser implements ExtraWorkersInfoProvider {
  private _parseErrors: ScheduleError[] = [];

  private dayWorkers: number[];

  private DEFAULT_EXTRA_WORKERS_NUMBER = 0;

  constructor(private metaData: MetaDataParser, data?: string[]) {
    this.dayWorkers = this.generateExtraWorkers(data);
  }

  public get errors(): ScheduleError[] {
    return [...this._parseErrors];
  }

  private logLoadFileError(msg: string): void {
    this._parseErrors.push({
      kind: InputFileErrorCode.LOAD_FILE_ERROR,
      message: msg,
    });
  }

  private generateExtraWorkers(raw?: string[]): number[] {
    if (!raw) {
      this.logLoadFileError(
        `Nie znaleziono informacji o <b>liczbie pracowników dziennych</b>. Dla każdego dnia przyjęto wartość ${this.DEFAULT_EXTRA_WORKERS_NUMBER}.`
      );
      const N = this.metaData.dayCount;
      const dayWorkers = Array(N);
      let i = 0;

      while (i < N) dayWorkers[i++] = this.DEFAULT_EXTRA_WORKERS_NUMBER;
      return dayWorkers;
    }

    const slicedChildrenRow = raw.slice(
      this.metaData.offset,
      this.metaData.offset + this.metaData.dayCount
    );

    if (slicedChildrenRow.length !== this.metaData.dayCount) {
      this.logLoadFileError(
        "Sekcja <b>pracownicy dzienni</b> nie ma oczekiwanych wymiarów. Dla brakujących dni przyjęto, że liczba pracowników dziennych wynosi 0."
      );
    }

    const dayWorkers = Array<number>();
    for (let i = 0; i < this.metaData.dayCount; i++) {
      const numDay = parseInt(slicedChildrenRow[i], 10);
      if (isNaN(numDay) || numDay < 0) {
        this.logLoadFileError(
          `Nieoczekiwana wartość w sekcji <b>pracownicy dzienni</b> w dniu ${
            i + 1
          }. Przyjęto, że liczba pracowników dziennych wynosi ${this.DEFAULT_EXTRA_WORKERS_NUMBER}.`
        );
        dayWorkers.push(this.DEFAULT_EXTRA_WORKERS_NUMBER);
      } else {
        dayWorkers.push(numDay);
      }
    }

    return dayWorkers;
  }

  public get extraWorkers(): number[] {
    return this.dayWorkers;
  }

  public get workersCount(): number {
    return this.dayWorkers.reduce((a, b) => a + b, 0);
  }
}
