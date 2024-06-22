import { useState } from 'react';

export interface useModalProps {
  secondModalOpen: boolean;
  handleSecondModalOpen: () => void;
  handleSecondModalClose: () => void;
}

export default function useSecondModal() {
  const [secondModalOpen, setSecondModalOpen] = useState(false);

  function handleSecondModalOpen() {
    setSecondModalOpen(true);
  }

  function handleSecondModalClose() {
    setSecondModalOpen(false);
  }

  return {
    secondModalOpen,
    handleSecondModalOpen,
    handleSecondModalClose,
  };
}
