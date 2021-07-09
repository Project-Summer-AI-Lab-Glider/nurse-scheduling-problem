/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";

import { Notification, NotificationContextValues, NotificationTimeout } from "./types";
import { NotificationList } from "./notification-snackbar.component";

export const NotificationContext = createContext<NotificationContextValues | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }): JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutList = useRef<NotificationTimeout[]>([]);
  const defaultDuration = 5000;

  const deleteNotification = useCallback((id: number) => {
    timeoutList.current.filter((item) => item.id === id);
    setNotifications((prevNotifications) => prevNotifications.filter((item) => item.id !== id));
  }, []);

  const createNotification = useCallback(
    (notificationBase: Notification) => {
      const id = +new Date();

      const newNotification = {
        ...notificationBase,
        id,
        duration: notificationBase.duration || defaultDuration,
      };

      const timeout = setTimeout(() => deleteNotification(id), newNotification.duration);

      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      timeoutList.current.push({ id, timeout });
    },
    [deleteNotification]
  );

  useEffect(
    () => (): void => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutList.current.forEach(({ timeout }) => clearTimeout(timeout));
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ notifications, createNotification, deleteNotification }}>
      {children}
      <NotificationList />
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValues {
  const context = useContext(NotificationContext);

  if (!context) throw new Error("useNotification have to be used within NotificationProvider");

  return context;
}
