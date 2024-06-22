import React, { useState } from 'react';
import Minus from '@/assets/svgs/btn-minus.svg';
import Plus from '@/assets/svgs/btn-plus.svg';
import styles from './NumberInput.module.scss';

export default function NumberInput({ initialAmount }: { initialAmount: number }) {
  const [count, setCount] = useState(initialAmount);

  const increment = () => {
    setCount(prevCount => prevCount + 1); // 이전 상태를 기반으로 +1 증가
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1); // 이전 상태를 기반으로 -1 감소 (0 미만으로 내려가지 않음)
    }
  };

  return (
    <div className={styles.input}>
      <button className={styles.leftButton} onClick={decrement}>
        <Minus className={styles.icon} />
      </button>
      <div className={styles.numberBackground}>
        <h2 className={styles.number}>{count}</h2>
      </div>
      <button className={styles.rightButton} onClick={increment}>
        <Plus className={styles.icon} />
      </button>
    </div>
  );
}
