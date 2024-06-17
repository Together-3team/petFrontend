import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './PaymentSuccess.module.scss';
import Lottie from 'react-lottie-player';
import check from '@/assets/images/check.json';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/payment/paymentSuccessByCart');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className={styles.paymentSuccess}>
      <Lottie
        className={styles.successImg}
        loop={false}
        animationData={check}
        play
        style={{ width: 180, height: 180 }}
      />
      <div className={styles.finish}>결제 완료!</div>
    </div>
  );
}
