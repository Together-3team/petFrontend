import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import styles from './CardSliderRecommended.module.scss';
import NextButtonTemp from '@/components/common/Button/NextButtonTemp';
import CardSlider from '@/components/common/Card/CardSlider/Base';
import Card from '@/components/common/Card';
import CardPlaceholder from '@/components/common/Card/CardPlaceholder';
import { productsRecommendedQueries } from '@/apis/product/queries';
import useAuth from '@/hooks/useAuth';

interface CardSliderRecommendedProps {
  title: string;
}

/*
  사용⭐️)

  * SSR, SSG를 사용해서 prefetch를 하실 경우 추가
  export async function getServerSideProps() {
    await productsRecommendedQueries.prefetchQuery({ page: 1, pageSize: 8 });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  export default function Example() {
    return (
      <CardSliderRecommended title="이런 상품 찾고 있나요?" />
    )
  }
*/
export default function CardSliderRecommended({ title }: CardSliderRecommendedProps) {
  const { isLogin, userData: user } = useAuth();

  const { data: products } = useQuery({
    ...productsRecommendedQueries.queryOptions({ page: 1, pageSize: 8 }),
  });

  return (
    <CardSlider.Root>
      <CardSlider.Header>
        <CardSlider.Title>{title}</CardSlider.Title>
        <CardSlider.Description>
          {isLogin ? (
            <>
              <span className={styles.user}>{user.nickname}</span>님에게 딱 맞는 상품을 추천해드려요
            </>
          ) : (
            <>공구로 더 저렴하게! 친구와 함께 할인받으세요</>
          )}
        </CardSlider.Description>
        <NextButtonTemp className={styles.nextButton} href="/products/recommended" />
      </CardSlider.Header>
      <CardSlider.List>
        {products?.data?.map((product, index) => (
          <CardSlider.Item key={index}>
            <Card
              productInfo={{
                ...product,
                productId: product.id,
                stock: product.totalAmount || 0,
                reviewCount: product.reviewCount,
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
