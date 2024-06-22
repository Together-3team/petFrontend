import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import OrderCard from '@/components/order/OrderCard';
import TotalPay from '@/components/cart/TotalPay';
import rectangleImg from '@/assets/exampleProductImg.jpg';

import styles from './Order.module.scss';

const orderList = [
  {
    productId: 6,
    title: '진짜 육포입니다람쥐이이이이이이이이이이이이이이이이ㅣ이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 4,
  },
  {
    productId: 6,
    title: '진짜 육포입니다람쥐이이이이이이이이이이이이이이이이ㅣ이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 4,
  },
  {
    productId: 6,
    title: '진짜 육포입니다람쥐이이이이이이이이이이이이이이이이ㅣ이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 4,
  },
];

const deliveryInfo = {
  recipient: '김견주',
  recipientPhoneNumber: '010-1111-1111',
  address: '서울시 마포구 마포로 11',
  detailedAddress: '102동 1104호',
  zipCode: '10102',
};

export default function OrderDetail() {
  function calculateTotalOriginalPrice() {
    return orderList.reduce((total, order) => total + order.originalPrice * order.quantity, 0);
  }

  function calculateTotalPrice() {
    return orderList.reduce((total, order) => total + order.price * order.quantity, 0);
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = calculateTotalPrice();
  const orderCount = orderList.length;

  console.log(orderList[1]);
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
          <h3>2024.04.21</h3>
          <span>주문번호 No. 0102020202</span>
        </div>

        <div className={styles.deliveryArea}>
          <h3>배송지</h3>
          <div className={styles.deliveryCard}>
            <h4>{deliveryInfo.recipient} 집</h4>
            <span>
              {deliveryInfo.recipient} · {deliveryInfo.recipientPhoneNumber}
              <br />
              {deliveryInfo.address}, {deliveryInfo.detailedAddress}
              <br />
              {deliveryInfo.zipCode}
            </span>
          </div>
        </div>
        <div className={styles.deliveryMessageArea}>
          <h3>배송메시지</h3>
          <span className={styles.deliveryMessage}>부재시 경비실에 맡겨주세요</span>
        </div>
        <div className={styles.rectangle} />
      </div>
      <div className={styles.orderListArea}>
        <h3>
          주문 상품 <span>{orderList.length}개</span>
        </h3>
        {orderList.map(order => (
          <OrderCard key={order.productId} productInfo={order} tagText="공동구매 대기" />
        ))}
      </div>
      <div className={styles.orderDetailBottom}>
        <div className={styles.rectangle} />
        <div className={styles.orderPriceArea}>
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
