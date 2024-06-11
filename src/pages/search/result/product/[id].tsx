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
import rectangleImg from '@/assets/images/rectangle.png';

const cx = classNames.bind(styles);

export default function ProductDetailPage() {
  const productInfo = {
    productImages: 'string',
    originalPrice: 10000,
    productId: 1,
    price: 5900,
    reviewRating: 4.5,
    reviewCount: 180,
    options: {},
    thumbNailImage: rectangleImg.src,
    optionCombinations: [
      {
        id: 0,
        optionCombination: 'string',
        combinationPrice: 0,
        createdAt: '2024-06-11T06:52:12.142Z',
        productDetailId: 0,
        productId: 0,
      },
    ],
    title: '진짜육포 12종 모음',
    category: 0,
    descriptionImages: 'string',
  };
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
      <ProductInfo
        thumbNailImage={productInfo.thumbNailImage}
        title={productInfo.title}
        originalPrice={productInfo.originalPrice}
        price={productInfo.price}
        reviewRating={productInfo.reviewRating}
        reviewCount={productInfo.reviewCount}
      />
      {/* 공동구매 & 
      리뷰 */}
      <DetailedDescription />
      <SimilarProducts />
      <OrderPolicy />
    </>
  );
}
