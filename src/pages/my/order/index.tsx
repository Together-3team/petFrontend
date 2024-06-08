import classNames from 'classnames/bind';
import Header from '@/components/common/Layout/Header';
import Card from '@/components/common/Card';
import BackButton from '@/components/common/BackButton';
import rectangleImg from '@/assets/images/rectangle.png';
import OrderFilterBar from '@/components/OrderFilterBar';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function Order() {
  const productList5 = {
    id: 1,
    title: '진짜 육포',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  return (
    <div className={styles.orderLayout}>
      <div>
        <Header.Root>
          <Header.Box>
            <Header.Left>
              <BackButton />
            </Header.Left>
            <h1>주문내역</h1>
          </Header.Box>
        </Header.Root>
        <OrderFilterBar />
      </div>
      <div className={styles.orderList}>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoUp}>
            <span className={styles.orderDate}>2024.05.21</span>
            <span className={styles.orderDetail}>주문상세</span>
          </div>
          <span className={styles.orderNumber}>주문번호</span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
