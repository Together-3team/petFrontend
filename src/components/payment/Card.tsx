import React, { useState } from 'react';
import styles from './Card.module.scss';
import Image, { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  productTitle: string;
  option: string;
  productCost: number;
  originalCost: number;
  productNumber: number;
  imageUrl: string | StaticImageData;
  isLast: boolean;
}

export default function Card({
  productTitle,
  option,
  productCost,
  originalCost,
  productNumber: initialProductNumber,
  imageUrl,
  isLast,
}: CardProps) {
  const discountAmount = originalCost - productCost;
  const discountRate = (discountAmount / originalCost) * 100;

  return (
    <div className={styles.bigContainer}>
      <div className={styles.productExplain}>
        <Image className={styles.productImg} width={56} height={56} src={imageUrl} alt="productImg" />
        <div>
          <div className={styles.productTitle}>{productTitle}</div>
          <div className={styles.option}>{option}</div>
          <div className={styles.moneyContainerRight}>
            <div className={styles.productCost}>{originalCost}원</div>
            <div className={styles.realPrice}>
              <div className={styles.discountRate}>{discountRate.toFixed(0)}%</div>
              <div className={styles.realMoney}>{productCost}원</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.moneyContainer}></div>
      {!isLast && <div className={styles.line}></div>}
    </div>
  );
}
