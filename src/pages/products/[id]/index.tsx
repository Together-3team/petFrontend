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
import OptionBottomSheet from '@/components/product/OptionBottomSheet';
import useModal from '@/hooks/useModal';
import Zzim from '@/components/common/Zzim';
import Button from '@/components/common/Button';
import BottomModal from '@/components/common/Modal/Base/BottomModal';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { httpClient } from '@/apis/httpClient';

const cx = classNames.bind(styles);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.['id'];
  let product;
  try {
    const res = await axiosInstance.get(`/products/detail/${productId}`);
    product = res.data;
  } catch {
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
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const {
    modalOpen: secondModalOpen,
    handleModalOpen: handleSecondModalOpen,
    handleModalClose: handleSecondModalClose,
  } = useModal();
  const router = useRouter();
  const { id } = router.query;
  const productId = Number(id);
  const { isLogin } = useAuth();

  const handleLoginButtonClick = () => {
    router.replace({ pathname: '/my', query: { prevPath: router.asPath } });
  };

  //페이지에서 벗어나면 주문 목록 초기화
  useEffect(() => {
    const handleUrlChange = async () => {
      try {
        // await axiosInstance.delete('/selected-products/orders');
        await httpClient().delete('/selected-products/orders');
        console.log('주문 목록 초기화 요청을 보냈습니다.');
      } catch (error) {
        console.error('요청 중 오류가 발생했습니다:', error);
      }
    };
    router.events.on('routeChangeStart', handleUrlChange);

    return () => {
      router.events.off('routeChangeStart', handleUrlChange);
    };
  }, [router.events]);

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
      <div className={cx('fixedCta')}>
        <div className={cx('zzim')}>
          <Zzim color="gray" productId={productId} initialIsZzimed={product ? product.isZzimed : undefined} />
        </div>
        <div className={cx('button')}>
          <Button
            size="large"
            backgroundColor="$color-pink-main"
            onClick={isLogin ? handleModalOpen : handleSecondModalOpen}>
            구매하기
          </Button>
        </div>
      </div>
      {/* <OptionBottomSheet isOpen={modalOpen} onClose={handleModalClose} productId={productId} type="purchaseOnly" /> */}
      <OptionBottomSheet isOpen={modalOpen} onClose={handleModalClose} productId={productId} type="cartPurchase" />
      <BottomModal isOpen={secondModalOpen} onClose={handleSecondModalClose}>
        <div className={cx('modalContents')}>
          <p className={cx('modalTitle')}>
            로그인이 필요합니다.
            <br />
            로그인 페이지로 이동하시겠습니까?
          </p>
          <div className={cx('modalButtons')}>
            <Button size="medium" backgroundColor="$color-white" onClick={handleSecondModalClose}>
              취소
            </Button>
            <Button size="medium" backgroundColor="$color-gray-800" onClick={handleLoginButtonClick}>
              확인
            </Button>
          </div>
        </div>
      </BottomModal>
    </>
  );
}
