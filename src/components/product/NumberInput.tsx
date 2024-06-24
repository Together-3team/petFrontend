import React, { SetStateAction, useEffect, useState } from 'react';
import Minus from '@/assets/svgs/btn-minus.svg';
import Plus from '@/assets/svgs/btn-plus.svg';
import styles from './NumberInput.module.scss';
import { httpClient } from '@/apis/httpClient';
import { PostItem, PostOrdersResponseData } from './OptionBottomSheet';

interface NumberInput {
  selectedOptionsObject: { [key: string]: number };
  setSelectedOptionsObject: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  objectKey: string;
  setCountChanged: React.Dispatch<React.SetStateAction<boolean>>;
  combinationId: number;
  ordersId?: number;
  //옵션이 하나일 때
  ordersIdObject?: { [key: string]: number };
  setOrdersIdObject?: React.Dispatch<SetStateAction<{ [key: string]: number }>>;
  countWithNoOption?: number;
  setCountWithNoOption?: React.Dispatch<React.SetStateAction<number>>;
}

export default function NumberInput({
  selectedOptionsObject,
  setSelectedOptionsObject,
  objectKey,
  setCountChanged,
  combinationId,
  ordersId,
  ordersIdObject,
  setOrdersIdObject,
  countWithNoOption,
  setCountWithNoOption,
}: NumberInput) {
  const [count, setCount] = useState(selectedOptionsObject[objectKey] || 1);

  const increment = async () => {
    const newCount = count + 1;
    setSelectedOptionsObject(prev => ({ ...prev, [objectKey]: newCount }));
    setCountChanged(true);
    setCount(newCount);
    countWithNoOption && setCountWithNoOption && setCountWithNoOption(newCount);
    if (combinationId) {
      let postItem = {
        optionCombinationId: combinationId,
        quantity: 1,
      };
      const response = await httpClient().post<PostOrdersResponseData, PostItem>('selected-products/orders', postItem);
      if (ordersIdObject && setOrdersIdObject) {
        setOrdersIdObject({ [objectKey]: response.id });
      }
    }
  };

  const decrement = async () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      countWithNoOption && setCountWithNoOption && setCountWithNoOption(newCount);
      //옵션이 여러개일 때
      objectKey && setSelectedOptionsObject && setSelectedOptionsObject(prev => ({ ...prev, [objectKey]: newCount }));
      //옵션이 한 개일 때
      if (ordersIdObject && setOrdersIdObject) {
        setSelectedOptionsObject({ [objectKey]: newCount });
      }
      setCountChanged(true);
      setCount(count - 1);
      if ((combinationId && ordersId) || ordersIdObject) {
        const putItem = {
          status: 1,
          quantity: newCount,
        };
        await httpClient().put(`/selected-products/${ordersId || ordersIdObject?.['1']}`, putItem);
      }
    }
  };

  useEffect(() => {
    const setCount1 = async () => {
      if (count === 1 && countWithNoOption) {
        countWithNoOption && setCountWithNoOption && setCountWithNoOption(count);
        //옵션이 한 개일 때
        if (ordersIdObject && setOrdersIdObject) {
          setSelectedOptionsObject({ [objectKey]: count });
        }
        if ((combinationId && ordersId) || ordersIdObject) {
          const postItem = {
            optionCombinationId: combinationId,
            quantity: count,
          };
          await httpClient().post('/selected-products/orders', postItem);
        }
      }
    };
    setCount1();
  }, [
    combinationId,
    count,
    countWithNoOption,
    objectKey,
    ordersId,
    ordersIdObject,
    setCountWithNoOption,
    setOrdersIdObject,
    setSelectedOptionsObject,
  ]);

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
