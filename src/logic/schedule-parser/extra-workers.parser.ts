/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ExtraWorkersInfoProvider } from "../schedule-providers/extra-workers-info-provider.model";
import { DataRow } from "../schedule-logic/data-row";
import { ExtraWorkersSectionKey } from "../section.model";
import { ScheduleError } from "../../state/schedule-data/schedule-errors/schedule-error.model";

export const DEFAULT_EXTRA_WORKERS_NUMBER = 0;

export class ExtraWorkersParser implements ExtraWorkersInfoProvider {
  private _parseErrors: ScheduleError[] = [];

  private extraWorkersInfoAsDataRows: { [key: string]: DataRow } = {};

  constructor(numberOfDays: number) {
    const extraWorkers = new Array(numberOfDays).fill(DEFAULT_EXTRA_WORKERS_NUMBER);
    this.extraWorkersInfoAsDataRows = {
      [ExtraWorkersSectionKey.ExtraWorkersCount]: new DataRow(
        ExtraWorkersSectionKey.ExtraWorkersCount,
        extraWorkers
      ),
    };
  }

  public get extraWorkers(): number[] {
    return this.extraWorkersInfoAsDataRows[ExtraWorkersSectionKey.ExtraWorkersCount]
      .rowData(true, false)
      .map((i) => parseInt(i, 10));
  }

  public get sectionData(): DataRow[] {
    return Object.values(this.extraWorkersInfoAsDataRows);
  }

  public get errors(): ScheduleError[] {
    return [...this._parseErrors];
  }

  public get workersCount(): number {
    return this.sectionData.length;
  }
}
