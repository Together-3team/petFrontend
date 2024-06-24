import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './HeaderRoot.module.scss';
import useScrollUpAndDown from '@/hooks/useScrollUpAndDown';

const cx = classNames.bind(styles);

export default function HeaderRoot({ children, className, ...rest }: ComponentPropsWithoutRef<'header'>) {
  const { isUp } = useScrollUpAndDown();

  return (
    <header className={cx('header', className)} data-visible={isUp ? 'show' : 'hidden'} {...rest}>
      {children}
    </header>
  );
}
