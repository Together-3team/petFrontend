import StarRating from './StarRating';
import styles from './ReviewSummary.module.scss';

export default function ReviewSummary() {
  const rating = 4.5;
  const totalReviewer = 180;

  return (
    <div className={styles.reviewSummaryLayout}>
      <div className={styles.reviewTitleBox}>
        <p className={styles.review}>리뷰</p>
        <p className={styles.totalReview}>{totalReviewer}</p>
      </div>
      <div className={styles.ratingBox}>
        <StarRating rating={rating} starRatingStyle={styles.starRating} starStyle={styles.star} />
        <p className={styles.totalRating}>
          {rating}
          <span className={styles.defaultRating}> / 5.0</span>
        </p>
        <p className={styles.totalReviewer}>{`(${totalReviewer}명)`}</p>
      </div>
    </div>
  );
}
