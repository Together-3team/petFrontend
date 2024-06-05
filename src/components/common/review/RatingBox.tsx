import classNames from 'classnames/bind';
import StarRating from './StarRating';
import styles from './RatingBox.module.scss';

interface RatingBoxProps {
  rating: number;
  totalReviewer: number;
  className?: string;
}

const cx = classNames.bind(styles);

export default function RatingBox({ rating, totalReviewer, className }: RatingBoxProps) {
  return (
    <div className={cx('ratingBoxLayout', className)}>
      <StarRating rating={rating} starRatingStyle={styles.starRating} starStyle={styles.star} />
      <p className={styles.totalRating}>
        {rating}
        <span className={styles.defaultRating}> / 5.0</span>
      </p>
      <p className={styles.totalReviewer}>{`(${totalReviewer}명)`}</p>
    </div>
  );
}
