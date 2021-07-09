/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { HoursInfoCells } from "../../../support/commands";

describe("Tab management", () => {
  beforeEach(() => {
    cy.loadScheduleToMonth();
    cy.get('[data-cy="btn-management-tab"]').click();
    cy.get('[data-cy="management-page-title"]').should("be.visible");
  });

  describe("Worker drawer management", () => {
    beforeEach(() => {
      cy.get('[data-cy="btn-add-worker"]').click();
      cy.get('[data-cy="worker-drawer"]').should("be.visible");
    });

    describe("Creating worker", () => {
      context("when creating valid worker", () => {
        const newWorker = "Ala makota";

        it("creates the worker", () => {
          cy.get('[data-cy="name"]').type(newWorker);
          cy.get(`[value="${newWorker}"]`).should("be.visible");
          cy.get('[data-cy="position"]').click().get('[data-cy="other"]').click();
          cy.get('[data-cy="contract"]').click().get('[data-cy="employment_contract"]').click();
          cy.get('[data-cy="contract-time-dropdown"]').click().get('[data-cy="other"]').click();
          cy.get('[data-cy="input-employ-time-other"]').click().type("{backspace}{backspace}13");
          cy.get('[data-cy="btn-save-worker"]').click();
          cy.get('[data-cy="btn-add-worker"]').should("be.visible");
          cy.contains(newWorker);
          cy.get('[data-cy="btn-schedule-tab"]').click();
          cy.contains(newWorker);
        });
      });
    });
  });

  describe("Handle worker data edition", () => {
    const testWorker = "Pielęgniarka 2";
    const testWorkerData = {
      teamIdx: 0,
      workerIdx: 1,
      hoursInfo: {
        [HoursInfoCells.required]: 160,
        [HoursInfoCells.actual]: 240,
        [HoursInfoCells.overtime]: 160,
      },
    };

    describe("Changing workers contract type ", () => {
      testWorkerData.hoursInfo[2] = 80;
      beforeEach(() => {
        cy.get('[data-cy="btn-management-tab"]').click();
        cy.get(`[data-cy="edit-worker-${testWorker}"]`).click();
        cy.get('[data-cy="contract"]').click();
      });
      context(
        "when changing worker's contract type from employment contract to civil contract",
        () => {
          it("properly handles worker contract type change", () => {
            cy.get('[data-cy="civil_contract"]').click();
            cy.get('[data-cy="btn-save-worker"]').click();
            cy.get(`[data-cy="worker-hours-${testWorker}"]`).contains("umowa zlecenie 160 godz.");
            cy.get('[data-cy="btn-schedule-tab"]').click();
            cy.checkHoursInfo(testWorkerData);
          });
        }
      );
      context(
        "when changing worker's contract type from civil contract to employment contract",
        () => {
          it("properly handles worker contract type change", () => {
            cy.get('[data-cy="employment_contract"]').click();
            cy.get('[data-cy="btn-save-worker"]').click();
            cy.get(`[data-cy="worker-hours-${testWorker}"]`).contains("umowa o pracę 1/1");
            cy.get('[data-cy="btn-schedule-tab"]').click();
            cy.checkHoursInfo(testWorkerData);
          });
        }
      );
    });
    describe("Editing workers time ", () => {
      beforeEach(() => {
        cy.get('[data-cy="btn-management-tab"]').click();
        cy.get(`[data-cy="edit-worker-${testWorker}"]`).click();
      });
      context("when editing worker hours from 1 to 1/2", () => {
        it("properly handles worker hours edition", () => {
          testWorkerData.hoursInfo[0] = 80;
          testWorkerData.hoursInfo[2] = 160;
          cy.get('[data-cy="contract-time-dropdown"]').click().get('[data-cy="half"]').click();
          cy.get('[data-cy="btn-save-worker"]').click();
          cy.get(`[data-cy="worker-hours-${testWorker}"]`).contains("umowa o pracę 1/2");
          cy.get('[data-cy="btn-schedule-tab"]').click();
          cy.checkHoursInfo(testWorkerData);
        });
      });

      context("when editing worker hours from 1/2 to 1", () => {
        it("properly handles worker hours edition", () => {
          testWorkerData.hoursInfo[0] = 160;
          testWorkerData.hoursInfo[2] = 80;
          cy.get('[data-cy="contract-time-dropdown"]').click().get('[data-cy="full"]').click();
          cy.get('[data-cy="btn-save-worker"]').click();
          cy.get(`[data-cy="worker-hours-${testWorker}"]`).contains("umowa o pracę 1");
          cy.get('[data-cy="btn-schedule-tab"]').click();
          cy.checkHoursInfo(testWorkerData);
        });
      });
      context("when editing worker hour from 1 to 1/8", () => {
        it("properly handles worker hours edition", () => {
          testWorkerData.hoursInfo[0] = 20;
          testWorkerData.hoursInfo[2] = 220;
          cy.get('[data-cy="contract-time-dropdown"]').click().get('[data-cy="other"]').click();
          cy.get('[data-cy="input-employ-time-other"] input')
            .click()
            .clear({ force: true })
            .type("18");
          cy.get('[data-cy="btn-save-worker"]').click();
          cy.get(`[data-cy="worker-hours-${testWorker}"]`).contains("umowa o pracę 1/8");
          cy.get('[data-cy="btn-schedule-tab"]').click();
          cy.checkHoursInfo(testWorkerData);
        });
      });
    });
  });
});
