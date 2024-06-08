import styles from './PaymentSuccessByCart.module.scss';
import exampleProductImg from '@/assets/exampleProductImg.jpg';
import Image from 'next/image';

export default function PaymentSuccessByCart() {
  return (
    <div className={styles.paymentSuccessByCart}>
      <div className={styles.warning}>
        24시간 내 성사되지 않으면
        <br />
        주문이 취소될 수 있어요!
      </div>
      <Image className={styles.petImg} width={180} height={180} src={exampleProductImg} alt="petImg" />
      <div className={styles.share}>
        <div className={styles.shareMent}>공유하고 친구와 같이 할인받기</div>
        <button className={styles.copyButton}>링크 복사하기</button>
      </div>
    </div>
  );
}
