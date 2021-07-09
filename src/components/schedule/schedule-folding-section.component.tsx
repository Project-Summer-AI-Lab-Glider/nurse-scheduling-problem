/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ReactNode, useState } from "react";
import * as S from "./schedule-folding-section.styled";

interface ScheduleFoldingSectionOptions {
  name: string;
  children: ReactNode;
}
/**
 * Used only in schedule. For other use cases, use @see FoldingSection from  @module common-components
 */
export function ScheduleFoldingSection({
  name,
  children,
}: ScheduleFoldingSectionOptions): JSX.Element {
  const [opened, setOpened] = useState(true);
  return (
    <>
      <S.SeparatorWrapper>
        <S.LabelWrapper onClick={(): void => setOpened((prev) => !prev)}>
          <span>{opened ? <ExpandMoreIcon /> : <ChevronRightIcon />}</span>
          <span>{name}</span>
        </S.LabelWrapper>
        <S.Separator />
      </S.SeparatorWrapper>
      <div style={{ display: opened ? "initial" : "none" }}>{children}</div>
    </>
  );
}
