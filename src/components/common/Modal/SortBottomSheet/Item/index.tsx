import { ComponentPropsWithoutRef } from 'react';

import styles from './SortBottomSheetItem.module.scss';
import classNames from 'classnames/bind';

interface SortBottomSheetItemProps extends ComponentPropsWithoutRef<'li'> {
  isSelected: boolean;
}

const cx = classNames.bind(styles);

export default function SortBottomSheetItem({ className, children, isSelected, ...rest }: SortBottomSheetItemProps) {
  return (
    <li className={cx('item', { selected: isSelected })} {...rest}>
      {children}
    </li>
  );
}
