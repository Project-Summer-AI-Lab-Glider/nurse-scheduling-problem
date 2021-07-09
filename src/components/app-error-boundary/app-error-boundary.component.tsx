/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import React, { ReactNode, useCallback, useState } from "react";
import * as Sentry from "@sentry/react";
import AppErrorModal from "../modals/app-error-modal/app-error.modal.component";

interface AppErrorBoundaryOptions {
  children: ReactNode;
}

export function AppErrorBoundary(props: AppErrorBoundaryOptions): JSX.Element {
  const [open, setIsOpen] = useState(false);
  const fallback = useCallback(
    ({ resetError }): JSX.Element => (
      <AppErrorModal onClick={resetError} open={open} setOpen={setIsOpen} />
    ),
    [open, setIsOpen]
  );

  const onError = useCallback((): void => {
    setIsOpen(true);
  }, [setIsOpen]);

  return <Sentry.ErrorBoundary fallback={fallback} onError={onError} {...props} />;
}
