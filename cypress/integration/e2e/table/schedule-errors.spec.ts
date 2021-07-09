/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
describe("Schedule errors", () => {
  before(() => {
    cy.intercept(
      {
        method: "POST",
        url: "**/schedule_errors",
      },
      {
        fixture: "scheduleErrors.json",
      }
    );
    cy.loadScheduleToMonth();
    cy.enterEditMode();
  });

  context("when errors are present", () => {
    it("shows errors returned by server", () => {
      cy.get("[data-cy=check-schedule-button]").click();
      cy.get("[data-cy=open-folding-section]").click({ multiple: true });
      cy.get("[data-cy=error-text]")
        .then(($cell) => $cell.map((i, el) => Cypress.$(el).text()).get())
        .snapshot();
    });
  });
});
