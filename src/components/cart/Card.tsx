import React, { useState } from 'react';
import styles from './Card.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  productTitle: string;
  option: string;
  productCost: number;
  isChecked: boolean;
  productNumber: number;
  imageUrl: string;
  onCheck: () => void;
}

export default function Card({
  productTitle,
  option,
  productCost,
  isChecked,
  productNumber: initialProductNumber,
  imageUrl,
  onCheck,
}: CardProps) {
  // 추후 백에서 장바구니에 담은 제품 갯수로 초기화하는 로직 추가
  const [productNumber, setProductNumber] = useState(initialProductNumber);

  function addProduct() {
    setProductNumber(productNumber + 1);
  }
  function removeProduct() {
    setProductNumber(productNumber - 1);
    if (productNumber <= 1) {
      setProductNumber(1);
    }
  }

  return (
    <>
      <div className={styles.oneCheckbox}>
        <div className={styles.productBoxTop}>
          <input type="checkbox" name="oneCheckbox" checked={isChecked} onChange={onCheck} />
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={styles.productExplain}>
          <Image className={styles.productImg} width={56} height={56} src={imageUrl} alt="productImg" />
          <div>
            <div className={styles.productTitle}>{productTitle}</div>
            <div className={styles.option}>{option}</div>
          </div>
        </div>
        <div className={styles.counterButton}>
          <button onClick={removeProduct}>-</button>
          <input className={styles.productNumber} type="number" value={productNumber} readOnly />
          <button onClick={addProduct}>+</button>
        </div>
        <div className={styles.productCost}>{productCost}원</div>
        <div className={styles.line}></div>
      </div>
    </>
  );
}
