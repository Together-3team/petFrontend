import { useEffect, useState } from 'react';

export default function useScrollUpAndDown(minScrollY: number = 0) {
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > minScrollY) {
        setIsUp(false);
      } else {
        setIsUp(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [minScrollY]);

  return {
    isUp,
    isDown: !isUp,
  };
}
