import React, { SetStateAction, useEffect, useState } from 'react';
import Minus from '@/assets/svgs/btn-minus.svg';
import Plus from '@/assets/svgs/btn-plus.svg';
import styles from './NumberInput.module.scss';
import { httpClient } from '@/apis/httpClient';
import { PostItem, PostOrdersResponseData } from './OptionBottomSheet';

interface NumberInput {
  selectedOptionsObject?: { [key: string]: number };
  setSelectedOptionsObject?: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  objectKey?: string;
  setCountChanged: React.Dispatch<React.SetStateAction<boolean>>;
  combinationId?: number;
  ordersId?: number;
  //옵션이 없을 때 count
  countWithNoOption?: number;
  setCountWithNoOption?: React.Dispatch<SetStateAction<number>>;
}

export default function NumberInput({
  selectedOptionsObject,
  setSelectedOptionsObject,
  objectKey,
  setCountChanged,
  combinationId,
  ordersId,
}: NumberInput) {
  const [count, setCount] = useState(objectKey && selectedOptionsObject ? selectedOptionsObject[objectKey] : 1);

  const increment = async () => {
    const newCount = count + 1;
    objectKey && setSelectedOptionsObject && setSelectedOptionsObject(prev => ({ ...prev, [objectKey]: newCount }));
    setCountChanged(true);
    setCount(count + 1);
    if (combinationId) {
      const postItem = {
        optionCombinationId: combinationId,
        quantity: 1,
      };
      console.log('bbbbbbb ', postItem);
      const response = await httpClient().post<PostOrdersResponseData, PostItem>('selected-products/orders', postItem);
      console.log(response);
    }
  };

  const decrement = async () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      objectKey && setSelectedOptionsObject && setSelectedOptionsObject(prev => ({ ...prev, [objectKey]: newCount }));
      setCountChanged(true);
      setCount(count - 1);
      if (combinationId && ordersId) {
        const putItem = {
          status: 1,
          quantity: newCount,
        };
        console.log('cccccc ', putItem);
        const response = await httpClient().put(`/selected-products/${ordersId}`, putItem);
        console.log(response);
      }
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
