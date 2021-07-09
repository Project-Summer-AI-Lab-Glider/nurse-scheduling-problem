/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import Excel, { FillPattern } from "exceljs";
import { fromBuffer } from "file-type";
import { useCallback, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import {
  WORKERS_WORKSHEET_NAME,
  ParserHelper,
  SHIFTS_WORKSHEET_NAME,
  SHIFT_HEADERS,
  SCHEDULE_WORKSHEET_NAME,
} from "../../../../helpers/parser.helper";
import { cropScheduleDMToMonthDM } from "../../../../logic/schedule-container-converter/schedule-container-converter";
import { ScheduleParser } from "../../../../logic/schedule-parser/schedule.parser";
import { MonthDataModel } from "../../../../state/schedule-data/schedule-data.model";
import {
  ScheduleError,
  InputFileErrorCode,
} from "../../../../state/schedule-data/schedule-errors/schedule-error.model";
import { getPresentTemporaryScheduleInfo } from "../../../../state/schedule-data/selectors";
import { useNotification } from "../../../notification/notification.context";
import { useFileReader } from "./use-file-reader";

interface ScheduleConverterState {
  monthModel?: MonthDataModel;
  scheduleErrors: ScheduleError[];
}
const initialConverterState: ScheduleConverterState = {
  scheduleErrors: [],
  monthModel: undefined,
};

enum ScheduleConverterActionType {
  SetErrors = "Set Errors",
  UpdateScheduleModel = "Update Schedule Errors",
}
interface SetErrorsAction {
  type: ScheduleConverterActionType.SetErrors;
  payload: ScheduleError[];
}

interface UpdateScheduleModelAction {
  type: ScheduleConverterActionType.UpdateScheduleModel;
  payload: ScheduleConverterState;
}

export interface UseScheduleConverterOutput extends ScheduleConverterState {
  setSrcFile: (srcFile: File) => void;
}

export function useScheduleConverter(): UseScheduleConverterOutput {
  const [fileContent, setSrcFile] = useFileReader();

  const [{ scheduleErrors, monthModel }, dispatch] = useReducer(
    (
      state: ScheduleConverterState,
      action: SetErrorsAction | UpdateScheduleModelAction
    ): ScheduleConverterState => {
      switch (action.type) {
        case ScheduleConverterActionType.SetErrors:
          return {
            monthModel: undefined,
            scheduleErrors: action.payload ?? [],
          };
        case ScheduleConverterActionType.UpdateScheduleModel:
          return { ...(action.payload ?? initialConverterState) };
        default:
          // In other case typescript compiler rejects, to compile code
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          throw Error(`Unsupported action ${(action as any).type}`);
      }
    },
    initialConverterState
  );

  const dispatchErrors = useCallback(
    (errors: ScheduleError[]) => {
      dispatch({
        type: ScheduleConverterActionType.SetErrors,
        payload: errors,
      });
    },
    [dispatch]
  );

  const dispatchModelUpdate = useCallback(
    (newState: ScheduleConverterState) => {
      dispatch({
        type: ScheduleConverterActionType.UpdateScheduleModel,
        payload: newState,
      });
    },
    [dispatch]
  );

  const { month_number: month, year } = useSelector(getPresentTemporaryScheduleInfo);
  const { createNotification } = useNotification();
  const isFileMetaCorrect = async (content: ArrayBuffer): Promise<boolean> => {
    const ext = await fromBuffer(content);
    if (
      !ext ||
      ext.ext !== "xlsx" ||
      ext.mime !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      dispatchErrors([
        {
          kind: InputFileErrorCode.UNHANDLED_FILE_EXTENSION,
          filename: ext?.ext.toString(),
        },
      ]);
      createNotification({ type: "error", message: "Plan nie został wczytany!" });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!fileContent) {
      return;
    }

    isFileMetaCorrect(fileContent).then((val) => {
      if (val) {
        const workbook = new Excel.Workbook();
        workbook.xlsx.load(fileContent).then(() => {
          try {
            readFileContent(workbook);
          } catch (e) {
            dispatchErrors([
              {
                kind: InputFileErrorCode.LOAD_FILE_ERROR,
                message: e.toString(),
              },
            ]);
            createNotification({ type: "error", message: "Plan nie został wczytany!" });
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileContent]);

  return {
    monthModel,
    setSrcFile,
    scheduleErrors,
  };

  function extractWorkers(workbook): Array<Array<string>> {
    const workers = Array<Array<string>>();
    const workersWorkSheet = workbook.getWorksheet(WORKERS_WORKSHEET_NAME);

    if (workersWorkSheet) {
      workersWorkSheet.eachRow(false, (row) => {
        const rowValues = Array<string>();

        for (let iter = 1; iter <= row.cellCount; iter++) {
          rowValues.push(row.getCell(iter).text);
        }

        if (!ParserHelper.isEmptyRow(rowValues)) {
          workers.push(rowValues);
        }
      });
    }
    return workers;
  }

  function extractShifts(workbook): Array<Array<string>> {
    const shifts = Array<Array<string>>();
    const shiftsWorkSheet = workbook.getWorksheet(SHIFTS_WORKSHEET_NAME);

    if (shiftsWorkSheet) {
      shiftsWorkSheet.eachRow(false, (row) => {
        const rowValues = Array<string>();

        for (let iter = 1; iter <= SHIFT_HEADERS.length; iter++) {
          if (iter - 1 === ParserHelper.getShiftColorHeaderIndex()) {
            rowValues.push(
              (row.getCell(iter).style.fill as FillPattern).fgColor?.argb?.toString() ?? ""
            );
          } else {
            rowValues.push(row.getCell(iter).text.trim().toLowerCase());
          }
        }

        if (!ParserHelper.isEmptyRow(rowValues)) {
          shifts.push(rowValues);
        }
      });
    }
    return shifts;
  }

  function extractSchedule(workbook): Array<Array<Array<string>>> {
    const scheduleWorkSheet = workbook.getWorksheet(SCHEDULE_WORKSHEET_NAME);
    if (scheduleWorkSheet.rowCount === 0) {
      throw new Error(InputFileErrorCode.EMPTY_FILE);
    }

    const outerArray = Array<Array<Array<string>>>();
    let innerArray = Array<Array<string>>();

    let emptyCounter = 0;

    for (let rowIter = 1; rowIter <= scheduleWorkSheet.rowCount; rowIter++) {
      const row = scheduleWorkSheet.getRow(rowIter);

      const rowValues = Array<string>();

      for (let iter = 1; iter <= row.cellCount; iter++) {
        rowValues.push(row.getCell(iter).text);
      }

      if (ParserHelper.isEmptyRow(rowValues)) {
        if (innerArray.length !== 0) {
          outerArray.push(innerArray);
        }
        innerArray = Array<Array<string>>();
        emptyCounter++;
      } else {
        innerArray.push(rowValues);
        emptyCounter = 0;
      }

      if (emptyCounter > 4) {
        break;
      }
    }

    if (outerArray.length === 0) {
      throw new Error(InputFileErrorCode.EMPTY_FILE);
    }
    return outerArray;
  }

  function readFileContent(workbook): void {
    const scheduleArray = extractSchedule(workbook);
    const workersArray = extractWorkers(workbook);
    const shiftsArray = extractShifts(workbook);

    if (Object.keys(scheduleArray).length !== 0) {
      const parser = new ScheduleParser(month, year, scheduleArray, workersArray, shiftsArray);

      dispatchModelUpdate({
        scheduleErrors: [
          ...parser.parseErrors,
          ...parser.sections.Metadata.errors,
          ...parser.sections.FoundationInfo.errors,
          ...parser.workersInfo.errors,
          ...parser.shiftsInfo.errors,
        ],
        monthModel: cropScheduleDMToMonthDM(parser.schedule.getDataModel()),
      });
      createNotification({ type: "success", message: "Plan został wczytany!" });
    }
  }
}
