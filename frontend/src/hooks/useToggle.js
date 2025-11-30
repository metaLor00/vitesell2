import { useState } from 'react';

export const useToggle = (toggleClass) => {
  const [flag, toggleIt] = useState(false);

  function toggle() {
    toggleIt(!flag);
  }

  function handle(e) {
    const { target } = e;
    toggle();

    if (flag) {
      target.classList.add(toggleClass);
    } else {
      target.classList.remove(toggleClass);
    }
  }

  return [flag, toggle, handle];
};
