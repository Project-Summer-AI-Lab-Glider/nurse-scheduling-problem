/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { DataRowHelper } from "../../../../src/helpers/data-row.helper";
import { DataRow } from "../../../../src/logic/schedule-logic/data-row";

describe("DataRowHelper", () => {
  describe("areDataRowArraysEqual", () => {
    let dataArray1: DataRow[];
    let dataArray2: DataRow[];
    const dataRow1: DataRow = new DataRow("test", [5, 2, 15, 84]);
    const dataRow2: DataRow = new DataRow("not a test", [84, 15, 2, 5]);
    const dataRow3: DataRow = new DataRow("test", [84, 15, 2, 5]);
    const dataRow4: DataRow = new DataRow("test", [84, 15, 2]);

    context("when arrays are of different length", () => {
      before(() => {
        dataArray1 = [dataRow1, dataRow2];
        dataArray2 = [dataRow1];
      });

      it("returns false", () => {
        expect(DataRowHelper.areDataRowArraysEqual(dataArray1, dataArray2)).to.eq(false);
      });
    });

    context("when arrays are of same length", () => {
      context("when rows are of different length", () => {
        before(() => {
          dataArray1 = [dataRow1, dataRow2];
          dataArray2 = [dataRow1, dataRow4];
        });

        it("returns false", () => {
          expect(DataRowHelper.areDataRowArraysEqual(dataArray1, dataArray2)).to.eq(false);
        });
      });

      context("when rows are of same length", () => {
        context("when rows are different", () => {
          before(() => {
            dataArray1 = [dataRow1, dataRow2];
            dataArray2 = [dataRow1, dataRow3];
          });

          it("returns false", () => {
            expect(DataRowHelper.areDataRowArraysEqual(dataArray1, dataArray2)).to.eq(false);
          });
        });

        context("when rows are equal", () => {
          before(() => {
            dataArray1 = [dataRow1, dataRow2];
            dataArray2 = [dataRow1, dataRow2];
          });

          it("returns true", () => {
            expect(DataRowHelper.areDataRowArraysEqual(dataArray1, dataArray2)).to.eq(true);
          });
        });
      });
    });
  });
  /* eslint-disable @typescript-eslint/no-inferrable-types */
  describe("copyWithReplaced", () => {
    context("when given boolean matrix and new value", () => {
      const booleanMatrix: boolean[][] = [
        [true, false, false, true],
        [false, true, false, true],
      ];
      const newValue: number = 0;
      const dataArray1: DataRow<number>[] = [
        new DataRow("test", [11, 12, 13, 14]),
        new DataRow("test", [21, 22, 23, 24]),
      ];
      it("changes values at set positions", () => {
        cy.wrap(DataRowHelper.copyWithReplaced(booleanMatrix, dataArray1, newValue)).snapshot();
      });
    });
  });

  describe("dataRowsAsValueDict", () => {
    context("when data row's keys are the same", () => {
      const dataArray1: DataRow<number>[] = [
        new DataRow("test", [11, 12, 13, null]),
        new DataRow("test", [21, 22, null, 24]),
      ];

      context("when include nulls is true", () => {
        const includeNulls = true;

        it("includes nulls in the output and squashes the rows", () => {
          cy.wrap(DataRowHelper.dataRowsAsValueDict(dataArray1, includeNulls)).snapshot();
        });
      });

      context("when include nulls is false", () => {
        const includeNulls = false;

        it("does not include nulls in the output and squashes the rows", () => {
          cy.wrap(DataRowHelper.dataRowsAsValueDict(dataArray1, includeNulls)).snapshot();
        });
      });
    });

    context("when data row's keys are not the same", () => {
      const dataArray1: DataRow<number>[] = [
        new DataRow("test", [11, 12, 13, null]),
        new DataRow("test1", [21, 22, null, 24]),
      ];

      context("when include nulls is true", () => {
        const includeNulls = true;

        it("includes nulls in the output", () => {
          cy.wrap(DataRowHelper.dataRowsAsValueDict(dataArray1, includeNulls)).snapshot();
        });
      });

      context("when include nulls is false", () => {
        const includeNulls = false;

        it("does not include nulls in the output", () => {
          cy.wrap(DataRowHelper.dataRowsAsValueDict(dataArray1, includeNulls)).snapshot();
        });
      });
    });
  });
});
