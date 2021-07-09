/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./loading-errors-view.styled";
import backend from "../../../api/backend";
import ok from "../../../assets/images/ok.svg";
import warning from "../../../assets/images/warning.svg";
import { ScheduleErrorMessageModel } from "../../../state/schedule-data/schedule-errors/schedule-error-message.model";
import {
  NetworkErrorCode,
  ScheduleError,
} from "../../../state/schedule-data/schedule-errors/schedule-error.model";
import ErrorList from "../../error-list/error-list.component";
import { ErrorLoaderState, Props } from "./error-container-drawer.component";
import { t } from "../../../helpers/translations.helper";
import {
  getPresentTemporarySchedule,
  getPrimaryRevision,
} from "../../../state/schedule-data/selectors";
import { updateScheduleErrors as updateScheduleErrorsInState } from "../../../state/schedule-data/schedule-errors/schedule-errors.reducer";

interface ErrorLoaderOptions {
  state?: Props;
  errors?: ScheduleErrorMessageModel[];
  isNetworkError?: boolean;
  setOpen: (boolean) => void;
}

export default function LoadingErrorsViewComponent(options: ErrorLoaderOptions): JSX.Element {
  const { setOpen, isNetworkError } = options;
  const [spinnerAgain, setSpinnerAgain] = useState(false);
  const primaryRevision = useSelector(getPrimaryRevision);

  const dispatcher = useDispatch();

  function closeDrawer(): void {
    setOpen(false);
  }

  const schedule = useSelector(getPresentTemporarySchedule);
  const reload = React.useCallback(() => {
    const checkScheduleForErrors = async (): Promise<void> => {
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
        dispatcher(updateScheduleErrorsInState(response));
      }
    };

    setSpinnerAgain(true);
    checkScheduleForErrors();
    setTimeout(() => setSpinnerAgain(false), 4000);
  }, [dispatcher, primaryRevision, schedule]);

  return (
    <>
      {(options.state?.state === ErrorLoaderState.CHECKING || spinnerAgain) && (
        <S.Wrapper>
          <S.Content>
            <S.Spinner />
            <S.ErrorLoadingText>Trwa sprawdzanie planu</S.ErrorLoadingText>
          </S.Content>
        </S.Wrapper>
      )}
      {isNetworkError && !spinnerAgain && options.state?.state !== ErrorLoaderState.CHECKING && (
        <S.Wrapper>
          <S.Content>
            <S.Image src={warning} alt="" />
            <S.ErrorLoadingText>Błąd podczas sprawdzania</S.ErrorLoadingText>
            <S.ErrorButton variant="primary" onClick={reload}>
              Spróbuj ponownie
            </S.ErrorButton>
          </S.Content>
        </S.Wrapper>
      )}
      {options.state?.state === ErrorLoaderState.ERRORS && !isNetworkError && (
        <>
          <S.Title>
            {t("errors")}: {options.errors?.length}
          </S.Title>
          <ErrorList errors={options.errors} />
        </>
      )}
      {options.state?.state === ErrorLoaderState.NOERRORS && (
        <S.Wrapper>
          <S.Content>
            <S.Image src={ok} alt="" />
            <S.ErrorLoadingText>Plan nie zawiera błędów</S.ErrorLoadingText>
            <S.ErrorButton variant="primary" onClick={closeDrawer}>
              Wróć do planu
            </S.ErrorButton>
          </S.Content>
        </S.Wrapper>
      )}
    </>
  );
}
