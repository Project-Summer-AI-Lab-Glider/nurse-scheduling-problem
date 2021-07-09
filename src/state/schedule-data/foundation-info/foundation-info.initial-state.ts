/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { FoundationInfoModel } from "./foundation-info.model";
import { MonthHelper } from "../../../helpers/month.helper";
import { initialDate } from "../month-info/month-info.initial-state";

const monthDays = MonthHelper.daysInMonth(initialDate.getMonth(), initialDate.getFullYear());
export const foundationInfoInitialState: FoundationInfoModel = {
  children_number: new Array(monthDays.length).fill(0),
  extra_workers: new Array(monthDays.length).fill(0),
  frozen_shifts: [],
  dates: monthDays,
};
