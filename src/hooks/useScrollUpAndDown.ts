import { useEffect, useState } from 'react';

/*
  상하 스크롤을 감지하는 훅입니다.
  minScrollY로 최소 스크롤 위치를 지정할 수 있습니다.

  사용)
  export default function Example() {
    const { isUp } = useScrollUpAndDown();

    return (
      <div style={{ display: isUp ? 'block' : 'none' }}>보이나요?</div>
    );
  }
*/
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
