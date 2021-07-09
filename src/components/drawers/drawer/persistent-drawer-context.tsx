/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface PersistentDrawerContextValues {
  title: string | undefined;
  setTitle: (title: string) => void;
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
  childrenComponent: JSX.Element | undefined;
  setChildrenComponent: (component: JSX.Element) => void;
}

export const PersistentDrawerContext = createContext<PersistentDrawerContextValues | null>(null);

export function PersistentDrawerProvider({ children }: { children: ReactNode }): JSX.Element {
  const [title, setTitle] = useState<string>();
  const [open, setOpen] = useState<boolean>();
  const [childrenComponent, setChildrenComponent] = useState<JSX.Element>();

  return (
    <PersistentDrawerContext.Provider
      value={{
        title,
        setTitle,
        open,
        setOpen,
        childrenComponent,
        setChildrenComponent,
      }}
    >
      {children}
    </PersistentDrawerContext.Provider>
  );
}

export function usePersistentDrawer(): PersistentDrawerContextValues {
  const context = useContext(PersistentDrawerContext);

  if (!context)
    throw new Error("usePersistentDrawer have to be used within PersistentDrawerProvider");

  return context;
}
