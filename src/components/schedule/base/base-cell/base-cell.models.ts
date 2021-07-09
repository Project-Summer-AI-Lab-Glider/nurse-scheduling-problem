/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import {
  GroupedScheduleErrors,
  ScheduleError,
} from "../../../../state/schedule-data/schedule-errors/schedule-error.model";
import { CellInputOptions } from "./cell-blockable-input.component";
import { UseCellBackgroundHighlightOptions } from "../../hooks/use-cell-highlight";
import { UseCellSelectionOptions } from "../../hooks/use-cell-selection";

export type CellType = "cell" | "highlighted-cell";
export const baseCellDataCy = (index: number, cellType: CellType): string => `${index}-${cellType}`;
export const keepOnShiftClassName = (keepOn: boolean | undefined): string =>
  keepOn === undefined ? "keepOn" : `keepOn${keepOn}`;
export const hasNextShiftClassName = (hasNext: boolean | undefined): string =>
  hasNext === undefined ? "hasNext" : `hasNext${hasNext}`;
export const bottomCellPartClassName = (): string => "BottomCellPart";
export const leftBorderClassName = (): string => "leftBorder";

export enum CellManagementKeys {
  Enter = "Enter",
  Escape = "Escape",
}

export const PivotCellTypePrefix = "Cell";

export interface PivotCell {
  type: string;
  rowIndex: number;
  cellIndex: number;
}

export interface BaseCellOptions
  extends UseCellSelectionOptions,
    UseCellBackgroundHighlightOptions,
    Omit<CellInputOptions, "input" | "isVisible"> {
  rowIndex: number;
  value: string;
  isBlocked: boolean;
  isPointerOn: boolean;
  isSelected: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  errorSelector?: (scheduleErrors: GroupedScheduleErrors) => ScheduleError[];
}
