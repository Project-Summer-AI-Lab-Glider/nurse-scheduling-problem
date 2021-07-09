/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import i18next from "i18next";
import React from "react";
import {
  ScheduleErrorMessageModel,
  ScheduleErrorType,
} from "../../state/schedule-data/schedule-errors/schedule-error-message.model";
import { FoldingSection } from "../common-components";
import ErrorListItem from "./error-list-item.component";

interface Options {
  errors?: ScheduleErrorMessageModel[];
}

interface ErrorTypes {
  errorType: ScheduleErrorType;
  errors?: ScheduleErrorMessageModel[];
  errorDescription: string;
}

export default function ErrorList({ errors = [] }: Options): JSX.Element {
  const errorObjects: Array<ErrorTypes> = [
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.AON),
      errorDescription: i18next.t("noNurses"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.WND),
      errorDescription: i18next.t("notEnoughWorkersDuringDay"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.WNN),
      errorDescription: i18next.t("notEnoughWorkersDuringNight"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.DSS),
      errorDescription: i18next.t("requiredBreakViolation"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.LLB),
      errorDescription: i18next.t("noRequiredBreak"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.WUH),
      errorDescription: i18next.t("underHours"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.WOH),
      errorDescription: i18next.t("overtime"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.ILLEGAL_SHIFT_VALUE),
      errorDescription: i18next.t("illegalScheduleValue"),
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.WTC),
      errorDescription: "Pracownicy z różnych zespołów na wspólnej zmianie",
    },
    {
      errorType: ScheduleErrorType.AON,
      errors: errors.filter((e) => e.type === ScheduleErrorType.OTH),
      errorDescription: i18next.t("otherErrors"),
    },
  ];

  function compareErrors(a: ScheduleErrorMessageModel, b: ScheduleErrorMessageModel): number {
    if (typeof a.day !== "undefined" && typeof b.day !== "undefined") {
      return a.day - b.day;
    }
    return 0;
  }

  const renderOneTypeOfErrors = (errorData: ErrorTypes): JSX.Element => {
    if (errorData.errors && errorData.errors.length > 0) {
      const sortedErrors = [...errorData.errors];
      sortedErrors.sort(compareErrors);

      return (
        <FoldingSection name={`${errorData.errorDescription} (${errorData.errors.length})`}>
          {sortedErrors.map(
            (error, index): JSX.Element => (
              <ErrorListItem
                key={`${error.kind ? error.kind : "0"}_${index}`}
                error={error}
                index={index}
                interactable
              />
            )
          )}
        </FoldingSection>
      );
    }
    return <></>;
  };

  return (
    <>
      {errorObjects.map((errorObject) => (
        <React.Fragment key={errorObject.errorDescription + errorObject.errors?.length}>
          {renderOneTypeOfErrors(errorObject)}
        </React.Fragment>
      ))}
    </>
  );
}
