import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';

import styles from './Empty.module.scss';

export default function Empty() {
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
