/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/* eslint-disable import/no-extraneous-dependencies */
import "cypress-file-upload";
import {
  baseCellDataCy,
  CellType,
} from "../../src/components/schedule/base/base-cell/base-cell.models";
import { baseRowDataCy } from "../../src/components/schedule/base/base-row/base-row.models";
import { shiftSectionDataCy } from "../../src/components/schedule/worker-info-section/worker-info-section.models";
import { summaryCellDataCy } from "../../src/components/schedule/worker-info-section/summary-table/summarytable-cell.models";
import { summaryRowDataCy } from "../../src/components/schedule/worker-info-section/summary-table/summarytable-row.models";
import { summaryTableSectionDataCy } from "../../src/components/schedule/worker-info-section/summary-table/summarytable-section.models";
import { ShiftCode } from "../../src/state/schedule-data/shifts-types/shift-types.model";
import { LocalMonthPersistProvider } from "../../src/logic/data-access/month-persistance-provider";

/* eslint-disable @typescript-eslint/no-var-requires */
require("@cypress/snapshot").register();

export type CypressScreenshotOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.ScreenshotOptions
>;

export interface GetWorkerShiftOptions {
  teamIdx: number;
  workerIdx: number;
  shiftIdx: number;
  selector?: CellType;
}
export interface CheckWorkerShiftOptions extends GetWorkerShiftOptions {
  desiredShiftCode: ShiftCode;
}
export interface ChangeWorkerShiftOptions extends GetWorkerShiftOptions {
  newShiftCode: ShiftCode;
}
export interface CheckHoursInfoOptions {
  teamIdx: number;
  workerIdx: number;
  hoursInfo: HoursInfo;
}

export type HoursInfo = {
  [key in HoursInfoCells]: number;
};

export enum HoursInfoCells {
  required = 0,
  actual = 1,
  overtime = 2,
}
export type ScheduleName =
  | "example.xlsx"
  | "example_2.xlsx"
  | "childrens_extraworkers.xlsx"
  | "extraworkers_childrens.xlsx"
  | "small_test_schedule.xlsx";
export const TEST_SCHEDULE_MONTH = 10;
export const TEST_SCHEDULE_YEAR = 2020;

Cypress.Commands.add(
  "loadScheduleToMonth",
  (scheduleName: ScheduleName = "example.xlsx", month: number, year: number) => {
    cy.wrap(new LocalMonthPersistProvider().reloadDb()).then(() => {
      cy.clock(Date.UTC(year ?? TEST_SCHEDULE_YEAR, month ?? TEST_SCHEDULE_MONTH, 15), ["Date"]);
      cy.visit("/");
      cy.get("[data-cy=file-input]").attachFile(scheduleName);
      cy.get("[data-cy=team0ShiftsTable]", { timeout: 10000 });
    });
  }
);

Cypress.Commands.add("unloadSchedule", () => {
  cy.wrap(new LocalMonthPersistProvider().reloadDb()).then(() => cy.visit("/"));
});

Cypress.Commands.add(
  "getWorkerShift",
  ({ teamIdx, workerIdx, shiftIdx, selector = "cell" }: GetWorkerShiftOptions) => {
    const section = shiftSectionDataCy(teamIdx);
    const row = baseRowDataCy(workerIdx);
    const cell = baseCellDataCy(shiftIdx, selector);
    return cy.get(`[data-cy=${section}] [data-cy=${row}] [data-cy=${cell}]`);
  }
);

Cypress.Commands.add(
  "checkWorkerShift",
  ({ desiredShiftCode, ...getWorkerShiftOptions }: CheckWorkerShiftOptions) => {
    if (desiredShiftCode === ShiftCode.W) {
      return cy.getWorkerShift(getWorkerShiftOptions).should("be.empty");
    } else {
      return cy.getWorkerShift(getWorkerShiftOptions).should("contain", desiredShiftCode);
    }
  }
);

Cypress.Commands.add("useAutocomplete", (newShiftCode: ShiftCode) =>
  cy.get(`[data-cy=autocomplete-${newShiftCode}]`).click({ force: true })
);

Cypress.Commands.add(
  "changeWorkerShift",
  ({ newShiftCode, ...getWorkerShiftOptions }: ChangeWorkerShiftOptions) => {
    cy.getWorkerShift(getWorkerShiftOptions).click({ force: true });
    cy.useAutocomplete(newShiftCode);
  }
);

Cypress.Commands.add(
  "checkHoursInfo",
  ({ teamIdx, workerIdx, hoursInfo }: CheckHoursInfoOptions) => {
    const section = summaryTableSectionDataCy(teamIdx);
    const row = summaryRowDataCy(workerIdx);
    Object.keys(HoursInfoCells)
      .filter((key) => isNaN(Number(HoursInfoCells[key])))
      .forEach((key) => {
        const cell = summaryCellDataCy(parseInt(key, 10));
        cy.get(`[data-cy=${section}] [data-cy=${row}] [data-cy=${cell}]`).should(
          "contain",
          hoursInfo[key]
        );
      });
  }
);

Cypress.Commands.add("saveToDatabase", () => cy.get("[data-cy=save-schedule-button").click());

Cypress.Commands.add("enterEditMode", () => {
  cy.get("[data-cy=edit-mode-button]").click();
  cy.get("[data-cy=edit-mode-text]");
});

Cypress.Commands.add("leaveEditMode", () => {
  cy.get("[data-cy=leave-edit-mode]").click();
  const dataCy = shiftSectionDataCy(0);
  cy.get(`[data-cy=${dataCy}]`);
});

Cypress.Commands.add(
  "screenshotSync",
  (awaitTime = 100, cyScreenshotOptions?: CypressScreenshotOptions) => {
    // In case if screenshots are disabled, just return `cy`, so command is still chainable
    if (Cypress.env("makeScreenshots") !== "true") {
      return cy;
    }
    cy.get("#app-header").invoke("css", "position", "absolute");
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.screenshot(cyScreenshotOptions).wait(awaitTime);
    return cy.get("#app-header").invoke("css", "position", null);
  }
);

export enum FoundationInfoRowType {
  ExtraWorkersRow = 1,
  ChildrenInfoRow = 0,
}
export interface GetFoundationInfoCellOptions {
  rowType: FoundationInfoRowType;
  cellIdx: number;
  actualValue: number;
}
Cypress.Commands.add(
  "getFoundationInfoCell",
  ({ cellIdx, rowType, actualValue }: GetFoundationInfoCellOptions) => {
    const row = baseRowDataCy(rowType);
    const cell = baseCellDataCy(cellIdx, "cell");
    cy.get(`[data-cy=foundationInfoSection] [data-cy=${row}] [data-cy=${cell}]`).contains(
      actualValue
    );
  }
);

export interface ChangeFoundationInfoCellOptions extends GetFoundationInfoCellOptions {
  newValue: number;
}
Cypress.Commands.add(
  "changeFoundationInfoCell",
  ({ newValue, ...getCellOptions }: ChangeFoundationInfoCellOptions) => {
    cy.getFoundationInfoCell(getCellOptions).type(`${newValue}{enter}`);
  }
);
