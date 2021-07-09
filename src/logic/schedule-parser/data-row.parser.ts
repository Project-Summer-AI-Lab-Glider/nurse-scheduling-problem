/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export class DataRowParser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private data: string[]) {}

  public get isEmpty(): boolean {
    return this.rowData(false, true).length === 0;
  }

  public get rowKey(): string {
    if (this.isEmpty) {
      throw new Error("Trying to access key from an empty row");
    }
    return this.rowData(false, true)[0].trim();
  }

  public set rowKey(value: string) {
    if (this.data) {
      this.data[0] = value;
    } else {
      this.data = [value];
    }
  }

  public rowData(includeNulls = false, includeKey = false): string[] {
    const keyPosition = 1;
    return includeKey
      ? this.data.filter((c) => includeNulls || !(c === null || c === ""))
      : this.data.filter((c) => includeNulls || !(c === null || c === "")).slice(keyPosition);
  }
}
