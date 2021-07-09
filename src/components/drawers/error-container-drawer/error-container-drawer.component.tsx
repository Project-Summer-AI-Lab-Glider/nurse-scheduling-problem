/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScheduleErrorMessageModel } from "../../../state/schedule-data/schedule-errors/schedule-error-message.model";
import ErrorLoader from "./loading-errors-view.component";
import { NetworkErrorCode } from "../../../state/schedule-data/schedule-errors/schedule-error.model";
import { ErrorMessageHelper } from "../../../helpers/error-message.helper";
import { getPresentShiftTypes, getScheduleErrors } from "../../../state/schedule-data/selectors";

export interface ErrorContainerDrawerComponentOptions {
  setOpen: (boolean) => void;
  loadingErrors?: boolean;
}

export enum ErrorLoaderState {
  CHECKING = "CHECKING",
  NOERRORS = "NOERRORS",
  ERRORS = "ERRORS",
}

export interface ErrorContainerDrawerComponentState {
  state: ErrorLoaderState;
}

export type Props = ErrorContainerDrawerComponentState;

export default function ErrorContainerDrawerComponent(
  options: ErrorContainerDrawerComponentOptions
): JSX.Element {
  const [mappedErrors, setMappedErrors] = useState<ScheduleErrorMessageModel[]>();
  const [loadingState, setLoadingState] = useState<Props>();
  const [isNetworkError, setIsNetworkError] = useState(false);
  const scheduleErrors = useSelector(getScheduleErrors);
  const { setOpen, loadingErrors } = options;
  const shiftTypes = useSelector(getPresentShiftTypes);

  useEffect(() => {
    const spinner = {
      state: ErrorLoaderState.CHECKING,
    };
    const errorsFound = {
      state: ErrorLoaderState.ERRORS,
    };
    const noErrors = {
      state: ErrorLoaderState.NOERRORS,
    };
    if (scheduleErrors[NetworkErrorCode.NETWORK_ERROR]) {
      setIsNetworkError(true);
    } else {
      setIsNetworkError(false);
    }
    if (loadingErrors) {
      setLoadingState(spinner);
    } else if (Object.keys(scheduleErrors).length > 0) {
      const errors = ErrorMessageHelper.mapScheduleErrors(scheduleErrors, shiftTypes);
      if (errors.length > 0) {
        setMappedErrors(errors);
        setLoadingState(errorsFound);
      } else {
        setLoadingState(spinner);
      }
    } else {
      setLoadingState(noErrors);
    }
  }, [scheduleErrors, loadingErrors, shiftTypes]);

  return (
    <ErrorLoader
      state={loadingState}
      errors={mappedErrors}
      isNetworkError={isNetworkError}
      setOpen={setOpen}
    />
  );
}
