import styles from './PaymentSuccess.module.scss';
import exampleProductImg from '@/assets/exampleProductImg.jpg';
import Image from 'next/image';

export default function paymentSuccess() {
  return (
    <div className={styles.paymentSuccess}>
      <Image className={styles.successImg} width={180} height={180} src={exampleProductImg} alt="successImg" />
      <div className={styles.finish}>결제 완료!</div>
    </div>
  );
}
