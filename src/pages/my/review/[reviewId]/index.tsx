import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import ReviewProductDataCard from '@/components/common/review/ReviewProductDataCard';
import StarRating from '@/components/common/review/StarRating';
import Textarea from '@/components/common/review/Textarea';
import { getReviewDetail } from '@/apis/myReviewAPI';
import { PurchaseInfo, Review } from '@/types/review';
import styles from './ReviewDetailPage.module.scss';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const reviewId = context.params?.reviewId;

  if (!reviewId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      reviewId: reviewId || '0',
    },
  };
}

export default function ReviewDetailPage({ reviewId }: any) {
  const [reviewData, setReviewData] = useState<Review | undefined>();
  const [purchaseInfo, setPurchaseInfo] = useState<PurchaseInfo | undefined>();

  useEffect(() => {
    const fetchReviewDetailData = async () => {
      try {
        const response = (await getReviewDetail(reviewId)) as Review;

        const purchaseInfo: PurchaseInfo = {
          title: response.title,
          combinationName: response.combinationName,
          quantity: parseInt(response.quantity, 10),
          thumbNailImage: response.thumbNailImage,
        };

        setPurchaseInfo(purchaseInfo);
        setReviewData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviewDetailData();
  }, []);

  const formatCreatedAt = (createdAt: string): string => {
    const date = new Date(createdAt);
    return `${date.getFullYear()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${('0' + date.getDate()).slice(-2)}`;
  };

  return (
    <div className={styles.reviewDetailPageLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.pageTitle}>리뷰 상세보기</Header.Center>
        </Header.Box>
      </Header.Root>
      {purchaseInfo && (
        <div>
          <ReviewProductDataCard purchaseInfo={purchaseInfo} />
          <div className={styles.ratingAndDate}>
            <div className={styles.ratingBox}>
              <StarRating rating={reviewData?.rating} />
              <p className={styles.ratingCount}>{reviewData?.rating}.0</p>
            </div>
            <p className={styles.date}>{formatCreatedAt(reviewData?.createdAt)}</p>
          </div>
          <Textarea className={styles.description} disabled value={reviewData?.description} />
        </div>
      )}
    </div>
  );
}
