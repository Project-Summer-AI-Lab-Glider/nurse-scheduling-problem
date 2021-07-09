/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { ReactNode, useState } from "react";
import * as S from "./folding-eection.styled";

interface FoldingSectionOptions {
  name: string;
  children: ReactNode;
}
/**
 * @description Function component which provides collapsing functionaliny for underlying children elements
 * @param name - section name
 * @param children - children elements
 * @returns JSX.Element
 */
export function FoldingSection({ name, children }: FoldingSectionOptions): JSX.Element {
  const [opened, setOpened] = useState(false);
  return (
    <S.Wrapper data-cy="folding-section">
      <S.SeparatorWrapper>
        <S.LabelWrapper
          onClick={(): void => setOpened((prev) => !prev)}
          data-cy="open-folding-section"
        >
          <span>{opened ? <ExpandMoreIcon /> : <ChevronRightIcon />}</span>
          <span>{name}</span>
        </S.LabelWrapper>
        <S.Separator />
      </S.SeparatorWrapper>
      <div style={{ display: opened ? "initial" : "none" }}>{children}</div>
    </S.Wrapper>
  );
}
