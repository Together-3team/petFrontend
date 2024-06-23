import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import styles from './CardListRecommended.module.scss';
import Card from '@/components/common/Card';
import { infiniteProductsRecommendedQueries } from '@/apis/product/queries';
import useIntersect from '@/hooks/useIntersect';
import CardPlaceholder from '@/components/common/Card/CardPlaceholder';
import SortButton from '@/components/common/Button/Sort';

interface CardListRecommendedProps {
  className?: string;
  petType?: string;
  orderBy?: string;
}

const cx = classNames.bind(styles);

const SORT_OPTIONS = [
  { name: '최신순', value: '0' },
  { name: '별점 높은 순', value: '1' },
  { name: '별점 낮은 순', value: '2' },
  { name: '가격 높은 순', value: '3' },
  { name: '가격 낮은 순', value: '4' },
];

const PAGE_SIZE = 8;

export default function CardListRecommended({ className, petType = '0', orderBy = '0' }: CardListRecommendedProps) {
  const router = useRouter();
  const {
    data: productsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...infiniteProductsRecommendedQueries.queryOptions({ page: 1, pageSize: PAGE_SIZE, petType, orderBy }),
  });

  const productsPages = productsData?.pages ?? [];
  const hasTargetRef = !isFetchingNextPage && hasNextPage;
  const productsCount = productsPages[0]?.totalCount || 0;

  const targetRef = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasTargetRef) {
      fetchNextPage();
    }
  });

  return (
    <div className={cx('container', className)}>
      <div className={styles.sortBox}>
        <SortButton
          options={SORT_OPTIONS}
          initialOptionValue={orderBy}
          onClick={value => {
            router.replace({
              pathname: '/products/recommended',
              query: {
                ...router.query,
                orderBy: value,
              },
            });
          }}
        />
        <p className={styles.productsCount}>{productsCount}개 상품</p>
      </div>
      <div className={styles.divider} />
      <ul className={styles.list}>
        {productsPages.map(productsPage =>
          productsPage.data.map(product => (
            <li key={product.id} className={styles.item}>
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
