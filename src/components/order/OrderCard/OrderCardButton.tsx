import React from 'react';
import Button from '@/components/common/Button';

import styles from './OrderCard.module.scss';

interface OrderCardButton {
  onClick: () => void;
  status: number;
}

export default function OrderCardButton({ onClick, status }: OrderCardButton) {
  const firstButton = [
    { id: 1, name: '주문 취소', disabled: false },
    { id: 2, name: '교환/환불', disabled: false },
    { id: 3, name: '교환/환불', disabled: false },
    { id: 4, name: '배송 조회', disabled: false },
  ];

  const secondButton = [
    { id: 1, name: '배송 조회', disabled: true },
    { id: 2, name: '배송 조회', disabled: false },
    { id: 3, name: '배송 조회', disabled: false },
    { id: 4, name: '교환/환불', disabled: true },
  ];

  const thirdButton = [
    { id: 1, name: '리뷰 쓰기', disabled: true },
    { id: 2, name: '리뷰 쓰기', disabled: true },
    { id: 3, name: '리뷰 쓰기', disabled: false },
    { id: 4, name: '리뷰 쓰기', disabled: true },
  ];

  return (
    <div className={styles.orderCardButtons}>
      {[firstButton, secondButton, thirdButton].map((buttonArray, index) =>
        buttonArray
          .filter(item => {
            switch (status) {
              case 0:
              case 2:
              case 3:
                return item.id === 1;
              case 4:
                return item.id === 2;
              case 5:
                return item.id === 3;
              case 6:
                return item.id === 4;
              default:
                return false;
            }
          })
          .map(item => (
            <Button
              key={item.id}
              size="small"
              backgroundColor="$color-white-gray"
              onClick={onClick}
              disabled={item.disabled}>
              {item.name}
            </Button>
          ))
      )}
    </div>
  );
}
