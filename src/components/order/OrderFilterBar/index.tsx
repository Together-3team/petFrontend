import { useState } from 'react';
import classNames from 'classnames/bind';
import useDragScroll from '@/hooks/useDragScroll';

import styles from './OrderFilterBar.module.scss';

const cx = classNames.bind(styles);

export default function OrderFilterBar() {
  const dragScrollProps = useDragScroll<HTMLDivElement>();
  const [isClicked, setIsClicked] = useState<string>('전체');

  const handleClick = (key: string) => {
    setIsClicked(key);
  };

  const buttonIds = ['전체', '공동구매 대기', '공동구매 완료', '배송중', '배송완료', '취소/환불'];

  return (
    <div className={styles.container} {...dragScrollProps}>
      {buttonIds.map(item => (
        <button
          key={item}
          className={cx('textChip', { clickedChip: isClicked === item })}
          onClick={() => handleClick(item)}>
          {item}
        </button>
      ))}
    </div>
  );
}
