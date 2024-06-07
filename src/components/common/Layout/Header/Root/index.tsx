import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './HeaderRoot.module.scss';
import useScrollVisible from '@/hooks/useScrollVisible';

const cx = classNames.bind(styles);

export default function HeaderRoot({ children, className, ...rest }: ComponentPropsWithoutRef<'header'>) {
  const { visible } = useScrollVisible();

  return (
    <header className={cx('header', className)} data-visible={visible ? 'show' : 'hidden'} {...rest}>
      {children}
    </header>
  );
}
