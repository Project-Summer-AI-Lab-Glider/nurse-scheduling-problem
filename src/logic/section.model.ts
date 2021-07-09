/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export enum ChildrenSectionKey {
  RegisteredChildrenCount = "Dzieci",
  HospitalizedChildrenCount = "liczba dzieci hospitalizowanych",
  VacationersChildrenCount = "liczba dzieci urlopowanych",
  ConsultedChildrenCount = "liczba dzieci konsultowanych",
}

export enum ExtraWorkersSectionKey {
  ExtraWorkersCount = "Pracownicy dzienni",
}

export enum MetaDataSectionKey {
  Month = "miesiąc",
  Year = "rok",
  MonthDays = "Dni miesiąca",
  RequiredavailableWorkersWorkTime = "Liczba godz",
}

export const MetaDataRowLabel = "Grafik";
