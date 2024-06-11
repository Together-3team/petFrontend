import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import Card from '@/components/common/Card';
import rectangleImg from '@/assets/images/rectangle.png';

import styles from './Order.module.scss';

export default function Empty() {
  const productList2 = {
    productId: 2,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  //TODO: NextButton 추가
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
      <div className={styles.noOrder}>아직 주문 내역이 없어요</div>
      <div className={styles.custom}>
        <div>
          <h2>이 상품은 어떠세요?</h2>
          <h3>
            해피사랑님<span>에게 딱 맞는 상품을 추천해드려요</span>
          </h3>
        </div>
        <div className={styles.customCardContainer}>
          <div className={styles.customCard}>
            <Card size="big" productInfo={productList2} />
            <Card size="big" productInfo={productList2} />
            <Card size="big" productInfo={productList2} />
            <Card size="big" productInfo={productList2} />
          </div>
        </div>
      </div>
    </div>
  );
}
