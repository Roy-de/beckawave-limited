import {
  NotificationAction,
  NotificationState,
} from "@/types/states_and_actions";

export const notificationReducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.payload, error: undefined };
    case "SET_ERROR":
      return { ...state, message: undefined, error: action.payload };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, message: undefined, error: undefined };
    default:
      return state;
  }
};
