/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import i18next from "i18next";
import React from "react";
import { WorkerInfoModel } from "../../../state/schedule-data/worker-info/worker-info.model";
import Drawer, { DrawerOptions } from "../drawer/drawer.component";
import { WorkerEditComponent, WorkerEditComponentMode } from "./worker-edit";
import { WorkerInfoComponent } from "./worker-info/worker-info.component";

export enum WorkerDrawerMode {
  EDIT,
  ADD_NEW,
  INFO,
}

export type WorkerDrawerWorkerInfo = Omit<WorkerInfoModel, "time">;

interface WorkerAddDrawerOptions {
  mode: WorkerDrawerMode.ADD_NEW;
}
interface WorkerEditDrawerOptions {
  mode: WorkerDrawerMode.EDIT;
  worker: WorkerDrawerWorkerInfo;
}
interface WorkerInfoDrawerOptions {
  mode: WorkerDrawerMode.INFO;
  worker: WorkerDrawerWorkerInfo;
}
type WorkerDrawerOptions = Omit<DrawerOptions, "title"> &
  (WorkerAddDrawerOptions | WorkerEditDrawerOptions | WorkerInfoDrawerOptions);

function getTitle(mode: WorkerDrawerMode): string {
  return {
    [WorkerDrawerMode.EDIT]: i18next.t("workerEditing"),
    [WorkerDrawerMode.ADD_NEW]: i18next.t("workerAdd"),
    [WorkerDrawerMode.INFO]: i18next.t("worker"),
  }[mode];
}

export default function WorkerDrawerComponent(options: WorkerDrawerOptions): JSX.Element {
  const { mode, setOpen, ...otherOptions } = options;
  const title = getTitle(mode);

  const RenderSwitch = (): JSX.Element => {
    switch (options.mode) {
      case WorkerDrawerMode.ADD_NEW:
        return <WorkerEditComponent setOpen={setOpen} mode={WorkerEditComponentMode.ADD} />;
      case WorkerDrawerMode.EDIT:
        return (
          <WorkerEditComponent
            setOpen={setOpen}
            {...options.worker}
            mode={WorkerEditComponentMode.EDIT}
          />
        );
      case WorkerDrawerMode.INFO:
        return <WorkerInfoComponent workerName={options.worker.name} />;
      default:
        // In other case typescript compiler rejects, to compile code
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        throw new Error(`Cannot return component for mode ${(options as any).mode}`);
    }
  };

  return (
    <Drawer setOpen={setOpen} title={title} {...otherOptions} data-cy="worker-drawer">
      <RenderSwitch />
    </Drawer>
  );
}
