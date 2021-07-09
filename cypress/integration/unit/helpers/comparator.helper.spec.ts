/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { ComparatorHelper } from "../../../../src/helpers/comparator.helper";

describe("ComparatorHelper", () => {
  let array = [];
  beforeEach(() => {
    array = [
      { simpleType: 1, complexType: { string: "x", number: 3 } },
      { simpleType: 3, complexType: { string: "y", number: 1 } },
      { simpleType: 2, complexType: { string: "z", number: 2 } },
      { simpleType: 2, complexType: { string: "z1", number: 2 } },
    ];
  });
  const sort = (order: "asc" | "desc") => {
    context("when sorting by simple type", () => {
      const orderBy = "simpleType";

      it("sorts array in stable manner", () => {
        cy.wrap(ComparatorHelper.stableSort(array, order, orderBy));
      });
    });

    context("when sorting by complex type", () => {
      const orderBy = "complexType";

      it("does not change the array", () => {
        expect(ComparatorHelper.stableSort(array, order, orderBy)).to.eql(array);
      });
    });
  };
  describe("stableSort", () => {
    context("ascending order", () => {
      sort("asc");
    });

    context("descending order", () => {
      sort("desc");
    });
  });
});
