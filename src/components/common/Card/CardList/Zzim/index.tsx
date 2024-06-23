import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import styles from './CardListZzim.module.scss';
import { zzimsQueries } from '@/apis/product/queries';
import Card from '@/components/common/Card';

interface CardListZzimProps {
  className?: string;
  petType?: string;
  productType?: string;
  orderBy?: string;
  keyword?: string;
}

const cx = classNames.bind(styles);

export default function CardListZzim({ className }: CardListZzimProps) {
  const { data: products } = useQuery({
    ...zzimsQueries.queryOptions(),
  });

  return (
    <div className={cx('container', className)}>
      <ul className={styles.list}>
        {products?.map((product, index) => (
          <li key={index}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
