import styles from './Card.module.scss';
import Image, { StaticImageData } from 'next/image';

interface CardProps {
  productTitle: string;
  option: string;
  combinationPrice: number;
  productCost: number;
  originalCost: number;
  productNumber: number;
  imageUrl: string | StaticImageData;
  isLast: boolean;
}

export default function Card({
  productTitle,
  option,
  combinationPrice,
  productCost,
  originalCost,
  productNumber,
  imageUrl,
  isLast,
}: CardProps) {
  const discountAmount = originalCost - productCost;
  const discountRate = (discountAmount / originalCost) * 100;
  const totalOriginalCost = (originalCost * productNumber + combinationPrice * productNumber).toLocaleString('ko-KR');
  const totalProductCost = (productCost * productNumber + combinationPrice * productNumber).toLocaleString('ko-KR');

  return (
    <div className={styles.bigContainer}>
      <div className={styles.productExplain}>
        <Image className={styles.productImg} width={56} height={56} src={imageUrl} alt="productImg" />
        <div>
          <div className={styles.productTitle}>{productTitle}</div>
          {option !== '기본' && (
            <div className={styles.optionContainer}>
              <div>{option}</div>
              <div>(+{combinationPrice}원)</div>
              <div>&nbsp;| {productNumber}개</div>
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
      <div className={styles.moneyContainer}></div>
      {!isLast && <div className={styles.line}></div>}
    </div>
  );
}
