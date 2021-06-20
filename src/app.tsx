/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import CustomThemeProvider from "./assets/theme/CustomThemeProvider";
import schedule from "./assets/devMode/schedule";
import { ScheduleDataModel } from "./state/schedule-data/schedule-data.model";
import { HeaderComponent } from "./components/common-components";
import RouteButtonsComponent, {
  Tabs,
} from "./components/buttons/route-buttons/route-buttons.component";
import { SchedulePage } from "./pages/schedule-page/schedule-page.component";
import ManagementPage from "./pages/management-page/management-page.component";
import { ScheduleDataActionCreator } from "./state/schedule-data/schedule-data.action-creator";
import { NotificationProvider } from "./components/notification/notification.context";
import { Footer } from "./components/footer/footer.component";
import PersistentDrawer from "./components/drawers/drawer/persistent-drawer.component";
import { PersistentDrawerProvider } from "./components/drawers/drawer/persistent-drawer-context";
import { AppMode, useAppConfig } from "./state/app-config-context";
import { cropScheduleDMToMonthDM } from "./logic/schedule-container-converter/schedule-container-converter";
import { ImportModalProvider } from "./components/buttons/import-buttons/import-modal-context";
import NewVersionModal from "./components/modals/new-version-modal/new-version.modal.component";
import { CookiesProvider } from "./logic/data-access/cookies-provider";
import { ScheduleKey } from "./logic/data-access/persistance-store.model";
import { latestAppVersion } from "./api/latest-github-version";
import { t } from "./helpers/translations.helper";
import * as S from "./app.styled";
import {
  getPresentScheduleInfo,
  getPresentScheduleIsAutogenerated,
  getPresentScheduleIsCorrupted,
} from "./state/schedule-data/selectors";
import { GlobalStyle } from "./assets/theme/GlobalStyles";

const theme = createMuiTheme();

function App(): JSX.Element {
  const scheduleDispatcher = useDispatch();
  const [disableRouteButtons, setDisableRouteButtons] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setMode } = useAppConfig();
  const { month_number: month, year } = useSelector(getPresentScheduleInfo);
  const isAutoGenerated = useSelector(getPresentScheduleIsAutogenerated);
  const isCorrupted = useSelector(getPresentScheduleIsCorrupted);
  const tabs: Tabs[] = useMemo(
    () => [
      {
        label: t("schedule"),
        component: (
          <SchedulePage
            editModeHandler={(val) => {
              setDisableRouteButtons(val);
            }}
          />
        ),
        onChange: (): void => setMode(AppMode.SCHEDULE),
        dataCy: "btn-schedule-tab",
      },
      {
        label: t("management"),
        component: <ManagementPage />,
        onChange: (): void => setMode(AppMode.MANAGEMENT),
        dataCy: "btn-management-tab",
      },
    ],
    [setDisableRouteButtons, setMode]
  );
  useEffect(() => {
    setDisableRouteButtons(isAutoGenerated || isCorrupted);
  }, [isAutoGenerated, isCorrupted]);

  const fetchGlobalState = useCallback(() => {
    if (process.env.REACT_APP_DEV_MODE === "true") {
      const monthModel = cropScheduleDMToMonthDM(schedule as ScheduleDataModel);
      const action = ScheduleDataActionCreator.setScheduleFromMonthDMAndSaveInDB(monthModel);
      scheduleDispatcher(action);
    } else {
      const action = ScheduleDataActionCreator.setScheduleIfExistsInDb(
        new ScheduleKey(month, year),
        "actual"
      );

      scheduleDispatcher(action);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchGlobalState();
  }, [fetchGlobalState]);

  useEffect(() => {
    const checkVersions = async (): Promise<void> => {
      const localVersion = CookiesProvider.getAppVersion();
      const githubVersion = await latestAppVersion;
      if (localVersion !== githubVersion) {
        CookiesProvider.setAppVersion(githubVersion);
        localVersion && setIsModalOpen(true);
      }
    };
    checkVersions();
  }, []);

  return (
    // Two theme providers: https://github.com/mui-org/material-ui/issues/10098#issuecomment-574162533
    <>
      <GlobalStyle />
      <MuiThemeProvider theme={theme}>
        <CustomThemeProvider>
          <NotificationProvider>
            <PersistentDrawerProvider>
              <ImportModalProvider>
                <Switch>
                  <Route path="/">
                    <S.Root>
                      <S.Content>
                        <HeaderComponent />
                        <RouteButtonsComponent tabs={tabs} disabled={disableRouteButtons} />
                        <Footer />
                      </S.Content>
                      <S.Drawer>
                        <PersistentDrawer width={690} />
                      </S.Drawer>
                      <NewVersionModal open={isModalOpen} setOpen={setIsModalOpen} />
                    </S.Root>
                  </Route>
                </Switch>
              </ImportModalProvider>
            </PersistentDrawerProvider>
          </NotificationProvider>
        </CustomThemeProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
