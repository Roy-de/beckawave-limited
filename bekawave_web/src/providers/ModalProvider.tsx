import React, { ReactNode, useState } from "react";

import { ModalContext } from "../context/ModalContext";

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
