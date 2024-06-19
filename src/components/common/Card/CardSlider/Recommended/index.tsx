import styles from './CardSliderRecommended.module.scss';
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

interface CardSliderRecommendedProps {
  title: string;
}

export default function CardSliderRecommended({ title }: CardSliderRecommendedProps) {
  // 인증/인가 구현되면 변경 예정
  const isLogin = true;
  const user = { name: '해피사랑' };

  /**
   * @TODO 리액트쿼리 추가
   */
  const PRODUCT_LIST = Array(8).fill(PRODUCT);

  return (
    <CardSlider.Root>
      <CardSlider.Header>
        <CardSlider.Title>{title}</CardSlider.Title>
        <CardSlider.Description>
          {isLogin ? (
            <>
              <span className={styles.user}>{user.name}</span>님에게 딱 맞는 상품을 추천해드려요
            </>
          ) : (
            <>공구로 더 저렴하게! 친구와 함께 할인받으세요</>
          )}
        </CardSlider.Description>
        <NextButtonTemp className={styles.nextButton} href="/products/recommended" />
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
              더 다양한 추천 상품이
              <br /> 궁금하신가요?
            </p>
            <Link href="/products/recommended" className={styles.moreButton}>
              전체보기
            </Link>
          </CardPlaceholder>
        </CardSlider.Item>
      </CardSlider.List>
    </CardSlider.Root>
  );
}
