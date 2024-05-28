import { useState } from 'react';
import styles from './Payment.module.scss';

export default function Payment() {
  return (
    <>
      <div className={styles.payment}>
        <div className={styles.orderProduct}>
          <div className={styles.orderTitle}>
            <div>주문상품</div>
            <div>n개</div>
          </div>
        </div>
      </div>
    </>
  );
}
