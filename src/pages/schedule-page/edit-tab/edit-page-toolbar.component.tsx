/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import * as _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styled";
import backend from "../../../api/backend";
import {
  NetworkErrorCode,
  ScheduleError,
} from "../../../state/schedule-data/schedule-errors/schedule-error.model";
import { ActionModel } from "../../../utils/action.model";
import { ApplicationStateModel } from "../../../state/application-state.model";
import { TEMPORARY_SCHEDULE_UNDOABLE_CONFIG } from "../../../state/schedule-data/schedule.actions";
import { ScheduleErrorActionType } from "../../../state/schedule-data/schedule-errors/schedule-errors.reducer";
import { UndoActionCreator } from "../../../state/schedule-data/undoable.action-creator";
import { Button } from "../../../components/common-components";
import ConditionalLink from "../../../components/common-components/conditional-link/conditional-link.component";
import { usePersistentDrawer } from "../../../components/drawers/drawer/persistent-drawer-context";
import SaveChangesModal from "../../../components/modals/save-changes-modal/save-changes-modal.component";
import { useNotification } from "../../../components/notification/notification.context";
import ErrorContainerDrawerComponent from "../../../components/drawers/error-container-drawer/error-container-drawer.component";
import { useTemporarySchedule } from "../../../hooks/use-temporary-schedule";
import { colors, fontSizeBase, fontSizeXl } from "../../../assets/colors";

interface EditPageToolbarOptions {
  close: () => void;
}

export function EditPageToolbar({ close }: EditPageToolbarOptions): JSX.Element {
  const schedule = useSelector(
    (state: ApplicationStateModel) => state.actualState.temporarySchedule.present
  );

  const { primaryRevision } = useSelector((app: ApplicationStateModel) => app.actualState);
  const { createNotification } = useNotification();
  const dispatcher = useDispatch();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { shifts: persistentShifts } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present
  );
  const { shifts: temporaryShifts } = useSelector(
    (state: ApplicationStateModel) => state.actualState.temporarySchedule.present
  );
  const [undoCounter, setUndoCounter] = useState(0);

  async function updateScheduleErrors(): Promise<void> {
    if (schedule) {
      let response: ScheduleError[];
      try {
        response = await backend.getErrors(schedule, primaryRevision);
      } catch (err) {
        response = [
          {
            kind: NetworkErrorCode.NETWORK_ERROR,
          },
        ];
      }
      dispatcher({
        type: ScheduleErrorActionType.UPDATE,
        payload: response,
      } as ActionModel<ScheduleError[]>);
    }
  }

  const { setTitle, setOpen, setChildrenComponent } = usePersistentDrawer();

  function prepareDrawer(): void {
    setChildrenComponent(<ErrorContainerDrawerComponent setOpen={setOpen} loadingErrors />);
    setTitle("Sprawdź plan");
    setOpen(true);
    updateScheduleErrors().then(() =>
      setChildrenComponent(
        <ErrorContainerDrawerComponent setOpen={setOpen} loadingErrors={false} />
      )
    );
  }

  const { saveToPersistent } = useTemporarySchedule();

  function handleSaveClick(): void {
    saveToPersistent();
    createNotification({ type: "success", message: "Plan został zapisany!" });
  }

  function askForSavingChanges(): void {
    if (anyChanges()) setIsSaveModalOpen(true);
    else close();
  }

  function anyChanges(): boolean {
    if (persistentShifts && temporaryShifts) return !_.isEqual(persistentShifts, temporaryShifts);
    return false;
  }

  function onUndoClick(): void {
    dispatcher(UndoActionCreator.undo(TEMPORARY_SCHEDULE_UNDOABLE_CONFIG));
    setUndoCounter(undoCounter + 1);
  }

  function onRedoClick(): void {
    dispatcher(UndoActionCreator.redo(TEMPORARY_SCHEDULE_UNDOABLE_CONFIG));
    setUndoCounter(undoCounter - 1);
  }

  return (
    <Wrapper>
      <Button onClick={onUndoClick} variant="circle" data-cy="undo-button" disabled={!anyChanges()}>
        <UndoIcon />
      </Button>

      <Button
        onClick={onRedoClick}
        data-cy="redo-button"
        variant="circle"
        disabled={undoCounter === 0}
      >
        <RedoIcon />
      </Button>

      <EditTextWrapper data-cy="edit-mode-text">Tryb edycji aktywny</EditTextWrapper>

      <Button data-cy="check-schedule-button" variant="primary" onClick={prepareDrawer}>
        Sprawdź Plan
      </Button>

      <Filler />

      <ConditionalLink to="/" shouldNavigate={!anyChanges()}>
        <Button onClick={askForSavingChanges} variant="secondary" data-cy="leave-edit-mode">
          Wyjdź
        </Button>
        <SaveChangesModal
          closeOptions={close}
          handleSave={handleSaveClick}
          open={isSaveModalOpen}
          setOpen={setIsSaveModalOpen}
        />
      </ConditionalLink>

      <Button
        data-cy="save-schedule-button"
        variant="primary"
        disabled={!anyChanges()}
        onClick={(): void => {
          handleSaveClick();
        }}
      >
        Zapisz
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 5px;
`;

const undoRedoIcon = css`
  color: ${colors.primary};
  font-size: ${fontSizeXl};
  margin: auto 10px auto 10px;
`;

const UndoIcon = styled(ArrowBackIcon)`
  ${undoRedoIcon}
`;
const RedoIcon = styled(ArrowForwardIcon)`
  ${undoRedoIcon}
`;
const Filler = styled.div`
  flex-grow: 1;
`;
const EditTextWrapper = styled.p`
  color: ${colors.primary};
  font-size: ${fontSizeBase};
  margin: auto;
`;
