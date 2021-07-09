/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftCode } from "../../../../src/state/schedule-data/shifts-types/shift-types.model";
import { GetWorkerShiftOptions, HoursInfo, HoursInfoCells } from "../../../support/commands";

const nurseInitialWorkHours: HoursInfo[] = [
  {
    [HoursInfoCells.required]: 128,
    [HoursInfoCells.actual]: 152,
    [HoursInfoCells.overtime]: 24,
  },
  {
    [HoursInfoCells.required]: 160,
    [HoursInfoCells.actual]: 240,
    [HoursInfoCells.overtime]: 80,
  },
];
const babysitterInitialWorkHours: HoursInfo[] = [
  {
    [HoursInfoCells.required]: 80,
    [HoursInfoCells.actual]: 116,
    [HoursInfoCells.overtime]: 36,
  },
  {
    [HoursInfoCells.required]: 136,
    [HoursInfoCells.actual]: 184,
    [HoursInfoCells.overtime]: 48,
  },
  {
    [HoursInfoCells.required]: 160,
    [HoursInfoCells.actual]: 96,
    [HoursInfoCells.overtime]: -64,
  },
];

interface TestCase extends GetWorkerShiftOptions {
  initialShiftCode: ShiftCode;
  desiredShiftCode: ShiftCode;
  expectedWorkHoursInfo: HoursInfo;
}

function testWorkHoursInfoUpdate({
  teamIdx,
  workerIdx,
  shiftIdx,
  initialShiftCode,
  desiredShiftCode,
  expectedWorkHoursInfo,
}: TestCase): void {
  const workerData = {
    teamIdx,
    workerIdx,
    shiftIdx,
  };
  cy.changeWorkerShift({ ...workerData, newShiftCode: desiredShiftCode });
  cy.checkWorkerShift({ ...workerData, desiredShiftCode });
  cy.checkHoursInfo({ teamIdx, workerIdx, hoursInfo: expectedWorkHoursInfo });
}

const prevMonthDays = 6;
context("Work hours info (summary table)", () => {
  // sanity check in case schedule in the docs gets changed and these tests start failing because of it
  before("Has expected initial values of workHourInfo in example schedule", () => {
    cy.loadScheduleToMonth();
    cy.enterEditMode();

    nurseInitialWorkHours.forEach((nurseHours, idx) => {
      cy.checkHoursInfo({
        teamIdx: 0,
        workerIdx: idx,
        hoursInfo: nurseHours,
      });
    });

    babysitterInitialWorkHours.forEach((babysitterHours, idx) => {
      cy.checkHoursInfo({
        teamIdx: 1,
        workerIdx: idx,
        hoursInfo: babysitterHours,
      });
    });
  });

  it("Is added, should add 12 to actual and overtime hours and not change required", () => {
    const data = {
      teamIdx: 0,
      workerIdx: 0,
      shiftIdx: prevMonthDays + 9,
      initialShiftCode: ShiftCode.W,
      desiredShiftCode: ShiftCode.D,
      expectedWorkHoursInfo: {
        [HoursInfoCells.required]: nurseInitialWorkHours[0][HoursInfoCells.required],
        [HoursInfoCells.actual]: nurseInitialWorkHours[0][HoursInfoCells.actual] + 12,
        [HoursInfoCells.overtime]: nurseInitialWorkHours[0][HoursInfoCells.overtime] + 12,
      },
    };

    testWorkHoursInfoUpdate(data);
  });

  it("Is removed, should subtract 12 from actual and overtime hours and not change required", () => {
    const data = {
      teamIdx: 0,
      workerIdx: 1,
      shiftIdx: prevMonthDays + 1,
      initialShiftCode: ShiftCode.D,
      desiredShiftCode: ShiftCode.W,
      expectedWorkHoursInfo: {
        [HoursInfoCells.required]: nurseInitialWorkHours[1][HoursInfoCells.required],
        [HoursInfoCells.actual]: nurseInitialWorkHours[1][HoursInfoCells.actual] - 12,
        [HoursInfoCells.overtime]: nurseInitialWorkHours[1][HoursInfoCells.overtime] - 12,
      },
    };
    testWorkHoursInfoUpdate(data);
  });

  it("Cannot change previous month shifts", () => {
    const data = {
      teamIdx: 0,
      workerIdx: 4,
      shiftIdx: prevMonthDays - 2,
    };

    cy.getWorkerShift(data).click({ force: true });
    const exampleShiftCode = ShiftCode.D;
    cy.get(`[data-cy=autocomplete-${exampleShiftCode}]`).should("not.exist");
  });

  it("When N for current month weekday is added, should add 12 to actual and overtime hours and not change required", () => {
    const data = {
      teamIdx: 1,
      workerIdx: 0,
      shiftIdx: prevMonthDays + 3,
      initialShiftCode: ShiftCode.W,
      desiredShiftCode: ShiftCode.N,
      expectedWorkHoursInfo: {
        [HoursInfoCells.required]: babysitterInitialWorkHours[0][HoursInfoCells.required],
        [HoursInfoCells.actual]: babysitterInitialWorkHours[0][HoursInfoCells.actual] + 12,
        [HoursInfoCells.overtime]: babysitterInitialWorkHours[0][HoursInfoCells.overtime] + 12,
      },
    };
    testWorkHoursInfoUpdate(data);
  });

  it("Is removed, should subtract 12 from actual and overtime hours and not change required", () => {
    const data = {
      teamIdx: 1,
      workerIdx: 2,
      shiftIdx: prevMonthDays + 6,
      initialShiftCode: ShiftCode.N,
      desiredShiftCode: ShiftCode.W,
      expectedWorkHoursInfo: {
        [HoursInfoCells.required]: babysitterInitialWorkHours[2][HoursInfoCells.required],
        [HoursInfoCells.actual]: babysitterInitialWorkHours[2][HoursInfoCells.actual] - 12,
        [HoursInfoCells.overtime]: babysitterInitialWorkHours[2][HoursInfoCells.overtime] - 12,
      },
    };
    testWorkHoursInfoUpdate(data);
  });
});
