/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* eslint-disable @typescript-eslint/camelcase */

import PouchDB from "pouchdb-browser";
import {
  createEmptyMonthDataModel,
  cropScheduleDMToMonthDM,
  getScheduleKey,
  isMonthModelEmpty,
  MonthDataModel,
  ScheduleDataModel,
} from "../common-models/schedule-data.model";

import {
  MonthRevision,
  PersistenceStoreProvider,
  RevisionKey,
  RevisionType,
  ScheduleKey,
} from "./persistance-store.model";
import _ from "lodash";
import { calculateMissingFullWeekDays } from "../state/reducers/month-state/schedule-data/common-reducers";
import { ArrayHelper, ArrayPositionPointer } from "../helpers/array.helper";
import { VerboseDateHelper } from "../helpers/verbose-date.helper";

export const DATABASE_NAME = "nurse-scheduling";
type MonthDMToRevisionKeyDict = { [revisionKey: string]: MonthDataModel };

export class LocalStorageProvider extends PersistenceStoreProvider {
  private storage: PouchDB.Database<MonthRevision>;

  constructor() {
    super();
    this.storage = new PouchDB(DATABASE_NAME);
  }

  async saveBothMonthRevisionsIfNeeded(
    type: RevisionType,
    monthDataModel: MonthDataModel
  ): Promise<void> {
    if (isMonthModelEmpty(monthDataModel)) {
      return;
    }

    const oppositeRevisionType = type === "actual" ? "primary" : "actual";

    const oppositeRevision = await this.getMonthRevision(
      monthDataModel.scheduleKey.getRevisionKey(oppositeRevisionType)
    );
    if (
      _.isNil(oppositeRevision) ||
      oppositeRevision.isAutoGenerated ||
      oppositeRevisionType === "actual"
    ) {
      await this.saveMonthRevision(oppositeRevisionType, monthDataModel);
    }

    await this.saveMonthRevision(type, monthDataModel);
  }

  private async saveMonthRevision(
    revisionType: RevisionType,
    monthDataModel: MonthDataModel
  ): Promise<void> {
    const revisionKey = monthDataModel.scheduleKey.getRevisionKey(revisionType);
    let revision;
    try {
      const document = await this.storage.get(revisionKey);
      revision = document._rev;
    } catch (error) {
      // eslint-disable-next-line no-console
      error.status !== 404 && console.error(error);
    }
    const monthRev: MonthRevision = {
      _id: revisionKey,
      data: monthDataModel,
    };

    if (!_.isNil(revision)) {
      monthRev._rev = revision;
    }

    try {
      this.storage.put(monthRev);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  async saveSchedule(type: RevisionType, scheduleDataModel: ScheduleDataModel): Promise<void> {
    const monthDataModel = cropScheduleDMToMonthDM(scheduleDataModel);
    await this.saveBothMonthRevisionsIfNeeded(type, monthDataModel);

    const [, missingFromNext] = calculateMissingFullWeekDays(monthDataModel.scheduleKey);

    if (missingFromNext !== 0) {
      await this.updateMonthPartBasedOnScheduleDM(
        getScheduleKey(scheduleDataModel).nextMonthKey.getRevisionKey(type),
        scheduleDataModel,
        missingFromNext,
        "HEAD"
      );
    }
  }

  async updateMonthPartBasedOnScheduleDM(
    revisionKey: RevisionKey,
    scheduleDataModel: ScheduleDataModel,
    missingDays: number,
    updatePosition: ArrayPositionPointer
  ): Promise<void> {
    try {
      const document = await this.storage.get(revisionKey);
      const updatedMonthDataModel = document.data;

      const newShifts = _.cloneDeep(updatedMonthDataModel.shifts);

      Object.keys(updatedMonthDataModel.shifts).forEach((key) => {
        newShifts[key] = ArrayHelper.update(
          updatedMonthDataModel.shifts[key],
          updatePosition,
          scheduleDataModel.shifts[key],
          missingDays
        );
      });

      updatedMonthDataModel.shifts = newShifts;
      updatedMonthDataModel.month_info = {
        ...updatedMonthDataModel.month_info,
        children_number: ArrayHelper.update(
          updatedMonthDataModel.month_info.children_number ?? [],
          updatePosition,
          scheduleDataModel.month_info.children_number ?? [],
          missingDays
        ),
        extra_workers: ArrayHelper.update(
          updatedMonthDataModel.month_info.extra_workers ?? [],
          updatePosition,
          scheduleDataModel.month_info.extra_workers ?? [],
          missingDays
        ),
      };

      this.storage.put({
        _rev: document._rev,
        _id: revisionKey,
        data: updatedMonthDataModel,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      error.status !== 404 && console.error(error);
    }
  }

  async getMonthRevision(
    revisionKey: RevisionKey,
    createIfNotExist = false
  ): Promise<MonthDataModel | undefined> {
    try {
      const result = await this.storage.get(revisionKey);
      return result?.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      error.status !== 404 && console.error(error);
      return undefined;
    }
  }

  async getAllSchedules(): Promise<MonthDMToRevisionKeyDict> {
    const revisions = await this.storage.allDocs({ include_docs: true });
    const validRevisions = _.compact(revisions.rows.map((r) => r.doc));

    const docs: { [revisionKey: string]: MonthDataModel } = {};
    validRevisions.forEach((revision) => {
      docs[revision._id] = revision.data;
    });
    return docs;
  }

  async fetchOrCreateMonthRevision(
    monthKey: ScheduleKey,
    revision: RevisionType,
    baseMonth: MonthDataModel
  ): Promise<MonthDataModel> {
    let monthDataModel = await this.getMonthRevision(monthKey.getRevisionKey(revision));

    if (_.isNil(monthDataModel)) {
      monthDataModel = createEmptyMonthDataModel(monthKey, baseMonth);
      await this.saveBothMonthRevisionsIfNeeded(revision, monthDataModel);
    }
    return monthDataModel;
  }

  async fetchOrCreateMonthNeighbours(
    month: MonthDataModel,
    revision: RevisionType
  ): Promise<[MonthDataModel, MonthDataModel]> {
    const scheduleKey = new ScheduleKey(month.scheduleKey.month, month.scheduleKey.year);

    const nextMonthKey = scheduleKey.nextMonthKey;
    const isNextMonthInFuture = VerboseDateHelper.isMonthInFuture(
      nextMonthKey.month,
      nextMonthKey.year
    );
    const nextMonthRevision = isNextMonthInFuture ? "primary" : "actual";

    return [
      await this.fetchOrCreateMonthRevision(scheduleKey.prevMonthKey, "actual", month),
      await this.fetchOrCreateMonthRevision(nextMonthKey, nextMonthRevision, month),
    ];
  }
}
