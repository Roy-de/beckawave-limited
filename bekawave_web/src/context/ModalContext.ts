import { createContext, ReactNode, useContext } from "react";

interface ModalContentType {
  isModalOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode;
}

export const ModalContext = createContext<ModalContentType | undefined>(
  undefined,
);

export const useModal = (): ModalContentType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within ModalContext");
  }

  return context;
};
