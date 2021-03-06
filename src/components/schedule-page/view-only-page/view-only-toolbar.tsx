/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect } from "react";
import { ImportButtonsComponent } from "../import-buttons/import-buttons.component";
import { useHistory } from "react-router-dom";
import { Button } from "../../common-components";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStateModel } from "../../../state/models/application-state.model";
import { RevisionReducerActionCreator } from "../../../state/reducers/month-state/revision-info.reducer";
import { isRevisionType, RevisionTypeLabels } from "../../../api/persistance-store.model";
import classNames from "classnames/bind";
import { VerboseDateHelper } from "../../../helpers/verbose-date.helper";

interface ViewOnlyToolbarOptions {
  openEdit: () => void;
}
export function ViewOnlyToolbar({ openEdit }: ViewOnlyToolbarOptions): JSX.Element {
  const [isEditDisable, setEditDisable] = React.useState<boolean>(false);
  const [isMonthFromFuture, setIsMonthFromFuture] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const { year, month_number: month } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present.schedule_info
  );

  const { isAutoGenerated: isAutoGeneratedSchedule } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present
  );

  const { isCorrupted } = useSelector(
    (state: ApplicationStateModel) => state.actualState.persistentSchedule.present
  );

  const { revision } = useSelector((state: ApplicationStateModel) => state.actualState);

  useEffect(() => {
    const isFuture = VerboseDateHelper.isMonthInFuture(month, year);
    setIsMonthFromFuture(isFuture);

    const isRevisionEditDisable = revision === "actual" ? false : !isFuture;
    setEditDisable(isRevisionEditDisable || isCorrupted);
  }, [year, month, revision, isCorrupted]);

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: string }>): void => {
    const currentRev = event.target.value;
    if (isRevisionType(currentRev)) {
      dispatch(RevisionReducerActionCreator.changeRevision(currentRev));
    }
  };

  const onEditClick = (): void => {
    openEdit();
    history.push("/schedule-editing");
  };

  return (
    <>
      {" "}
      {!isAutoGeneratedSchedule && (
        <div className="buttons">
          <div className="revision-type-container">
            {isMonthFromFuture ? (
              <p>{RevisionTypeLabels[revision]}</p>
            ) : (
              <form>
                <select
                  value={revision}
                  onChange={handleChange}
                  className="revision-select"
                  data-cy="revision-select"
                >
                  <option value="primary" data-cy="primary-revision">
                    {RevisionTypeLabels["primary"]}
                  </option>
                  <option value="actual" data-cy="actual-revision">
                    {RevisionTypeLabels["actual"]}
                  </option>
                </select>
              </form>
            )}
          </div>
          <div className="filler" />
          <ImportButtonsComponent />
          <Button
            onClick={onEditClick}
            size="small"
            className={classNames({ "disabled-submit-button": isEditDisable })}
            variant="primary"
            data-cy="edit-mode-button"
            disabled={isEditDisable}
          >
            Edytuj
          </Button>
        </div>
      )}
    </>
  );
}
