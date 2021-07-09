/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useMemo } from "react";
import TabContext from "@material-ui/lab/TabContext";
import * as S from "./route-buttons.styled";

export interface Tabs {
  label: string;
  component: JSX.Element;
  dataCy: string;
  onChange?: () => void;
}

interface RouteButtonsOptions {
  tabs: Tabs[];
  tabLabel: string;
  disabled?: boolean;
}

export default function RouteButtonsComponent(props: RouteButtonsOptions): JSX.Element {
  const { tabs, tabLabel } = props;
  if (tabs.length === 0) {
    throw Error("Component cannot be called without tabs");
  }

  const tabContents = useMemo(
    () =>
      tabs.map((tab) => (
        <S.TabPanel value={tab.label} key={tab.label}>
          {tab.component}
        </S.TabPanel>
      )),
    [tabs]
  );

  return (
    <S.Wrapper>
      <TabContext value={tabLabel}>{tabContents}</TabContext>
    </S.Wrapper>
  );
}
