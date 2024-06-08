import { useContext } from 'react';

import { ToastContext } from '@/components/common/Toast/Provider';

/*
  토스트를 사용할 때 useToast를 제외하고 토스트와 관련된 다른 파일은 신경쓰지 않아도 됩니다.

  사용)
  export default function Example() {
    const { showToast } = useToast();

    const handleCart = () => {
      showToast({
        status: 'success',
        message: '장바구니에 담겼어요!',
        linkMessage: '장바구니로 가기',
        linkProps: {
          href: '/cart',
        },
      });
    };

    const handleError = () => {
      showToast({
        status: 'error',
        message: '에러가 발생했어요!',
      });
    };

    return (
      <div>
        <button type="button" onClick={handleCart}>장바구니 담기</button>
        <button type="button" onClick={handleError}>에러 발생</button>
      </div>
    )
  }
*/
export default function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider 안에서 사용해 주세요.');
  }

  const { showToast, hideToast } = context;

  return { showToast, hideToast };
}
