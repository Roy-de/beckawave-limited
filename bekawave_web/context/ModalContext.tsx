import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContentType {
  isModalOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode;
}

const ModalContext = createContext<ModalContentType | undefined>(undefined);

export const useModal = (): ModalContentType => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within ModalContext");
  }

  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, modalContent }}
    >
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          {modalContent}
        </div>
      )}
    </ModalContext.Provider>
  );
};
