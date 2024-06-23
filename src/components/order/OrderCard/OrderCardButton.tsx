import React from 'react';
import Button from '@/components/common/Button';

import styles from './OrderCard.module.scss';

interface OrderCardButton {
  onClick: () => void;
}

export default function OrderCardButton({ onClick }: OrderCardButton) {
  //const FirstButton = {name: }

  return (
    <div className={styles.orderCardButtons}>
      <Button size="small" backgroundColor="$color-white-gray" onClick={onClick}>
        주문 취소
      </Button>
      <Button size="small" backgroundColor="$color-gray-100" onClick={onClick}>
        배송 조회
      </Button>
      <Button size="small" backgroundColor="$color-gray-100" onClick={onClick}>
        리뷰 쓰기
      </Button>
    </div>
  );
}
