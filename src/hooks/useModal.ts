import { useState } from 'react';

export const useModal = () => {
  const [isOpened, setOpened] = useState(false);
  const openModal = () => setOpened(true);
  const closeModal = () => setOpened(false);

  return {
    closeModal,
    isOpened,
    openModal,
  };
};
