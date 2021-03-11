/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import backend from "../../../api/backend";
import { NetworkErrorCode, ScheduleError } from "../../../common-models/schedule-error.model";
import { ActionModel } from "../../../state/models/action.model";
import { ScheduleErrorActionType } from "../../../state/reducers/month-state/schedule-errors.reducer";
import { Button } from "../../common-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { ScheduleLogicContext } from "../table/schedule/use-schedule-state";
import { UndoActionCreator } from "../../../state/reducers/undoable.action-creator";
import { TEMPORARY_SCHEDULE_UNDOABLE_CONFIG } from "../../../state/reducers/month-state/schedule-data/schedule.actions";
import { useNotification } from "../../common-components/notification/notification.context";
import { useJiraLikeDrawer } from "../../common-components/drawer/jira-like-drawer-context";
import ValidationDrawerContentComponent from "../validation-drawer/validation-drawer.component";
import SaveChangesModal from "../../common-components/modal/save-changes-modal/save-changes-modal.component";
import { ApplicationStateModel } from "../../../state/models/application-state.model";
import ConditionalLink from "../../common-components/conditional-link/conditional-link.component";

interface EditPageToolbarOptions {
  closeEdit: () => void;
}

export function EditPageToolbar({ closeEdit }: EditPageToolbarOptions): JSX.Element {
  const scheduleLogic = useContext(ScheduleLogicContext);
  const { createNotification } = useNotification();
  const dispatcher = useDispatch();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const { persistentSchedule } = useSelector((state: ApplicationStateModel) => state.actualState);
  const { temporarySchedule } = useSelector((state: ApplicationStateModel) => state.actualState);
  const persistent = persistentSchedule.past;
  const temporary = temporarySchedule.past;

  async function updateScheduleErrors(): Promise<void> {
    const schedule = scheduleLogic?.schedule.getDataModel();
    if (schedule) {
      let response: ScheduleError[];
      try {
        response = await backend.getErrors(schedule);
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

  const { setTitle, setOpen, setChildrenComponent } = useJiraLikeDrawer();

  function prepareDrawer(): void {
    setChildrenComponent(
      <ValidationDrawerContentComponent setOpen={setOpen} loadingErrors={true} />
    );
    setTitle("Sprawdź plan");
    setOpen(true);
    updateScheduleErrors().then(() =>
      setChildrenComponent(
        <ValidationDrawerContentComponent setOpen={setOpen} loadingErrors={false} />
      )
    );
  }

  function handleSaveClick(): void {
    scheduleLogic?.updateActualRevision();
    createNotification({ type: "success", message: "Plan został zapisany!" });
  }

  function askForSavingChanges(): void {
    if (anyChanges()) setIsSaveModalOpen(true);
  }

  function anyChanges(): boolean {
    if (persistent[0].schedule_info && temporary[temporary.length - 1].schedule_info)
      return persistent[0].schedule_info !== temporary[temporary.length - 1].schedule_info;
    else return false;
  }

  return (
    <div className="editing-row">
      <div className="buttons">
        <Button
          onClick={(): void => {
            dispatcher(UndoActionCreator.undo(TEMPORARY_SCHEDULE_UNDOABLE_CONFIG));
          }}
          variant="circle"
          data-cy="undo-button"
        >
          <ArrowBackIcon className="edit-icons" />
        </Button>

        <Button
          onClick={(): void => {
            dispatcher(UndoActionCreator.redo(TEMPORARY_SCHEDULE_UNDOABLE_CONFIG));
          }}
          data-cy="redo-button"
          variant="circle"
        >
          <ArrowForwardIcon className="edit-icons" />
        </Button>

        <div id="edit-panel-text-container">
          <p>Tryb edycji aktywny</p>
        </div>

        <Button
          data-cy="check-schedule-button"
          className="submit-button"
          variant="primary"
          onClick={prepareDrawer}
        >
          Sprawdź Plan
        </Button>

        <div className="filler" />

        <ConditionalLink to="/" condition={!anyChanges()}>
          <Button onClick={askForSavingChanges} variant="secondary" data-cy="leave-edit-mode">
            Wyjdź
          </Button>
          <SaveChangesModal
            closeOptions={closeEdit}
            handleSave={handleSaveClick}
            open={isSaveModalOpen}
            setOpen={setIsSaveModalOpen}
          />
        </ConditionalLink>

        <Button
          data-cy="save-schedule-button"
          variant="primary"
          onClick={(): void => {
            handleSaveClick();
          }}
        >
          Zapisz
        </Button>
      </div>
    </div>
  );
}
