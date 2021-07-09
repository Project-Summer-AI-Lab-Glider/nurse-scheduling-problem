/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { WorkingTimeHelper } from "../../../../src/helpers/working-time.helper";

describe("WorkingTimeHelper", () => {
  describe("fromHoursToFraction", () => {
    const testCases = [
      { hours: 168, base: 168, result: "1/1" },
      { hours: 84, base: 168, result: "1/2" },
      { hours: 85, base: 168, result: "1/2" },
      { hours: 90, base: 168, result: "1/2" },
      { hours: 95, base: 168, result: "3/5" },
      { hours: 129, base: 173, result: "3/4" },
      { hours: 180, base: 173, result: "1/1" },
      { hours: -1, base: 173, result: "1/8" },
      { hours: 3, base: 173, result: "1/8" },
    ];

    testCases.forEach((testCase) => {
      it(`translates (hours: ${testCase.hours}, base: ${testCase.base}) -> ${testCase.result}`, () => {
        expect(WorkingTimeHelper.fromHoursToFraction(testCase.hours, testCase.base)).to.eql(
          testCase.result
        );
      });
    });
  });

  describe("fromFractionToHours", () => {
    const testCases = [
      { fraction: "1/1", base: 168, result: 168 },
      { fraction: "1/2", base: 168, result: 84 },
      { fraction: "1/3", base: 168, result: 56 },
      { fraction: "1/4", base: 170, result: 43 },
      { fraction: "1/5", base: 163, result: 33 },
      { fraction: "3/4", base: 168, result: 126 },
    ];

    testCases.forEach((testCase) => {
      it(`translates (fraction: ${testCase.fraction}, base: ${testCase.base}) -> ${testCase.result}`, () => {
        expect(WorkingTimeHelper.fromFractionToHours(testCase.fraction, testCase.base)).to.eql(
          testCase.result
        );
      });
    });
  });

  describe("findIdOfClosestFrom", () => {
    const testCases = [
      { search: 0.5, from: [0.1, 0.2, 0.7, 2.0], id: 2 },
      { search: 0.3435432, from: [0.1, 0.2, 0.43215, 0.7, 2.0, 0.313124], id: 5 },
      { search: 10, from: [1, 2, 234, 5, 15], id: 3 },
    ];

    testCases.forEach((testCase) => {
      it(`finds id (search: ${testCase.search}, from: ${testCase.from}) -> ${testCase.id}`, () => {
        expect(WorkingTimeHelper.findIdOfClosestFrom(testCase.search, testCase.from)).to.eql(
          testCase.id
        );
      });
    });
  });
});
