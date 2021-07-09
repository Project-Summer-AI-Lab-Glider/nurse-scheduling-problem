/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export class CookiesProvider {
  public static getCookie(key: string): string | undefined {
    const filteredCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.split("=")[0]?.trim() === key);
    return filteredCookie?.split("=")[1];
  }

  public static saveCookie(key: string, value: string): void {
    try {
      const dayYearLater = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toUTCString();
      document.cookie = `${key}=${value}; expires=${dayYearLater}`;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  public static getAppVersion(): string | undefined {
    return this.getCookie("appversion");
  }

  public static setAppVersion(value: string): void {
    return this.saveCookie("appversion", value);
  }
}
