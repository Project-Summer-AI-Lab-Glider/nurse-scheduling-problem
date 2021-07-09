/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

interface SnackbarComponentOptions {
  alertMessage: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SnackbarComponent({
  alertMessage,
  open,
  setOpen,
}: SnackbarComponentOptions): JSX.Element {
  function handleClose(event?: React.SyntheticEvent, reason?: string): void {
    if (reason === "clickaway") return;

    setOpen(false);
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} elevation={6} variant="filled" severity="warning">
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
}
