/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import _ from "lodash";
import * as S from "./worker-info.styled";
import { colors } from "../../../../assets/css-consts";
import { ContractTypeHelper } from "../../../../helpers/contract-type.helper";
import { StringHelper } from "../../../../helpers/string.helper";
import { WorkerTypeHelper } from "../../../../helpers/worker-type.helper";
import { useWorkerHoursInfo } from "../../../../hooks/use-worker-hours-info";
import { useWorkerInfo, WorkerInfo } from "../../../../hooks/use-worker-info";
import { WorkerName } from "../../../../state/schedule-data/schedule-sensitive-data.model";
import { WorkerType } from "../../../../state/schedule-data/worker-info/worker-info.model";
import WorkersCalendar from "../../../workers-calendar/workers-calendar.component";
import { exportToXlsx } from "./export-to-xlsx";
import { useMonthInfo } from "../../../../hooks/use-month-info";
import { ShiftCode } from "../../../../state/schedule-data/shifts-types/shift-types.model";
import { WorkerHourInfoSummary } from "../../../../logic/schedule-logic/worker-hours-info.logic";

interface WorkerInfoComponentOptions {
  workerName: WorkerName;
}

export function WorkerInfoComponent({ workerName }: WorkerInfoComponentOptions): JSX.Element {
  const { workerInfo } = useWorkerInfo(workerName);
  const workerHoursInfo = useWorkerHoursInfo(workerName);
  const workerInfoExport = "worker-info-export";
  const calendarExport = "calendar-export";
  const { verboseDates } = useMonthInfo();

  const handleExportAsXlsx = (
    workerInfoForXlsx: WorkerInfo,
    workerHoursInfoForXlsx: WorkerHourInfoSummary,
    workerShifts: ShiftCode[]
  ): void => {
    const infoSection = {
      contractType: ContractTypeHelper.translate(workerInfoForXlsx.contractType),
      workerHourNorm: workerHoursInfoForXlsx.workerHourNorm,
      overTime: workerHoursInfoForXlsx.overTime,
      workerTime: workerHoursInfoForXlsx.workerTime,
    };
    const shiftsArr = _.zip(verboseDates, workerShifts);
    exportToXlsx(workerInfoForXlsx.workerName, infoSection, shiftsArr);
  };

  const workerLabelColor =
    workerInfo.workerType === WorkerType.NURSE ? colors.nurseColor : colors.babysitterColor;
  return (
    <>
      <div id={workerInfoExport}>
        <S.WorkerNameLabel>{StringHelper.capitalizeEach(workerInfo.workerName)}</S.WorkerNameLabel>
        {workerInfo.workerType && (
          <S.WorkerTypeLabel color={workerLabelColor}>
            {StringHelper.capitalize(WorkerTypeHelper.translate(workerInfo.workerType))}
          </S.WorkerTypeLabel>
        )}
        <div>
          {workerInfo.contractType && (
            <S.WorkerInfo>
              Typ umowy: {ContractTypeHelper.translate(workerInfo.contractType)}
            </S.WorkerInfo>
          )}
          <S.WorkerInfo>Liczba godzin: {workerHoursInfo.workerHourNorm}</S.WorkerInfo>
          <S.WorkerInfo>Liczba nadgodzin: {workerHoursInfo.overTime}</S.WorkerInfo>
          <S.WorkerInfo>Suma godzin: {workerHoursInfo.workerTime}</S.WorkerInfo>
          <S.CalendarDivider data-html2canvas-ignore="true" />
          <S.ShiftsLabel id="shiftsWord">ZMIANY</S.ShiftsLabel>
        </div>
        <WorkersCalendar id={calendarExport} workerShifts={workerInfo.workerShifts} />
      </div>
      <S.DownloadButton
        variant="primary"
        onClick={(): void =>
          handleExportAsXlsx(workerInfo, workerHoursInfo, workerInfo.workerShifts)
        }
      >
        Pobierz
      </S.DownloadButton>
    </>
  );
}
