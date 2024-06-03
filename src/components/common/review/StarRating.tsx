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
  rating: number;
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
    <FaStar className={cx(starStyle)} color={selected ? '#FAF60D' : '#D9D9D9'} onClick={onSelect} />
  );

  const handleSelect = (i: number) => {
    if (editable) {
      onRate(i + 1);
    }
  };

  return (
    <div className={cx('starRating', starRatingStyle)}>
      {createArray(TOTAL_STARS).map((_, i) => (
        <Star key={i} selected={rating > i} onSelect={() => handleSelect(i)} />
      ))}
    </div>
  );
}
