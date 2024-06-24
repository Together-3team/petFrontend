import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
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
import HighlightTeam from '@/components/common/Team/HighlightTeam';
import HighlightReview from '@/components/common/review/HighlightReview';
import OptionBottomSheet from '@/components/product/OptionBottomSheet';
import useModal from '@/hooks/useModal';
import Zzim from '@/components/common/Zzim';
import Button from '@/components/common/Button';
import useAuth from '@/hooks/useAuth';
import { httpClient } from '@/apis/httpClient';
import useToast from '@/hooks/useToast';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import FloatingActionBox from '@/components/common/Layout/Footer/FloatingActionBox';
import ScrollTopButton from '@/components/common/Button/ScrollTop';
import LoginModal from '@/components/common/Modal/LoginModal';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const productId = context.params?.id;
  const open = context.query.open || null;
  const groupId = context.query.groupid || null;
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
      open,
      groupId,
    },
  };
}

export default function ProductDetailPage({
  product,
  open,
  groupId,
}: {
  product: Product;
  open: string;
  groupId: number;
}) {
  // const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const [isOpen, setIsOpen] = useState(!!open);
  const {
    modalOpen: secondModalOpen,
    handleModalOpen: handleSecondModalOpen,
    handleModalClose: handleSecondModalClose,
  } = useModal();
  const router = useRouter();
  const { id } = router.query;
  const productId = Number(id);
  const { isLogin } = useAuth();
  const { showToast } = useToast('fixedCta');
  const [bottomSheetType, setBottomSheetType] = useState<'cartPurchase' | 'purchaseOnly'>('cartPurchase');

  useEffect(() => {
    if (open === 'true') {
      // handleModalOpen();
      setIsOpen(true);
      setBottomSheetType('purchaseOnly');
    }
    //일부러 빈 배열을 넣음.
  }, []);

  //페이지 들어오면 주문 목록 초기화
  useEffect(() => {
    const handleUrlChange = async () => {
      try {
        /// await axiosInstance.delete('/selected-products/orders');
        await httpClient().delete('/selected-products/orders');
      } catch (error) {
        console.error('요청 중 오류가 발생했습니다:', error);
      }
    };
    handleUrlChange();
  }, []);

  return (
    <div className={cx('layout')}>
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
        <HighlightTeam product={product} showToast={showToast} />
        <HighlightReview productId={productId} />
        <DetailedDescription descriptionImages={product.detail?.descriptionImages} />
        <div className={cx('cardSlider')}>
          {/* product.petType, product.productType props*/}
          <CardSliderSimilar />
        </div>
        <OrderPolicy productId={productId} />
      </div>

      <FloatingBox id="fixedCta">
        <FloatingActionBox>
          <ScrollTopButton />
        </FloatingActionBox>
        <div className={cx('fixedCta')}>
          <div className={cx('zzim')}>
            <Zzim color="gray" productId={productId} initialIsZzimed={product ? product.isZzimed : undefined} />
          </div>
          <div className={cx('button')}>
            <Button
              size="large"
              backgroundColor="$color-pink-main"
              onClick={
                isLogin
                  ? () => {
                      setIsOpen(true);
                      setBottomSheetType('cartPurchase');
                    }
                  : handleSecondModalOpen
              }>
              구매하기
            </Button>
          </div>
        </div>
      </FloatingBox>
      {/* <OptionBottomSheet isOpen={modalOpen} onClose={handleModalClose} productId={productId} type="purchaseOnly" /> */}
      <OptionBottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={product}
        type={bottomSheetType}
        showToast={showToast}
        groupBuyingId={groupId}
      />
      <LoginModal isOpen={secondModalOpen} onClose={handleSecondModalClose} />
    </div>
  );
}
