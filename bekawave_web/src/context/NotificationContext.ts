import React, { createContext, useContext } from "react";

import {
  NotificationAction,
  NotificationState,
} from "@/types/states_and_actions";

/**
 * Interface representing the properties provided by the NotificationContext
 */
export interface NotificationContextProps {
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
}

export const initialState: NotificationState = {
  message: undefined,
  error: undefined,
};

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within a provider");
  }

  return context;
};
