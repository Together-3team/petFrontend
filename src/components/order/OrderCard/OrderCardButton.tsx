import React, { MouseEventHandler } from 'react';

import styles from './OrderCard.module.scss';

interface OrderCardButton {
  status: number;
  buttons: { id: number; name: string; disabled: boolean; onClick: MouseEventHandler<HTMLButtonElement> }[][];
}

export default function OrderCardButton({ status, buttons }: OrderCardButton) {
  // const firstButton = [
  //   { id: 1, name: '주문 취소', disabled: false, onClick: handleCancelPurchase(id)},
  //   { id: 2, name: '교환/환불', disabled: false, onClick: handleExchangeOrRefund(id)},
  //   { id: 3, name: '교환/환불', disabled: false, onClick: handleExchangeOrRefund(id) },
  //   { id: 4, name: '배송 조회', disabled: false, onClick: handleExchangeOrRefund(id)},
  // ];

  // const secondButton = [
  //   { id: 1, name: '배송 조회', disabled: true onClick: handleExchangeOrRefund(id)},
  //   { id: 2, name: '배송 조회', disabled: false onClick: handleExchangeOrRefund(id)},
  //   { id: 3, name: '배송 조회', disabled: false onClick: handleExchangeOrRefund(id)},
  //   { id: 4, name: '교환/환불', disabled: true },
  // ];

  // const thirdButton = [
  //   { id: 1, name: '리뷰 쓰기', disabled: true },
  //   { id: 2, name: '리뷰 쓰기', disabled: true },
  //   { id: 3, name: '리뷰 쓰기', disabled: false },
  //   { id: 4, name: '리뷰 쓰기', disabled: true },
  // ];

  return (
    <div className={styles.orderCardButtons}>
      {buttons.map(button =>
        button
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
            <button key={item.id} className={styles.cardButton} onClick={item.onClick} disabled={item.disabled}>
              {item.name}
            </button>
          ))
      )}
    </div>
  );
}
