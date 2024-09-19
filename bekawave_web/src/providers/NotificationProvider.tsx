import React, { ReactNode, useReducer } from "react";

import { notificationReducer } from "@/src/reducers/NotificationReducers";
import {
  initialState,
  NotificationContext,
} from "@/src/context/NotificationContext";

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
