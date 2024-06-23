import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import useDragScroll from '@/hooks/useDragScroll';

import styles from './OrderFilterBar.module.scss';
import scrollToTargetX from '@/utils/scrollToTargetX';

const cx = classNames.bind(styles);

interface OrderFilterBarProps {
  id: number;
  title: string;
  isActive: boolean;
}

const buttonIds: OrderFilterBarProps[] = [
  { id: 0, title: '전체', isActive: true },
  { id: 1, title: '공동구매 대기', isActive: true },
  { id: 2, title: '공동구매 완료', isActive: true },
  { id: 3, title: '주문 완료', isActive: true },
  { id: 4, title: '배송 준비', isActive: true },
  { id: 5, title: '배송 중', isActive: true },
  { id: 6, title: '배송 완료', isActive: true },
  { id: 7, title: '취소/환불', isActive: true },
];

export default function OrderFilterBar() {
  const dragScrollProps = useDragScroll<HTMLDivElement>();
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<OrderFilterBarProps | null>(
    buttonIds.find(item => item.id === 0) || null
  );

  function handleButtonClick() {
    scrollToTargetX(dragScrollProps.ref, targetRef);
  }

  return (
    <div className={styles.container} {...dragScrollProps}>
      {buttonIds.map(item => (
        <button
          key={item.id}
          ref={el => {
            if (el && item.isActive && activeButton?.id === item.id) {
            }
          }}
          className={cx('textChip', { clickedChip: activeButton?.id === item.id && activeButton === item })}
          onClick={() => {
            setActiveButton(item);
            handleButtonClick();
          }}>
          {item.title}
        </button>
      ))}
    </div>
  );
}
