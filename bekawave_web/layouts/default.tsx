import React from "react";

import { ModalProvider, useModal } from "@/context/ModalContext";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isModalOpen, modalContent } = useModal();

  return (
    <div className="relative flex flex-col h-full w-full bg-gradient-to-tr from-[#0e1c35] via-black to-[#1a032a]">
      <div
        className={`transition-all duration-300 ${isModalOpen ? "bg-slate-950 bg-opacity-95 blur-sm" : ""}`}
      >
        <main>
          {children}
          <ModalProvider>{modalContent}</ModalProvider>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
