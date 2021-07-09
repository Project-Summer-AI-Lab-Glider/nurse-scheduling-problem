/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ChildrenInfoProvider } from "../schedule-providers/children-info-provider.model";
import {
  InputFileErrorCode,
  ScheduleError,
} from "../../state/schedule-data/schedule-errors/schedule-error.model";
import { MetaDataParser } from "./metadata.parser";

export const DEFAULT_CHILDREN_NUMBER = 20;

export class ChildrenInfoParser implements ChildrenInfoProvider {
  private _parseErrors: ScheduleError[] = [];

  private children: number[];

  constructor(private metaData: MetaDataParser, data?: string[]) {
    this.children = this.generateChildren(data);
  }

  public get registeredChildrenNumber(): number[] {
    return this.children;
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

  private generateChildren(raw?: string[]): number[] {
    if (!raw) {
      this.logLoadFileError(
        `Nie znaleziono informacji o <b>liczbie dzieci</b>. Dla każdego dnia przyjęto wartość ${DEFAULT_CHILDREN_NUMBER}.`
      );
      const N = this.metaData.dayCount;
      const children = Array(N);
      let i = 0;

      while (i < N) children[i++] = DEFAULT_CHILDREN_NUMBER;
      return children;
    }

    const slicedChildrenRow = raw.slice(
      this.metaData.offset,
      this.metaData.offset + this.metaData.dayCount
    );

    if (slicedChildrenRow.length !== this.metaData.dayCount) {
      this.logLoadFileError(
        "Sekcja <b>dzieci</b> nie ma oczekiwanych wymiarów. Dla brakujących dni przyjęto, że liczba dzieci wynosi 0."
      );
    }

    const children = Array<number>();
    for (let i = 0; i < this.metaData.dayCount; i++) {
      const numDay = parseInt(slicedChildrenRow[i], 10);
      if (isNaN(numDay) || numDay < 0) {
        this.logLoadFileError(
          `Nieoczekiwana wartość w sekcji <b>dzieci</b> w dniu ${
            i + 1
          }. Przyjęto, że liczba dzieci wynosi ${DEFAULT_CHILDREN_NUMBER}.`
        );
        children.push(DEFAULT_CHILDREN_NUMBER);
      } else {
        children.push(numDay);
      }
    }

    return children;
  }
}
