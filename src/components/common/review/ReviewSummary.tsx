import StarRating from './StarRating';
import styles from './ReviewSummary.module.scss';

export default function ReviewSummary() {
  const rating = 4.5;
  const totalReviewer = 180;

  return (
    <div>
      <div>
        <p>리뷰</p>
        <p>리뷰 개수</p>
      </div>
      <div>
        <StarRating rating={rating} />
        <p>
          {rating}
          <span>/ 5.0</span>
        </p>
        <p>{`(${totalReviewer}명)`}</p>
      </div>
    </div>
  );
}
