import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import styles from './CardSliderHot.module.scss';
import NextButtonTemp from '@/components/common/Button/NextButtonTemp';
import CardSlider from '@/components/common/Card/CardSlider/Base';
import Card from '@/components/common/Card';
import CardPlaceholder from '@/components/common/Card/CardPlaceholder';
import { productsHotQueries } from '@/apis/product/queries';

/*
  사용⭐️)

  * SSR, SSG를 사용해서 prefetch를 하실 경우 추가
  export async function getServerSideProps() {
    await productsHotQueries.prefetchQuery({ page: 1, pageSize: 8 });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  export default function Example() {
    return (
      <CardSliderHot />
    )
  }
*/
export default function CardSliderHot() {
  const { data: products } = useQuery({
    ...productsHotQueries.queryOptions({ page: 1, pageSize: 8 }),
  });

  return (
    <CardSlider.Root>
      <CardSlider.Header>
        <CardSlider.Title>별점 4.5이상! 인기상품</CardSlider.Title>
        <CardSlider.Description>지금 인기많은 상품이에요</CardSlider.Description>
        <NextButtonTemp className={styles.nextButton} href="/products/hot" />
      </CardSlider.Header>
      <CardSlider.List>
        {products?.data.map((product, index) => (
          <CardSlider.Item key={index}>
            <Card
              productInfo={{
                ...product,
                productId: product.id,
                stock: product.totalAmount || 0,
                reviewCount: product.reviewCount && 1000,
                starRating: product.averageRating,
              }}
              size="large"
              isZzim
            />
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
