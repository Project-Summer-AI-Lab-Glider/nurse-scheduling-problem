/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { Grid } from "@material-ui/core";
import * as _ from "lodash";
import React from "react";
import { Team } from "../../../../state/schedule-data/worker-info/worker-info.model";
import { TEAM_PREFIX } from "../../../../logic/schedule-parser/workers-info.parser";
import {
  ButtonData,
  DropdownButtons,
} from "../../../buttons/dropdown-buttons/dropdown-buttons.component";
import { FormFieldOptions } from "./worker-edit.models";
import { t } from "../../../../helpers/translations.helper";
import * as S from "./worker.styled";

interface TeamSelectorOptions extends FormFieldOptions {
  setTeam: (team: Team) => void;
  team: Team;
}

export function TeamSelector({ setTeam, team }: TeamSelectorOptions): JSX.Element {
  function handleTeamUpdate(newTeam: Team): void {
    setTeam(newTeam);
  }

  const defaultTeams = _.range(1, 6).map((i) => `${TEAM_PREFIX} ${i}` as Team);

  const teamsOptions: ButtonData[] = defaultTeams.map((teamName) => ({
    label: teamName,
    action: (): void => handleTeamUpdate(teamName),
    dataCy: teamName.toLowerCase(),
  }));

  return (
    <Grid item xs={6}>
      <S.Label>{t("workerTeam")}</S.Label>
      <DropdownButtons
        dataCy="team-dropdown"
        buttons={teamsOptions}
        mainLabel={team}
        buttonVariant="secondary"
        width={134}
      />
    </Grid>
  );
}
