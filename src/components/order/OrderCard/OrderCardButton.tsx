import React from 'react';
import Button from '@/components/common/Button';

import styles from './OrderCard.module.scss';

interface OrderCardButton {
  onClick: () => void;
}

export default function OrderCardButton({ onClick }: OrderCardButton) {
  const firstButton = [
    { id: 1, name: '주문 취소', action: () => {} },
    { id: 2, name: '교환/환불', action: () => {} },
    { id: 3, name: '교환/환불', action: () => {} },
    { id: 4, name: '배송 조회', action: () => {} },
  ];

  const secondButton = [
    { id: 1, name: '배송 조회', disabled: true },
    { id: 2, name: '배송 조회', action: () => {} },
    { id: 3, name: '배송 조회', action: () => {} },
    { id: 4, name: '교환/환불', disabled: true },
  ];

  const thirdButton = [
    { id: 1, name: '리뷰 쓰기', disabled: true },
    { id: 2, name: '리뷰 쓰기', disabled: true },
    { id: 3, name: '리뷰 쓰기', action: () => {} },
    { id: 4, name: '리뷰 쓰기', disabled: true },
  ];

  return (
    <div className={styles.orderCardButtons}>
      {firstButton.map(item => (
        <Button key={item.id} size="small" backgroundColor="$color-white-gray" onClick={onClick}>
          {item.name}
        </Button>
      ))}
      {secondButton.map(item => (
        <Button key={item.id} size="small" backgroundColor="$color-white-gray" onClick={onClick}>
          {item.name}
        </Button>
      ))}
      {thirdButton.map(item => (
        <Button key={item.id} size="small" backgroundColor="$color-white-gray" onClick={onClick}>
          {item.name}
        </Button>
      ))}
    </div>
  );
}
