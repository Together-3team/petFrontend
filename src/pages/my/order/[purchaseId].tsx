import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import purchaseApi from '@/apis/purchase/api';
import { ProductInfo } from '@/components/common/Card';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import OrderCard from '@/components/order/OrderCard';
import TotalPay from '@/components/cart/TotalPay';

import styles from './Order.module.scss';
import formatDate from '@/utils/formatDate';
import getTagText from '@/utils/getTagText';

export default function OrderDetail() {
  const router = useRouter();
  const { purchaseId, purchaseDate } = router.query;

  const { data: purchaseDetailData } = useQuery({
    queryKey: ['purchaseDetail', purchaseId],
    queryFn: async () => {
      const response = purchaseApi.getDetailPurchase(Number(purchaseId));
      return response;
    },
  });

  console.log(purchaseDetailData);

  const orderList =
    purchaseDetailData &&
    purchaseDetailData.data.purchaseProducts.map((product: ProductInfo) => ({
      productId: product.productId,
      title: product.title,
      thumbNailImage: product.thumbNailImage,
      originalPrice: product.originalPrice,
      price: product.price,
      option: product.combinationName,
      quantity: product.quantity,
      stock: 1,
      status: product.status,
    }));

  const deliveryInfo = purchaseDetailData && {
    recipient: purchaseDetailData.data.recipient,
    recipientPhoneNumber: purchaseDetailData.data.recipientPhoneNumber,
    address: purchaseDetailData.data.address,
    detailedAddress: purchaseDetailData.data.detailedAddress,
    zipCode: purchaseDetailData.data.zipCode,
    message: purchaseDetailData.data.deliveryMessage,
  };

  console.log(orderList);
  console.log(purchaseDate);

  function calculateTotalOriginalPrice() {
    return purchaseDetailData?.data.purchaseProducts.reduce(
      (total: number, order: ProductInfo) => order.quantity && total + order.originalPrice * order.quantity,
      0
    );
  }

  function calculateTotalPrice() {
    return purchaseDetailData?.data.purchaseProducts.reduce(
      (total: number, order: ProductInfo) => order.quantity && total + order.price * order.quantity,
      0
    );
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = calculateTotalPrice();
  const orderCount = purchaseDetailData?.data.purchaseProducts.length;

  return (
    <div className={styles.orderDetailLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>주문 상세정보</h1>
        </Header.Box>
      </Header.Root>
      <div className={styles.orderDetailTop}>
        <div className={styles.orderDetailHeader}>
          <h3>{purchaseDate && formatDate(purchaseDate as string)}</h3>
          <span>주문번호 No. {purchaseId}</span>
        </div>

        <div className={styles.deliveryArea}>
          <h3>배송지</h3>
          <div className={styles.deliveryCard}>
            <h4>{deliveryInfo?.recipient} 집</h4>
            <span>
              {deliveryInfo?.recipient} · {deliveryInfo?.recipientPhoneNumber}
              <br />
              {deliveryInfo?.address}, {deliveryInfo?.detailedAddress}
              <br />
              {deliveryInfo?.zipCode}
            </span>
          </div>
        </div>
        <div className={styles.deliveryMessageArea}>
          <h3>배송메시지</h3>
          <span className={styles.deliveryMessage}>{deliveryInfo?.message}</span>
        </div>
        <div className={styles.rectangle} />
      </div>
      <div className={styles.orderListArea}>
        <h3>
          주문 상품 <span>{orderCount}개</span>
        </h3>
        {purchaseDetailData &&
          orderList.length > 0 &&
          orderList.map((order: ProductInfo) => (
            <OrderCard key={order.productId} productInfo={order} tagText={getTagText(order.status)} />
          ))}
      </div>
      <div className={styles.orderDetailBottom}>
        <div className={styles.rectangle} />
        <div className={styles.orderPriceArea}>
          <TotalPay
            title="결제 금액"
            totalPrice={totalPrice}
            totalOriginalPrice={totalOriginalPrice}
            productCount={orderCount}
          />
        </div>
        <div className={styles.paymentMethod}>
          <div className={styles.rectangle} />
          <div className={styles.paymentMethodTitle}>
            <h3>결제 수단</h3>
            <hr className={styles.updownBorder} />
          </div>
          <span>토스페이</span>
        </div>
      </div>
    </div>
  );
}
