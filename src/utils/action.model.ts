/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export interface ActionModel<
  TPayload,
  TKey extends string = string,
  TMeta extends string = string
> {
  type: TKey;
  payload?: TPayload;
  meta?: TMeta;
}
