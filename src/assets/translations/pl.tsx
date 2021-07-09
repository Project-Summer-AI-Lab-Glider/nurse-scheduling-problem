/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export const pl = {
  translation: {
    // App.tsx
    schedule: "Plan",
    management: "Zarządzanie",
    // header.component.tsx
    reportError: "Zgłoś błąd",
    returnToNow: "Wróć do teraz",
    // empty-month-bttons.tsx
    loadScheduleFrom: "Kopiuj plan z",
    loadFromFile: "Wgraj z pliku",
    // import-buttons.component.tsx
    load: "Wczytaj",
    saveAs: "Zapisz jako...",
    absenceSummary: "Urlopy",
    file: "Plik",
    // worker-civil-contract-work-norm-selector.component.tsx
    hourAmmount: "Liczba godzin",
    incorrectWorkHoursForWorker: "Liczba godzin musi być w przedziałe od {{from}} do {{to}}",
    // worker-contract-type-selector.component.tsx
    selectContractType: "Wybierz typ umowy",
    contractType: "Typ umowy",
    workingTime: "Wymiar pracy",
    // worker-edit.component.tsx
    saveWorker: "Zapisz pracownika",
    // worker-employment-contract-work-norm-selector.component.tsx
    selectWorkerHours: "Wybierz etat pracownika",
    enterWorkerHours: "Wpisz wymiar etatu",
    workerCouldNotBeEmployedMore: "Pracownik nie może być zatrudniony na więcej niż jeden etat",
    // worker-team-selector.component.tsx
    workerTeam: "Zespół pracownika",
    // worker-name-edit-field.component.tsx
    firstAndLastName: "Imię i nazwisko",
    enterWorkersFirstAndLastName: "Wpisz imię i nazwisko pracownika",
    workerAlreadyExists: "Pracownik o imieniu i nazwisku {{name}} already exists",
    // worker-position-selector.component.tsx
    position: "Stanowisko",
    selectWorkerPosition: "Wybierz stanowisko pracownika",
    // worker-drawer.component.tsx
    workerEditing: "Edycja pracownika",
    workerAdd: "Dodaj pracownika",
    worker: "Pracownik",
    // error-list-item.component.tsx
    show: "Pokaż",
    // error-list.component.tsx
    noNurses: "Brak pielęgniarek",
    notEnoughWorkersDuringDay: "Za mało pracowników w trakcie dnia",
    notEnoughWorkersDuringNight: "Za mało pracowników w nocy",
    requiredBreakViolation: "Naruszenie wymaganej przerwy",
    noRequiredBreak: "Brak wymaganej długiej przerwy",
    underHours: "Niedogodziny",
    overtime: "Nadgodziny",
    illegalScheduleValue: "Niedozwolona wartość zmiany",
    otherErrors: "Pozostałe błędy",
    errors: "Błędy",
    // footer.component.tsx
    realization: "Wykonanie",
    version: "Wersja",
    // app-error.modal.component.tsx
    somethingWentWrong: "Coś poszło nie tak",
    errorMessageWasSent: "Wiadomość o błędzie została wysłana do twórców.",
    // delete-worker.modal.component.tsx
    confirmAction: "Potwierdź akcje",
    removeEmployeeQuestion: "Czy naprawde chcesz usunąć pracownika {{name}}",
    cancel: "Anuluj",
    confirm: "Zaakceptuj",
    // error.modal.list.component.tsx
    noErrorsFound: "Nie znaleziono błędów",
    // error.modal.list.item.component.tsx
    errorNotRecognized: "Nie rozpoznano błędu",
    // errors.modal.component.tsx
    errorsWereEncounteredWhileLoadingFile: "Napotkano błędy podczas wczytywania pliku",
    // export.modal.component.tsx
    dayWorkers: "dzienni pracownicy",
    downloadScheduleTitle: "Pobierz grafik",
    fileFormat: "Format pliku",
    fileOptions: "Opcje",
    // new-version.modal.component.tsx
    update: "Aktualizacja",
    updateMessage: "Aplikacja została zaktualizowana. Teraz jest w wersji {{version}}",
    // report-issue-modal.component.tsx
    thereWasNetworkingError: "Wystąpił problem sieciowy!",
    send: "Wyślij",
    close: "Zamknij",
    whatErrorOccurred: "Jaki bląd wystąpił?",
    provideErrorDescription: "Opisz błąd",
    // shift-drawer.component.tsx
    shiftEdit: "Edycja zmiany",
    shiftAdd: "Dodaj zmianę",
    // shift-edit-drawer.component.tsx
    shiftName: "Nazwa zmiany",
    shiftType: "Typ zmiany",
    shiftAlreadyExists: "Zmiana z taką nazwą już istnieje",
    shiftWithThatColorExist: "Zmiana z takim kodem już istnieje",
    shiftHours: "Godziny zmiany",
    workingShift: "Pracująca",
    notWorkingShift: "Niepracująca",
    shiftShort: "Skrót zmiany",
    short: "Skrót",
    shiftColor: "Kolor zmiany",
    selectColor: "Wybierz kolor",
    // app-error.modal.component.tsx
    errorOccured: "Wystąpił błąd",
    pleaseRefreshApp: "proszę odświeżyć aplikacje",
    refreshApp: "Odśwież aplikacje",
    stillNotWorkingSeeWhatYouCanDo: "Dalej nie działa? Zobacz co możesz zrobić.",
    appProbbablyContainedWrongData: "Aplikacja prawdopodbnie zawiera błędne dane.",
    downloadAllSchedulesAndClearAppData: "Pobierz wszystkie grafiki i wyczyść dane aplikacji.",
    downloadScheduleAndClearAppData: "Pobierz grafik i wyczyść aplikację",
    // read-only-toolbar.tsx
    scheduleHasErrors: "Plan zawiera błędy. Zobacz je w trybie edycji.",
    // save-changes-modal.component.tsx
    yes: "Tak",
    no: "Nie",
    unsavedChanges: "Niezapisane zmiany w grafiku",
    wantToSave: "Czy chcesz zapisać wprowadzone zmiany?",
    // export and import
    nameSurnameExportHeader: "Imię i nazwisko",
    workerTypeExportHeader: "Stanowisko/funkcja",
    contractTypeExportHeader: "Rodzaj umowy",
    worktimeNormExportHeader: "Wymiar czasu pracy",
    workerTeamExportHeader: "Zespół",
    shiftNameExportHeader: "Nazwa zmiany",
    abbreviationExportHeader: "Skrót",
    fromExportHeader: "Od",
    toExportHeader: "Do",
    isWorkingShiftExportHeader: "Zmiana pracująca",
    colorExportHeader: "Kolor",
    leaveTypeExportHeader: "Typ",
    daysNoExportHeader: "Ile dni",
    hoursNoExportHeader: "Ile godzin",
    forYearExportHeader: "Za rok",
    scheduleworksheetName: "grafik",
    workersWorksheetName: "pracownicy",
    shiftsWorksheetName: "zmiany",
    absenceWorksheetName: "urlopy",
    // edit-page toolbar
    editPageToolbarCheckPlan: "Sprawdź Plan",
    editPageToolbarExit: "Wyjdź",
    editPageToolbarSavePlan: "Zapisz",
    //
    scheduleSectionNameInformation: "Informacje",
    mondayShort: "PN",
    tuesdayShort: "WT",
    wednesdayShort: "SR",
    thursdayShort: "CZ",
    fridayShort: "PT",
    saturdayShort: "SB",
    sundayShort: "ND",
    workerHourNorm: "Liczba Godzin",
    overTime: "Liczba Nadgodzin",
    workerTime: "Suma Godzin",
  },
};
export default pl;
