/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export const dates = [28, 29, 30, 31, 1, 2, 3, 4, 5, 6];

export const nurseSection = [
  ["pielęgniarka 1", "DN", " ", " ", " ", "U", "U", "U", "U", "U", "D"],
  ["pielęgniarka 2", "DN", "DN", "U", "W", "U", "U", "U", "U", "U", "D"],
  ["pielęgniarka 3", "N", " ", "L4", "D", "U", "U", "U", "U", "U", "D"],
  ["pielęgniarka 4", "U", "U", "U", "U", "D", "D", "DN", "L4", "DN", "U"],
  ["pielęgniarka 5", "DN", "L4", "L4", "W", "L4", "L4", "L4", "L4", "L4", "L4"],
];

export const babysitterSection = [
  ["opiekunka 1", "L4", "L4", "L4", "L4", "L4", "D", "N", "L4", "L4", "L4"],
  ["opiekunka 2", "L4", "L4", "L4", "L4", "L4", "L4", "L4", "L4", "L4", "D"],
];

export const exampleData = [
  [
    ["Grafik ", "", "", ""],
    ["Dni miesiąca", ...dates.map((x) => x.toString())],
  ],
  [["Dzieci", ...dates.map((x) => "1")]],
  nurseSection,
  babysitterSection,
];
