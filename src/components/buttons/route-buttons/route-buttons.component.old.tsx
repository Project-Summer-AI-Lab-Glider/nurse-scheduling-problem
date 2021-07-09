/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { useCallback, useMemo } from "react";
import { Divider } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import _ from "lodash";
import * as S from "./route-buttons.styled";

export interface Tabs {
  label: string;
  component: JSX.Element;
  dataCy: string;
  onChange?: () => void;
}

interface RouteButtonsOptions {
  tabs: Tabs[];
  disabled?: boolean;
}

export default function RouteButtonsComponent(props: RouteButtonsOptions): JSX.Element {
  const { tabs, disabled } = props;
  if (tabs.length === 0) {
    throw Error("Component cannot be called without tabs");
  }
  const [tabLabel, setTabLabel] = React.useState(tabs[0]!.label);
  const handleChange = useCallback(
    (event: React.ChangeEvent<unknown>, newValue: string): void => {
      if (disabled) {
        return;
      }
      setTabLabel(newValue);
      const tabObj = _.find(tabs, (tab) => tab.label === newValue);
      if (tabObj && tabObj.onChange) {
        tabObj.onChange();
      }
    },
    [disabled, setTabLabel, tabs]
  );

  const tabTitles = useMemo(
    () =>
      tabs.map((tab) => (
        <S.Tab
          disableRipple
          disabled={disabled}
          key={tab.label}
          label={tab.label}
          value={tab.label}
          data-cy={tab.dataCy}
        />
      )),
    [tabs, disabled]
  );

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
      <TabContext value={tabLabel}>
        <S.HeaderWrapper>
          <S.TabList onChange={!disabled ? handleChange : void 0}>{tabTitles}</S.TabList>
          <Divider />
        </S.HeaderWrapper>
        {tabContents}
      </TabContext>
    </S.Wrapper>
  );
}
