import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './HeaderRoot.module.scss';

const cx = classNames.bind(styles);

export default function HeaderRoot({ children, className, ...rest }: ComponentPropsWithoutRef<'header'>) {
  return (
    <header className={cx('header', className)} {...rest}>
      {children}
    </header>
  );
}
