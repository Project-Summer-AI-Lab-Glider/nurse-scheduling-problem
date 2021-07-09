/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export type NotificationType = "success" | "error";

export interface Notification {
  id?: number;
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface NotificationContextValues {
  notifications: Notification[];
  createNotification: (notification: Notification) => void;
  deleteNotification: (id: number) => void;
}

export type NotificationTimeout = {
  id: number;
  timeout: NodeJS.Timeout;
};
