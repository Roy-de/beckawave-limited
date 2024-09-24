import React, { useEffect } from "react";

import { useNotification } from "@/src/context/NotificationContext";

const Notification: React.FC = () => {
  const { state, dispatch } = useNotification();

  useEffect(() => {
    if (state.message || state.error) {
      // Automatically clear the notification after 5 seconds
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATIONS" });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.message, state.error, dispatch]);

  if (!state.message && !state.error) {
    return null; // Don't render anything if there's no message or error
  }

  return (
    <div
      className={`fixed top-5 right-5 w-fit h-fit py-4 px-8 rounded-3xl shadow-lg font-bold font-baloo border ${
        state.error
          ? "bg-red-100 text-red-500 border-red-500"
          : "bg-green-100 text-green-500 border-green-500"
      }`}
    >
      {state.error || state.message}
    </div>
  );
};

export default Notification;
