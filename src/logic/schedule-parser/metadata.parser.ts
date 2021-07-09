/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { WeekDay } from "../../state/schedule-data/foundation-info/foundation-info.model";
import { MetadataProvider } from "../schedule-providers/metadata-provider.model";
import { MonthInfoLogic } from "../schedule-logic/month-info.logic";
import {
  InputFileErrorCode,
  ScheduleError,
} from "../../state/schedule-data/schedule-errors/schedule-error.model";

export class MetaDataParser extends MetadataProvider {
  public monthLogic: MonthInfoLogic;

  public offset: number;

  private _parseErrors: ScheduleError[] = [];

  constructor(month: number, year: number, raw: string[] | undefined) {
    super();

    if (raw) {
      this.offset = this.extractMetadata(raw);
    } else {
      this.offset = 1;
      this.logLoadFIleError(
        "Nie znaleziono nagłówka z <b>informacją o datach</b>. Jako pierwszy dzień miesiąca wczytano pierwszą kolumnę grafiku uzupełnioną wartościami zmian."
      );
    }

    const N = new Date(year, month + 1, 0).getDate();

    const days = Array(N);
    let i = 0;

    while (i < N) days[i++] = i;

    this.monthLogic = new MonthInfoLogic(month, year.toString(), days);
  }

  public get errors(): ScheduleError[] {
    return [...this._parseErrors];
  }

  private logLoadFIleError(msg: string): void {
    this._parseErrors.push({
      kind: InputFileErrorCode.LOAD_FILE_ERROR,
      message: msg,
    });
  }

  private extractMetadata(raw: string[]): number {
    const startOfMonth = raw.findIndex((a) => a.toString() === "1");

    if (startOfMonth === -1) {
      this.logLoadFIleError(
        "Nie znaleziono nagłówka z <b>informacją o datach</b>. Jako pierwszy dzień miesiąca wczytano pierwszą kolumnę grafiku."
      );
      return 0;
    }

    return startOfMonth;
  }

  public get dates(): number[] {
    return this.monthLogic.dates;
  }

  get frozenDates(): [string | number, number][] {
    return [];
  }

  public get frozenDays(): [number, number][] {
    return this.monthLogic.verboseDates
      .filter((date) => date.isFrozen)
      .map((date, index) => [0, index + 1]);
  }

  public get monthNumber(): number {
    return this.monthLogic.monthNumber;
  }

  public get dayCount(): number {
    return this.monthLogic.dayCount;
  }

  public get year(): number {
    return parseInt(this.monthLogic.year, 10);
  }

  public get daysOfWeek(): WeekDay[] {
    return this.monthLogic.daysOfWeek;
  }

  public get dayNumbers(): number[] {
    return this.monthLogic.dates;
  }

  public get validDataStart(): number {
    return 0;
  }

  public get validDataEnd(): number {
    return this.monthLogic.dates.length - 1;
  }
}
