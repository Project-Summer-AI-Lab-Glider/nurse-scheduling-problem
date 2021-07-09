/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import React, { useMemo } from "react";
import * as S from "./worker.styled";

export interface FormFieldErrorLabelOptions {
  shouldBeVisible: boolean;
  message: string;
}

export function FormFieldErrorLabel({
  shouldBeVisible: condition,
  message,
}: FormFieldErrorLabelOptions): JSX.Element {
  return (
    <>
      <Grid item xs={12}>
        <S.ErrorLabel>{condition && message}</S.ErrorLabel>
      </Grid>
    </>
  );
}

interface FormFieldErrorLabelStackOptions {
  errorLabels: FormFieldErrorLabelOptions[];
}

export function FormFieldErrorLabelStack({
  errorLabels,
}: FormFieldErrorLabelStackOptions): JSX.Element {
  const emptyErrorField = useMemo(
    () => <FormFieldErrorLabel shouldBeVisible={false} message="" />,
    []
  );
  return (
    <>
      {!errorLabels.some((e) => e.shouldBeVisible)
        ? emptyErrorField
        : errorLabels
            .filter((e) => e.shouldBeVisible)
            .map((e, index) => <FormFieldErrorLabel key={`${e.message}_${index}`} {...e} />)}
    </>
  );
}
