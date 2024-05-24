import React, { useState } from 'react';
import styles from './Card.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  productTitle: string;
  option: string;
  productCost: string;
}

export default function Card({ productTitle, option, productCost }: CardProps) {
  const [productNumber, setProductNumber] = useState(1);

  const addProduct = () => {
    setProductNumber(productNumber + 1);
  };
  const removeProduct = () => {
    setProductNumber(productNumber - 1);
    if (productNumber <= 0) {
      setProductNumber(0);
    }
  };

  return (
    <>
      <div className={styles.oneCheckbox}>
        <div className={styles.productBoxTop}>
          <input type="checkbox" name="oneCheckbox" />
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className={styles.productExplain}>
          <Image
            className={styles.productImg}
            width={56}
            height={56}
            src="/images/exampleProductImg.jpg"
            alt="productImg"
          />
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
        <div className={styles.productCost}>{productCost}</div>
        <div className={styles.line}></div>
      </div>
    </>
  );
}
