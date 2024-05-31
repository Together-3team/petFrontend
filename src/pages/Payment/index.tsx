import styles from './Payment.module.scss';
import { useEffect } from 'react';

interface PaymentProps {
  totalPrice: number;
  totalOriginalPrice: number;
  productCount: number;
}

declare global {
  interface Window {
    TossPayments: any;
  }
}

export default function Payment({ productCount }: PaymentProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const totalPrice = 10;
  const handlePayment = async () => {
    if (!window.TossPayments) {
      console.error('Toss Payments script not loaded');
      return;
    }

    const tossPayments = window.TossPayments(process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY);

    tossPayments.requestPayment('카드', {
      amount: totalPrice,
      orderId: 'orderId-12345',
      orderName: 'Test Order',
      customerName: 'Customer',
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };
  return (
    <>
      <div className={styles.payment}>
        <div className={styles.orderProduct}>
          <div className={styles.orderTitle}>
            <div>주문상품</div>
            <div>{productCount}개</div>
          </div>
        </div>
        <div className={styles.paymentBank}>
          <button onClick={handlePayment}>결제하기</button>
        </div>
        {/* <TotalPay totalPrice={totalPrice} totalOriginalPrice={totalOriginalPrice} productCount={productCount} /> */}
      </div>
    </>
  );
}
