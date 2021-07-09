/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import { ScheduleKey } from "../../../../src/logic/data-access/persistance-store.model";
/* eslint-disable no-new */
describe("Schedule key validation", () => {
  const validYear = 2020;

  context("when creating ScheduleKey with invalid month", () => {
    it("throws an error", (): void => {
      const invalidMonth = validYear;
      const action = (): void => {
        new ScheduleKey(invalidMonth, validYear);
      };
      expect(action).to.throw();
    });
  });

  context("when creating ScheduleKey with valid month and year", () => {
    const validMonths = _.range(0, 12);
    it("does not throw", (): void => {
      validMonths.forEach((month) => {
        const action = (): void => {
          new ScheduleKey(month, validYear);
        };
        expect(action).to.not.throw();
      });
    });
  });
});
