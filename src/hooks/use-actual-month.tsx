/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StringHelper } from "../helpers/string.helper";
import { ApplicationStateModel } from "../state/application-state.model";
import { TranslationHelper } from "../helpers/translations.helper";

export function useActualMonth(): string {
  const { month_number, year } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present.schedule_info
  );

  const [actualMonth, setActualMonth] = useState<string>("");
  useEffect(() => {
    if (month_number !== undefined && year) {
      const month = StringHelper.capitalize(
        `${TranslationHelper.polishMonths[month_number]} ${year}`
      );

      setActualMonth(month);
    }
  }, [month_number, year]);

  if (actualMonth === "")
    return `${TranslationHelper.polishMonths[new Date().getMonth()]} ${new Date().getFullYear()}`;
  return actualMonth;
}
