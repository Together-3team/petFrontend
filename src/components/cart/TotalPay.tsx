import styles from './TotalPay.module.scss';

interface TotalPayProps {
  totalPrice: number;
  totalOriginalPrice: number;
  productCount: number; // 전체 상품 수
}

export default function TotalPay({ totalPrice, totalOriginalPrice, productCount }: TotalPayProps) {
  const discountAmount = totalOriginalPrice - totalPrice;

  return (
    <>
      <div className={styles.calculateContainer}>
        <div className={styles.totalNumberTitle}>결제 상품 총 {productCount}개</div>
        <div className={styles.individualCost}>
          <div className={`${styles.pricePair} ${styles.gray}`}>
            <div>원가</div>
            <div>{totalOriginalPrice.toLocaleString()}원</div>
          </div>
          <div className={styles.pricePair}>
            <div>할인가</div>
            <div>{(totalOriginalPrice - discountAmount).toLocaleString()}원</div>
          </div>
          <div className={`${styles.pricePair} ${styles.pink}`}>
            <div>할인 금액</div>
            <div>-{discountAmount.toLocaleString()}원</div>
          </div>
          <div className={styles.pricePair}>
            <div>배송비</div>
            <div>무료배송</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.totalPrice}>
          <div>총 결제 금액</div>
          <div>{totalPrice.toLocaleString()}원</div>
        </div>
      </div>
    </>
  );
}
