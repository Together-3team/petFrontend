import { useInfiniteQuery } from '@tanstack/react-query';

import styles from './CardListRecommended.module.scss';
import Card from '@/components/common/Card';
import { infiniteProductsRecommendedQueries } from '@/apis/product/queries';
import classNames from 'classnames/bind';
import useIntersect from '@/hooks/useIntersect';
import CardPlaceholder from '../../CardPlaceholder';

interface CardListRecommendedProps {
  className?: string;
  petType?: string;
  orderBy?: string;
}

const cx = classNames.bind(styles);

const PAGE_SIZE = 8;

export default function CardListRecommended({ className, petType = '0', orderBy = '0' }: CardListRecommendedProps) {
  const {
    data: productsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...infiniteProductsRecommendedQueries.queryOptions({ page: 1, pageSize: PAGE_SIZE, petType, orderBy }),
  });

  const targetRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  const productsPages = productsData?.pages ?? [];
  const hasTargetRef = !isFetchingNextPage && hasNextPage;

  return (
    <div className={cx('container', className)}>
      <ul className={styles.list}>
        {productsPages.map(productsPage =>
          productsPage.data.map(product => (
            <li key={product.id}>
              <Card
                key={product.id}
                productInfo={{
                  ...product,
                  productId: product.id,
                  stock: product.totalAmount || 0,
                  reviewCount: product.reviewCount,
                  starRating: product.averageRating,
                }}
                size="extraLarge"
                isZzim
              />
            </li>
          ))
        )}
        {isFetchingNextPage &&
          Array(8).map((_, index) => (
            <li key={index}>
              <CardPlaceholder />
            </li>
          ))}
        {hasTargetRef && <div ref={targetRef} />}
      </ul>
    </div>
  );
}
