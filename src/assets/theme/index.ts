/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { purple } from "./light";
import FontStyles from "./FontStyles";

export type ThemeKey = "purple";

export interface CustomThemeProps {
  primary: string;
  primaryHover: string;
  primaryText: string;
  background: string;
  type: "dark" | "light";
}

const ThemeConstants = {
  fonts: ["Roboto"],
  FontStyles,
};
type ThemeConstantsType = typeof ThemeConstants;

export interface Theme extends CustomThemeProps, ThemeConstantsType {}

const enchanceTheme = (theme: CustomThemeProps): Theme => ({ ...theme, ...ThemeConstants });

export const themes = {
  purple: enchanceTheme(purple),
};
