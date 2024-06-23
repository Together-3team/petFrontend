import React, { SetStateAction, useEffect, useState } from 'react';
import Minus from '@/assets/svgs/btn-minus.svg';
import Plus from '@/assets/svgs/btn-plus.svg';
import styles from './NumberInput.module.scss';

interface NumberInput {
  selectedOptionsObject?: { [key: string]: number };
  setSelectedOptionsObject?: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  objectKey?: string;
  setCountChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NumberInput({
  selectedOptionsObject,
  setSelectedOptionsObject,
  objectKey,
  setCountChanged,
}: NumberInput) {
  const [count, setCount] = useState(objectKey && selectedOptionsObject ? selectedOptionsObject[objectKey] : 1);

  const increment = () => {
    const newCount = count + 1;
    objectKey && setSelectedOptionsObject && setSelectedOptionsObject(prev => ({ ...prev, [objectKey]: newCount }));
    setCountChanged(true);
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      objectKey && setSelectedOptionsObject && setSelectedOptionsObject(prev => ({ ...prev, [objectKey]: newCount }));
      setCountChanged(true);
      setCount(count - 1);
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
