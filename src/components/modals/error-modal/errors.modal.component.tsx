/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../common-components";
import { ScheduleErrorMessageModel } from "../../../state/schedule-data/schedule-errors/schedule-error-message.model";
import { ErrorMessageHelper } from "../../../helpers/error-message.helper";
import { ApplicationStateModel } from "../../../state/application-state.model";
import DefaultModal from "../modal.component";
import ModalErrorList from "./error.modal.list.component";
import { ScheduleDataActionCreator } from "../../../state/schedule-data/schedule-data.action-creator";
import { t } from "../../../helpers/translations.helper";

export interface ErrorsModalComponent {
  setOpen: (open: boolean) => void;
  open: boolean;
}

export default function ParseErrorModal(options: ErrorsModalComponent): JSX.Element {
  const { setOpen, open } = options;
  const { scheduleErrors } = useSelector((state: ApplicationStateModel) => state.actualState);
  const dispach = useDispatch();

  const handleClose = (): void => {
    setOpen(false);
    dispach(ScheduleDataActionCreator.cleanErrors());
  };
  const [mappedErrors, setMappedErrors] = useState<ScheduleErrorMessageModel[]>();

  const { shift_types: shiftTypes } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present
  );
  useEffect(() => {
    const errors = ErrorMessageHelper.mapScheduleErrors(scheduleErrors, shiftTypes);
    if (errors) {
      setMappedErrors(errors);
    }
  }, [scheduleErrors, shiftTypes]);

  const title = t("errorsWereEncounteredWhileLoadingFile");

  const footer = (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={handleClose} variant="primary">
        OK
      </Button>
    </div>
  );

  const body = <ModalErrorList errors={mappedErrors} />;

  return (
    <div>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        title={title}
        body={body}
        footer={footer}
        height={1400}
      />
    </div>
  );
}