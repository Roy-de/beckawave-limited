import React from "react";

import { NotificationProvider } from "@/src/providers/NotificationProvider";
import Notification from "@/components/notification";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="relative flex flex-col h-screen w-screen text-black">
      <div className={`transition-all duration-300`}>
        <NotificationProvider>
          <Notification />
          <main>{children}</main>
        </NotificationProvider>
      </div>
    </div>
  );
};

export default DefaultLayout;
