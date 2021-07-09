/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode, ShiftTypesDict } from "../state/schedule-data/shifts-types/shift-types.model";
import { Opaque } from "../utils/type-utils";

type FirstLetterAcronym = Opaque<"First letter acronym", ShiftCode>;
export class AcronymGenerator {
  static generate(fullShiftName: string, shiftsTypes: ShiftTypesDict): ShiftCode {
    const existingShiftAcronyms = this.getExistingShiftAcronyms(shiftsTypes);
    const acronym = this.generateAcronymFromFirstLetters(fullShiftName, existingShiftAcronyms);
    return !existingShiftAcronyms.includes(acronym)
      ? acronym
      : this.extendFirstLetterAcronym(acronym, fullShiftName, existingShiftAcronyms);
  }

  private static getExistingShiftAcronyms(existingShifts: ShiftTypesDict) {
    return Object.values(existingShifts).map((shift) => shift.code);
  }

  /**
   * Generates an acronym for shift by taking first letters of words in shift
   */
  private static generateAcronymFromFirstLetters(
    shiftName: string,
    existingShiftAcronyms: ShiftCode[]
  ): FirstLetterAcronym {
    const re = /\s*(?:[;:\-+\s]|$)\s*/;
    existingShiftAcronyms.push("" as ShiftCode);
    const wordSpliting = shiftName.split(re);
    return wordSpliting.reduce((acr, l) => {
      acr += l.charAt(0).toUpperCase();
      return acr;
    }, "") as FirstLetterAcronym;
  }

  /**
   * Extends acronym by adding new letters from full shift name to first letters
   */
  private static extendFirstLetterAcronym(
    acronym: FirstLetterAcronym,
    fullShiftName: string,
    existingShiftAcronyms: ShiftCode[]
  ): ShiftCode {
    const shiftNameParts = fullShiftName.split(" ");
    const acronymChars = acronym.split("");
    let acronymString = acronymChars.join("") as ShiftCode;
    let wordNumber = 0;
    while (existingShiftAcronyms.includes(acronymString) && wordNumber < shiftNameParts.length) {
      let letterNumber = 1;
      while (
        existingShiftAcronyms.includes(acronymString) &&
        letterNumber < acronymChars[wordNumber].length
      ) {
        acronymChars[wordNumber] += acronymChars[wordNumber].charAt(letterNumber).toUpperCase();
        acronymString = acronymChars.join("") as ShiftCode;
        letterNumber += 1;
      }
      wordNumber += 1;
    }
    return acronymString;
  }
}
