/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { VerboseDate } from "../../state/schedule-data/foundation-info/foundation-info.model";
import { MonthInfoLogic } from "../schedule-logic/month-info.logic";
import { ScheduleError } from "../../state/schedule-data/schedule-errors/schedule-error.model";

export abstract class MetadataProvider {
  abstract get monthNumber(): number;

  abstract get year(): number;

  abstract get frozenDates(): [number | string, number][];

  abstract get dates(): number[];

  abstract get monthLogic(): MonthInfoLogic;

  get verboseDates(): VerboseDate[] {
    return [];
  }

  get errors(): ScheduleError[] {
    return [];
  }

  changeShiftFrozenState(rowind: number, shiftIndex: number): [number, number][] {
    return [];
  }
}
