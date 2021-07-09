/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import * as S from "./footer.styled";
import { latestAppVersion } from "../../api/latest-github-version";
import { t } from "../../helpers/translations.helper";
import GliderLogo from "../../assets/images/svg-components/GliderLogo";

export function Footer(): JSX.Element {
  const [latestVersion, setLatestVersion] = useState("");
  useEffect(() => {
    const awaitVersion = async (): Promise<void> => {
      const version = await latestAppVersion;
      setLatestVersion(version);
    };
    awaitVersion();
  }, []);

  const theme = useTheme();

  return (
    <S.Container>
      <S.Part style={{ justifyContent: "flex-start" }}>
        <p style={{ ...theme.FontStyles.roboto.Regular12px, marginLeft: "16px" }}>
          {latestVersion && `${t("version")}: ${latestVersion}`}
        </p>
      </S.Part>
      <S.Part>
        <a
          style={{
            display: "flex",
            textDecoration: "none",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
            width: "246px",
          }}
          href="http://www.glider.agh.edu.pl/" //nosonar
          target="_blank"
          rel="noopener noreferrer"
        >
          <p style={{ ...theme.FontStyles.roboto.Regular12px, width: "60px" }}>
            {t("realization")}
          </p>
          <div
            style={{
              display: "flex",
              width: "60px",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <GliderLogo style={{ alignSelf: "center" }} />
          </div>

          <p style={{ ...theme.FontStyles.roboto.Regular12px, width: "60px" }}>Glider</p>
        </a>
      </S.Part>
      <S.Part style={{ justifyContent: "flex-end" }}>
        <a href="https://www.netlify.com" style={{ marginRight: "16px" }}>
          <img
            style={{ height: "37px", width: "104px" }}
            src="https://www.netlify.com/img/global/badges/netlify-light.svg"
            alt="Deploys by Netlify"
          />
        </a>
      </S.Part>
    </S.Container>
  );
}
