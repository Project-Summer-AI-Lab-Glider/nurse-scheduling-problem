/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./new-schedule.styled";
import nurse from "../../../assets/images/nurse.png";
import { EmptyMonthButtons } from "../../../components/buttons/empty-month-buttons/empty-month-buttons";

export function NewScheduleComponent(): JSX.Element {
  return (
    <S.Wrapper>
      <S.Image src={nurse} alt="" />
      <S.Message>Nie masz planu na ten miesiąc</S.Message>
      <EmptyMonthButtons />
    </S.Wrapper>
  );
}
