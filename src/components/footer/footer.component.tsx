/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import * as S from "./footer.styled";
import gliderLogo from "../../assets/images/gliderLogo.png";
import { latestAppVersion } from "../../api/latest-github-version";
import { t } from "../../helpers/translations.helper";

export function Footer(): JSX.Element {
  const [latestVersion, setLatestVersion] = useState("");
  useEffect(() => {
    const awaitVersion = async (): Promise<void> => {
      const version = await latestAppVersion;
      setLatestVersion(version);
    };
    awaitVersion();
  }, []);

  return (
    <S.Container container justify="space-between" alignItems="center">
      <Grid item>{latestVersion && `${t("version")}: ${latestVersion}`}</Grid>
      <Grid item>
        {t("realization")}
        <a href="http://www.glider.agh.edu.pl/" target="_blank" rel="noopener noreferrer">
          <S.Logo src={gliderLogo} alt="Logo koła naukowego Glider" />
          Glider
        </a>
      </Grid>
      <Grid item>
        <a href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/img/global/badges/netlify-light.svg"
            alt="Deploys by Netlify"
          />
        </a>
      </Grid>
    </S.Container>
  );
}
