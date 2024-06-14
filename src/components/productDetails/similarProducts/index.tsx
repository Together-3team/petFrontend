import Button from '@/components/common/Button';
import classNames from 'classnames/bind';
import styles from './SimilarProducts.module.scss';
import Card from '@/components/common/Card';

export interface ProductInfo {
  productId: number;
  title: string;
  thumbNailImage: string;
  originalPrice: number;
  price: number;
  starRating?: number;
  reviewCount?: number;
  stock: number;
  option?: string;
  quantity?: number;
}

const cx = classNames.bind(styles);

export default function SimilarProducts({ productList }: { productList: ProductInfo[] }) {
  return (
    <div className={cx('contents')}>
      <h2 className={cx('title')}>비슷한 상품</h2>
      <div className={cx('productList')}>
        {productList.map(productInfo => {
          return <Card size="big" key={productInfo.productId} productInfo={productInfo} isZzim />;
        })}
      </div>
    </div>
  );
}
