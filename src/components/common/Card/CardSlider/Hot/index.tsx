import styles from './CardSliderHot.module.scss';
import NextButtonTemp from '@/components/common/Button/NextButtonTemp';
import CardSlider from '@/components/common/Card/CardSlider/Base';
import rectangleImg from '@/assets/images/rectangle.png';
import Card from '@/components/common/Card';
import CardPlaceholder from '../../CardPlaceholder';
import Link from 'next/link';

const PRODUCT = {
  productId: 2,
  title: '진짜 육포입니다람쥐이이이이이이이이이',
  thumbNailImage: rectangleImg.src,
  originalPrice: 12000,
  price: 10800,
  starRating: 4.5,
  reviewCount: 200,
  stock: 3,
} as const;

export default function CardSliderHot() {
  /**
   * @TODO 리액트쿼리 추가
   */
  const PRODUCT_LIST = Array(8).fill(PRODUCT);

  return (
    <CardSlider.Root>
      <CardSlider.Header>
        <CardSlider.Title>별점 4.5이상! 인기상품</CardSlider.Title>
        <CardSlider.Description>지금 인기많은 상품이에요</CardSlider.Description>
        <NextButtonTemp className={styles.nextButton} href="/products/hot" />
      </CardSlider.Header>
      <CardSlider.List>
        {PRODUCT_LIST.map((product, index) => (
          <CardSlider.Item key={index}>
            <Card productInfo={product} size="big" isZzim />
          </CardSlider.Item>
        ))}
        <CardSlider.Item>
          <CardPlaceholder>
            <p className={styles.moreText}>
              더 다양한 인기 상품이
              <br /> 궁금하신가요?
            </p>
            <Link href="/products/hot" className={styles.moreButton}>
              전체보기
            </Link>
          </CardPlaceholder>
        </CardSlider.Item>
      </CardSlider.List>
    </CardSlider.Root>
  );
}
