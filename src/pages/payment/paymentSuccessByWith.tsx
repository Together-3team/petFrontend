import styles from './PaymentSuccessByWith.module.scss';
import withSuccess from '@/assets/images/withSuccess.png';
import Image from 'next/image';
export default function PaymentSuccessByWith() {
  return (
    <div className={styles.paymentSuccessByWith}>
      <div className={styles.warning}>공동구매가 성사되었어요!</div>
      <Image className={styles.petImg} width={180} height={180} src={withSuccess} alt="petImg" />
      <div className={styles.share}>
        <div className={styles.safeMent}>
          주문하신 상품을
          <br />
          빠르고 안전하게 배송해드릴게요.
        </div>
      </div>
    </div>
  );
}
