/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { themes } from ".";
import { getThemeKey } from "../../state/schedule-data/selectors";
import { GlobalStyle } from "./GlobalStyles";

interface ThemeProviderProps {
  children: ReactNode;
}

const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
  const themeKey = useSelector(getThemeKey);
  return (
    <ThemeProvider theme={themes[themeKey]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
