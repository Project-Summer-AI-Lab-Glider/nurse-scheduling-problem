/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./shifts-tab.styled";
import ShiftDrawerComponent from "../../../components/shifts-drawer/shift-drawer.component";
import { ParserHelper } from "../../../helpers/parser.helper";
import { ScheduleDataActionCreator } from "../../../state/schedule-data/schedule-data.action-creator";
import { Shift } from "../../../state/schedule-data/shifts-types/shift-types.model";
import { ShiftsActionCreator } from "../../../state/schedule-data/shifts-types/shifts.action-creator";
import { EnhancedTableHeaderComponent } from "./enhanced-table-header.component";
import { getPresentShiftTypes } from "../../../state/schedule-data/selectors";
import {
  NewShiftTemplate,
  ShiftEditComponentMode,
} from "../../../components/shifts-drawer/shift-edit-drawer.component";

export default function ShiftTab(): JSX.Element {
  const [open, setIsOpen] = useState(false);
  const [mode, setMode] = useState(ShiftEditComponentMode.ADD_NEW);
  const [selectedShift, setShift] = useState<Shift | NewShiftTemplate>({});
  const shiftData = useSelector(getPresentShiftTypes);

  function toggleOpen(shift: Shift | NewShiftTemplate, newMode: ShiftEditComponentMode): void {
    setShift(shift);
    setMode(newMode);
    setIsOpen(true);
  }

  function toggleClose(): void {
    setIsOpen(false);
  }
  const dispatcher = useDispatch();
  const handleChangeItem = (createdShift: Shift): void => {
    if (!ParserHelper.shiftPassesDayStart(createdShift)) {
      if (mode === ShiftEditComponentMode.ADD_NEW) {
        dispatcher(ScheduleDataActionCreator.addNewShift(createdShift));
      } else {
        dispatcher(ScheduleDataActionCreator.modifyShift(createdShift, selectedShift));
      }

      toggleClose();
    } else {
      throw Error("Shift cannot pass day start");
    }
  };

  const handleRemoveItem = (shift: Shift): void => {
    dispatcher(ScheduleDataActionCreator.deleteShift(shift));
    dispatcher(ShiftsActionCreator.deleteShift(shift));
  };

  return (
    <S.Wrapper>
      <S.TableContainer>
        <Table size="small">
          <EnhancedTableHeaderComponent toggleOpen={toggleOpen} />
          <TableBody>
            {Object.values(shiftData).map((shift) => (
              <TableRow key={shift.code}>
                <S.TableCell>{shift.name}</S.TableCell>
                <S.TableCell>
                  {shift.isWorkingShift ? `${shift.from}:00 ` : ""}-
                  {shift.isWorkingShift ? ` ${shift.to}:00` : ""}
                </S.TableCell>
                <S.TableCell>{shift.code}</S.TableCell>
                <S.TableCell>
                  <S.ColorSample color={shift.color} />
                </S.TableCell>
                <S.TableCell align="right">
                  <S.ActionButton
                    variant="primary"
                    onClick={(): void => toggleOpen(shift, ShiftEditComponentMode.EDIT)}
                    disabled
                  >
                    Edytuj
                  </S.ActionButton>
                  <S.ActionButton
                    variant="secondary"
                    onClick={(): void => handleRemoveItem(shift)}
                    disabled
                  >
                    Usuń
                  </S.ActionButton>
                </S.TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </S.TableContainer>
      <ShiftDrawerComponent
        open={open}
        onClose={(): void => toggleClose()}
        mode={mode}
        setOpen={setIsOpen}
        selectedShift={selectedShift}
        saveChangedShift={handleChangeItem}
      />
    </S.Wrapper>
  );
}
