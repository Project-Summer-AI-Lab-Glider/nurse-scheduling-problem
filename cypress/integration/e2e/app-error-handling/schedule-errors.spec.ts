/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { WorkerType } from "../../../../src/state/schedule-data/worker-info/worker-info.model";

const addWorker = (workerName: string, position: WorkerType): void => {
  cy.get('[data-cy="btn-management-tab"]').click();
  cy.get('[data-cy="management-page-title"]').should("be.visible");
  cy.get('[data-cy="btn-add-worker"]').click();
  cy.get('[data-cy="worker-drawer"]').should("be.visible");
  cy.get('[data-cy="name"]').type(workerName);
  cy.get('[data-cy="position"]').click().get(`[data-cy=${position.toLowerCase()}]`).click();
  cy.get('[data-cy="contract"]').click().get('[data-cy="employment_contract"]').click();
  cy.get('[data-cy="contract-time-dropdown"]').click().get('[data-cy="full"]').click();
  cy.get('[data-cy="btn-save-worker"]').click();
  cy.get('[data-cy="btn-add-worker"]').should("be.visible");
};

context("Schedule errors", () => {
  beforeEach(() => {
    cy.loadScheduleToMonth();
  });

  it("Should throw error after adding error user", () => {
    addWorker(Cypress.env("REACT_APP_ERROR_WORKER"), WorkerType.NURSE);
    cy.get('[data-cy="btn-schedule-tab"]').click({ force: true });
    Cypress.on("uncaught:exception", () => false);
  });

  it("Should restore previous version from corrupted page", () => {
    addWorker("testUser", WorkerType.NURSE);
    cy.get('[data-cy="btn-schedule-tab"]').click({ force: true });
    addWorker(Cypress.env("REACT_APP_ERROR_WORKER"), WorkerType.NURSE);
    cy.get('[data-cy="btn-schedule-tab"]').click({ force: true });
    Cypress.on("uncaught:exception", () => {
      cy.get('[data-cy="btn-reload-app-error"]').click();
      cy.get('[data-cy="timetable-row"]').should("be.visible");
      cy.get('[data-cy="btn-reload-app-error"]').click();
      cy.get('[data-cy="restore-prev-version"]').click();
      cy.contains("testUser");
      return false;
    });
  });
});
