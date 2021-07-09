/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { DataRowParser } from "../../../../../src/logic/schedule-parser/data-row.parser";

describe("DataRowParser", () => {
  const dataRow = [" Schedule ", "november", "year 2020", "", "number of hours 10"];
  const firstEmptyDataRow = ["", "november", "year 2020", "", "number of hours 10"];
  const emptyDataRow = ["", "", "", ""];

  describe("get isEmpty", () => {
    context("when is not empty", () => {
      const dataRowParser = new DataRowParser(dataRow);

      it("should return false", () => {
        expect(dataRowParser.isEmpty).to.equal(false);
      });
    });

    context("when is empty", () => {
      const dataRowParser = new DataRowParser(emptyDataRow);

      it("should return true", () => {
        expect(dataRowParser.isEmpty).to.equal(true);
      });
    });
  });

  describe("get rowKey", () => {
    context("when is empty", () => {
      const dataRowParser = new DataRowParser(emptyDataRow);

      it("should throw error", () => {
        expect(() => dataRowParser.rowKey).to.throw("Trying to access key from an empty row");
      });
    });

    context("when is not empty", () => {
      const dataRowParser = new DataRowParser(dataRow);

      it("should return row key", () => {
        expect(dataRowParser.rowKey).to.equal("Schedule");
      });
    });

    context("when first value is empty", () => {
      const dataRowParser = new DataRowParser(firstEmptyDataRow);

      it("should return row key (and skip nulls)", () => {
        expect(dataRowParser.rowKey).to.equal("november");
      });
    });
  });

  describe("rowData", () => {
    const dataRowParser = new DataRowParser(dataRow);

    it("should return row data with or without nulls and key based on parameters", () => {
      expect(dataRowParser.rowData()).to.eql(["november", "year 2020", "number of hours 10"]);
      expect(dataRowParser.rowData(true)).to.eql([
        "november",
        "year 2020",
        "",
        "number of hours 10",
      ]);
      expect(dataRowParser.rowData(false, true)).to.eql([
        " Schedule ",
        "november",
        "year 2020",
        "number of hours 10",
      ]);
      expect(dataRowParser.rowData(true, true)).to.eql([
        " Schedule ",
        "november",
        "year 2020",
        "",
        "number of hours 10",
      ]);
    });
  });
});
