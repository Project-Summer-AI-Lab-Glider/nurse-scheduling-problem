/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React, { useRef, useState } from "react";
import { ButtonVariant } from "../../common-components";
import * as S from "./dropdown.styled";

export interface ButtonData {
  label: string;
  action: () => void;
  dataCy?: string;
}

interface DropdownOptions {
  buttons: ButtonData[];
  mainLabel: string;
  buttonVariant?: ButtonVariant;
  width: number;
  dataCy?: string;
  disabled?: boolean;
}

export function DropdownButtons({
  buttons,
  mainLabel,
  buttonVariant,
  width,
  dataCy,
  disabled = false,
}: DropdownOptions): JSX.Element {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

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
            {buttons.map((item) => (
              <S.DropdownButton
                key={item.label}
                onClick={(): void => {
                  item.action();
                  setOpen(false);
                }}
                data-cy={item.dataCy}
              >
                {item.label}
              </S.DropdownButton>
            ))}
          </S.ButtonListWrapper>
        </ClickAwayListener>
      </Popper>
    </S.Wrapper>
  );
}
