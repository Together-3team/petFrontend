import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import styles from './CardListZzim.module.scss';
import { zzimsQueries } from '@/apis/product/queries';
import Card from '@/components/common/Card';
import CardSliderRecommended from '../../CardSlider/Recommended';

interface CardListZzimProps {
  className?: string;
  petType?: string;
  productType?: string;
  orderBy?: string;
  keyword?: string;
}

const cx = classNames.bind(styles);

export default function CardListZzim({ className }: CardListZzimProps) {
  const { data: products, isLoading } = useQuery({
    ...zzimsQueries.queryOptions(),
  });

  if (isLoading) {
    return null;
  }

  const productsLength = products ? products.length : 0;

  return (
    <div className={cx('layout', className)}>
      {productsLength > 0 ? (
        <div>
          <div className={styles.divider} />
          <ul className={styles.list}>
            {products?.map((product, index) => (
              <li key={index} className={styles.item}>
                <Card
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
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.notFoundContainer}>
          <div className={styles.notFoundBox}>아직 찜한 상품이 없어요.</div>
          <div className={styles.cardSlider}>
            <CardSliderRecommended title="이 상품은 어떠세요?" />
          </div>
        </div>
      )}
    </div>
  );
}
