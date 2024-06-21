import { ComponentPropsWithoutRef } from 'react';

import styles from './SortBottomSheetRoot.module.scss';
import classNames from 'classnames/bind';
import BottomSheet from '../../Base/BottomSheet';

interface SortBottomSheetRootProps extends ComponentPropsWithoutRef<'ul'> {
  isOpen: boolean;
  onClose: () => void;
}

const cx = classNames.bind(styles);

export default function SortBottomSheetRoot({
  id,
  isOpen,
  onClose,
  className,
  children,
  ...rest
}: SortBottomSheetRootProps) {
  return (
    <BottomSheet id={id} isOpen={isOpen} onClose={onClose}>
      <ul className={cx('container')} {...rest}>
        {children}
      </ul>
    </BottomSheet>
  );
}
