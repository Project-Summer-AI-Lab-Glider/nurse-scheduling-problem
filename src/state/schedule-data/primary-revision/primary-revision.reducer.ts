/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { createAction, createReducer } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { PrimaryMonthRevisionDataModel } from "../../application-state.model";
import { primaryRevisionInitialState } from "./primary-revision.initial-state";

export const addMonthPrimaryRevision = createAction<PrimaryMonthRevisionDataModel>(
  "schedule/addMonthPrimaryRevision"
);
export const primaryRevisionReducer = createReducer(primaryRevisionInitialState, (builder) => {
  builder
    .addCase(addMonthPrimaryRevision, (state, action) => {
      const monthDataModel = action.payload;
      if (!monthDataModel) {
        return state;
      }
      return _.cloneDeep(monthDataModel);
    })
    .addDefaultCase((state) => state);
});
