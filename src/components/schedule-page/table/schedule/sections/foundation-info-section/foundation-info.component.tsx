/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataRowHelper } from "../../../../../../helpers/data-row.helper";
import { DataRow } from "../../../../../../logic/schedule-logic/data-row";
import { FoundationSectionKey } from "../../../../../../logic/section.model";
import { ApplicationStateModel } from "../../../../../../state/models/application-state.model";
import { FoundationInfoActionCreator } from "../../../../../../state/reducers/month-state/schedule-data/foundation-info.action-creator";
import { NameTableComponent } from "../../../../../namestable/nametable.component";
import { ScheduleMode } from "../../schedule-state.model";
import { BaseSectionComponent, BaseSectionOptions } from "../base-section/base-section.component";
import { SelectionMatrix } from "../base-section/use-selection-matrix";
import { useFoundationInfo } from "./use-foundation-info";

export type FoundationInfoOptions = Omit<BaseSectionOptions, "sectionKey" | "updateData">;

export function FoundationInfoComponent(options: FoundationInfoOptions): JSX.Element {
  const { childrenNumber, extraWorkers } = useFoundationInfo();

  const { mode } = useSelector((state: ApplicationStateModel) => state.actualState);

  const isEditable = mode === ScheduleMode.Edit;

  const sectionData = [
    new DataRow(FoundationSectionKey.ChildrenCount, childrenNumber, isEditable),
    new DataRow(FoundationSectionKey.ExtraWorkersCount, extraWorkers, isEditable),
  ];

  const dispatch = useDispatch();
  const updateFoundationInfoData = useCallback(
    (selectionMatrix: SelectionMatrix, oldData: DataRow<string>[], newValue: string) => {
      // TODO: Fix unkonw
      const updatedDataRows = DataRowHelper.copyWithReplaced<number>(
        selectionMatrix,
        (oldData as unknown) as DataRow<number>[],
        parseInt(newValue)
      );
      const updatedFoundationInfo = DataRowHelper.dataRowsAsValueDict<number>(updatedDataRows);
      const action = FoundationInfoActionCreator.updateFoundationInfo(
        updatedFoundationInfo[FoundationSectionKey.ChildrenCount],
        updatedFoundationInfo[FoundationSectionKey.ExtraWorkersCount]
      );
      dispatch(action);
    },
    [dispatch]
  );
  return (
    <div style={{ display: "inline-block" }}>
      <div className="sectionContainer borderContainer">
        <div>
          <NameTableComponent data={sectionData} isWorker={false} />
        </div>
        <div>
          <div>
            <div className="table leftContainerBorder" data-cy="foundationInfoSection">
              <BaseSectionComponent
                sectionKey="foundationInfo"
                data={sectionData}
                updateData={updateFoundationInfoData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
