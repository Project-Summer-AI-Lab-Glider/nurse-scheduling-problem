/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./foundation-info.styled";
import { DataRowHelper } from "../../../helpers/data-row.helper";
import { DataRow } from "../../../logic/schedule-logic/data-row";
import { ChildrenSectionKey, ExtraWorkersSectionKey } from "../../../logic/section.model";
import { updateChildrenAndExtraworkers } from "../../../state/schedule-data/foundation-info/foundation-info.action-creator";
import { NameTableComponent } from "../worker-info-section/name-table/nametable.component";
import { ScheduleMode } from "../schedule-state.model";
import { BaseSectionComponent } from "../base/base-section/base-section.component";
import { SelectionMatrix } from "../base/base-section/use-selection-matrix";
import { useFoundationInfo } from "../../../hooks/use-foundation-info";
import { getActualMode } from "../../../state/schedule-data/selectors";
import { TEMPORARY_SCHEDULE_NAME, PERSISTENT_SCHEDULE_NAME } from "../../../state/app.reducer";

export function FoundationInfoComponent(): JSX.Element {
  const { childrenNumber, extraWorkers } = useFoundationInfo();

  const mode = useSelector(getActualMode);

  const isEditMode = mode === ScheduleMode.Edit;

  const sectionData = [
    new DataRow(ChildrenSectionKey.RegisteredChildrenCount, childrenNumber, isEditMode),
    new DataRow(ExtraWorkersSectionKey.ExtraWorkersCount, extraWorkers, isEditMode),
  ];

  const dispatch = useDispatch();
  const updateFoundationInfoData = useCallback(
    (selectionMatrix: SelectionMatrix, oldData: DataRow<string>[], newValue: string) => {
      const updatedDataRows = DataRowHelper.copyWithReplaced<number>(
        selectionMatrix,
        oldData.map((row) => new DataRow(row.rowKey, row.rowData(true, false))),
        parseInt(newValue, 10)
      );
      const updatedFoundationInfo = DataRowHelper.dataRowsAsValueDict<number>(updatedDataRows);
      const action = {
        childrenNumber: updatedFoundationInfo[ChildrenSectionKey.RegisteredChildrenCount],
        extraWorkers: updatedFoundationInfo[ExtraWorkersSectionKey.ExtraWorkersCount],
      };

      dispatch(
        updateChildrenAndExtraworkers(
          isEditMode ? TEMPORARY_SCHEDULE_NAME : PERSISTENT_SCHEDULE_NAME
        )(action)
      );
    },
    [dispatch, isEditMode]
  );
  return (
    <S.SectionContainer className="borderContainer">
      <NameTableComponent data={sectionData} isWorker={false} />
      <S.FoundationSectionWrapper data-cy="foundationInfoSection">
        <BaseSectionComponent
          sectionKey="foundationInfo"
          data={sectionData}
          updateData={updateFoundationInfoData}
        />
      </S.FoundationSectionWrapper>
    </S.SectionContainer>
  );
}
