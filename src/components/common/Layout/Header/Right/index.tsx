import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './HeaderRight.module.scss';

const cx = classNames.bind(styles);

export default function HeaderRight({ children, className, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cx('container', className)} {...rest}>
      {children}
    </div>
  );
}
