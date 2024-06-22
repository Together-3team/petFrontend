import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import RatingBox from '@/components/common/review/RatingBox';
import ReviewBox from '@/components/common/review/ReviewBox';
import { httpClient } from '@/apis/httpClient';
import { Product, ProductReview } from '@/types/product';
import styles from './ReviewPage.module.scss';

export default function ReviewPage() {
  const router = useRouter();
  const productId = router.query.id;

  const [reviewData, setReviewData] = useState<ProductReview[]>([]);
  const [averageRating, setAverageRating] = useState<string>('');
  const [sortOption, setSortOption] = useState('최신순');

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

  const sortData = (option: string) => {
    let sorted: ProductReview[] = [];
    if (option === '최신순') {
      sorted = [...reviewData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (option === '별점 높은 순') {
      sorted = [...reviewData].sort((a, b) => b.rating - a.rating);
    } else if (option === '별점 낮은 순') {
      sorted = [...reviewData].sort((a, b) => a.rating - b.rating);
    }
    setReviewData(sorted);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSortOption(option);
    sortData(option);
  };

  return (
    <div className={styles.reviewPageLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.pageTitle}>
            리뷰 전체보기 <span className={styles.totalReview}>{reviewData.length}</span>
          </Header.Center>
        </Header.Box>
      </Header.Root>
      <div>
        <RatingBox rating={averageRating} totalReviewer={reviewData.length} className={styles.ratingBoxStyle} />
        <div className={styles.dropdown}>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="최신순">최신순</option>
            <option value="별점 높은 순">별점 높은 순</option>
            <option value="별점 낮은 순">별점 낮은 순</option>
          </select>
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
