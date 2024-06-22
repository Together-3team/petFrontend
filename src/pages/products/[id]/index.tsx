import classNames from 'classnames/bind';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import axiosInstance from '@/apis/authAxiosInstance';

import CartButton from '@/components/common/Button/Cart';
import Header from '@/components/common/Layout/Header';
import ProductInfo from '@/components/productDetails/productInfo';
import DetailedDescription from '@/components/productDetails/detailedDescription';
import BackButton from '@/components/common/Button/BackButton';
import OrderPolicy from '@/components/productDetails/orderPolicy';
import CardSliderSimilar from '@/components/common/Card/CardSlider/Similar';
import { Product } from '@/types/product';
import styles from './ProductDetail.module.scss';
import HighlightTeam from '@/components/common/Team/HighlightTeam';
import HighlightReview from '@/components/common/review/HighlightReview';

const cx = classNames.bind(styles);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.['id'];
  let product;
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
  const router = useRouter();
  const { id } = router.query;
  const productId = Number(id);
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
        <HighlightTeam productId={productId} />
        <HighlightReview productId={productId} />
        <DetailedDescription descriptionImages={product.detail?.descriptionImages} />
        <div className={cx('cardSlider')}>
          {/* product.petType, product.productType props*/}
          <CardSliderSimilar />
        </div>
        <OrderPolicy productId={productId} />
      </div>
    </>
  );
}
