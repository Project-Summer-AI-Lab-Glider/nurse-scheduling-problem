/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { createContext, ReactNode, useContext, useState } from "react";

export enum AppMode {
  SCHEDULE = "SCHEDULE",
  MANAGEMENT = "MANAGEMENT",
}

export interface AppConfigOptions {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export const AppConfigContext = createContext<AppConfigOptions | null>(null);

export function AppConfigProvider({ children }: { children: ReactNode }): JSX.Element {
  const [mode, setMode] = useState<AppMode>(AppMode.SCHEDULE);

  return (
    <AppConfigContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig(): AppConfigOptions {
  const context = useContext(AppConfigContext);

  if (!context) throw new Error("useAppConfig have to be used within AppConfigProvider");

  return context;
}
