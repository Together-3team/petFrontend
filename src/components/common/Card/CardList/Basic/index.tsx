import { useInfiniteQuery } from '@tanstack/react-query';

import styles from './CardListBasic.module.scss';
import Card from '@/components/common/Card';
import { infiniteProductsQueries } from '@/apis/product/queries';
import classNames from 'classnames/bind';
import useIntersect from '@/hooks/useIntersect';
import CardPlaceholder from '../../CardPlaceholder';

interface CardListBasicProps {
  className?: string;
  petType?: string;
  productType?: string;
  orderBy?: string;
  keyword?: string;
}

const cx = classNames.bind(styles);

const PAGE_SIZE = 8;

export default function CardListBasic({
  className,
  petType = '0',
  productType = '0',
  orderBy = '0',
  keyword,
}: CardListBasicProps) {
  const {
    data: productsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...infiniteProductsQueries.queryOptions({ page: 1, pageSize: PAGE_SIZE, petType, productType, orderBy, keyword }),
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
