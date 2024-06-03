import Button from '@/components/common/Button';
import styles from './Payment.module.scss';
import { useEffect, useState } from 'react';

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
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [check1Checked, setCheck1Checked] = useState(false);
  const [check2Checked, setCheck2Checked] = useState(false);

  useEffect(() => {
    if (check1Checked && check2Checked) {
      setCheckboxChecked(true);
    } else {
      setCheckboxChecked(false);
    }
  }, [check1Checked, check2Checked]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function handleCheckboxChange() {
    const newChecked = !checkboxChecked;
    setCheckboxChecked(newChecked);
    setCheck1Checked(newChecked);
    setCheck2Checked(newChecked);
  }

  function handleCheck1Change() {
    setCheck1Checked(!check1Checked);
    console.log('check1');
  }

  function handleCheck2Change() {
    setCheck2Checked(!check2Checked);
    console.log('check2');
  }

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
            <div>
              주문상품<span>{productCount}개</span>
            </div>
          </div>
        </div>
        <div className={styles.paymentAgree}>
          <div className={styles.agree}>
            <div className={styles.checkboxTitle}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={checkboxChecked}
                onChange={handleCheckboxChange}
              />
              <div className={styles.agreeTitle}>주문내용 확인 및 결제 동의</div>
            </div>
            <div className={styles.contentCheckbox}>
              <input type="checkbox" className={styles.check} checked={check1Checked} onChange={handleCheck1Change} />
              <div className={styles.checkContent}>(필수) 개인정보 수집, 이용 동의</div>
            </div>
            <div className={styles.contentCheckbox}>
              <input type="checkbox" className={styles.check} checked={check2Checked} onChange={handleCheck2Change} />
              <div className={styles.checkContent}>(필수) 개인정보 제3자 정보 제공 동의</div>
            </div>
          </div>
          <div className={styles.paymentButton}>
            <Button size="large" backgroundColor="$color-pink-main" onClick={handlePayment}>
              주문하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
