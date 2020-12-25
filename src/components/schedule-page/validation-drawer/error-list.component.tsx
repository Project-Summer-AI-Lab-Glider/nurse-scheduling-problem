import React from "react";
import { ScheduleErrorMessageModel } from "../../../common-models/schedule-error-message.model";
import { FoldingSection } from "../../common-components";
import ErrorListItem from "./error-list-item.component";

interface Options {
  errors?: ScheduleErrorMessageModel[];
}

export default function ErrorList({ errors = [] }: Options): JSX.Element {
  return (
    <FoldingSection name="Errors">
      <div className="scrollableContainer75vh">
        {errors?.length > 0 &&
          errors.map(
            (error, index): JSX.Element => (
              <ErrorListItem key={error.message.substr(2, 9) + index} error={error} />
            )
          )}
        {errors?.length === 0 && <span>Nie znaleziono błędów</span>}
      </div>
    </FoldingSection>
  );
}