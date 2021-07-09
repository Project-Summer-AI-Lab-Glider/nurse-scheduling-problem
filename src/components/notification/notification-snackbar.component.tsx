/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React from "react";
import { Box } from "@material-ui/core";
import * as S from "./notification-snackbar.styled";
import { Notification } from "./types";
import { useNotification } from "./notification.context";
import { Alert } from "./alert.component";

export interface NotificationSnackbarOptions {
  notification: Notification;
}

export function NotificationSnackbar({ notification }: NotificationSnackbarOptions): JSX.Element {
  const { type, message } = notification;

  return (
    <S.Snackbar open autoHideDuration={8000}>
      <Alert severity={type}>{message}</Alert>
    </S.Snackbar>
  );
}

export function NotificationList(): JSX.Element {
  const { notifications } = useNotification();

  if (!notifications.length) return <></>;

  return (
    <S.List>
      {notifications.map((notification) => (
        <Box key={notification.id}>
          <NotificationSnackbar notification={notification} />
        </Box>
      ))}
    </S.List>
  );
}
