import { useEffect, useState } from 'react';

/*
  스크롤을 minHeight 만큼 내렸을 때 보이고 싶을 때 사용하는 훅입니다.

  사용)
  export default function Example() {
    const { isShow } = useTargetHeightShow();

    return (
      <div style={{ display: isShow ? 'block' : 'none' }}>보이나요?</div>
    );
  }
*/
export default function useTargetHeightShow(minHeight: number = 500) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > minHeight) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, [minHeight]);

  return {
    isShow,
  };
}
