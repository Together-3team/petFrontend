import Card from '@/components/common/Card';
import CardSlider from '@/components/common/Card/CardSlider/Base';
import CardSliderDescription from '@/components/common/Card/CardSlider/Base/Description';
import CardSliderList from '@/components/common/Card/CardSlider/Base/List';
import CardSliderTitle from '@/components/common/Card/CardSlider/Base/Title';

import styles from './CardSliderPage.module.scss';
import rectangleImg from '@/assets/images/rectangle.png';
import NextButtonTemp from '@/components/common/Button/NextButtonTemp';

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

export default function CardSliderPage() {
  return (
    <CardSlider.Root>
      <CardSlider.Header>
        <CardSliderTitle>이런 상품 찾고 있나요?</CardSliderTitle>
        <CardSliderDescription>해피사랑님에게 딱 맞는 상품을 추천해드려요</CardSliderDescription>
        <NextButtonTemp className={styles.nextButton} href="#" />
      </CardSlider.Header>
      <CardSliderList>
        {Array(8)
          .fill(PRODUCT)
          .map((product, index) => (
            <li key={index}>
              <Card productInfo={product} size="big" isZzim />
            </li>
          ))}
      </CardSliderList>
    </CardSlider.Root>
  );
}
