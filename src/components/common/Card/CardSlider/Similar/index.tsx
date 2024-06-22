import { useQuery } from '@tanstack/react-query';

import styles from './CardSliderSimilar.module.scss';
import CardSlider from '@/components/common/Card/CardSlider/Base';
import Card from '@/components/common/Card';
import { productsQueries } from '@/apis/product/queries';

interface CardSliderSimilarProps {
  petType?: string;
  productType?: string;
}

/*
  사용⭐️)

  * SSR, SSG를 사용해서 prefetch를 하실 경우 추가
  export async function getServerSideProps() {
    await productsQueries.prefetchQuery({ page: 1, pageSize: 8 });

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  export default function Example() {
    return (
      <CardSliderSimilar petType="1" productType="0" />
    )
  }
*/
export default function CardSliderSimilar({ petType = '0', productType = '0' }: CardSliderSimilarProps) {
  const { data: products } = useQuery({
    ...productsQueries.queryOptions({ page: 1, pageSize: 8, petType, productType }),
  });

  return (
    <CardSlider.Root>
      <CardSlider.Header>
        <CardSlider.Title>비슷한 상품</CardSlider.Title>
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
      </CardSlider.List>
    </CardSlider.Root>
  );
}
