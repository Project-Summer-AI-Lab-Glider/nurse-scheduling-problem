/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ContractType } from "../state/schedule-data/worker-info/worker-info.model";

export class ContractTypeHelper {
  static translate(type: ContractType): string {
    switch (type) {
      case ContractType.EMPLOYMENT_CONTRACT:
        return "umowa o pracę";
      case ContractType.CIVIL_CONTRACT:
        return "umowa zlecenie";
      default:
        throw Error(`Unsupported contract type ${type}`);
    }
  }

  static translateToShort(type: ContractType): string {
    switch (type) {
      case ContractType.EMPLOYMENT_CONTRACT:
        return "UoP";
      case ContractType.CIVIL_CONTRACT:
        return "UZ";
      default:
        throw Error(`Unsupported contract type ${type}`);
    }
  }
}
