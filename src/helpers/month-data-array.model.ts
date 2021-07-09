/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Opaque } from "../utils/type-utils";

export interface MonthDataArray<T> extends Opaque<"MonthData", T[]> {
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: unknown
  ): MonthDataArray<U>;
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: unknown
  ): MonthDataArray<S>;
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): MonthDataArray<T>;
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: unknown
  ): this is MonthDataArray<S>;
  every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: unknown): boolean;
  splice(start: number, deleteCount?: number): MonthDataArray<T>;
  splice(start: number, deleteCount: number, ...items: T[]): MonthDataArray<T>;
  slice(start?: number, end?: number): MonthDataArray<T>;
  reverse(): MonthDataArray<T>;
}
