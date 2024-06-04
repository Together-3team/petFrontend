import BackButton from '@/components/common/BackButton';
import styles from './ReviewPage.module.scss';
import StarRating from '@/components/common/review/StarRating';
import ReviewBox from '@/components/common/review/ReviewBox';

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
  ];

  const rating = 4.5;
  const totalReviewer = 180;

  return (
    <div className={styles.reviewPageLayout}>
      <div>
        <div>
          <BackButton />
          <p className={styles.pageTitle}>
            리뷰 전체보기 <span className={styles.TotalReview}>{totalReviewer}</span>
          </p>
        </div>
        <div>
          <StarRating rating={rating} />
          <div>
            <p>{rating} / 5.0</p>
            <p>{totalReviewer}명</p>
          </div>
        </div>
        <div>dropdown</div>
      </div>
      <div className={styles.reviewContainer}>
        {testData.map(data => (
          <ReviewBox key={data.id} reviewData={data} className={styles.reviewBoxStyle} />
        ))}
      </div>
    </div>
  );
}
