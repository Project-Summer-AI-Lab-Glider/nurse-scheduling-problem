/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ShiftHelper } from "../../../../src/helpers/shifts.helper";
import { expectedHours } from "../../../fixtures/unit/helpers/shift.helper";
import { SHIFTS } from "../../../../src/state/schedule-data/shifts-types/shift-types.model";
import { WorkerHourInfo } from "../../../../src/logic/schedule-logic/worker-hours-info.logic";

describe("ShiftHelper", () => {
  Object.keys(expectedHours).forEach((shiftCode) => {
    it(`Should calculate correct duration ${shiftCode}`, () => {
      const shiftModel = SHIFTS[shiftCode];
      const hours = ShiftHelper.shiftToWorkTime(shiftModel);
      expect(hours).to.equal(expectedHours[shiftCode]);
    });
  });

  it("Should calculate correct work hours for month", () => {
    const workNorm = WorkerHourInfo.calculateWorkNormForMonth(10, 2020);
    expect(workNorm).to.equal(160);
  });
});
