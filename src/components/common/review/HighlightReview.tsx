import ReviewBox from './ReviewBox';
import ReviewSummary from './ReviewSummary';
import styles from './HighlightReview.module.scss';
import Link from 'next/link';

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

export default function HighlightReview({ reviewData = testData }: any) {
  return (
    <div className={styles.highlightReviewLayout}>
      {reviewData.length > 0 ? (
        <>
          <ReviewSummary />
          <div className={styles.reviewContainer}>
            {testData.map(data => (
              <ReviewBox key={data.id} reviewData={data} className={styles.reviewBoxStyle} />
            ))}
          </div>
          <Link href={'/test/review'} className={styles.allReviewLinkBtn}>
            리뷰 전체보기
          </Link>
        </>
      ) : (
        <>
          <p className={styles.review}>리뷰</p>
          <div className={styles.noReview}>아직 등록된 리뷰가 없어요.</div>
        </>
      )}
    </div>
  );
}
