import { useState } from 'react';
import classNames from 'classnames/bind';
import useDragScroll from '@/hooks/useDragScroll';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function OrderFilterBar() {
  const dragScrollProps = useDragScroll<HTMLDivElement>();
  const [isClicked, setIsClicked] = useState<string>('');

  const handleClick = (key: string) => {
    setIsClicked(key);
  };
  return (
    <div className={styles.container} {...dragScrollProps}>
      <button
        key="all"
        className={cx('textChip', {
          clickedChip: isClicked === 'all',
        })}
        onClick={() => handleClick('all')}>
        전체
      </button>
      <button
        key="waiting"
        className={cx('textChip', { clickedChip: isClicked === 'waiting' })}
        onClick={() => handleClick('waiting')}>
        공동구매 대기
      </button>
      <button
        key="complete"
        className={cx('textChip', { clickedChip: isClicked === 'complete' })}
        onClick={() => handleClick('complete')}>
        공동구매 완료
      </button>
      <button
        key="ing"
        className={cx('textChip', { clickedChip: isClicked === 'ing' })}
        onClick={() => handleClick('ing')}>
        배송중
      </button>
      <button
        key="arrive"
        className={cx('textChip', { clickedChip: isClicked === 'arrive' })}
        onClick={() => handleClick('arrive')}>
        배송완료
      </button>
      <button
        key="cancel"
        className={cx('textChip', { clickedChip: isClicked === 'cancel' })}
        onClick={() => handleClick('cancel')}>
        취소/환불
      </button>
    </div>
  );
}
