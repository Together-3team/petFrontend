import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import useDragScroll from '@/hooks/useDragScroll';

import styles from './OrderFilterBar.module.scss';
import scrollToTargetX from '@/utils/scrollToTargetX';

const cx = classNames.bind(styles);

interface OrderFilterButtonsProps {
  id: number;
  title: string;
  isActive: boolean;
}

const buttonIds: OrderFilterButtonsProps[] = [
  { id: 0, title: '전체', isActive: true },
  { id: 1, title: '주문 대기', isActive: true },
  { id: 3, title: '주문 완료', isActive: true },
  { id: 4, title: '배송 준비', isActive: true },
  { id: 5, title: '배송 중', isActive: true },
  { id: 6, title: '배송 완료', isActive: true },
  { id: 7, title: '취소/환불', isActive: true },
];

interface OrderFilterBarProps {
  onFilterChange: (filterId: number) => void;
}

export default function OrderFilterBar({ onFilterChange }: OrderFilterBarProps) {
  const dragScrollProps = useDragScroll<HTMLDivElement>();
  const [activeButton, setActiveButton] = useState<OrderFilterButtonsProps | null>(
    buttonIds.find(item => item.id === 0) || null
  );

  const targetRef = useRef<HTMLButtonElement | null>(null);

  const handleButtonClick = useCallback(
    (item: OrderFilterButtonsProps) => {
      setActiveButton(item);
      onFilterChange(item.id);
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [onFilterChange]
  );

  return (
    <div className={styles.container} {...dragScrollProps}>
      {buttonIds.map(item => (
        <button
          key={item.id}
          ref={el => {
            if (el && item.isActive && activeButton?.id === item.id) {
              targetRef.current = el;
            }
          }}
          className={cx('textChip', { clickedChip: activeButton?.id === item.id })}
          onClick={() => handleButtonClick(item)}>
          {item.title}
        </button>
      ))}
    </div>
  );
}
