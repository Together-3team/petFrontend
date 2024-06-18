import React, { useEffect, useState, useRef } from 'react';
import styles from './Payment.module.scss';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import Button from '@/components/common/Button';
import PaymentAgree from '@/components/payment/PaymentAgree';
import exampleProductImg from '@/assets/exampleProductImg.jpg';
import TotalPay from '@/components/payment/TotalPay';
import Card from '@/components/payment/Card';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import { fetchCartProducts } from '@/apis/cartApi';
import { Product } from '@/pages/cart';
import { useQuery } from '@tanstack/react-query';

const widgetClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = '-YY27b1BN-PCQD_5Qwp9X';

export default function Payment() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance['renderPaymentMethods']> | null>(null);
  const [price, setPrice] = useState(50000); // 기본 가격 설정
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['cart'],
    queryFn: fetchCartProducts,
  });

  useEffect(() => {
    if (products) {
      const calculatedPrice = products.reduce(
        (total, product) =>
          total + product.productCost * product.productNumber + product.combinationPrice * product.productNumber,
        0
      );
      setPrice(calculatedPrice);
    }
  }, [products]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.tosspayments.com/v1';
    script.async = true;
    script.onload = () => {
      const fetchPaymentWidget = async () => {
        try {
          const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
          setPaymentWidget(loadedWidget);
        } catch (error) {
          console.error('Error fetching payment widget:', error);
        }
      };

      fetchPaymentWidget();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      '#payment-widget',
      { value: price },
      { variantKey: 'DEFAULT' }
    );

    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: '토스 티셔츠 외 2건',
        customerName: '김토스',
        customerEmail: 'customer123@gmail.com',
        customerMobilePhone: '01012341234',
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('Error requesting payment:', error);
    }
  };

  function calculateTotalOriginalPrice() {
    return products ? products.reduce((total, product) => total + product.originalCost * product.productNumber, 0) : 0;
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = price;
  const productCount = products ? products.length : 0;

  return (
    <div className={styles.payment}>
      <Header.Root className={styles.headerRoot}>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.headerName}>장바구니</Header.Center>
        </Header.Box>
      </Header.Root>
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
      {products?.map((product, index) => (
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
      <div id="payment-widget"></div>
      <div id="agreement"></div>
      <div className={styles.paymentAgree}>
        <PaymentAgree onCheckboxChange={setCheckboxChecked} />
        <div className={styles.paymentButton}>
          <Button
            size="large"
            backgroundColor="$color-pink-main"
            onClick={handlePaymentRequest}
            disabled={!checkboxChecked}>
            {totalPrice}원 주문하기
          </Button>
        </div>
      </div>
    </div>
  );
}
