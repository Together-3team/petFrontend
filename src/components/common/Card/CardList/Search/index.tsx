import { useInfiniteQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import styles from './CardListSearch.module.scss';
import Card from '@/components/common/Card';
import { infiniteProductsSearchQueries } from '@/apis/product/queries';
import useIntersect from '@/hooks/useIntersect';
import CardPlaceholder from '@/components/common/Card/CardPlaceholder';
import SearchNotFound from '@/components/search/SearchNotFound';

interface CardListSearchProps {
  className?: string;
  orderBy?: string;
  keyword?: string;
}

const cx = classNames.bind(styles);

const PAGE_SIZE = 8;

export default function CardListSearch({ className, orderBy = '0', keyword }: CardListSearchProps) {
  const {
    data: productsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    ...infiniteProductsSearchQueries.queryOptions({ page: 1, pageSize: PAGE_SIZE, orderBy, keyword }),
  });

  const productsPages = productsData?.pages ?? [];
  const hasTargetRef = !isFetchingNextPage && hasNextPage;
  const isSearchNotFound = productsPages.length === 0 || productsPages[0].totalCount === 0;

  const targetRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasTargetRef) {
      fetchNextPage();
    }
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className={cx('container', className)}>
      {!isSearchNotFound ? (
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
      ) : (
        <SearchNotFound />
      )}
    </div>
  );
}
