import styles from './TotalPay.module.scss';

interface TotalPayProps {
  totalPrice: number;
  totalOriginalPrice: number;
  productCount: number; // 전체 상품 수
  title: string;
}

export default function TotalPay({ totalPrice, totalOriginalPrice, title, productCount }: TotalPayProps) {
  const discountAmount = totalOriginalPrice - totalPrice;

  return (
    <>
      <div className={styles.calculateContainer}>
        <div className={styles.totalNumberTitle}>{title}</div>
        <div className={styles.individualCost}>
          <div className={`${styles.pricePair} ${styles.gray}`}>
            <div>원가</div>
            <div>{totalOriginalPrice}원</div>
          </div>
          <div className={styles.pricePair}>
            <div>할인가</div>
            <div>{totalOriginalPrice - discountAmount}원</div>
          </div>
          <div className={`${styles.pricePair} ${styles.pink}`}>
            <div>할인 금액</div>
            <div>-{discountAmount}원</div>
          </div>
          <div className={styles.pricePair}>
            <div>배송비</div>
            <div>무료배송</div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.totalPrice}>
          <div>총 결제 금액</div>
          <div>{totalPrice}원</div>
        </div>
      </div>
    </>
  );
}
