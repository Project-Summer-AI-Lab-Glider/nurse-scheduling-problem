/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import * as S from "./schedule-edit.styled";
import { TEMPORARY_SCHEDULE_UNDOABLE_CONFIG } from "../../../state/schedule-data/schedule.actions";
import { UndoableHotkeys } from "../../../components/common-components";
import { ScheduleContainerComponent } from "../schedule-container.component";
import { ScheduleMode } from "../../../components/schedule/schedule-state.model";
import { EditPageToolbar } from "./edit-page-toolbar.component";
import { setMode } from "../../../state/app-condition/mode-info-reducer";

interface ScheduleEditPageOptions {
  close: () => void;
}

export function ScheduleEditPage(options: ScheduleEditPageOptions): JSX.Element {
  const mode = useMemo(() => ScheduleMode.Edit, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMode(mode));
  }, [dispatch, mode]);
  return (
    <>
      <UndoableHotkeys config={TEMPORARY_SCHEDULE_UNDOABLE_CONFIG} />
      <EditPageToolbar close={options.close} />
      <S.ScheduleWrapper>
        <ScheduleContainerComponent mode={mode} />
      </S.ScheduleWrapper>
    </>
  );
}
