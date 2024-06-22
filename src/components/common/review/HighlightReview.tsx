import Link from 'next/link';
import RatingBox from './RatingBox';
import ReviewBox from './ReviewBox';
import styles from './HighlightReview.module.scss';
import { useEffect, useState } from 'react';
import { httpClient } from '@/apis/httpClient';
import { Product, ProductReview } from '@/types/product';

const testData = [
  {
    id: 1,
    nickname: '서리핑1',
    option: '소고기맛/선물포장',
    quantity: 3,
    rating: 4,
    description:
      '설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
    createdAt: '2024-05-24T14:35:22.000Z',
  },
  {
    id: 2,
    nickname: '서리핑2',
    option: '닭고기맛/선물포장',
    quantity: 5,
    rating: 1,
    description:
      '설이는 정말 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
    createdAt: '2024-05-24T14:35:22.000Z',
  },
  {
    id: 3,
    nickname: '서리핑3',
    option: '소고기맛',
    quantity: 2,
    rating: 3,
    description:
      '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
    createdAt: '2024-05-24T14:35:22.000Z',
  },
];

const rating = 4.5;
const totalReviewer = 180;

export default function HighlightReview({ productId }: any) {
  const [reviewData, setReviewData] = useState<ProductReview[]>([]);
  const [averageRating, setAverageRating] = useState<string>('');

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await httpClient().get<Product>(`products/detail/${productId}`);
        console.log(response);
        setReviewData(response.reviews);
        setAverageRating(response.averageRating.toFixed(1));
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviewData();
  }, []);

  return (
    <div className={styles.highlightReviewLayout}>
      {reviewData.length > 0 ? (
        <>
          <div className={styles.sectionTitleBox}>
            <p className={styles.sectionTitle}>리뷰</p>
            <p className={styles.totalReview}>{reviewData.length}</p>
          </div>
          <RatingBox rating={averageRating} totalReviewer={reviewData.length} className={styles.ratingBoxStyle} />
          <div className={styles.reviewContainer}>
            {reviewData.map(data => (
              <ReviewBox key={data.id} reviewData={data} className={styles.reviewBoxStyle} />
            ))}
          </div>
          <Link href="/test/review" className={styles.allReviewLinkBtn}>
            리뷰 전체보기
          </Link>
        </>
      ) : (
        <>
          <p className={styles.sectionTitle}>리뷰</p>
          <div className={styles.noReview}>아직 등록된 리뷰가 없어요.</div>
        </>
      )}
    </div>
  );
}
