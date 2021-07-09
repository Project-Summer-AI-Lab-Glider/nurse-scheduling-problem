/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
/// <reference types="cypress" />
// import { DataRowParser } from "../../../../../src/logic/schedule-parser/data-row.parser";
// import { MetaDataParser } from "../../../../../src/logic/schedule-parser/metadata.parser";
// import { ShiftsInfoParser } from "../../../../../src/logic/schedule-parser/shifts-info.parser";
// import { WorkerType } from "../../../../../src/worker-info.model";

// #region  data declaration

/* const TestCases: { data: string[][]; expectedData: DataRowParser[]; errorCount: number }[] = [
  {
    data: [["opiekunka 1", "N", "Error", "N", " ", "D", "N", "NotValid", "L4", "U"]],
    expectedData: [
      new DataRowParser(["opiekunka 1", "N", "W", "N", "W", "D", "N", "W", "L4", "U"]),
    ],
    errorCount: 2,
  },
  {
    data: [
      ["opiekunka 1", "N", "Error", "N", " ", "D", "N", "NotValid", "L4", "U"],
      ["opiekunka 2", "NotVald", "L4", "L4", "L4", "*", "N", "W", "L4", "U"],
      ["opiekunka 3", "N", "W", "N", "Errr ", "D", "N", "W", "L4", "U"],
    ],
    expectedData: [
      new DataRowParser(["opiekunka 1", "N", "W", "N", "W", "D", "N", "W", "L4", "U"]),
      new DataRowParser(["opiekunka 2", "W", "L4", "L4", "L4", "W", "N", "W", "L4", "U"]),
      new DataRowParser(["opiekunka 3", "N", "W", "N", "W", "D", "N", "W", "L4", "U"]),
    ],
    errorCount: 5,
  },
  {
    data: [["opiekunka 1", "N", " ", "N", " ", "D", "N", " ", "L4", "U"]],

    expectedData: [
      new DataRowParser(["opiekunka 1", "N", "W", "N", "W", "D", "N", "W", "L4", "U"]),
    ],
    errorCount: 0,
  },
];

const metaData: MetaDataParser = new MetaDataParser(2020, 10, [
  ["Dni miesiąca", "28", "29", "30", "31", "1", "2", "3", "4", "5"],
]); */

// #region

describe("ShifstInfo parser", () => {
  // todo update test
  // context("Testing detection of error-list", () => {
  //   TestCases.forEach((element) => {
  //     const shiftsInfoParser = new ShiftsInfoParser(WorkerType.OTHER, metaData, element.data);
  //     const result = shiftsInfoParser.error-list;
  //     it(`should have exaclty ${element.errorCount} error-list`, () => {
  //       expect(result).have.lengthOf(element.errorCount);
  //     });
  //   });
  // });
  // todo update test
  // context("Testing section data", () => {
  //   TestCases.forEach((element) => {
  //     const shiftsInfoParser = new ShiftsInfoParser(WorkerType.OTHER, metaData, element.data);
  //     const result = shiftsInfoParser.sectionData;
  //     it(`should be equal`, () => {
  //       expect(result).eql(element.expectedData);
  //     });
  //   });
  // });
});
