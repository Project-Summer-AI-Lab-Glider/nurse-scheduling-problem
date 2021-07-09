/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ScheduleDataActionCreator } from "../../../state/schedule-data/schedule-data.action-creator";
import { Button } from "../../buttons/button-component/button.component";
import DefaultModal from "../modal.component";
import { t } from "../../../helpers/translations.helper";
import { getPresentSchedule } from "../../../state/schedule-data/selectors";

export interface SaveChangesModalOptions {
  setOpen: (open: boolean) => void;
  open: boolean;
  handleSave: () => void;
  closeOptions: (editMode: boolean) => void;
}

export default function SaveChangesModal(options: SaveChangesModalOptions): JSX.Element {
  const { open, setOpen, handleSave, closeOptions } = options;
  const title = t("unsavedChanges");
  const persistent = useSelector(getPresentSchedule);

  const dispatch = useDispatch();
  const fetchPrevScheduleVersion = (): void => {
    dispatch(ScheduleDataActionCreator.setScheduleStateAndSaveToDb(persistent));
  };

  function handleClose(): void {
    setOpen(false);
    closeOptions(false);
  }

  function onSaveClick(): void {
    handleSave();
    handleClose();
  }

  function onNoSaveClick(): void {
    fetchPrevScheduleVersion();
    handleClose();
  }

  const body = <span>{t("wantToSave")}</span>;

  const footer = (
    <>
      <Link to="/">
        <Button
          variant="primary"
          onClick={onSaveClick}
          data-cy="bt-leave-edit-save-yes"
          marginString="5px 10px 5px 0px"
        >
          {t("yes")}
        </Button>
      </Link>

      <Link to="/">
        <Button
          variant="secondary"
          color="secondary"
          onClick={onNoSaveClick}
          data-cy="bt-leave-edit-save-no"
          marginString="5px 10px 5px 0px"
        >
          {t("no")}
        </Button>
      </Link>
    </>
  );

  return (
    <DefaultModal
      open={open}
      setOpen={setOpen}
      title={title}
      body={body}
      footer={footer}
      closeOptions={handleClose}
    />
  );
}
