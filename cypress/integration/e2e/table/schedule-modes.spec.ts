/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode } from "../../../../src/common-models/shift-info.model";

const testedCell = {
  workerGroupIdx: 0,
  workerIdx: 0,
  shiftIdx: 6,
  initialShiftCode: ShiftCode.U,
  desiredShiftCode: ShiftCode.W,
};

describe("Schedule modes spec", () => {
  beforeEach(() => {
    cy.loadScheduleToMonth();
  });

  context("when in readonly mode", () => {
    it("is not able to change shift", () => {
      cy.getWorkerShift(testedCell);
      cy.get(`[data-cy=autocomplete-${testedCell.initialShiftCode}]`, { timeout: 100000 }).should(
        "not.exist"
      );
    });
  });

  context("when in edit mode", () => {
    beforeEach(() => {
      cy.enterEditMode();
    });

    it("Should be able to change shift", () => {
      cy.checkWorkerShift({ ...testedCell, desiredShiftCode: testedCell.initialShiftCode });
      cy.changeWorkerShift({ ...testedCell, newShiftCode: testedCell.desiredShiftCode });
      cy.checkWorkerShift({ ...testedCell });
    });
  });
});
