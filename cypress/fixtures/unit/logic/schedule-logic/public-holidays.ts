/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// source: https://www.kalendarzswiat.pl/swieta/wolne_od_pracy/{year}
export const FIXED_HOLIDAYS = [
  { day: 1, month: 0 },
  { day: 6, month: 0 },
  { day: 1, month: 4 },
  { day: 3, month: 4 },
  { day: 15, month: 7 },
  { day: 1, month: 10 },
  { day: 11, month: 10 },
  { day: 25, month: 11 },
  { day: 26, month: 11 },
];

export const MOVEABLE_HOLIDAYS = {
  "2020": [
    { day: 12, month: 3 },
    { day: 13, month: 3 },
    { day: 31, month: 4 },
    { day: 11, month: 5 },
  ],
  "2021": [
    { day: 4, month: 3 },
    { day: 5, month: 3 },
    { day: 23, month: 4 },
    { day: 3, month: 5 },
  ],
  "2022": [
    { day: 17, month: 3 },
    { day: 18, month: 3 },
    { day: 5, month: 5 },
    { day: 16, month: 5 },
  ],
};

export const NON_HOLIDAYS = {
  "2020": [
    { day: 2, month: 0 },
    { day: 5, month: 0 },
    { day: 7, month: 0 },
    { day: 11, month: 3 },
    { day: 14, month: 3 },
    { day: 30, month: 4 },
    { day: 10, month: 5 },
    { day: 12, month: 5 },
    { day: 2, month: 4 },
    { day: 19, month: 6 },
    { day: 24, month: 11 },
  ],
  "2021": [
    { day: 2, month: 0 },
    { day: 5, month: 0 },
    { day: 7, month: 0 },
    { day: 3, month: 3 },
    { day: 6, month: 3 },
    { day: 22, month: 4 },
    { day: 24, month: 4 },
    { day: 2, month: 5 },
    { day: 24, month: 11 },
  ],
  "2022": [
    { day: 2, month: 0 },
    { day: 5, month: 0 },
    { day: 7, month: 0 },
    { day: 16, month: 3 },
    { day: 19, month: 3 },
    { day: 4, month: 5 },
    { day: 6, month: 5 },
    { day: 15, month: 5 },
    { day: 17, month: 5 },
    { day: 5, month: 8 },
    { day: 20, month: 9 },
    { day: 24, month: 11 },
  ],
};
