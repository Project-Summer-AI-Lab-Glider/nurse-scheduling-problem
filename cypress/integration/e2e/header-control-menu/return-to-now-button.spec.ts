/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { StringHelper } from "../../../../src/helpers/string.helper";
import { TranslationHelper } from "../../../../src/helpers/translations.helper";
import { TEST_SCHEDULE_YEAR, TEST_SCHEDULE_MONTH } from "../../../support/commands";

const month = StringHelper.capitalize(TranslationHelper.polishMonths[TEST_SCHEDULE_MONTH]);
const monthName = `${month} ${TEST_SCHEDULE_YEAR}`;

describe("'Come back to now' button", () => {
  context("when schedule is not loaded", () => {
    beforeEach(() => {
      cy.clock(Date.UTC(TEST_SCHEDULE_YEAR, TEST_SCHEDULE_MONTH), ["Date"]);
      cy.unloadSchedule();
    });

    it("returns to current month from previous month", () => {
      cy.get("[data-cy=switch-prev-month]").click();
      cy.get("[data-cy=return-to-now-button]").click();
      cy.get("[data-cy=month-name]").contains(monthName);
    });

    it("returns to current month from next month", () => {
      cy.get("[data-cy=switch-next-month]").click();
      cy.get("[data-cy=return-to-now-button]").click();
      cy.get("[data-cy=month-name]").contains(monthName);
    });
  });

  context("when schedule is loaded", () => {
    beforeEach(() => {
      cy.loadScheduleToMonth();
    });

    it("returns to current month from previous month", () => {
      cy.get("[data-cy=switch-prev-month]").click();
      cy.get("[data-cy=return-to-now-button]").click();
      cy.get("[data-cy=month-name]").contains(monthName);
      cy.get('[data-cy="team0ShiftsTable"] [data-cy="1Row"] div[data-cy*="cell"]')
        .then(($cell) => $cell.map((i, el) => Cypress.$(el).text()).get())
        .snapshot();
    });

    it("returns to current month from next month", () => {
      cy.get("[data-cy=switch-next-month]").click();
      cy.get("[data-cy=return-to-now-button]").click();
      cy.get("[data-cy=month-name]").contains(monthName);
      cy.get('[data-cy="team0ShiftsTable"] [data-cy="1Row"] div[data-cy*="cell"]')
        .then(($cell) => $cell.map((i, el) => Cypress.$(el).text()).get())
        .snapshot();
    });
  });
});
