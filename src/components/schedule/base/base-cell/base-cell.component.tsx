/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import classNames from "classnames/bind";
import React from "react";
import * as S from "./base-cell.styled";
import { ScheduleError } from "../../../../state/schedule-data/schedule-errors/schedule-error.model";
import { useCellBackgroundHighlight } from "../../hooks/use-cell-highlight";
import { useCellSelection } from "../../hooks/use-cell-selection";
import { BaseCellInputComponent } from "./base-cell-input.component";
import { baseCellDataCy, BaseCellOptions } from "./base-cell.models";
import { CellInput } from "./cell-blockable-input.component";

export function BaseCellComponent(options: BaseCellOptions): JSX.Element {
  const {
    cellIndex,
    value,
    isBlocked,
    isSelected,
    isPointerOn,
    onClick,
    onBlur,
    errorSelector = (): ScheduleError[] => [],
  } = options;

  const selectableItemRef = useCellSelection(options);
  const backgroundHighlight = useCellBackgroundHighlight(options);

  const showInput = isPointerOn && !isBlocked;
  //  #region view
  return (
    <S.Wrapper
      ref={selectableItemRef}
      className={classNames(backgroundHighlight, { selection: isSelected, blocked: isBlocked })}
      onBlur={onBlur}
    >
      <S.Popper errorSelector={errorSelector} showTooltip={!showInput}>
        <S.ContentWrapper
          onClick={(): void => {
            if (!isBlocked) onClick?.();
          }}
        >
          <CellInput input={BaseCellInputComponent} {...options} isVisible={showInput} />

          {!showInput && (
            <S.CellWrapper>
              <S.CellValue data-cy={baseCellDataCy(cellIndex, "cell")}>{value}</S.CellValue>
            </S.CellWrapper>
          )}
        </S.ContentWrapper>
      </S.Popper>
    </S.Wrapper>
  );
  // #endregion
}
