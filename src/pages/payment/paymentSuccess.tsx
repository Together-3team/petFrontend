import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './PaymentSuccess.module.scss';
import Lottie from 'react-lottie-player';
import check from '@/assets/lotties/check.json';
import { completePayment } from '@/apis/paymentApi';
import { useQueryClient } from '@tanstack/react-query';

export default function PaymentSuccess() {
  const router = useRouter();
  const { paymentKey, orderId, amount, gbi } = router.query;
  console.log(gbi);
  console.log(router.query);
  const queryClient = useQueryClient();

  const productList = queryClient.getQueryData(['cartData']);
  console.log(productList);
  useEffect(() => {
    const deliveryMessage = sessionStorage.getItem('deliveryMessage') || '';
    const selectedProductIds = sessionStorage.getItem('selectedProductIds') || '';
    const deliveryId = sessionStorage.getItem('deliveryId') || '';
    console.log(deliveryMessage);
    console.log(selectedProductIds);
    const amountValue: number = parseFloat(amount as string);
    const deliveryIdValue: number = parseInt(deliveryId, 10);
    const gbiValue: number = parseInt(gbi as string, 10);
    console.log(deliveryIdValue);

    const sendPaymentData = async () => {
      console.log(router.query);
      if (paymentKey && orderId && amount) {
        try {
          const postData = {
            deliveryMessage: deliveryMessage,
            orderId: orderId as string,
            paymentKey: paymentKey as string,
            amount: amountValue,
            selectedProductIds,
            groupBuyingId: gbiValue,
            deliveryId: deliveryIdValue,
          };
          const response = await completePayment(postData);
          console.log('결제 완료: ', response);
        } catch (error) {
          console.error('Error completing payment:', error);
        }
      }
    };
    sendPaymentData();
    const timer = setTimeout(() => {
      if (gbi) {
        router.push('/payment/paymentSuccessByWith');
      } else {
        router.push('/payment/paymentSuccessByCart');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentKey, orderId, amount]);

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
