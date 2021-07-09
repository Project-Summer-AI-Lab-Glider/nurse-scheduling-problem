/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as S from "./schedule-read-only.styled";
import { UndoableHotkeys } from "../../../components/common-components";
import { ScheduleMode } from "../../../components/schedule/schedule-state.model";
import { setMode } from "../../../state/app-condition/mode-info-reducer";
import { PERSISTENT_SCHEDULE_UNDOABLE_CONFIG } from "../../../state/schedule-data/schedule.actions";
import { ScheduleContainerComponent } from "../schedule-container.component";
import { ReadOnlyToolbar } from "./read-only-toolbar";

interface ScheduleViewOnlyPageOptions {
  openEdit: () => void;
}

export function ScheduleReadOnlyPage(props: ScheduleViewOnlyPageOptions): JSX.Element {
  const mode = ScheduleMode.Readonly;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMode(mode));
  }, [dispatch, mode]);

  return (
    <>
      <UndoableHotkeys config={PERSISTENT_SCHEDULE_UNDOABLE_CONFIG} />
      <ReadOnlyToolbar openEdit={props.openEdit} />
      <S.ScheduleWrapper>
        <ScheduleContainerComponent mode={mode} />
      </S.ScheduleWrapper>
    </>
  );
}
