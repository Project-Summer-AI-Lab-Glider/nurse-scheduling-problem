/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode } from "../../../src/state/schedule-data/shifts-types/shift-types.model";
import { shiftSectionDataCy } from "../../../src/components/schedule/worker-info-section/worker-info-section.models";
import {
  shiftCodes,
  WORKER,
} from "../../fixtures/cypress/integration/user-acceptance/schedule-display-requirement";

describe("Display schedule", () => {
  beforeEach(() => {
    cy.loadScheduleToMonth("example_2.xlsx");
  });

  context("when schedule is loaded", () => {
    it("presents required functionalities", () => {
      cy.get(`[data-cy=${shiftSectionDataCy(0)}]`, { timeout: 10000 }).should("exist");
      cy.get("[data-cy=month-name]", { timeout: 100 });
      cy.contains("Listopad 2020");
      shiftCodes.forEach((k, index) => {
        cy.checkWorkerShift({ desiredShiftCode: k as ShiftCode, shiftIdx: index, ...WORKER });
      });
    });
  });
});
