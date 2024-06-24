import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';

import styles from './OrderCard.module.scss';

const cx = classNames.bind(styles);

interface OrderCardButton {
  status: number;
  buttons: { id: number; name: string; disabled: boolean; onClick: MouseEventHandler<HTMLButtonElement> }[][];
}

export default function OrderCardButton({ status, buttons }: OrderCardButton) {
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
            <button
              key={item.id}
              className={cx('cardButton', { reviewButton: buttons.indexOf(button) === 2 })}
              onClick={item.onClick}
              disabled={item.disabled}>
              {item.name}
            </button>
          ))
      )}
    </div>
  );
}
