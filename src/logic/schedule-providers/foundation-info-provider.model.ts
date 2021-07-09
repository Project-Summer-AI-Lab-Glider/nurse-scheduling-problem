/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { ScheduleError } from "../../state/schedule-data/schedule-errors/schedule-error.model";
import { ChildrenInfoProvider } from "./children-info-provider.model";
import { ExtraWorkersInfoProvider } from "./extra-workers-info-provider.model";
import { Sections } from "./schedule-provider.model";

export interface FoundationInfoOptions extends Pick<Sections, "Teams"> {
  ChildrenInfo: ChildrenInfoProvider;
  ExtraWorkersInfo: ExtraWorkersInfoProvider;
}

export abstract class FoundationInfoProvider {
  get errors(): ScheduleError[] {
    return _.flatten(this.sections.Teams.map((team) => team.errors));
  }

  get childrenInfo(): number[] {
    return this.sections.ChildrenInfo.registeredChildrenNumber;
  }

  get extraWorkersInfo(): number[] {
    return this.sections.ExtraWorkersInfo.extraWorkers;
  }

  getAllWorkersNumber(): number {
    return (
      this.sections.Teams.reduce((acc, team) => acc + team.workersCount, 0) +
      this.sections.ExtraWorkersInfo.workersCount
    );
  }

  constructor(protected sections: FoundationInfoOptions) {}
}
