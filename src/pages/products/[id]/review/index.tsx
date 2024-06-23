import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import RatingBox from '@/components/common/review/RatingBox';
import ReviewBox from '@/components/common/review/ReviewBox';
import SortButton from '@/components/common/Button/Sort';
import { httpClient } from '@/apis/httpClient';
import { Product, ProductReview } from '@/types/product';
import styles from './ReviewPage.module.scss';

export function getServerSideProps(context: GetServerSidePropsContext) {
  const sort = context.query['sort'] || '0';

  return {
    props: {
      sort,
    },
  };
}

interface ReviewPageProps {
  sort: string;
}

export default function ReviewPage({ sort }: ReviewPageProps) {
  const router = useRouter();
  const productId = router.query.id;

  const [reviewData, setReviewData] = useState<ProductReview[]>([]);
  const [averageRating, setAverageRating] = useState<string>('');

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await httpClient().get<Product>(`products/detail/${productId}`);

        const sortedReviews = response.reviews.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setReviewData(sortedReviews);
        setAverageRating(response.averageRating.toFixed(1));
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviewData();
  }, [productId]);

  const sortData = (value: string) => {
    let sorted: ProductReview[] = [];

    switch (value) {
      case '0':
        sorted = [...reviewData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case '1':
        sorted = [...reviewData].sort((a, b) => b.rating - a.rating);
        break;
      case '2':
        sorted = [...reviewData].sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    setReviewData(sorted);
  };

  return (
    <div className={styles.reviewPageLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton href={`/products/${productId}`} />
          </Header.Left>
          <Header.Center className={styles.pageTitle}>
            리뷰 전체보기 <span className={styles.totalReview}>{reviewData.length}</span>
          </Header.Center>
        </Header.Box>
      </Header.Root>
      <div>
        <RatingBox rating={averageRating} totalReviewer={reviewData.length} className={styles.ratingBoxStyle} />
        <div className={styles.dropdown}>
          <SortButton
            options={[
              { name: '최신순', value: '0' },
              { name: '별점 높은 순', value: '1' },
              { name: '별점 낮은 순', value: '2' },
            ]}
            initialOptionValue={sort}
            onClick={value => sortData(value)}
          />
        </div>
      </div>
      <div className={styles.reviewContainer}>
        {reviewData.map(data => (
          <ReviewBox key={data.id} reviewData={data} className={styles.reviewBoxStyle} />
        ))}
      </div>
    </div>
  );
}
