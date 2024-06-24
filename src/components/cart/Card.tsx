import React, { useState } from 'react';
import styles from './Card.module.scss';
import Image, { StaticImageData } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  productTitle: string;
  option: string;
  combinationPrice: number;
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
  combinationPrice,
  productCost,
  originalCost,
  isChecked,
  productNumber: initialProductNumber,
  imageUrl,
  onCheck,
  onQuantityChange,
  onRemove,
}: CardProps) {
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

  const totalOriginalCost = (originalCost * productNumber + combinationPrice * productNumber).toLocaleString('ko-KR');
  const totalProductCost = (productCost * productNumber + combinationPrice * productNumber).toLocaleString('ko-KR');
  const formattedCombinationPrice = combinationPrice.toLocaleString('ko-KR');

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
          <FontAwesomeIcon icon={faXmark} className={styles.faXmark} onClick={onRemove} />
        </div>
        <div className={styles.productExplain}>
          <Image className={styles.productImg} src={imageUrl} width={56} height={56} alt="productImg" />
          <div>
            <div className={styles.productTitle}>{productTitle}</div>
            {option !== '기본' && (
              <div className={styles.optionContainer}>
                <div className={styles.option}>{option}</div>
                <div className={styles.optionCost}>(+{formattedCombinationPrice}원)</div>
              </div>
            )}
            <div className={styles.moneyContainerRight}>
              <div className={styles.productCost}>{totalOriginalCost}원</div>
              <div className={styles.realPrice}>
                <div className={styles.discountRate}>{discountRate.toFixed(0)}%</div>
                <div className={styles.realMoney}>{totalProductCost}원</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.moneyContainer}>
          <div className={styles.counterButton}>
            <button className={styles.plusminus} onClick={removeProduct}>
              -
            </button>
            <input className={styles.productNumber} type="text" value={productNumber} readOnly />
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
