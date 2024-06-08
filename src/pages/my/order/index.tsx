import classNames from 'classnames/bind';
import Header from '@/components/common/Layout/Header';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/BackButton';
import rectangleImg from '@/assets/images/rectangle.png';
import OrderFilterBar from '@/components/OrderFilterBar';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function Order() {
  const productList6 = {
    productId: 6,
    title: '진짜 육포입니다람쥐이이이이이이이이이이이이이이이이ㅣ이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 4,
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
        <div className={styles.orderCards}>
          <div>
            <Card productInfo={productList6} direction="row" size="miniImage" />
            <div className={styles.orderCardButtons}>
              <Button size="small" backgroundColor="$color-white-gray">
                주문 취소
              </Button>
              <Button size="small" backgroundColor="$color-gray-100">
                주문 취소
              </Button>
              <Button size="small" backgroundColor="$color-gray-100">
                주문 취소
              </Button>
            </div>
          </div>
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
          <Card productInfo={productList6} direction="row" size="small" />
        </div>
      </div>
    </div>
  );
}
