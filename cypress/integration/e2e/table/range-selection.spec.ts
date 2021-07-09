/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { shiftSectionDataCy } from "../../../../src/components/schedule/worker-info-section/worker-info-section.models";
import { workerTestCases, foundationTestCases } from "../../../fixtures/e2e/table/range-selection";

describe("Shift range selection", () => {
  beforeEach(() => {
    cy.loadScheduleToMonth("small_test_schedule.xlsx");
    cy.enterEditMode();
  });

  workerTestCases.forEach((test) => {
    it(test.title, () => {
      cy.getWorkerShift(test.startShiftCell).trigger("dragstart", { force: true });
      cy.getWorkerShift(test.endShiftCell).trigger("drop", { force: true });
      cy.useAutocomplete(test.desiredShiftCode);
      const teamIndx = shiftSectionDataCy(test.startShiftCell.teamIdx);
      cy.get(`[data-cy=${teamIndx}] div[data-cy*="cell"]`)
        .then(($cell) => $cell.map((i, el) => Cypress.$(el).text()).get())
        .snapshot();
    });
  });

  foundationTestCases.forEach(({ title, dataKey, startDayIdx, endDayIdx, desiredNumber }) => {
    it(title, () => {
      cy.get("[data-cy=foundationInfoSection]")
        .children()
        .eq(dataKey)
        .children()
        .eq(startDayIdx)
        .trigger("dragstart");
      cy.get("[data-cy=foundationInfoSection]")
        .children()
        .eq(dataKey)
        .children()
        .eq(endDayIdx)
        .trigger("drop")
        .type(`${desiredNumber}{enter}`);
      for (const dayIdx of _.range(startDayIdx, endDayIdx + 1)) {
        cy.get("[data-cy=foundationInfoSection]")
          .children()
          .eq(dataKey)
          .children()
          .eq(dayIdx)
          .should("contain", desiredNumber);
      }
    });
  });
});
