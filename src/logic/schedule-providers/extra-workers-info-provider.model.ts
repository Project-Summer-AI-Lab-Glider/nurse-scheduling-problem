/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ScheduleError } from "../../state/schedule-data/schedule-errors/schedule-error.model";

export abstract class ExtraWorkersInfoProvider {
  abstract get extraWorkers(): number[];

  abstract get workersCount(): number;

  get errors(): ScheduleError[] {
    return [];
  }
}
