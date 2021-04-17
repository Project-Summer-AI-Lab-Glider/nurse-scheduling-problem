/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/* eslint-disable @typescript-eslint/camelcase */

import _ from "lodash";
import PouchDB from "pouchdb-browser";
import { ArrayPositionPointer, ArrayHelper } from "../../helpers/array.helper";
import { MonthHelper } from "../../helpers/month.helper";
import { VerboseDateHelper } from "../../helpers/verbose-date.helper";
import {
  MonthDataModel,
  isMonthModelEmpty,
  validateMonthDM,
  ScheduleDataModel,
  getScheduleKey,
  createEmptyMonthDataModel,
} from "../../state/schedule-data/schedule-data.model";
import { cropScheduleDMToMonthDM } from "../schedule-container-converter/schedule-container-converter";
import {
  PersistenceStoreProvider,
  MonthRevision,
  ApplicationVersionRevision,
  RevisionType,
  RevisionKey,
  getRevisionTypeFromKey,
  ScheduleKey,
} from "./persistance-store.model";
export const DATABASE_NAME = "nurse-scheduling";
const APPLICATION_VERSION_TAG_DATABASE_KEY = "application_version_tag";
const APPLICATION_VERSION_DEFAULT_TAG = "1.0.0";
type MonthDMToRevisionKeyDict = { [revisionKey: string]: MonthDataModel };

export class LocalStorageProvider extends PersistenceStoreProvider {
  private storage: PouchDB.Database<MonthRevision>;
  private applicationVersionStorage: PouchDB.Database<ApplicationVersionRevision>;

  constructor() {
    super();
    this.storage = new PouchDB(DATABASE_NAME);
    this.applicationVersionStorage = new PouchDB(`${DATABASE_NAME}-application-version`);
  }

  async reloadDb(): Promise<void> {
    try {
      await this.storage.destroy();
      this.storage = new PouchDB(DATABASE_NAME);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
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
    const isMonthInFuture = VerboseDateHelper.isMonthInFuture(
      monthDataModel.scheduleKey.month,
      monthDataModel.scheduleKey.year
    );

    if (
      _.isNil(oppositeRevision) ||
      oppositeRevision.isAutoGenerated ||
      oppositeRevisionType === "actual" ||
      isMonthInFuture
    ) {
      await this.saveMonthRevision(oppositeRevisionType, monthDataModel);
    }

    await this.saveMonthRevision(type, monthDataModel);
  }

  private async saveMonthRevision(
    revisionType: RevisionType,
    monthDataModel: MonthDataModel
  ): Promise<void> {
    validateMonthDM(monthDataModel);
    const revisionKey = monthDataModel.scheduleKey.getRevisionKey(revisionType);
    let revision: string | undefined;
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

    const { daysMissingFromNextMonth } = MonthHelper.calculateMissingFullWeekDays(
      monthDataModel.scheduleKey
    );

    if (daysMissingFromNextMonth !== 0) {
      const nextMonthRevisionKey = getScheduleKey(scheduleDataModel).nextMonthKey.getRevisionKey(
        type
      );
      await this.updateMonthPartBasedOnScheduleDM(
        nextMonthRevisionKey,
        scheduleDataModel,
        daysMissingFromNextMonth,
        "HEAD"
      );
    }
  }

  async saveApplicationVersion(): Promise<void> {
    const db = this.applicationVersionStorage;
    const version = process.env.REACT_APP_VERSION;

    try {
      const doc = await db.get(APPLICATION_VERSION_TAG_DATABASE_KEY);
      db.put({
        _id: APPLICATION_VERSION_TAG_DATABASE_KEY,
        _rev: doc._rev,
        version: version ? version : APPLICATION_VERSION_DEFAULT_TAG,
      });
    } catch (error) {
      db.put({
        _id: APPLICATION_VERSION_TAG_DATABASE_KEY,
        version: version ? version : APPLICATION_VERSION_DEFAULT_TAG,
      });
    }
  }

  async updateMonthPartBasedOnScheduleDM(
    revisionKey: RevisionKey,
    scheduleDataModel: ScheduleDataModel,
    missingDays: number,
    updatePosition: ArrayPositionPointer
  ): Promise<void> {
    try {
      const updatedMonthDataModel = await this.getMonthRevision(revisionKey);
      if (_.isNil(updatedMonthDataModel)) return;

      const newShifts = _.cloneDeep(updatedMonthDataModel.shifts);

      Object.keys(updatedMonthDataModel.shifts).forEach((key) => {
        newShifts[key] =
          _.isNil(scheduleDataModel.shifts[key]) || scheduleDataModel.shifts[key]?.length === 0
            ? updatedMonthDataModel.shifts[key]
            : ArrayHelper.update(
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

      validateMonthDM(updatedMonthDataModel);
      await this.saveBothMonthRevisionsIfNeeded(
        getRevisionTypeFromKey(revisionKey),
        updatedMonthDataModel
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      error.status !== 404 && console.error(error);
    }
  }

  async getMonthRevision(revisionKey: RevisionKey): Promise<MonthDataModel | undefined> {
    try {
      const monthData = (await this.storage.get(revisionKey)).data;
      const { month, year } = monthData.scheduleKey;
      monthData.scheduleKey = new ScheduleKey(month, year);

      validateMonthDM(monthData);
      return monthData;
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