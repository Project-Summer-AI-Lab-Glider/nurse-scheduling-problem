/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export type Primitive = undefined | null | boolean | number | string | bigint | symbol;
export type ArrayPositionPointer = "HEAD" | "TAIL";

export class ArrayHelper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static objectArrayToDict<TIn, TOut extends Record<string, any>>(
    array: TIn[],
    keySelector: (item: TIn) => string,
    valueSelector: (key: string, item: TIn) => TOut = (key, item): TOut => ({} as TOut)
  ): { [key: string]: TOut } {
    return array
      .map((obj) => {
        const key = keySelector(obj);
        return { [key]: valueSelector(key, obj) };
      })
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  }

  public static arePrimitiveArraysEqual(array1: Primitive[], array2: Primitive[]): boolean {
    if (array1.length !== array2.length) return false;
    for (let ind = 0; ind < array1.length; ++ind) {
      if (array1[ind] !== array2[ind]) {
        return false;
      }
    }
    return true;
  }

  public static replace<T>(arr: T[], replaceArr: T[], replacePosition: ArrayPositionPointer): T[] {
    if (replacePosition === "HEAD") {
      arr.splice(0, replaceArr.length, ...replaceArr);
    } else {
      arr.splice(arr.length - replaceArr.length, arr.length, ...replaceArr);
    }
    return arr;
  }

  public static update<T>(
    updatedArr: T[],
    updatePosition: ArrayPositionPointer,
    baseArr: T[],
    numerOfElement: number
  ): T[] {
    let updateElements;
    if (updatePosition === "TAIL") {
      updateElements = baseArr.slice(0, numerOfElement);
    } else {
      updateElements = baseArr.slice(baseArr.length - numerOfElement);
    }

    return ArrayHelper.replace(updatedArr, updateElements, updatePosition);
  }

  public static extend<T>(
    arr1: T[],
    count1: number,
    arr1Default: T,
    curr: T[],
    arr2: T[],
    count2: number,
    arr2Default: T
  ): T[] {
    const prevArrData = arr1 ?? Array(count1).fill(arr1Default);
    const nextArrData = arr2 ?? Array(count2).fill(arr2Default);

    const left = prevArrData.slice(prevArrData.length - count1);
    const right = nextArrData.slice(0, count2);
    return [...left, ...curr, ...right];
  }

  public static createArrayOfLengthFromArray<T>(
    array: T[],
    length: number,
    defaultFillValue: T,
    startIndex = 0
  ): T[] {
    const firstArray = array.slice(startIndex, startIndex + length);
    const diff = length - firstArray.length;
    return [...firstArray, ...Array(diff).fill(defaultFillValue)];
  }

  public static circularExtendToLength<T>(array: T[], length: number): T[] {
    let newArray: T[] = [];
    while (newArray.length < length) {
      newArray = newArray.concat(array);
    }
    return newArray.slice(0, length);
  }
}
