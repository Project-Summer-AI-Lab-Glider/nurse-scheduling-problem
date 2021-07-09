/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import classNames from "classnames/bind";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import mergeRefs from "react-merge-refs";
import useComponentVisible from "../../../../../hooks/use-component-visible";
import useTimeout from "../../../../../hooks/use-timeout";
import { ShiftCode } from "../../../../../state/schedule-data/shifts-types/shift-types.model";
import { BaseCellOptions } from "../../../base/base-cell/base-cell.models";
import { useCellBackgroundHighlight } from "../../../hooks/use-cell-highlight";
import { useCellSelection } from "../../../hooks/use-cell-selection";
import { CellWrapper } from "./shift-cell.styled";
import { MouseEventListener } from "../../../../common-components/mouse-event-listener/mouse-event-listener";
import { ShiftCellContent } from "./shift-cell-content.component";
import { ShiftsCellDropdown } from "./shifts-cell-dropdown.component";

const MODAL_CLOSE_MS = 4444;
export const DEFAULT_SHIFT_HEX = "FFD100";

export function getShiftCode(value: string): ShiftCode {
  return ShiftCode[value] || ShiftCode.W;
}

export interface ShiftCellOptions extends BaseCellOptions {
  keepOn?: boolean;
  workerName?: string;
}

/**
 * @description Function component that creates cell containing
 * Autocomplete when App is in edit mode
 */
export function ShiftCellComponentF(options: ShiftCellOptions): JSX.Element {
  const { value, isBlocked, isSelected, isPointerOn, onBlur } = options;

  const shiftCode = getShiftCode(value);
  const selectableItemRef = useCellSelection(options);
  const backgroundHighlight = useCellBackgroundHighlight(options);

  const [isInputVisible, setIsInputVisible] = useState(isPointerOn && !isBlocked);
  useEffect(() => {
    setIsInputVisible(isPointerOn && !isBlocked);
  }, [isPointerOn, isBlocked]);

  const { componentContainer, isComponentVisible, setIsComponentVisible } = useComponentVisible(
    false
  );
  const { setIsCounting } = useTimeout(MODAL_CLOSE_MS, () => setIsComponentVisible(false));

  function startPopperCloseTimer() {
    setIsCounting(true);
  }
  function resetPopperCloseTimer() {
    setIsCounting(false);
  }
  function toggleComponentVisibility(): void {
    setIsComponentVisible(!isComponentVisible);
  }

  return (
    <>
      {isInputVisible && (
        <MouseEventListener
          onClick={() => setIsComponentVisible(false)}
          onWheel={() => setIsInputVisible(false)}
        />
      )}
      <CellWrapper
        ref={mergeRefs([selectableItemRef, componentContainer])}
        className={classNames(backgroundHighlight, {
          selection: isSelected || (isComponentVisible && isBlocked), // should be so????
          blocked: isBlocked,
        })}
        onClick={toggleComponentVisibility}
        onMouseEnter={resetPopperCloseTimer}
        onMouseLeave={startPopperCloseTimer}
        onBlur={onBlur}
      >
        {isInputVisible ? (
          <ShiftsCellDropdown {...options} />
        ) : (
          <ShiftCellContent {...options} shiftCode={shiftCode} />
        )}
        )
      </CellWrapper>
    </>
  );
}

export const ShiftCellComponent = React.memo(
  ShiftCellComponentF,
  (prev, next) =>
    prev.value === next.value &&
    prev.isPointerOn === next.isPointerOn &&
    prev.isSelected === next.isSelected &&
    prev.isBlocked === next.isBlocked &&
    prev.keepOn === next.keepOn &&
    _.isEqual(prev.verboseDate, next.verboseDate)
);
