/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
describe("Copy schedule from previous month", () => {
  before(() => {
    cy.loadScheduleToMonth("small_test_schedule.xlsx");
  });

  context("when iterating through entire year", () => {
    const NUM_OF_MONTHS_IN_A_YEAR = 12;
    it("properly copies previous schedule", () => {
      for (let i = 0; i <= NUM_OF_MONTHS_IN_A_YEAR; i++) {
        cy.get("[data-cy=switch-next-month]").click();
        cy.get("[data-cy=copy-prev-month]").click();
        cy.get('[data-cy="team0ShiftsTable"] [data-cy="1Row"] div[data-cy*="cell"]').then(($cell) =>
          $cell.map((j, el) => Cypress.$(el).text()).get()
        );
      }
    });
  });
});
