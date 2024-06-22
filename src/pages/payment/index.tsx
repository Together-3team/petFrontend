import React, { useEffect, useState } from 'react';
import styles from './Payment.module.scss';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { nanoid } from 'nanoid';
import Button from '@/components/common/Button';
import PaymentAgree from '@/components/payment/PaymentAgree';
import TotalPay from '@/components/payment/TotalPay';
import Card from '@/components/payment/Card';
import Header from '@/components/common/Layout/Header';
import BottomModal from '@/components/common/Modal/Base/BottomModal';
import Input from '@/components/common/Input';
import BackButton from '@/components/common/Button/BackButton';
import { Product } from '@/pages/cart';
import clock from '@/assets/images/clock.png';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { DeliveryInfo } from '@/types/components/delivery';
import { httpClient } from '@/apis/httpClient';
import OrderDeliveryCard from '@/components/order/OrderDeliveryCard';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const accessToken = context.req.cookies['accessToken'];
  if (!accessToken) {
    return {
      redirect: {
        destination: '/my',
        permanent: false,
      },
    };
  }

  let defaultDelivery;
  try {
    defaultDelivery = await httpClient().get<DeliveryInfo>(`/deliveries/default`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      defaultDelivery,
    },
  };
}

export default function Payment({ defaultDelivery }: { defaultDelivery: DeliveryInfo | undefined }) {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [price, setPrice] = useState(0); // 기본 가격 설정
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const PAYMENT_SECRET_KEY = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY;
  const [delivery, setDelivery] = useState(defaultDelivery);
  const router = useRouter();

  console.log(PAYMENT_SECRET_KEY);

  const clientKey = 'test_ck_kYG57Eba3G2wwAjdoxB68pWDOxmA';
  const orderId = nanoid(); // 주문 ID

  const handlePayment = async () => {
    const firstProductTitle = products?.[0]?.productTitle || '';
    const remainingProductCount = (products?.length || 0) - 1;
    const orderName =
      remainingProductCount > 0 ? `${firstProductTitle} 외 ${remainingProductCount}건` : firstProductTitle;

    const selectedProductIds = products.map(product => product.id).join(',');
    const deliveryMessageValue = deliveryMessage;
    console.log(deliveryMessage);
    console.log(selectedProductIds);
    sessionStorage.setItem('deliveryMessage', deliveryMessageValue);
    sessionStorage.setItem('selectedProductIds', selectedProductIds);
    delivery && sessionStorage.setItem('deliveryId', delivery.id.toString());
    const tossPayments = await loadTossPayments(clientKey);

    tossPayments.requestPayment('카드', {
      amount: totalPrice,
      orderId: orderId,
      orderName: orderName,
      successUrl: `${window.location.origin}/payment/paymentSuccess`,
      failUrl: `${window.location.origin}/payment/fail`,
    });
  };

  useEffect(() => {
    const cartData = sessionStorage.getItem('cartData');
    if (cartData) {
      const parsedProducts = JSON.parse(cartData) as Product[];
      setProducts(parsedProducts);
      const calculatedPrice = parsedProducts.reduce(
        (total, product) =>
          total + product.productCost * product.productNumber + product.combinationPrice * product.productNumber,
        0
      );
      setPrice(calculatedPrice);
    }
  }, []);

  function calculateTotalOriginalPrice() {
    return products ? products.reduce((total, product) => total + product.originalCost * product.productNumber, 0) : 0;
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = price;
  const productCount = products ? products.length : 0;

  useEffect(() => {
    if (router.query['action'] !== 'done') {
      setIsModalOpen(true);
    }
  }, [router.query]);

  return (
    <div className={styles.payment}>
      <Header.Root className={styles.headerRoot}>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.headerName}>결제</Header.Center>
        </Header.Box>
      </Header.Root>
      <OrderDeliveryCard delivery={delivery} setDelivery={setDelivery} />
      <div className={styles.deliveryMessage}>
        <Input
          id="recipient"
          type="text"
          size="full"
          label="배송메시지"
          labelStyle={'label'}
          placeholder="예) 부재시 집 앞에 놔주세요"
          value={deliveryMessage}
          onChange={e => setDeliveryMessage(e.target.value)}
        />
      </div>
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
      <TotalPay
        totalPrice={totalPrice}
        title="결제금액"
        totalOriginalPrice={totalOriginalPrice}
        productCount={productCount}
      />
      <div className={styles.rectangle}></div>
      <div id="payment-widget"></div>
      <div id="agreement"></div>
      <div className={styles.paymentAgree}>
        <PaymentAgree onCheckboxChange={setCheckboxChecked} />
        <div className={styles.paymentButton}>
          <Button
            size="large"
            backgroundColor="$color-pink-main"
            onClick={handlePayment}
            disabled={!checkboxChecked || !delivery || !deliveryMessage}>
            {totalPrice}원 주문하기
          </Button>
        </div>
      </div>
      <BottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <Image className={styles.clockImg} src={clock} width={168} height={120} alt="clockImg" />
          <div className={styles.warning}>공동구매는 빨리 성사되지 않으면 취소될 수 있어요</div>
          <div className={styles.detailWarning}>
            24시간 내 공동구매 참여자가 없거나, <br />
            공동구매 성사 전에 품절되면 주문이 취소될 수 있어요.
          </div>
        </div>
        <Button size="large" backgroundColor="$color-gray-800" onClick={() => setIsModalOpen(false)}>
          이해했어요
        </Button>
      </BottomModal>
    </div>
  );
}
