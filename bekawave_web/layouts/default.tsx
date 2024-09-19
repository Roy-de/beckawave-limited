import React from "react";

import { useModal } from "@/src/context/ModalContext";
import { ModalProvider } from "@/src/providers/ModalProvider";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isModalOpen, modalContent } = useModal();

  return (
    <div className="relative flex flex-col h-screen w-screen text-black">
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
