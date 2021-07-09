/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import * as S from "./base-cell-input.styled";
import { CellManagementKeys } from "./cell-blockable-input.component";

export interface BaseCellInputOptions {
  onValueChange: (value: string) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function BaseCellInputComponent({
  onValueChange,
  onKeyDown,
}: BaseCellInputOptions): JSX.Element {
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === CellManagementKeys.Enter) {
      onValueChange(e.currentTarget.value);
      return;
    }
    onKeyDown(e);
  }

  return (
    <S.Input
      autoFocus
      onKeyDown={handleKeyDown}
      onBlur={(e): void => {
        !!e.currentTarget.value && onValueChange(e.currentTarget.value);
      }}
    />
  );
}
