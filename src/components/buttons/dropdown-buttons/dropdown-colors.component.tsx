/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect, useRef, useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Popper from "@material-ui/core/Popper";
import * as S from "./dropdown.styled";
import { ButtonVariant } from "../../common-components";

interface DropdownColorsOptions {
  shiftType: string;
  mainLabel: string;
  buttonVariant?: ButtonVariant;
  dataCy?: string;
  disabled?: boolean;
  colorClicker: (event: string) => void;
  selectedColor: string;
  width: number;
}

export function DropdownColors({
  shiftType,
  mainLabel,
  buttonVariant,
  dataCy,
  disabled = false,
  colorClicker,
  selectedColor,
  width,
}: DropdownColorsOptions): JSX.Element {
  useEffect(() => {
    setLocalColor(selectedColor);
  }, [selectedColor]);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const worksShiftsColors = [
    "FFD100",
    "73B471",
    "00A3FF",
    "1D3557",
    "641EAA",
    "FF77D9",
    "FFF849",
    "33FF00",
    "79E7FF",
    "FF003D",
    "B770FF",
    "FF00B8",
  ];
  const notWorksShiftsColors = ["FF8A00", "C60000", "000000", "D7D8DF", "C3A000", "007F87"];

  const [colorPicked, setLocalColor] = useState(selectedColor);

  function getChunckedColors(colorArrays: string[], chunkLen: number): string[][] {
    const result: string[][] = [];
    let i;
    let j;

    for (i = 0, j = colorArrays.length; i < j; i += chunkLen) {
      result.push(colorArrays.slice(i, i + chunkLen));
    }
    return result;
  }

  function handleToggle(): void {
    setOpen((prevVal) => !prevVal);
  }

  function handleClickAway(): void {
    setOpen(false);
  }

  const dropdownZIndex = 100;
  return (
    <S.Wrapper>
      <S.PlaceholderButton
        variant={buttonVariant}
        onClick={handleToggle}
        ref={anchorRef}
        data-cy={dataCy}
        disabled={disabled}
        style={
          {
            zIndex: open ? dropdownZIndex + 1 : "initial",
            "--width": width,
          } as React.CSSProperties
        }
      >
        <S.PlaceholderButtonContent>
          <S.ColorSample style={{ backgroundColor: `#${colorPicked}` }} />
          <span>{mainLabel}</span>
          <ArrowDropDownIcon />
        </S.PlaceholderButtonContent>
      </S.PlaceholderButton>
      <Popper
        data-cy="openedDropdown"
        open={open}
        placement="bottom"
        anchorEl={anchorRef.current}
        disablePortal
        style={{
          zIndex: dropdownZIndex,
          width: `${width}px`,
        }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <S.ButtonListWrapper>
            <S.ColorSampleWrapper>
              {getChunckedColors(
                shiftType === "working" ? worksShiftsColors : notWorksShiftsColors,
                6
              ).map((colorRow) => (
                <S.ColorSampleRow>
                  {colorRow.map((color) => (
                    <S.ColorSample
                      onClick={(): void => {
                        colorClicker(color);
                        setLocalColor(color);
                        handleClickAway();
                      }}
                      style={{ backgroundColor: `#${color}` }}
                    />
                  ))}
                </S.ColorSampleRow>
              ))}
            </S.ColorSampleWrapper>
          </S.ButtonListWrapper>
        </ClickAwayListener>
      </Popper>
    </S.Wrapper>
  );
}
