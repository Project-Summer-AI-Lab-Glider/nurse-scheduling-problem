/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ModeInfoActionCreator } from "../../../state/reducers/month-state/mode-info-reducer";
import { TEMPORARY_SCHEDULE_UNDOABLE_CONFIG } from "../../../state/reducers/month-state/schedule-data/schedule.actions";
import { UndoableHotkeys } from "../../common-components";
import { ScheduleContainerComponent } from "../schedule-container.component";
import { ScheduleMode } from "../table/schedule/schedule-state.model";
import { EditPageToolbar } from "./edit-page-toolbar.component";

interface ScheduleEditPageOptions {
  close: () => void;
}

export function ScheduleEditPage(options: ScheduleEditPageOptions): JSX.Element {
  const mode = useMemo(() => ScheduleMode.Edit, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = ModeInfoActionCreator.setMode(mode);
    dispatch(action);
  }, [dispatch, mode]);
  return (
    <>
      <UndoableHotkeys config={TEMPORARY_SCHEDULE_UNDOABLE_CONFIG} />
      <EditPageToolbar close={options.close} />
      <div className="schedule">
        <ScheduleContainerComponent mode={mode} />
      </div>
    </>
  );
}
