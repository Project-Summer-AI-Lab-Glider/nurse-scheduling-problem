/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { useAutocomplete } from "@material-ui/lab";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import { useSelector } from "react-redux";
import * as S from "./shift-autocomplete.styled";
import useTimeout from "../../../../hooks/use-timeout";
import { getPresentShiftTypes } from "../../../../state/schedule-data/selectors";
import {
  Shift,
  ShiftCode,
  ShiftTypesDict,
} from "../../../../state/schedule-data/shifts-types/shift-types.model";
import { BaseCellInputOptions } from "../../base/base-cell/base-cell-input.component";

const MODAL_CLOSE_MS = 4444;
interface ShiftCodeSelectItem {
  name: string;
  symbol: string;
  from: number;
  to: number;
  isWorkingShift?: boolean;
  code: string;
  color: string;
  "data-cy": `autocomplete-${keyof typeof ShiftCode}`;
}
const nameString = (shift: Shift): string => {
  let string = shift.name;
  if (shift.isWorkingShift) string += `(${shift.from}-${shift.to})`;
  return string;
};
const ShiftCodeSelectItems = (shifts: ShiftTypesDict): ShiftCodeSelectItem[] =>
  _.sortBy(
    Object.values(shifts).map((shift) => ({
      name: nameString(shift),
      symbol: shift.code,
      from: shift.from,
      to: shift.to,
      isWorkingShift: shift.isWorkingShift,
      code: shift.code,
      color: shift.color ? shift.color : "$white",
      "data-cy": `autocomplete-${shift.code}` as const,
    })),
    ["from", "to", "name"]
  );

/**
 * @description Input & MaterialAutocomplete component for rendering employees shifts
 * @param inputOptions : BaseCellInputOptions
 * @returns JSX.Element
 */

const getNonWorkingShifts = (
  shift: ShiftCodeSelectItem,
  shiftTypes: ShiftTypesDict
): ShiftCodeSelectItem | undefined => {
  if (shift.name.trim() !== shiftTypes[ShiftCode.W].name && !shift.isWorkingShift) {
    return shift;
  }
  return undefined;
};
const getWorkingShifts = (shift: ShiftCodeSelectItem): ShiftCodeSelectItem =>
  shift.isWorkingShift && shift;
export function ShiftAutocompleteComponent(inputOptions: BaseCellInputOptions): JSX.Element {
  const inputRef = useRef(null);
  const tooltipRef = useRef(null);
  const { styles, forceUpdate } = usePopper(inputRef.current, tooltipRef.current, {
    placement: "auto",
    strategy: "absolute",
  });
  const onValueChange = useCallback((option): void => inputOptions.onValueChange(option.code), [
    inputOptions,
  ]);
  const getOptionLabel = (option: ShiftCodeSelectItem): string => option.name;
  const getOptionColor = (option: ShiftCodeSelectItem): string => option.color;
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => inputOptions.onKeyDown(e);
  const [selectedShiftCode, setSelectedShiftCode] = useState<ShiftCodeSelectItem>();
  useEffect(() => {
    if (selectedShiftCode) {
      onValueChange(selectedShiftCode);
    }
  }, [selectedShiftCode, onValueChange]);

  const shiftTypes = useSelector(getPresentShiftTypes);
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: ShiftCodeSelectItems(shiftTypes),
    getOptionLabel,
    open: true,
  });

  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const { setIsCounting } = useTimeout(MODAL_CLOSE_MS, () => setIsComponentVisible(false));

  const nonWorkingShifts = groupedOptions.filter((shift) => getNonWorkingShifts(shift, shiftTypes));
  const workingShifts = groupedOptions.filter(getWorkingShifts);
  /**
   * @description Small element for rendering shift info & shift color circle
   * @returns JSX.Element
   */
  const LabelComponent = ({
    option,
    index,
  }: {
    option: ShiftCodeSelectItem;
    index: number;
  }): JSX.Element => (
    <div
      {...getOptionProps({ option, index })}
      data-cy={option["data-cy"]}
      onClick={(e: React.MouseEvent): void => {
        e.stopPropagation();
        setSelectedShiftCode(option);
      }}
    >
      <S.OptionLabel>{getOptionLabel(option)}</S.OptionLabel>
      <S.OptionColor style={{ backgroundColor: `#${getOptionColor(option)}` }} />
    </div>
  );
  const pageOffset: number | undefined = document.getElementById("root")?.children[0]?.children[0]
    ?.scrollTop;
  return (
    <div
      ref={inputRef}
      data-cy="shiftDropdown"
      style={{ display: isComponentVisible ? "initial" : "none" }}
      onWheel={(e: React.WheelEvent<HTMLTableCellElement>): void => {
        pageOffset !== document.getElementById("root")?.children[0]?.children[0]?.scrollTop &&
          setIsComponentVisible(false);
      }}
      onMouseEnter={(): void => {
        setIsCounting(false);
      }}
      onMouseLeave={(): void => {
        setIsCounting(true);
      }}
    >
      <div {...getRootProps()}>
        <input
          autoFocus
          value={selectedShiftCode && getOptionLabel(selectedShiftCode)}
          {...getInputProps()}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
            forceUpdate?.();
            onKeyDown?.(e);
          }}
        />
      </div>
      {shiftTypes && groupedOptions.length > 0 && (
        <S.ListBox
          ref={tooltipRef}
          style={styles.popper}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onMouseDown={(getListboxProps() as any).onMouseDown}
        >
          {groupedOptions.map((option, index) => {
            if (option.name.trim() === shiftTypes[ShiftCode.W].name) {
              return (
                <LabelComponent option={option} index={index} key={option.name + option.symbol} />
              );
            }
            return null;
          })}
          {workingShifts.map((option, index) => (
            <LabelComponent option={option} index={index} key={option.name + option.symbol} />
          ))}
          {nonWorkingShifts.length > 0 && workingShifts.length > 0 && <S.AutoSeparator />}
          {nonWorkingShifts.map((option, index) => (
            <LabelComponent option={option} index={index} key={option.name + option.symbol} />
          ))}
        </S.ListBox>
      )}
    </div>
  );
}
