import Button from '@/components/common/Button';
import styles from './Payment.module.scss';
import { useEffect, useState } from 'react';
import PaymentAgree from '@/components/payment/PaymentAgree';
import exampleProductImg from '@/assets/exampleProductImg.jpg';
import TotalPay from '@/components/payment/TotalPay';
import Card from '@/components/payment/Card';
// import { isMobile } from 'react-device-detect';

declare global {
  interface Window {
    TossPayments: any;
  }
}

export default function Payment() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const initialProducts = [
    {
      id: 1,
      productTitle: '강아지 간식 27종',
      option: '강아지 독 리얼큐브 소고기 300g',
      productCost: 10000, // 판매가
      originalCost: 11800, // 원가
      productNumber: 2,
      imageUrl: exampleProductImg,
    },
    {
      id: 2,
      productTitle: '강아지 간식 27종',
      option: '강아지 독 리얼큐브 소고기 500g',
      productCost: 15000,
      originalCost: 20000,
      productNumber: 3,
      imageUrl: exampleProductImg,
    },
    {
      id: 3,
      productTitle: '고양이 간식 27종',
      option: '강아지 츄르 5스틱g',
      productCost: 10000,
      originalCost: 11000,
      productNumber: 10,
      imageUrl: exampleProductImg,
    },
    {
      id: 4,
      productTitle: '고양이 간식 27종',
      option: '강아지 츄르 5스틱g',
      productCost: 10000,
      originalCost: 11000,
      productNumber: 10,
      imageUrl: exampleProductImg,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const isMobile = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android|ipad|iphone|ipod/.test(userAgent);
  };

  const handlePayment = async () => {
    if (!window.TossPayments) {
      console.error('Toss Payments script not loaded');
      return;
    }

    const tossPayments = window.TossPayments(process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY);

    tossPayments.requestPayment('카드', {
      amount: totalPrice,
      orderId: 'orderId-12345', // 유효 id 생성하면 아이디가 랜덤으로 생성가능
      orderName: 'Test Order', //상품명
      customerName: 'Customer', // front에서 이름을 받아서
      successUrl: `${window.location.origin}/payment/success`,
      failUrl: `${window.location.origin}/payment/fail`,
      flowMode: isMobile() ? 'MOBILE_WEB' : 'DEFAULT',
    });
  };

  // 제품의 총 원가 게산
  function calculateTotalOriginalPrice() {
    return products.reduce((total, product) => total + product.originalCost * product.productNumber, 0);
  }

  // 제품의 총 가격 계산
  function calculateTotalPrice() {
    return products.reduce((total, product) => total + product.productCost * product.productNumber, 0);
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = calculateTotalPrice();
  const productCount = products.length; // 전체 상품 수

  return (
    <>
      <div className={styles.payment}>
        <div className={styles.rectangle}></div>
        <div className={styles.orderProduct}>
          <div className={styles.orderTitle}>
            <div className={styles.howMany}>
              <div>주문 상품</div>
              <span className={styles.howManyCount}>{productCount}개</span>
            </div>
          </div>
          <div className={styles.line}></div>
        </div>

        {products.map((product, index) => (
          <Card
            key={product.id}
            productTitle={product.productTitle}
            option={product.option}
            productCost={product.productCost}
            originalCost={product.originalCost}
            productNumber={product.productNumber}
            imageUrl={product.imageUrl}
            isLast={index === products.length - 1}
          />
        ))}
        <div className={styles.rectangle}></div>
        <TotalPay totalPrice={totalPrice} totalOriginalPrice={totalOriginalPrice} productCount={productCount} />
        <div className={styles.rectangle}></div>
        <div className={styles.paymentAgree}>
          <PaymentAgree onCheckboxChange={setCheckboxChecked} />
          <div className={styles.paymentButton}>
            <Button size="large" backgroundColor="$color-pink-main" onClick={handlePayment} disabled={!checkboxChecked}>
              {totalPrice}원 주문하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
