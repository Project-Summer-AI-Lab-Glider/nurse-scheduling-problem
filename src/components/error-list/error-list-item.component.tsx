/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { useDispatch } from "react-redux";
import * as S from "./styled";
import { colors } from "../../assets/colors";
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
          error.workers!.find((workerName) => workerName === worker.workerName) !== undefined;
        if (isInError) {
          message = insertTeam(message!, `${teamName}`, worker.workerName);
        }
      });
    });
  }

  return (
    <Wrapper>
      <RedBar />
      <div>
        {showTitle && (
          <Title>{error.title === "date" ? `${errorDay} ${monthName}` : `${error.title}`}</Title>
        )}
        <Message
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
    </Wrapper>
  );
}

// TODO: Simplify that
const Wrapper = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  text-align: left;
  border: 1px solid ${colors.errorListItemBorder};
  border-radius: 2px;
  margin-bottom: 5px;
  padding: 10px 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RedBar = styled.div`
  position: absolute;
  border-radius: 4px;
  width: 4.5px;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${colors.errorRed};
`;

const Title = styled.div`
  color: ${colors.errorDateText};
  size: 14px;
`;

const Message = styled.div`
  color: ${colors.primaryTextColor};
  size: 13px;
  text-align: justify;
  strong {
    letter-spacing: 1.5px;
    font-weight: bolder;
  }
`;
