import classNames from 'classnames/bind';
import axiosInstance from '@/apis/authAxiosInstance';

import CartButton from '@/components/common/Button/Cart';
import Header from '@/components/common/Layout/Header';
import styles from './ProductDetail.module.scss';
import ProductInfo from '@/components/productDetails/productInfo';
import DetailedDescription from '@/components/productDetails/detailedDescription';
import BackButton from '@/components/common/Button/BackButton';
import OrderPolicy from '@/components/productDetails/orderPolicy';
import CardSliderSimilar from '@/components/common/Card/CardSlider/Similar';
import { Product } from '@/types/product';
import { GetServerSidePropsContext } from 'next';

const cx = classNames.bind(styles);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.['id'];
  let product;
  console.log('song');
  try {
    const res = await axiosInstance.get(`/products/detail/${productId}`);
    product = res.data;
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
    },
  };
}

export default function ProductDetailPage({ product }: { product: Product }) {
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
      <div className={cx('contents')}>
        <ProductInfo product={product} />
        {/* 공동구매 & 
      리뷰 */}
        <DetailedDescription descriptionImages={product.detail.descriptionImages} />
        <div className={cx('cardSlider')}>
          {/* product.petType, product.productType props*/}
          <CardSliderSimilar />
        </div>
        <OrderPolicy />
      </div>
    </>
  );
}
