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
      className={`fixed bottom-5 right-5 w-96 h-12 p-4 rounded shadow-lg ${
        state.error ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {state.error || state.message}
    </div>
  );
};

export default Notification;
