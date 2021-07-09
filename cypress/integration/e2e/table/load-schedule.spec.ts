/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { shiftSectionDataCy } from "../../../../src/components/schedule/worker-info-section/worker-info-section.models";
import { ShiftCode } from "../../../../src/state/schedule-data/shifts-types/shift-types.model";
import { FoundationInfoRowType } from "../../../support/commands";
// #region Test data
interface CheckFoundationInfoReadCorrectly {
  scheduleName: "childrens_extraworkers.xlsx" | "extraworkers_childrens.xlsx";
  expectedExtraWorkersNumber: number;
  expectedChildrenNumber: number;
}

const checkFoundationInfoReadProperlyData: CheckFoundationInfoReadCorrectly[] = [
  {
    scheduleName: "extraworkers_childrens.xlsx",
    expectedChildrenNumber: 250,
    expectedExtraWorkersNumber: 100,
  },
  {
    scheduleName: "childrens_extraworkers.xlsx",
    expectedChildrenNumber: 120,
    expectedExtraWorkersNumber: 240,
  },
];
// #endregion
describe("Load schedule", () => {
  it("saves file to database and after that loads new schedule", () => {
    const cell = {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: 6,
    };
    cy.loadScheduleToMonth("example.xlsx");
    cy.checkWorkerShift({
      ...cell,
      desiredShiftCode: ShiftCode.U,
    });
    cy.enterEditMode();
    cy.changeWorkerShift({ newShiftCode: ShiftCode.D, ...cell });
    cy.saveToDatabase();
    cy.leaveEditMode();
    cy.loadScheduleToMonth("example_2.xlsx");
    cy.checkWorkerShift({
      ...cell,
      desiredShiftCode: ShiftCode.N,
    });
  });

  it("saves file and loads the exported file", () => {
    const shiftSection = shiftSectionDataCy(0);
    cy.loadScheduleToMonth();
    cy.get("[data-cy=file-dropdown]").click();
    cy.get("[data-cy=export-schedule-button]").click();
    cy.get("[data-cy=confirm-export-button]").click();

    cy.get("a[download]")
      .then(
        (anchor) =>
          new Cypress.Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", anchor.prop("href"), true);
            xhr.responseType = "blob";
            xhr.onload = (): void => {
              if (xhr.status === 200) {
                const blob = xhr.response;
                const reader = new FileReader();
                reader.onload = (): void => {
                  resolve(reader.result);
                };
                reader.readAsBinaryString(blob);
              }
            };
            xhr.send();
          })
      )
      .then((file: string) => {
        cy.writeFile("cypress/fixtures/grafik.xlsx", file, "binary");
        cy.get('[data-cy="file-input"]').attachFile("grafik.xlsx");
        cy.get(`[data-cy=${shiftSection}]`);
      });
  });

  checkFoundationInfoReadProperlyData.forEach((testCase) => {
    it(`reads file ${testCase.scheduleName}`, () => {
      cy.loadScheduleToMonth(testCase.scheduleName, 1, 2021);
      cy.getFoundationInfoCell({
        cellIdx: 0,
        rowType: FoundationInfoRowType.ChildrenInfoRow,
        actualValue: testCase.expectedChildrenNumber,
      });
      cy.getFoundationInfoCell({
        cellIdx: 0,
        rowType: FoundationInfoRowType.ExtraWorkersRow,
        actualValue: testCase.expectedExtraWorkersNumber,
      });
    });
  });
});
