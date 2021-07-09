/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { PrimaryMonthRevisionDataModel } from "../state/application-state.model";
import { ScheduleDataModel } from "../state/schedule-data/schedule-data.model";
import { AlgorithmError } from "../state/schedule-data/schedule-errors/schedule-error.model";
import { ServerMiddleware } from "./server.middleware";

export interface BackendErrorObject extends Omit<AlgorithmError, "kind"> {
  code: string;
}

class Backend {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_SOLVER_API_URL,
    });
    this.axios.interceptors.request.use(
      (config): AxiosRequestConfig => {
        config.headers.ApplicationVersionTag = process.env.REACT_APP_VERSION;
        return config;
      }
    );
  }

  public sleep<T>(ms: number): Promise<T> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getErrors(
    schedule: ScheduleDataModel,
    baseScheduleRevision: PrimaryMonthRevisionDataModel
  ): Promise<AlgorithmError[]> {
    const serverSchedule = ServerMiddleware.mapToServerModel(schedule);
    const [anonynimizedSchedule, anonymizationMap] = ServerMiddleware.anonymizeSchedule(
      serverSchedule
    );
    const validRequestSchedule = ServerMiddleware.mapIsWorkingTypeSnakeCase(anonynimizedSchedule);

    return this.sleep(1000).then(() =>
      this.axios
        .post("/schedule_errors", validRequestSchedule)
        .then((resp) => resp.data.map(ServerMiddleware.mapCodeTypeToKind))
        .then((errors) => errors.map(ServerMiddleware.escapeJuliaIndexes))
        .then((errors) =>
          ServerMiddleware.replaceOvertimeAndUndertimeErrors(
            validRequestSchedule,
            baseScheduleRevision,
            errors
          )
        )
        .then((errors) =>
          errors.map((error: AlgorithmError) =>
            ServerMiddleware.remapScheduleErrorUsernames(error, anonymizationMap)
          )
        )
        .then((errors) => ServerMiddleware.aggregateWTCErrors(errors))
    );
  }
}

export default new Backend();
