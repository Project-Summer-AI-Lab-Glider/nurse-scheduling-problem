/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";
import {
  validateFoundationInfo,
  FoundationInfoModel,
} from "../../../../src/state/schedule-data/foundation-info/foundation-info.model";
import {
  SCHEDULE_CONTAINERS_LENGTH,
  ScheduleContainerType,
} from "../../../../src/state/schedule-data/schedule-data.model";

describe("Month info validation", () => {
  // #region Helper functions
  const createFoundationInfoModel = (
    dayCount: number,
    childrenCount?: number,
    extraWorkersCount?: number
  ): FoundationInfoModel => ({
    dates: _.range(1, dayCount + 1),
    children_number: !_.isNil(childrenCount) ? _.range(1, childrenCount + 1) : undefined,
    extra_workers: !_.isNil(extraWorkersCount) ? _.range(1, extraWorkersCount) : undefined,
  });
  // #endregion

  context(
    "when length of dates in month info model is not allowed length for schedule data model",
    () => {
      const invalidScheduleLenghth = SCHEDULE_CONTAINERS_LENGTH.SCHEDULE_DM[0] + 1;
      const invalidScheduleModel = createFoundationInfoModel(invalidScheduleLenghth);
      const action = (): void =>
        validateFoundationInfo(invalidScheduleModel, ScheduleContainerType.SCHEDULE_DM);

      it("throws an error", () => {
        expect(action).to.throw();
      });
    }
  );

  context(
    "when length of dates in month info model is not allowed length for month data model",
    () => {
      const invalidMOnthDayCount = 32;
      const invalidMonthModel = createFoundationInfoModel(invalidMOnthDayCount);
      const action = (): void =>
        validateFoundationInfo(invalidMonthModel, ScheduleContainerType.MONTH_DM);

      it("throws an error", () => {
        expect(action).to.throw();
      });
    }
  );

  context("when dates have valid length and defined", () => {
    const validMonthDayCount = SCHEDULE_CONTAINERS_LENGTH.SCHEDULE_DM[0];
    const validMonthModel = createFoundationInfoModel(validMonthDayCount);
    const action = (): void =>
      validateFoundationInfo(validMonthModel, ScheduleContainerType.SCHEDULE_DM);

    it("does not throw an error", () => {
      expect(action).to.not.throw();
    });
  });

  context(
    "when length of children info is different than length of dates in schedule data model",
    () => {
      const validLength = SCHEDULE_CONTAINERS_LENGTH.SCHEDULE_DM[0];
      const invalidChildrenCount = validLength - 1;
      const invalidMonthInfoModel = createFoundationInfoModel(validLength, invalidChildrenCount);
      const action = (): void =>
        validateFoundationInfo(invalidMonthInfoModel, ScheduleContainerType.SCHEDULE_DM);

      it("throws an error", () => {
        expect(action).to.throw();
      });
    }
  );

  context(
    "when length of extra worker info is different than length of dates in schedule data model",
    () => {
      const validLength = SCHEDULE_CONTAINERS_LENGTH.SCHEDULE_DM[0];
      const invalidExtraWorkersCount = validLength - 1;
      const invalidMonthInfoModel = createFoundationInfoModel(
        validLength,
        validLength,
        invalidExtraWorkersCount
      );
      const action = (): void =>
        validateFoundationInfo(invalidMonthInfoModel, ScheduleContainerType.SCHEDULE_DM);

      it("throws an error", () => {
        expect(action).to.throw();
      });
    }
  );

  context("when month info is valid", () => {
    const validLength = SCHEDULE_CONTAINERS_LENGTH.SCHEDULE_DM[0];
    const invalidFoundationInfoModel = createFoundationInfoModel(
      validLength,
      validLength,
      validLength
    );
    const action = (): void =>
      validateFoundationInfo(invalidFoundationInfoModel, ScheduleContainerType.SCHEDULE_DM);

    it("does not throw an error", () => {
      expect(action).to.throw();
    });
  });
});
