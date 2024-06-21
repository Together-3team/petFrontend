import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import purchaseApi from '@/apis/purchase/api';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import rectangleImg from '@/assets/images/rectangle.png';
import OrderFilterBar from '@/components/order/OrderFilterBar';
import OrderCard from '@/components/order/OrderCard';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function Order() {
  const { data: purchaseData } = useQuery({ queryKey: ['purchase'], queryFn: purchaseApi.getPurchase });
  console.log(purchaseData);

  const purchaseId = purchaseData?.data[0].orderId;

  const { data: purchaseDetailData } = useQuery({
    queryKey: ['purchaseDetail', purchaseId],
    queryFn: async () => {
      const response = purchaseApi.getDetailPurchase(purchaseId);
      return response;
    },
  });

  console.log(purchaseDetailData);

  //mock 데이터 입니다.
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
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>주문내역</h1>
        </Header.Box>
      </Header.Root>
      <OrderFilterBar />
      <div className={styles.orderList}>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoUp}>
            <span className={styles.orderDate}>2024.05.21</span>
            <span className={styles.orderDetail}>주문상세</span>
          </div>
          <span className={styles.orderNumber}>주문번호</span>
        </div>
        <div className={styles.orderCards}>
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
          <OrderCard productInfo={productList6} tagText="공동구매 대기" />
        </div>
      </div>
    </div>
  );
}
