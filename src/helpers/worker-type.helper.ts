/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { WorkerType } from "../state/schedule-data/worker-info/worker-info.model";

export class WorkerTypeHelper {
  static translate(type: WorkerType, pluralize = false): string {
    switch (type) {
      case WorkerType.NURSE:
        return pluralize ? "pielęgniarki" : "pielęgniarka";
      case WorkerType.OTHER:
        return pluralize ? "opiekunki" : "opiekunka";
      default:
        throw Error(`Not recognized worker type ${type}`);
    }
  }

  static translateToShort(type: WorkerType): string {
    switch (type) {
      case WorkerType.NURSE:
        return "P";
      case WorkerType.OTHER:
        return "O";
      default:
        throw Error(`Not recognized worker type ${type}`);
    }
  }
}
