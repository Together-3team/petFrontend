import { dehydrate } from '@tanstack/react-query';

import styles from './HomePage.module.scss';
import BannerCarousel from '@/components/common/Carousel/Banner';

import banner1 from '@/assets/images/test-carousel1.jpg';
import banner2 from '@/assets/images/test-carousel2.jpg';
import banner3 from '@/assets/images/test-carousel3.jpg';
import banner4 from '@/assets/images/test-carousel4.jpg';
import banner5 from '@/assets/images/test-carousel5.jpg';
import Header from '@/components/common/Layout/Header';
import NavTop from '@/components/common/Nav/Top';
import NavBottom from '@/components/common/Nav/Bottom';
import SearchButton from '@/components/common/Button/Search';
import CartButton from '@/components/common/Button/Cart';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import GitHubBox from '@/components/common/GitHubBox';
import CategoryBox from '@/components/home/CategoryBox';
import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';
import CardSliderHot from '@/components/common/Card/CardSlider/Hot';
import LogoFull from '@/components/common/Icon/LogoFull';
import { productsHotQueries, productsRecommendedQueries } from '@/apis/product/queries';
import { queryClient } from '@/utils/queryClient';

const BANNER_IMAGES = [
  { src: banner1.src, alt: '배너1' },
  { src: banner2.src, alt: '배너2' },
  { src: banner3.src, alt: '배너3' },
  { src: banner4.src, alt: '배너4' },
  { src: banner5.src, alt: '배너5' },
];

export async function getServerSideProps() {
  await productsRecommendedQueries.prefetchQuery({ page: 1, pageSize: 8 });
  await productsHotQueries.prefetchQuery({ page: 1, pageSize: 8 });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header.Root className={styles.header}>
        <Header.Box>
          <Header.Left>
            <LogoFull />
          </Header.Left>
          <Header.Right>
            <SearchButton />
            <CartButton />
          </Header.Right>
        </Header.Box>
        <NavTop />
      </Header.Root>
      <BannerCarousel items={BANNER_IMAGES} />
      <div className={styles.recommendedBox}>
        <CardSliderRecommended title="이런 상품 찾고 있나요?" />
      </div>
      <div className={styles.hotBox}>
        <CardSliderHot />
      </div>
      <div className={styles.categoryBox}>
        <CategoryBox />
      </div>
      <GitHubBox />
      <FloatingBox>
        <NavBottom />
      </FloatingBox>
    </div>
  );
}
