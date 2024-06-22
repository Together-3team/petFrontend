import { FaStar } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './StarRating.module.scss';

const createArray = (length: number) => [...Array(length)];

interface StarProps {
  selected?: boolean;
  onSelect?: () => void;
}

interface StarRatingProps {
  starStyle?: string;
  starRatingStyle?: string;
  rating: any;
  editable?: boolean;
  onRate?: (rating: number) => void;
}

const cx = classNames.bind(styles);

export default function StarRating({
  starStyle,
  starRatingStyle,
  rating,
  editable,
  onRate = () => {},
}: StarRatingProps) {
  const TOTAL_STARS = 5;

  const Star = ({ selected, onSelect }: StarProps) => (
    <FaStar
      className={cx(starStyle, { editStarStyle: editable })}
      color={selected ? '#FFD43C' : '#F3F4F7'}
      onClick={onSelect}
    />
  );

  const handleSelect = (i: number) => {
    if (editable) {
      onRate(i + 1);
    }
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 0:
        return '별점을 선택해 주세요';
      case 1:
        return '아쉬워요';
      case 2:
        return '그저 그래요';
      case 3:
        return '괜찮아요';
      case 4:
        return '좋아요';
      case 5:
        return '최고예요';
    }
  };

  return (
    <div className={cx({ editStarRatingBoxStyle: editable })}>
      <div className={cx('starRating', starRatingStyle, { editStarRatingStyle: editable })}>
        {createArray(TOTAL_STARS).map((_, i) => (
          <Star key={i} selected={rating > i} onSelect={() => handleSelect(i)} />
        ))}
      </div>
      {editable && <p className={cx('ratingText')}>{getRatingText(rating)}</p>}
    </div>
  );
}
