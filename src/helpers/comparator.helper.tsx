/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export type ComparatorValues = 1 | 0 | -1;
export type Order = "asc" | "desc";

export class ComparatorHelper {
  /**
   * Compare 2 objects in descending order. For complex types returns 0.
   */
  public static descendingComparator<T>(a: T, b: T, orderBy: keyof T): ComparatorValues {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  /**
   * Creates comparator function which can compare 2 object of type T in specified order (ascending or descending) by one of T key.
   */
  public static getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => ComparatorValues {
    return order === "desc"
      ? (a, b): ComparatorValues => ComparatorHelper.descendingComparator(a, b, orderBy)
      : (a, b): ComparatorValues =>
          -ComparatorHelper.descendingComparator(a, b, orderBy) as ComparatorValues;
  }

  /**
   * Sorts array of objects in ascending or descending order by one of the object's key.
   * @param array - array of objects T
   * @param order - order of sorting (asc or desc)
   * @param orderBy - key of object T by which order will be determine
   * If type of orderBy is complex result array order will be the same as input order
   */
  public static stableSort<T>(array: T[], order: Order, orderBy: keyof T): T[] {
    const stabilizedArray = array.map((el, index) => [el, index] as [T, number]);
    const comparator = ComparatorHelper.getComparator(order, orderBy);
    stabilizedArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedArray.map((el) => el[0]);
  }
}
