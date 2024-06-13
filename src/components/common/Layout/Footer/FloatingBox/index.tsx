import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './FloatingBox.module.scss';

const cx = classNames.bind(styles);

interface FloatingBoxProps extends ComponentPropsWithoutRef<'div'> {}

export default function FloatingBox({ children, className, ...rest }: FloatingBoxProps) {
  return (
    <div className={cx('container', className)} {...rest}>
      {children}
    </div>
  );
}
