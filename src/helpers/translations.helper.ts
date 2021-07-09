/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ResourceName } from "../assets/translations/types";
import resources from "../assets/translations";

i18n.use(initReactI18next).init({
  fallbackLng: "pl",
  resources,
});

export function t(r: ResourceName, options?: Record<string, unknown>): string {
  return i18n.t(r, options);
}
export class TranslationHelper {
  public static get polishMonths(): string[] {
    return Object.keys(TranslationHelper.monthTranslations);
  }

  public static get englishMonths(): string[] {
    return Object.values(TranslationHelper.monthTranslations);
  }

  public static get polishMonthsGenetivus(): string[] {
    return Object.values(TranslationHelper.monthsGenetivus);
  }

  private static get monthTranslations(): { [key: string]: string } {
    return {
      styczeń: "january",
      luty: "february",
      marzec: "march",
      kwiecień: "april",
      maj: "may",
      czerwiec: "june",
      lipiec: "july",
      sierpień: "august",
      wrzesień: "september",
      październik: "october",
      listopad: "november",
      grudzień: "december",
    };
  }

  private static get monthsGenetivus(): { [key: number]: string } {
    return {
      1: "stycznia",
      2: "lutego",
      3: "marca",
      4: "kwietnia",
      5: "maja",
      6: "czerwca",
      7: "lipca",
      8: "sierpnia",
      9: "września",
      10: "października",
      11: "listopada",
      12: "grudnia",
    };
  }

  public static get weekDaysTranslations(): { [key: string]: string } {
    return {
      MO: "pon",
      TU: "wt",
      WE: "śr",
      TH: "czw",
      FR: "pt",
      SA: "sb",
      SU: "nd",
    };
  }

  public static hourAccusativus(key: number): string {
    if (key === 1) return "godzinę";
    if (key === 12 || key === 13 || key === 14) return "godzin";
    if ((key - 2) % 10 === 0 || (key - 3) % 10 === 0 || (key - 4) % 10 === 0) return "godziny";
    return "godzin";
  }
}
