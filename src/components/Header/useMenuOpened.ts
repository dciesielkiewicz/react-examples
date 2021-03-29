import { useState } from 'react';

export const useMenuOpened = () => {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const openMenu = () => setMenuOpened(true);
  const closeMenu = () => setMenuOpened(false);

  return {
    closeMenu,
    isMenuOpened,
    openMenu,
  }
};
