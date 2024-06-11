import classNames from 'classnames/bind';

import CartButton from '@/components/common/Button/Cart';
import Header from '@/components/common/Layout/Header';
import styles from './ProductDetail.module.scss';
import ProductInfo from '@/components/productDetails/productInfo';
import DetailedDescription from '@/components/productDetails/detailedDescription';
import SimilarProducts from '@/components/productDetails/similarProducts';
import BackButton from '@/components/common/Button/BackButton';
import Button from '@/components/common/Button';
import OrderPolicy from '@/components/productDetails/orderPolicy';

const cx = classNames.bind(styles);

export default function ProductDetailPage() {
  return (
    <>
      <Header.Root className={cx('headerRoot')}>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Right>
            <CartButton />
          </Header.Right>
        </Header.Box>
      </Header.Root>
      <ProductInfo />
      {/* 공동구매 & 
      리뷰 */}
      <DetailedDescription />
      <SimilarProducts />
      <OrderPolicy />
    </>
  );
}
