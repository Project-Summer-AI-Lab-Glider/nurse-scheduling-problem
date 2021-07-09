/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { ThunkDispatch } from "redux-thunk";
import { ApplicationStateModel } from "../../state/application-state.model";
import { MonthDataModel } from "../../state/schedule-data/schedule-data.model";
import { ActionModel } from "../../utils/action.model";
import { LocalMonthPersistProvider, MonthPersistProvider } from "./month-persistance-provider";

export type ThunkFunction<TDispatchedActionPayload> = (
  dispatch: ThunkDispatch<ApplicationStateModel, void, ActionModel<TDispatchedActionPayload>>,
  getState: () => ApplicationStateModel
) => Promise<unknown> | unknown;

export type ScheduleKeyString = string;
type BorderMonthOfYear = 0 | 11;
type YearOffset = -1 | 1;

export class ScheduleKey {
  constructor(public month: number, public year: number) {
    if (month < 0 || month > 11) {
      throw new Error(`Month number has to be within range 0-11 not ${month}`);
    }

    if (year < 2000 || year > 2100) {
      throw new Error(`Year has to be within range 2000-2100 not ${year}`);
    }
  }

  getRevisionKey(revision: RevisionType): RevisionKey {
    return `${this.month}_${this.year}_${revision}`;
  }

  get nextMonthKey(): ScheduleKey {
    return this.getMonthNeighbour(11, 1);
  }

  get prevMonthKey(): ScheduleKey {
    return this.getMonthNeighbour(0, -1);
  }

  private getMonthNeighbour(
    yearBorderMonth: BorderMonthOfYear,
    yearOffset: YearOffset
  ): ScheduleKey {
    const isYearBorderMonth = this.month === yearBorderMonth;
    const month = isYearBorderMonth ? 11 - yearBorderMonth : this.month + yearOffset;
    const year = isYearBorderMonth ? this.year + yearOffset : this.year;
    return new ScheduleKey(month, year);
  }
}

export function isRevisionType(value: string): value is RevisionType {
  return value === "primary" || value === "actual";
}

export type RevisionType = "primary" | "actual";
export type RevisionKey = string;
export type Revision = string;

enum RevisionKeyIndexes {
  MONTH = 0,
  YEAR = 1,
  REVISION_TYPE = 2,
}

export const RevisionTypeLabels: { [key: string]: string } = {
  primary: "wersja bazowa",
  actual: "wersja aktualna",
};

export const getRevisionTypeFromKey = (revisionKey: RevisionKey): RevisionType =>
  revisionKey.split("_")[RevisionKeyIndexes.REVISION_TYPE] as RevisionType;

export interface MonthRevision {
  _id: RevisionKey;
  data: MonthDataModel;
  _rev?: Revision;
}

export class PersistStorageManager {
  private static instance: PersistStorageManager;

  private readonly monthPersistProvider: MonthPersistProvider;

  private constructor() {
    this.monthPersistProvider = new LocalMonthPersistProvider();
  }

  public static getInstance(): PersistStorageManager {
    if (!PersistStorageManager.instance) {
      PersistStorageManager.instance = new PersistStorageManager();
    }

    return PersistStorageManager.instance;
  }

  get actualPersistProvider() {
    return this.monthPersistProvider;
  }
}
