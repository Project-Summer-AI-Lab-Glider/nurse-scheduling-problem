/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
declare namespace Cypress {
  export interface Chainable {
    loadScheduleToMonth(
      scheduleName?: import("./commands").ScheduleName,
      month?: number,
      year?: number
    ): Chainable<Element>;
    unloadSchedule(): Chainable<Element>;

    getWorkerShift(
      GetWorkerShiftOptions: import("./commands").GetWorkerShiftOptions
    ): Chainable<Element>;

    checkWorkerShift(
      CheckWorkerShift: import("./commands").CheckWorkerShiftOptions
    ): Chainable<Element>;

    changeWorkerShift(
      ChangeWorkerShiftOptions: import("./commands").ChangeWorkerShiftOptions
    ): Chainable<Element>;

    checkHoursInfo(
      ChangeWorkerShiftOptions: import("./commands").CheckHoursInfoOptions
    ): Chainable<Element>;

    useAutocomplete(
      newShiftCode: import("../../src/state/schedule-data/shifts-types/shift-types.model").ShiftCode
    ): Chainable<Element>;
    enterEditMode(): Chainable<Element>;
    saveToDatabase(): Chainable<Element>;
    leaveEditMode(): Chainable<Element>;
    /**
     * Behaves in the same way as built in screenshot command, but also awaits for some amount of time,
     * to ensure that screenshot will capture actual state of application.
     * For more details @see https://docs.cypress.io/api/commands/screenshot.html#Asynchronous
     * @param awaitTime estimated time, required for cypress engine to make
     * snapshot of current application state. Default value is 200
     * @param optios options for cy.screenshot
     */
    screenshotSync(
      awaitTime?: number,
      options?: import("./commands").CypressScreenshotOptions
    ): Chainable<Element>;

    getFoundationInfoCell(
      options: import("./commands").GetFoundationInfoCellOptions
    ): Chainable<Element>;
    changeFoundationInfoCell(
      options: import("./commands").ChangeFoundationInfoCellOptions
    ): Chainable<Element>;
  }
}
