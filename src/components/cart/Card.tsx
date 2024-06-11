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
  isChecked: boolean;
  productNumber: number;
  imageUrl: string | StaticImageData;
  onCheck: () => void;
  onQuantityChange: (newQuantity: number) => void;
  onRemove: () => void;
}

export default function Card({
  productTitle,
  option,
  productCost,
  originalCost,
  isChecked,
  productNumber: initialProductNumber,
  imageUrl,
  onCheck,
  onQuantityChange,
  onRemove,
}: CardProps) {
  // 추후 백에서 장바구니에 담은 제품 갯수로 초기화하는 로직 추가
  const [productNumber, setProductNumber] = useState(initialProductNumber);

  const discountAmount = originalCost - productCost;
  const discountRate = (discountAmount / originalCost) * 100;

  function addProduct() {
    const newQuantity = productNumber + 1;
    setProductNumber(newQuantity);
    onQuantityChange(newQuantity);
  }
  function removeProduct() {
    const newQuantity = productNumber > 1 ? productNumber - 1 : 1;
    setProductNumber(newQuantity);
    onQuantityChange(newQuantity);
  }

  return (
    <>
      <div className={styles.oneCheckbox}>
        <div className={styles.productBoxTop}>
          <input
            type="checkbox"
            name="oneCheckbox"
            checked={isChecked}
            className={styles.checkbox}
            onChange={onCheck}
          />
          <FontAwesomeIcon icon={faXmark} onClick={onRemove} />
        </div>
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
        <div className={styles.moneyContainer}>
          <div className={styles.counterButton}>
            <button className={styles.plusminus} onClick={removeProduct}>
              -
            </button>
            <input className={styles.productNumber} type="number" value={productNumber} readOnly />
            <button className={styles.plusminus} onClick={addProduct}>
              +
            </button>
          </div>
        </div>
        <div className={styles.line}></div>
      </div>
    </>
  );
}
