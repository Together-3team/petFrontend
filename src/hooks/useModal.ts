import { useState } from 'react';

export interface useModalProps {
  modalOpen: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

export default function useModal() {
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return {
    modalOpen,
    handleModalOpen,
    handleModalClose,
  };
}
