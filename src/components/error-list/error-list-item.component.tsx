/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { useDispatch } from "react-redux";
import * as S from "./error-list-item.styled";
import { t, TranslationHelper } from "../../helpers/translations.helper";
import { useMonthInfo } from "../../hooks/use-month-info";
import { useTeams } from "../../hooks/use-teams";
import { VerboseDate } from "../../state/schedule-data/foundation-info/foundation-info.model";
import { ScheduleDataActionCreator } from "../../state/schedule-data/schedule-data.action-creator";
import {
  ScheduleErrorMessageModel,
  ScheduleErrorType,
} from "../../state/schedule-data/schedule-errors/schedule-error-message.model";
import { Button } from "../buttons/button-component/button.component";

interface Options {
  error: ScheduleErrorMessageModel;
  index: number;
  showTitle?: boolean;
  interactable?: boolean;
}

function prepareMonthName(index: number, day: number, month: number): string {
  let monthName = `${TranslationHelper.polishMonthsGenetivus[month]}`;

  if (index < day - 1) {
    monthName = `${TranslationHelper.polishMonthsGenetivus[(month + 11) % 12]}`;
  } else if (index > 20 && day < 8) {
    monthName = `${TranslationHelper.polishMonthsGenetivus[(month + 1) % 12]}`;
  }
  return monthName;
}

function insertTeam(a: string, b: string, at: string): string {
  let position = a.indexOf(at);
  if (position === -1) return a;
  let i = 1;
  while (a[position + at.length] !== "," && position < a.length) {
    position = a.split(at, i).join(at).length;
    i++;
  }
  position += at.length;
  return a[position] === ","
    ? `${a.substr(0, position)}</b> (${b}), <b>${a.substr(position + 2)}`
    : `${a.substr(0, a.indexOf("."))} (${b}).`;
}

export default function ErrorListItem({
  error,
  interactable = false,
  index,
  showTitle = true,
}: Options): JSX.Element {
  const { verboseDates, monthNumber } = useMonthInfo();
  const workersByTeam = useTeams();
  const mappedDays = verboseDates.map((d: VerboseDate) => d.date);
  let message = error.message;

  if (typeof error.day === "undefined" || typeof mappedDays === "undefined") {
    throw Error("Error undefined or mappedDays undefined");
  }
  error.index = index;
  const errorDayIndex = error.day;
  const errorDay = mappedDays[errorDayIndex];
  const monthName = prepareMonthName(errorDayIndex, errorDay, monthNumber);
  const dispatch = useDispatch();

  const handleShow = (e: ScheduleErrorMessageModel): void => {
    dispatch(ScheduleDataActionCreator.showError(e));
  };

  if (error.type === ScheduleErrorType.WTC) {
    Object.entries(workersByTeam).forEach(([teamName, workers]) => {
      workers.forEach((worker) => {
        const isInError =
          error.workers?.find((workerName) => workerName === worker.workerName) !== undefined;
        if (isInError) {
          message = insertTeam(message, `${teamName}`, worker.workerName);
        }
      });
    });
  }

  return (
    <S.Wrapper>
      <S.RedBar />
      <div>
        {showTitle && (
          <S.Title>
            {error.title === "date" ? `${errorDay} ${monthName}` : `${error.title}`}
          </S.Title>
        )}
        <S.Message
          className="error-text"
          data-cy="error-text"
          dangerouslySetInnerHTML={{ __html: error.message || "" }}
        />
      </div>
      {interactable && (
        <Button
          variant="primary"
          id="error-buttons"
          style={{ width: "90px", height: "40px", marginRight: "0px" }}
          onClick={(): void => handleShow(error)}
        >
          {t("show")}
        </Button>
      )}
    </S.Wrapper>
  );
}
