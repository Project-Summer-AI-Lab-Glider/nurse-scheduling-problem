/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
describe("schedule import and export requirement", () => {
  before(() => {
    cy.loadScheduleToMonth();
    cy.visit("/").screenshotSync();
  });

  it("shows how to import schedule", () => {
    cy.get("[data-cy=file-dropdown]").click().screenshotSync();
    cy.get('[data-cy="file-input"]').attachFile("example.xlsx");
  });
});
