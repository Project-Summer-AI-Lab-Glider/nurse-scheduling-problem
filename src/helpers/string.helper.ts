/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export class StringHelper {
  static getRawValue(value: string | null | undefined): string {
    return value?.toLowerCase().trim() || "";
  }

  static capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  static capitalizeEach(value: string, separator = " "): string {
    const values = value.split(separator).map(this.capitalize);
    return values.join(separator);
  }
}
