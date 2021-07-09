/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import _ from "lodash";
import {
  VerboseDate,
  WeekDay,
} from "../../../state/schedule-data/foundation-info/foundation-info.model";
import { TranslationHelper } from "../../../helpers/translations.helper";

export interface UseCellBackgroundHighlightOptions {
  verboseDate?: VerboseDate;
  monthNumber?: number;
}

type HighlightId = "otherMonth" | "weekend" | "thisMonth";
export function useCellBackgroundHighlight({
  verboseDate,
  monthNumber,
}: UseCellBackgroundHighlightOptions): HighlightId {
  if (verboseDate && !_.isNil(monthNumber)) {
    if (verboseDate.month !== TranslationHelper.englishMonths[monthNumber]) {
      return "otherMonth";
    }
    if (
      verboseDate.isPublicHoliday ||
      verboseDate.dayOfWeek === WeekDay.SA ||
      verboseDate.dayOfWeek === WeekDay.SU
    ) {
      return "weekend";
    }
  }
  return "thisMonth";
}
