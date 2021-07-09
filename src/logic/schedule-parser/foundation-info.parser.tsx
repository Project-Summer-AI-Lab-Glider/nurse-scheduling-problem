/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { FoundationInfoProvider } from "../schedule-providers/foundation-info-provider.model";

export enum FoundationInfoHeaders {
  ChildrenInfo = "dzieci",
  ExtraWorkers = "pracownicy dzienni",
  MonthDates = "dni miesiąca",
}
export class FoundationInfoParser extends FoundationInfoProvider {}
