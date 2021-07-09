/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { BaseCellInputOptions } from "./base-cell-input.component";

export enum CellManagementKeys {
  Enter = "Enter",
  Escape = "Escape",
}

export interface CellInputOptions {
  input: React.FC<BaseCellInputOptions>;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isVisible?: boolean;
}

export function CellInput({
  input: InputComponent,
  onValueChange,
  onKeyDown,
  isVisible = true,
}: CellInputOptions): JSX.Element {
  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === CellManagementKeys.Enter) {
      onValueChange?.(e.currentTarget.value);
      return;
    }
    onKeyDown?.(e);
  }

  return (
    <>
      {isVisible && (
        <InputComponent
          onValueChange={(value): void => onValueChange?.(value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => handleInputKeyDown(e)}
        />
      )}
    </>
  );
}
