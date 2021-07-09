/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { LocalizationResource } from "./types";

const en: LocalizationResource = {
  translation: {
    // App.tsx
    editModeActive: "Edit mode active",
    schedule: "Schedule",
    management: "Management",
    // header.component.tsx
    reportError: "Report error",
    returnToNow: "Come back to now",
    help: "Help",
    changeSettings: "Change settings",
    // empty-month-bttons.tsx
    loadScheduleFrom: "Load schedule from",
    loadFromFile: "Load from file",
    // import-buttons.component.tsx
    load: "Load",
    saveAs: "Save as...",
    absenceSummary: "Absences",
    file: "File",
    // worker-civil-contract-work-norm-selector.component.tsx
    hourAmmount: "Liczba godzin",
    incorrectWorkHoursForWorker: "The number of hours must be between {{from}} and {{to}}",
    // worker-contract-type-selector.component.tsx
    selectContractType: "Select contract type",
    contractType: "Contract type",
    workingTime: "Working time",
    // worker-edit.component.tsx
    saveWorker: "Save worker",
    // worker-employment-contract-work-norm-selector.component.tsx
    selectWorkerHours: "Select worker hours",
    enterWorkerHours: "Enter worker hours",
    workerCouldNotBeEmployedMore: "An worker may not be employed for more than one full-time job",
    // worker-team-selector.component.tsx
    workerTeam: "Worker's team",
    // worker-name-edit-field.component.tsx
    firstAndLastName: "First and last name",
    enterWorkersFirstAndLastName: "Enter employees first and last name",
    workerAlreadyExists: "Worker with full name {{name}} already exists",
    // worker-position-selector.component.tsx
    position: "Position",
    selectWorkerPosition: "Select employee position",
    // worker-drawer.component.tsx
    workerEditing: "Employee editing",
    workerAdd: "Add employee",
    worker: "Worker",
    // error-list-item.component.tsx
    show: "Show",
    // error-list.component.tsx
    noNurses: "No nurses",
    notEnoughWorkersDuringDay: "Not enough workers during day",
    notEnoughWorkersDuringNight: "Not enough workers during night",
    requiredBreakViolation: "Violation of the required break",
    noRequiredBreak: "Employee without required break",
    underHours: "Under-hours",
    overtime: "Overtime",
    illegalScheduleValue: "Illegal schedule value",
    otherErrors: "Other errors",
    // span-errors.component.tsx
    errors: "Errors",
    // footer.component.tsx
    realization: "Realization",
    version: "Version",
    // app-error.modal.component.tsx
    somethingWentWrong: "Something went wrong",
    errorMessageWasSent: "Error information was sent to the developers.",
    // delete-worker.modal.component.tsx
    confirmAction: "Confirm action",
    removeEmployeeQuestion: "Do you really want to remove {{name}} employee",
    cancel: "Cancel",
    confirm: "Confirm",
    // error.modal.list.component.tsx
    noErrorsFound: "No errors found",
    // error.modal.list.item.component.tsx
    errorNotRecognized: "Error not recognized",
    // errors.modal.component.tsx
    errorsWereEncounteredWhileLoadingFile: "Errors were encountered while loading the file ",
    // export.modal.component.tsx
    dayWorkers: "day workers",
    downloadScheduleTitle: "Download schedule",
    fileFormat: "File format",
    fileOptions: "Options",
    // new-version.modal.component.tsx
    update: "Update",
    updateMessage: "App has been updated. Current version is {{version}}",
    // report-issue-modal.component.tsx
    thereWasNetworkingError: "There was an networking error!",
    send: "Send",
    close: "Close",
    whatErrorOccurred: "What error has occured?",
    provideErrorDescription: "Provide error description",
    // shift-drawer.component.tsx
    shiftEdit: "Shift edit",
    shiftAdd: "Add shift",
    shiftName: "Shift name",
    shiftType: "Shift type",
    shiftAlreadyExists: "Shift already exists",
    shiftWithThatColorExist: "Shift with that color code already exists",
    shiftHours: "Shift hours",
    workingShift: "Working",
    notWorkingShift: "Not working",
    shiftShort: "Shift short",
    short: "Short",
    shiftColor: "Shift color",
    selectColor: "Select color",
    // app-error.modal.component.tsx
    errorOccured: "Error occured",
    pleaseRefreshApp: "please refresh app",
    refreshApp: "Refresh app",
    stillNotWorkingSeeWhatYouCanDo: "Still not working? See what you can do.",
    appProbbablyContainedWrongData: "Aplication probbably contained wrong data.",
    downloadAllSchedulesAndClearAppData: "Download all schedules and clear app data.",
    downloadScheduleAndClearAppData: "Download schedule and clear app data.",
    // read-only-toolbar.tsx
    scheduleHasErrors: "The schedule contains errors. See them in the edit mode.",
    // save-changes-modal.component.tsx
    yes: "Yes",
    no: "No",
    unsavedChanges: "Unsaved changes in schedule",
    wantToSave: "Do you want to save changes?",
    // export and import
    nameSurnameExportHeader: "Name and surname",
    workerTypeExportHeader: "Worker position",
    contractTypeExportHeader: "Contract type",
    worktimeNormExportHeader: "Worktime norm",
    workerTeamExportHeader: "Worker team",
    shiftNameExportHeader: "Worker shift",
    abbreviationExportHeader: "Shift abbreviation",
    fromExportHeader: "From",
    toExportHeader: "To",
    isWorkingShiftExportHeader: "Is working shift",
    colorExportHeader: "Color",
    leaveTypeExportHeader: "Type",
    daysNoExportHeader: "Days no",
    hoursNoExportHeader: "Hours no",
    forYearExportHeader: "For year",
    scheduleworksheetName: "schedule",
    workersWorksheetName: "workers",
    shiftsWorksheetName: "shifts",
    absenceWorksheetName: "leaves",
    // edit-page toolbar
    editPageToolbarCheckPlan: "Check plan",
    editPageToolbarExit: "Exit",
    editPageToolbarSavePlan: "Save plan",
    scheduleSectionNameInformation: "Informations",
    mondayShort: "MON",
    tuesdayShort: "TUE",
    wednesdayShort: "WED",
    thursdayShort: "THU",
    fridayShort: "FRI",
    saturdayShort: "SAT",
    sundayShort: "SUN",
    workerHourNorm: "WorkerHourNorm",
    overTime: "Overtime",
    workerTime: "Total Hours",
  },
};
export default en;
