import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import rectangleImg from '@/assets/images/rectangle.png';

import styles from './Empty.module.scss';

export default function Empty() {
  //TODO: 데이터 연결 후 삽입
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

  return (
    <>
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
      </div>
      <div className={styles.custom}>
        <div className={styles.customCardContainer}>
          <CardSliderRecommended title="이 상품은 어떠세요?" />
        </div>
      </div>
    </>
  );
}
