/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as Sentry from "@sentry/react";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { usePersistentDrawer } from "../../components/drawers/drawer/persistent-drawer-context";
import AppErrorModal from "../../components/modals/app-error-modal/app-error.modal.component";
import { setScheduleCorrupted } from "../../state/schedule-data/schedule-condition/corrupted-info.reducer";
import { getPresentScheduleIsCorrupted } from "../../state/schedule-data/selectors";
import { CorruptedScheduleComponent } from "./corrupted-month-tab/corrupted-schedule.component";
import { ScheduleEditPage } from "./edit-tab/schedule-edit.page";
import { ScheduleReadOnlyPage } from "./read-only-tab/schedule-read-only.page";
import * as S from "./schedule-page.styled";

interface SchedulePageOptions {
  editModeHandler: (editMode: boolean) => void;
}

export function SchedulePage({ editModeHandler }: SchedulePageOptions): JSX.Element {
  const { setOpen: setDrawerOpen } = usePersistentDrawer();
  const dispatch = useDispatch();

  const [isOpenAppError, setIsAppErrorOpen] = useState(false);
  const isCorrupted = useSelector(getPresentScheduleIsCorrupted);

  const fallback = useCallback(
    ({ resetError }): JSX.Element => (
      <AppErrorModal onClick={resetError} open={isOpenAppError} setOpen={setIsAppErrorOpen} />
    ),
    [isOpenAppError, setIsAppErrorOpen]
  );

  const onError = (): void => {
    setIsAppErrorOpen(true);
    dispatch(setScheduleCorrupted());
  };

  const ViewOnly = useCallback(
    (): JSX.Element => <ScheduleReadOnlyPage openEdit={(): void => editModeHandler(true)} />,
    [editModeHandler]
  );

  const Edit = useCallback((): JSX.Element => {
    function handleEditButton(): void {
      editModeHandler(false);
      setDrawerOpen(false);
    }
    return <ScheduleEditPage close={handleEditButton} />;
  }, [editModeHandler, setDrawerOpen]);

  return (
    <S.Wrapper>
      <Sentry.ErrorBoundary fallback={fallback} onError={onError}>
        {isCorrupted ? (
          <CorruptedScheduleComponent />
        ) : (
          <Switch>
            <Route path="/schedule-editing" component={Edit} />
            <Route path="/" component={ViewOnly} exact />
          </Switch>
        )}
      </Sentry.ErrorBoundary>
    </S.Wrapper>
  );
}
