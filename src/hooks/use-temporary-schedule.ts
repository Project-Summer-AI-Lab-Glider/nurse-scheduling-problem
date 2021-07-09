/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import { ScheduleDataModel } from "../state/schedule-data/schedule-data.model";
import { ScheduleDataActionCreator } from "../state/schedule-data/schedule-data.action-creator";
import { getPresentTemporarySchedule } from "../state/schedule-data/selectors";

export function useTemporarySchedule(): {
  temporarySchedule: ScheduleDataModel;
  saveToPersistent: () => void;
} {
  const dispatch = useDispatch();
  const temporarySchedule = useSelector(getPresentTemporarySchedule);

  const saveToPersistent = (): void => {
    dispatch(ScheduleDataActionCreator.setScheduleStateAndSaveToDb(temporarySchedule));
  };

  return {
    saveToPersistent,
    temporarySchedule: _.cloneDeep(temporarySchedule),
  };
}
