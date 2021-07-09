/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as _ from "lodash";

export type Opaque<K, T> = T & { __TYPE__: K };

export function isAllObjectPropsDefined<T extends Record<string, unknown> | Array<unknown>>(
  args: T
): args is Required<T> {
  return isAllValuesDefined(Object.values(args));
}

export function isAllValuesDefined(values: unknown[]): boolean {
  const isAnyValueUndefined = _.some(values, (argument) => _.isNil(argument));
  return !isAnyValueUndefined;
}
