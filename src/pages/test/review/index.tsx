import BackButton from '@/components/common/BackButton';
import styles from './ReviewPage.module.scss';
import StarRating from '@/components/common/review/StarRating';
import ReviewBox from '@/components/common/review/ReviewBox';
import Dropdown from '@/components/common/Dropdown';

export default function ReviewPage() {
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
    {
      id: 4,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 5,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 6,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 7,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 8,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 9,
      nickname: '서리핑3',
      option: '소고기맛',
      quantity: 2,
      rating: 3,
      description:
        '정말 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
      createdAt: '2024-05-24T14:35:22.000Z',
    },
    {
      id: 10,
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
  const options = ['최신순', '별점 높은 순', '별점 낮은 순'];

  return (
    <div className={styles.reviewPageLayout}>
      <div>
        <div className={styles.reviewPageHeader}>
          <p className={styles.pageTitle}>
            리뷰 전체보기 <span className={styles.totalReview}>{totalReviewer}</span>
          </p>
        </div>
        <div className={styles.ratingBox}>
          <StarRating rating={rating} starRatingStyle={styles.starRating} starStyle={styles.star} />
          <p className={styles.totalRating}>
            {rating}
            <span className={styles.defaultRating}> / 5.0</span>
          </p>
          <p className={styles.totalReviewer}>{`(${totalReviewer}명)`}</p>
        </div>
        <div className={styles.dropdown}>dropdown</div>
      </div>
      <div className={styles.reviewContainer}>
        {testData.map(data => (
          <ReviewBox key={data.id} reviewData={data} className={styles.reviewBoxStyle} />
        ))}
      </div>
    </div>
  );
}
