/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import {
  childrenInfoCell,
  extraWorkerInfoCell,
  workerCells,
} from "../../fixtures/user-acceptance/schedule-editing-requirement";

describe("schedule editing requirement", () => {
  beforeEach(() => {
    cy.loadScheduleToMonth();
    cy.enterEditMode();
  });

  it("shows how to change worker shift", () => {
    cy.getWorkerShift(workerCells[0]).click();
    cy.useAutocomplete(workerCells[0].newShiftCode);
    cy.getWorkerShift(workerCells[0]).contains(workerCells[0].newShiftCode);
  });

  it("shows how to change children number", () => {
    cy.getFoundationInfoCell(childrenInfoCell);
    cy.changeFoundationInfoCell(childrenInfoCell);
  });

  it("shows how to change extra workers info", () => {
    cy.getFoundationInfoCell(extraWorkerInfoCell);
    cy.changeFoundationInfoCell(extraWorkerInfoCell);
  });

  it("shows how to make undo in schedule", () => {
    cy.getWorkerShift(workerCells[0]).click();
    cy.useAutocomplete(workerCells[0].newShiftCode);
    cy.get("[data-cy=undo-button]").click({ force: true });
    cy.getWorkerShift(workerCells[0]).contains(workerCells[0].actualShiftCode);
  });
});
