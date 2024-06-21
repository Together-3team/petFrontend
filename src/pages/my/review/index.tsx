import { useState } from 'react';
import purchaseApi from '@/apis/purchase/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import BackButton from '@/components/common/Button/BackButton';
import ReviewCard from '@/review/ReviewCard';
import { ProductInfo } from '@/components/common/Card';
import Header from '@/components/common/Layout/Header';
import classNames from 'classnames/bind';

import styles from './Review.module.scss';

const cx = classNames.bind(styles);

interface PurchaseDataProps {
  purchaseProducts: ProductInfo[];
}

export default function Review() {
  const [reviewWrite, setReviewWrite] = useState(true);
  const [myReview, setMyReview] = useState(false);

  const router = useRouter();
  const { reviewId } = router.query;

  const { data: purchaseData } = useQuery({ queryKey: ['purchase'], queryFn: purchaseApi.getPurchase });
  console.log(purchaseData);

  //const purchaseId = purchaseData?.data[0].purchaseProducts[0].id;
  const orderId = purchaseData?.data[0].id;

  const { data: purchaseDetailData } = useQuery({
    queryKey: ['purchaseDetail', orderId],
    queryFn: async () => {
      const response = purchaseApi.getDetailPurchase(orderId);
      return response;
    },
  });

  console.log(purchaseDetailData);

  const purchaseList =
    purchaseData &&
    purchaseData.data.flatMap((item: PurchaseDataProps) =>
      item.purchaseProducts.map((product: ProductInfo) => ({
        productId: product.productId,
        title: product.title,
        thumbNailImage: product.thumbNailImage,
        originalPrice: product.originalPrice,
        price: product.price,
        option: product.combinationName,
        quantity: product.quantity,
        stock: 1,
      }))
    );

  console.log(purchaseList);

  const purchaseProductId = purchaseData?.data[0].purchaseProducts[0];

  function handleClickWriteReview() {
    router.push({
      pathname: `/my/review/${reviewId || purchaseProductId}`,
      query: {
        productId: purchaseData && purchaseData.data[0].purchaseProducts.id,
        purchaseProductId: purchaseData && purchaseData.data[0].purchaseProducts.productId,
      },
    });
  }

  function handleClickWrite() {
    setReviewWrite(true);
    setMyReview(false);
  }

  function handleClickMyReview() {
    setMyReview(true);
    setReviewWrite(false);
  }

  return (
    <div className={styles.reviewLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>내 리뷰</h1>
        </Header.Box>
      </Header.Root>
      <div className={styles.reviewSelector}>
        <button className={cx('reviewSelectButton', { clickButton: reviewWrite })} onClick={handleClickWrite}>
          리뷰 쓰기
        </button>
        <button className={cx('reviewSelectButton', { clickButton: myReview })} onClick={handleClickMyReview}>
          내가 쓴 리뷰
        </button>
      </div>
      <>
        {reviewWrite ? (
          purchaseData ? (
            <div className={styles.reviewCardList}>
              {purchaseList.map((purchase: ProductInfo) => (
                <ReviewCard key={purchase.productId} productInfo={purchase} onClick={handleClickWriteReview} />
              ))}
            </div>
          ) : (
            <div className={styles.noReview}>지금은 리뷰를 작성해야 할 상품이 없어요.</div>
          )
        ) : (
          <div className={styles.noReview}>아직 내가 쓴 리뷰가 없어요.</div>
        )}
      </>
    </div>
  );
}
