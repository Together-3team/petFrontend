import { useContext, useEffect } from 'react';

import { ToastContext } from '@/components/common/Toast/Provider';

/*
  토스트를 사용할 때 useToast를 제외하고 토스트와 관련된 다른 파일은 신경쓰지 않아도 됩니다.
  ➕'장바구니로 가기'와 같은 링크 기능이 필요할 경우 'linkMessage'와 'linkProps'를 사용해 주세요.

  주의❗️)
  fixed된 바텀 요소가 있을 경우 그 요소에 id를 주고 useToast를 호출할 때 id를 넘겨줘야 합니다.
  또, 바텀 모달을 사용하는 경우 모달을 열고 닫을 때 setPortalId를 호출해야 합니다.

  위의 주의 사항은 토스트가 뜨는 위치를 하단에 고정된 요소가 있을 경우 그 요소의 y축 위로 올리기 위함입니다.

  사용⭐️)
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
export default function useToast(id?: string) {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('ToastProvider 안에서 사용해 주세요.');
  }

  const { showToast, hideToast, setPortalId } = context;

  useEffect(() => {
    if (id) {
      setPortalId(id);
    }
  }, [id, setPortalId]);

  return { showToast, hideToast, setPortalId };
}
